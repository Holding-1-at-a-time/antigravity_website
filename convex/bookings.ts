import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get bookings for an organization
export const getBookings = query({
  args: {
    organizationId: v.id("organizations"),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    )),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("bookings")
      .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId));

    if (args.status) {
      q = q.filter((q) => q.eq(q.field("status"), args.status));
    }

    q = q.order("desc");

    if (args.limit) {
      return await q.take(args.limit);
    }

    return await q.collect();
  },
});

// Get a single booking
export const getBooking = query({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // Get associated customer and services
    const customer = await ctx.db.get(booking.customerId);
    const services = await Promise.all(
      booking.services.map(async (serviceItem) => {
        const service = await ctx.db.get(serviceItem.serviceId);
        return { ...serviceItem, service };
      })
    );

    return { ...booking, customer, services };
  },
});

// Create a new booking
export const createBooking = mutation({
  args: {
    organizationId: v.id("organizations"),
    customerId: v.id("customers"),
    services: v.array(
      v.object({
        serviceId: v.id("services"),
        packageName: v.optional(v.string()),
        addOns: v.array(v.string()),
        customizations: v.optional(v.object({
          notes: v.optional(v.string()),
          priority: v.optional(v.string()),
        })),
      })
    ),
    scheduledAt: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify organization exists
    const org = await ctx.db.get(args.organizationId);
    if (!org) {
      throw new Error("Organization not found");
    }

    // Verify customer exists
    const customer = await ctx.db.get(args.customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    // Verify all services exist and are active
    for (const serviceItem of args.services) {
      const service = await ctx.db.get(serviceItem.serviceId);
      if (!service || !service.isActive) {
        throw new Error(`Service ${serviceItem.serviceId} not found or inactive`);
      }
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const serviceItem of args.services) {
      const service = await ctx.db.get(serviceItem.serviceId);
      if (service) {
        // Use package price if specified, otherwise base price
        if (serviceItem.packageName) {
          const pkg = service.packages.find(p => p.name === serviceItem.packageName);
          if (pkg) {
            totalAmount += pkg.price;
          }
        } else {
          totalAmount += service.basePrice;
        }

        // Add add-on prices
        for (const addOnName of serviceItem.addOns) {
          const addOn = service.addOns.find(a => a.name === addOnName);
          if (addOn) {
            totalAmount += addOn.price;
          }
        }
      }
    }

    // Calculate deposit amount
    const depositAmount = org.settings.bookingSettings.requireDeposit
      ? Math.round(totalAmount * (org.settings.bookingSettings.depositPercentage / 100))
      : 0;

    const now = Date.now();

    return await ctx.db.insert("bookings", {
      organizationId: args.organizationId,
      customerId: args.customerId,
      services: args.services,
      scheduledAt: args.scheduledAt,
      status: "pending",
      totalAmount,
      depositAmount,
      paymentStatus: "unpaid",
      notes: args.notes,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update booking status
export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    return await ctx.db.patch(args.bookingId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Update payment status
export const updatePaymentStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    paymentStatus: v.union(
      v.literal("unpaid"),
      v.literal("deposit_paid"),
      v.literal("paid"),
      v.literal("refunded")
    ),
    squarePaymentId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    const updates: any = {
      paymentStatus: args.paymentStatus,
      updatedAt: Date.now(),
    };

    if (args.squarePaymentId) {
      updates.squarePaymentId = args.squarePaymentId;
    }

    if (args.stripePaymentIntentId) {
      updates.stripePaymentIntentId = args.stripePaymentIntentId;
    }

    return await ctx.db.patch(args.bookingId, updates);
  },
});

// Cancel booking
export const cancelBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status === "completed" || booking.status === "cancelled") {
      throw new Error("Cannot cancel a completed or already cancelled booking");
    }

    const notes = booking.notes
      ? `${booking.notes}\n\nCancelled: ${args.reason || "No reason provided"}`
      : `Cancelled: ${args.reason || "No reason provided"}`;

    return await ctx.db.patch(args.bookingId, {
      status: "cancelled",
      notes,
      updatedAt: Date.now(),
    });
  },
});

// Get available time slots for a date
export const getAvailableSlots = query({
  args: {
    organizationId: v.id("organizations"),
    date: v.string(), // YYYY-MM-DD format
  },
  handler: async (ctx, args) => {
    const org = await ctx.db.get(args.organizationId);
    if (!org) {
      throw new Error("Organization not found");
    }

    const settings = org.settings.bookingSettings;
    const businessHours = org.settings.businessHours;

    // Parse date and determine day of week
    const date = new Date(args.date + 'T00:00:00');
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const daySettings = businessHours[dayOfWeek as keyof typeof businessHours];
    if (!daySettings || daySettings.closed) {
      return []; // No slots available
    }

    // Get existing bookings for this date
    const startOfDay = date.getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000;

    const existingBookings = await ctx.db
      .query("bookings")
      .withIndex("by_organization_scheduled", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .filter((q) =>
        q.and(
          q.gte(q.field("scheduledAt"), startOfDay),
          q.lt(q.field("scheduledAt"), endOfDay),
          q.neq(q.field("status"), "cancelled")
        )
      )
      .collect();

    // Generate time slots
    const slots = [];
    const [openHour, openMinute] = daySettings.open.split(':').map(Number);
    const [closeHour, closeMinute] = daySettings.close.split(':').map(Number);

    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    for (let time = openTime; time < closeTime; time += settings.slotDuration) {
      const slotStart = startOfDay + time * 60 * 1000;
      const slotEnd = slotStart + settings.slotDuration * 60 * 1000;

      // Check if slot conflicts with existing bookings
      const conflict = existingBookings.some(booking => {
        const bookingEnd = booking.scheduledAt + (60 * 60 * 1000); // Assume 1 hour default
        return (
          (slotStart < bookingEnd && slotEnd > booking.scheduledAt)
        );
      });

      if (!conflict) {
        slots.push({
          start: slotStart,
          end: slotEnd,
          available: true,
        });
      }
    }

    return slots;
  },
});