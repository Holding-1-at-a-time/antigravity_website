#!/usr/bin/env node

/**
 * Migration script to move static service data to Convex database
 * Run with: node scripts/migrate-services.js
 */

const { ConvexHttpClient } = require('convex/browser');
const { api } = require('../convex/_generated/api');

// You'll need to set this to your actual Convex deployment URL
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://your-convex-deployment-url.convex.cloud';

async function migrateServices() {
  console.log('Starting service migration...');

  const convex = new ConvexHttpClient(CONVEX_URL);

  try {
    // Import the static service data
    const { ALL_SERVICES } = require('../lib/services-data');

    console.log(`Found ${ALL_SERVICES.length} services to migrate`);

    // First, create or get the organization
    // This assumes you have an organization set up
    const organizationId = 'your-organization-id'; // Replace with actual org ID

    for (const serviceData of ALL_SERVICES) {
      console.log(`Migrating service: ${serviceData.title}`);

      // Convert static data to Convex format
      const convexService = {
        organizationId,
        slug: serviceData.slug,
        title: serviceData.title,
        shortDescription: serviceData.shortDescription,
        fullDescription: serviceData.fullDescription,
        basePrice: 0, // Set appropriate pricing
        duration: 60, // Default 1 hour in minutes
        category: serviceData.slug, // Use slug as category
        packages: [], // Add packages as needed
        addOns: [], // Add add-ons as needed
      };

      // Create the service in Convex
      await convex.mutation(api.services.createService, convexService);
      console.log(`✓ Created service: ${serviceData.title}`);
    }

    console.log('Service migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateServices();