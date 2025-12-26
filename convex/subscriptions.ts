import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// List all available tiers
export const listTiers = query({
  handler: async (ctx) => {
    return await ctx.db.query("tiers").collect();
  },
});

// Get tier by Stripe plan ID
export const getTierByStripePlanId = query({
  args: {
    stripePlanId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tiers")
      .filter((q) => q.eq(q.field("stripePlanId"), args.stripePlanId))
      .first();
  },
});

// Insert a new tier (for seeding/admin purposes)
export const insertTier = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    benefits: v.string(),
    maintenanceWashes: v.number(),
    discountPercentage: v.number(),
    stripePlanId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tiers", args);
  },
});

// Get subscription for a customer with tier data
export const getSubscriptionForCustomer = query({
  args: {
    customerId: v.id("customers"),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .first();

    if (!subscription) {
      return null;
    }

    // Eager load the tier data
    const tier = await ctx.db.get(subscription.tierId);
    if (!tier) {
      return null; // Handle missing tier gracefully
    }

    return { ...subscription, tier };
  },
});

// Create a new subscription
export const createSubscription = mutation({
  args: {
    organizationId: v.id("organizations"),
    customerId: v.id("customers"),
    tierId: v.id("tiers"),
    stripeSubscriptionId: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
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

    // Verify tier exists
    const tier = await ctx.db.get(args.tierId);
    if (!tier) {
      throw new Error(`Tier with id ${args.tierId} not found`);
    }

    // Check if customer already has an active subscription
    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    if (existingSubscription) {
      throw new Error("Customer already has an active subscription");
    }

    const now = Date.now();

    return await ctx.db.insert("subscriptions", {
      organizationId: args.organizationId,
      customerId: args.customerId,
      tierId: args.tierId,
      status: "active",
      stripeSubscriptionId: args.stripeSubscriptionId,
      currentPeriodStart: args.currentPeriodStart,
      currentPeriodEnd: args.currentPeriodEnd,
      cancelAtPeriodEnd: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update subscription status
export const updateSubscriptionStatus = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    status: v.union(
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("past_due"),
      v.literal("incomplete")
    ),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db.get(args.subscriptionId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    const updates: any = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.currentPeriodStart !== undefined) {
      updates.currentPeriodStart = args.currentPeriodStart;
    }

    if (args.currentPeriodEnd !== undefined) {
      updates.currentPeriodEnd = args.currentPeriodEnd;
    }

    if (args.cancelAtPeriodEnd !== undefined) {
      updates.cancelAtPeriodEnd = args.cancelAtPeriodEnd;
    }

    return await ctx.db.patch(args.subscriptionId, updates);
  },
});

// Cancel subscription
export const cancelSubscription = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    cancelAtPeriodEnd: v.optional(v.boolean()), // default true
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db.get(args.subscriptionId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    if (subscription.status !== "active") {
      throw new Error("Can only cancel active subscriptions");
    }

    const cancelAtEnd = args.cancelAtPeriodEnd ?? true;

    return await ctx.db.patch(args.subscriptionId, {
      cancelAtPeriodEnd: cancelAtEnd,
      status: cancelAtEnd ? "active" : "cancelled",
      updatedAt: Date.now(),
    });
  },
});

// Get subscription by Stripe ID (for webhooks)
export const getSubscriptionByStripeId = query({
  args: {
    stripeSubscriptionId: v.string(),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_stripe_subscription", (q) => q.eq("stripeSubscriptionId", args.stripeSubscriptionId))
      .first();

    return subscription;
  },
});