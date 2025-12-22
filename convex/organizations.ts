import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get organization by Clerk ID
export const getOrganization = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("organizations")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!org) {
      throw new Error("Organization not found");
    }

    return org;
  },
});

// Get organization by slug
export const getOrganizationBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("organizations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!org) {
      throw new Error("Organization not found");
    }

    return org;
  },
});

// Get organization by ID
export const getOrganizationById = query({
  args: {
    id: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db.get(args.id);

    if (!org) {
      throw new Error("Organization not found");
    }

    return org;
  },
});

// Create a new organization (admin only)
export const createOrganization = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    slug: v.string(),
    settings: v.optional(v.object({
      businessHours: v.object({
        monday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        tuesday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        wednesday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        thursday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        friday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        saturday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        sunday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
      }),
      bookingSettings: v.object({
        advanceBookingDays: v.number(),
        slotDuration: v.number(),
        bufferTime: v.number(),
        maxBookingsPerDay: v.number(),
        requireDeposit: v.boolean(),
        depositPercentage: v.number(),
      }),
      paymentSettings: v.object({
        stripePublishableKey: v.string(),
        stripeWebhookSecret: v.string(),
        calendlyToken: v.string(),
        calendlyEventType: v.string(),
      }),
    })),
  },
  handler: async (ctx, args) => {
    // Check if organization already exists
    const existing = await ctx.db
      .query("organizations")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) {
      throw new Error("Organization already exists");
    }

    // Check if slug is unique
    const slugExists = await ctx.db
      .query("organizations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (slugExists) {
      throw new Error("Organization slug already exists");
    }

    const defaultSettings = {
      businessHours: {
        monday: { open: "08:00", close: "18:00", closed: false },
        tuesday: { open: "08:00", close: "18:00", closed: false },
        wednesday: { open: "08:00", close: "18:00", closed: false },
        thursday: { open: "08:00", close: "18:00", closed: false },
        friday: { open: "08:00", close: "18:00", closed: false },
        saturday: { open: "08:00", close: "18:00", closed: false },
        sunday: { open: "08:00", close: "18:00", closed: true },
      },
      bookingSettings: {
        advanceBookingDays: 30,
        slotDuration: 60, // minutes
        bufferTime: 15, // minutes
        maxBookingsPerDay: 8,
        requireDeposit: true,
        depositPercentage: 25,
      },
      paymentSettings: {
        stripePublishableKey: "",
        stripeWebhookSecret: "",
        calendlyToken: "",
        calendlyEventType: "",
      },
    };

    return await ctx.db.insert("organizations", {
      clerkId: args.clerkId,
      name: args.name,
      slug: args.slug,
      settings: args.settings || defaultSettings,
    });
  },
});

// Update organization settings (admin only)
export const updateOrganizationSettings = mutation({
  args: {
    organizationId: v.id("organizations"),
    settings: v.object({
      businessHours: v.optional(v.object({
        monday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        tuesday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        wednesday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        thursday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        friday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        saturday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
        sunday: v.object({ open: v.string(), close: v.string(), closed: v.boolean() }),
      })),
      bookingSettings: v.optional(v.object({
        advanceBookingDays: v.number(),
        slotDuration: v.number(),
        bufferTime: v.number(),
        maxBookingsPerDay: v.number(),
        requireDeposit: v.boolean(),
        depositPercentage: v.number(),
      })),
      paymentSettings: v.optional(v.object({
        stripePublishableKey: v.string(),
        stripeWebhookSecret: v.string(),
        calendlyToken: v.string(),
        calendlyEventType: v.string(),
      })),
    }),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db.get(args.organizationId);
    if (!org) {
      throw new Error("Organization not found");
    }

    return await ctx.db.patch(args.organizationId, {
      settings: { ...org.settings, ...args.settings },
    });
  },
});