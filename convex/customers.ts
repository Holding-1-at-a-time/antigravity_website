import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get customer by ID
export const getCustomer = query({
  args: {
    customerId: v.id("customers"),
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  },
});

// Get customers for an organization
export const getCustomers = query({
  args: {
    organizationId: v.id("organizations"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("customers")
      .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId))
      .order("desc");

    if (args.limit) {
      return await q.take(args.limit);
    }

    return await q.collect();
  },
});

// Find customer by email
export const getCustomerByEmail = query({
  args: {
    organizationId: v.id("organizations"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_email", (q) =>
        q.eq("organizationId", args.organizationId).eq("email", args.email)
      )
      .first();
  },
});

// Get customer by Clerk ID
export const getCustomerByClerkId = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Create a new customer
export const createCustomer = mutation({
  args: {
    organizationId: v.id("organizations"),
    clerkId: v.optional(v.string()),
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
      preferredTimes: v.array(v.string()),
      communicationPreference: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    // Verify organization exists
    const org = await ctx.db.get(args.organizationId);
    if (!org) {
      throw new Error("Organization not found");
    }

    // Check if customer with this email already exists for the organization
    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) =>
        q.eq("organizationId", args.organizationId).eq("email", args.email)
      )
      .first();

    if (existing) {
      throw new Error("Customer with this email already exists");
    }

    return await ctx.db.insert("customers", args);
  },
});

// Update customer information
export const updateCustomer = mutation({
  args: {
    customerId: v.id("customers"),
    updates: v.object({
      name: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      vehicleInfo: v.optional(v.object({
        make: v.string(),
        model: v.string(),
        year: v.number(),
        color: v.string(),
        licensePlate: v.optional(v.string()),
      })),
      preferences: v.optional(v.object({
        preferredTimes: v.array(v.string()),
        communicationPreference: v.string(),
      })),
    }),
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    // If email is being updated, check for conflicts
    if (args.updates.email !== undefined && args.updates.email !== customer.email) {
      const existing = await ctx.db
        .query("customers")
        .withIndex("by_email", (q) =>
          q.eq("organizationId", customer.organizationId).eq("email", args.updates.email as string)
        )
        .first();

      if (existing) {
        throw new Error("Customer with this email already exists");
      }
    }

    return await ctx.db.patch(args.customerId, args.updates);
  },
});

// Get customer's booking history
export const getCustomerBookings = query({
  args: {
    customerId: v.id("customers"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("bookings")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .order("desc");

    if (args.limit) {
      return await q.take(args.limit);
    }

    return await q.collect();
  },
});

// Get customer with subscription information
export const getCustomerWithSubscription = query({
  args: {
    customerId: v.id("customers"),
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    // Get active subscription
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    return { ...customer, subscription };
  },
});