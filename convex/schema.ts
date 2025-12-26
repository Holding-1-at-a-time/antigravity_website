import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Organizations table (linked to Clerk organizations)
  organizations: defineTable({
    clerkId: v.string(),
    name: v.string(),
    slug: v.string(),
    settings: v.object({
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
        slotDuration: v.number(), // minutes
        bufferTime: v.number(), // minutes between bookings
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
    }),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_slug", ["slug"]),

  // Services table (migrated from static data)
  services: defineTable({
    organizationId: v.id("organizations"),
    slug: v.string(),
    title: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    basePrice: v.number(),
    duration: v.number(), // minutes
    category: v.string(),
    isActive: v.boolean(),
    packages: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        duration: v.number(),
        description: v.string(),
        features: v.array(v.string()),
      })
    ),
    addOns: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        duration: v.number(),
        description: v.string(),
      })
    ),
  })
    .index("by_organization", ["organizationId"])
    .index("by_organization_slug", ["organizationId", "slug"])
    .index("by_category", ["organizationId", "category"]),

  // Customers table
  customers: defineTable({
    organizationId: v.id("organizations"),
    clerkId: v.optional(v.string()), // for authenticated users
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    vehicleInfo: v.object({
      make: v.string(),
      model: v.string(),
      year: v.number(),
      color: v.string(),
      licensePlate: v.optional(v.string()),
    }),
    preferences: v.optional(v.object({
      preferredTimes: v.array(v.string()), // e.g., ["morning", "afternoon"]
      communicationPreference: v.string(), // "email", "sms", "both"
    })),
  })
    .index("by_organization", ["organizationId"])
    .index("by_email", ["organizationId", "email"])
    .index("by_clerk_id", ["clerkId"]),

  // Bookings table
  bookings: defineTable({
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
    scheduledAt: v.number(), // timestamp
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    totalAmount: v.number(),
    depositAmount: v.number(),
    paymentStatus: v.union(
      v.literal("unpaid"),
      v.literal("deposit_paid"),
      v.literal("paid"),
      v.literal("refunded")
    ),
    squarePaymentId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    calendlyEventId: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_customer", ["customerId"])
    .index("by_status", ["organizationId", "status"])
    .index("by_organization_scheduled", ["organizationId", "scheduledAt"]),

  // Reviews table (existing, but adding organization scoping)
  reviews: defineTable({
    organizationId: v.id("organizations"),
    customerId: v.id("customers"),
    bookingId: v.optional(v.id("bookings")),
    rating: v.number(),
    title: v.string(),
    content: v.string(),
    serviceType: v.string(),
    isVerified: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_customer", ["customerId"])
    .index("by_rating", ["organizationId", "rating"])
    .index("by_service_type", ["organizationId", "serviceType"]),

  // Tiers table for subscription tiers
  tiers: defineTable({
    name: v.string(),
    price: v.number(), // Monthly price in cents
    benefits: v.string(),
    maintenanceWashes: v.number(),
    discountPercentage: v.number(), // 0-100
    stripePlanId: v.string(), // Stripe plan ID for mapping
  }),

  // Subscriptions table for Maintenance Club
  subscriptions: defineTable({
    organizationId: v.id("organizations"),
    customerId: v.id("customers"),
    tierId: v.id("tiers"),
    status: v.union(
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("past_due"),
      v.literal("incomplete")
    ),
    stripeSubscriptionId: v.string(),
    currentPeriodStart: v.number(), // timestamp
    currentPeriodEnd: v.number(), // timestamp
    cancelAtPeriodEnd: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_customer", ["customerId"])
    .index("by_stripe_subscription", ["stripeSubscriptionId"])
    .index("by_status", ["organizationId", "status"]),
});