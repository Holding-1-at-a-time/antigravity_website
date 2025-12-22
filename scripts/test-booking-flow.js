#!/usr/bin/env node

/**
 * Basic test script for booking flow
 * Run with: node scripts/test-booking-flow.js
 */

const { ConvexHttpClient } = require('convex/browser');
const { api } = require('../convex/_generated/api');

// You'll need to set this to your actual Convex deployment URL
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://your-convex-deployment-url.convex.cloud';

async function testBookingFlow() {
  console.log('🧪 Testing booking flow...');

  const convex = new ConvexHttpClient(CONVEX_URL);

  try {
    // Test 1: Get services
    console.log('1. Testing service retrieval...');
    const services = await convex.query(api.services.getServices, {
      organizationId: 'test-org-id' // Replace with actual org ID
    });
    console.log(`✓ Found ${services.length} services`);

    // Test 2: Create a customer
    console.log('2. Testing customer creation...');
    const customer = await convex.mutation(api.customers.createCustomer, {
      organizationId: 'test-org-id',
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '(555) 123-4567',
      vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Blue',
        licensePlate: 'TEST123'
      }
    });
    console.log(`✓ Created customer: ${customer._id}`);

    // Test 3: Create a booking
    console.log('3. Testing booking creation...');
    const booking = await convex.mutation(api.bookings.createBooking, {
      organizationId: 'test-org-id',
      customerId: customer._id,
      services: [{
        serviceId: services[0]?._id || 'test-service-id',
        packageName: null,
        addOns: [],
        customizations: {
          notes: 'Test booking'
        }
      }],
      scheduledAt: Date.now() + 86400000, // Tomorrow
      notes: 'Test booking notes'
    });
    console.log(`✓ Created booking: ${booking._id}`);

    // Test 4: Get booking details
    console.log('4. Testing booking retrieval...');
    const bookingDetails = await convex.query(api.bookings.getBooking, {
      bookingId: booking._id
    });
    console.log(`✓ Retrieved booking with status: ${bookingDetails.status}`);

    console.log('🎉 All booking flow tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
testBookingFlow();