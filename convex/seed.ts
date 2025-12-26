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

// Seed subscription tiers
export const seedTiers = action({
  args: {},
  handler: async (ctx) => {
    console.log("Seeding subscription tiers...");

    const tiers = [
      {
        name: "Basic",
        price: 5999, // $59.99 in cents
        benefits: "Basic maintenance reminders and email notifications for your vehicle",
        maintenanceWashes: 1,
        discountPercentage: 0,
        stripePlanId: process.env.STRIPE_PRICE_BASIC || "price_basic_placeholder",
      },
      {
        name: "Premium",
        price: 7999, // $79.99 in cents
        benefits: "Priority booking, monthly vehicle health reports, and exclusive service discounts",
        maintenanceWashes: 2,
        discountPercentage: 0,
        stripePlanId: process.env.STRIPE_PRICE_PREMIUM || "price_premium_placeholder",
      },
      {
        name: "VIP",
        price: 9999, // $99.99 in cents
        benefits: "10% discount on deep detail services, dedicated account manager, quarterly complimentary interior detailing",
        maintenanceWashes: 3,
        discountPercentage: 10,
        stripePlanId: process.env.STRIPE_PRICE_VIP || "price_vip_placeholder",
      },
    ];

    // Check if tiers already exist
    const existingTiers = await ctx.runQuery(api.subscriptions.listTiers);
    if (existingTiers.length > 0) {
      console.log("Tiers already exist, skipping seeding");
      return;
    }

    // Insert tiers using the mutation
    for (const tier of tiers) {
      await ctx.runMutation(api.subscriptions.insertTier, tier);
    }

    console.log("Tiers seeded successfully");
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