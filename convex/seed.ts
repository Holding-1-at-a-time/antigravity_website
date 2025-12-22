import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

// Seed initial data for development
export const seedServices = action({
  args: {},
  handler: async (ctx) => {
    // This would be called after creating an organization
    // For now, this is a placeholder for the data migration
    console.log("Seeding services data...");

    // The actual seeding would be done through mutations
    // after the organization is created
  },
});

// Migration action to move static services data to Convex
export const migrateServicesData = action({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    // Import the static data
    const { ALL_SERVICES } = await import("../lib/services-data");

    console.log(`Migrating ${ALL_SERVICES.length} services...`);

    for (const serviceData of ALL_SERVICES) {
      // Convert static data to Convex format
      const convexService = {
        organizationId: args.organizationId,
        slug: serviceData.slug,
        title: serviceData.title,
        shortDescription: serviceData.shortDescription,
        fullDescription: serviceData.fullDescription,
        basePrice: 0, // To be set by admin
        duration: 60, // Default 1 hour
        category: serviceData.slug, // Use slug as category for now
        packages: [], // To be configured by admin
        addOns: [], // To be configured by admin
      };

      await ctx.runMutation(api.services.createService, convexService);
    }

    console.log("Service migration completed");
  },
});