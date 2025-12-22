import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Get all services for an organization
export const getServices = query({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("services")
      .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Get a single service by slug
export const getServiceBySlug = query({
  args: {
    organizationId: v.id("organizations"),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const service = await ctx.db
      .query("services")
      .withIndex("by_organization_slug", (q) =>
        q.eq("organizationId", args.organizationId).eq("slug", args.slug)
      )
      .first();

    if (!service || !service.isActive) {
      throw new Error("Service not found");
    }

    return service;
  },
});

// Create a new service (admin only)
export const createService = mutation({
  args: {
    organizationId: v.id("organizations"),
    slug: v.string(),
    title: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    basePrice: v.number(),
    duration: v.number(),
    category: v.string(),
    packages: v.optional(v.array(v.object({
      name: v.string(),
      price: v.number(),
      duration: v.number(),
      description: v.string(),
      features: v.array(v.string()),
    }))),
    addOns: v.optional(v.array(v.object({
      name: v.string(),
      price: v.number(),
      duration: v.number(),
      description: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    // Verify organization exists
    const org = await ctx.db.get(args.organizationId);
    if (!org) {
      throw new Error("Organization not found");
    }

    // Check if slug already exists for this organization
    const existing = await ctx.db
      .query("services")
      .withIndex("by_organization_slug", (q) =>
        q.eq("organizationId", args.organizationId).eq("slug", args.slug)
      )
      .first();

    if (existing) {
      throw new Error("Service slug already exists");
    }

    return await ctx.db.insert("services", {
      ...args,
      isActive: true,
    });
  },
});

// Update a service (admin only)
export const updateService = mutation({
  args: {
    serviceId: v.id("services"),
    updates: v.object({
      title: v.optional(v.string()),
      shortDescription: v.optional(v.string()),
      fullDescription: v.optional(v.string()),
      basePrice: v.optional(v.number()),
      duration: v.optional(v.number()),
      category: v.optional(v.string()),
      isActive: v.optional(v.boolean()),
      packages: v.optional(v.array(v.object({
        name: v.string(),
        price: v.number(),
        duration: v.number(),
        description: v.string(),
        features: v.array(v.string()),
      }))),
      addOns: v.optional(v.array(v.object({
        name: v.string(),
        price: v.number(),
        duration: v.number(),
        description: v.string(),
      }))),
    }),
  },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    return await ctx.db.patch(args.serviceId, args.updates);
  },
});

// Delete a service (admin only)
export const deleteService = mutation({
  args: {
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    // Soft delete by setting isActive to false
    return await ctx.db.patch(args.serviceId, { isActive: false });
  },
});