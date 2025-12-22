import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../convex/_generated/api';

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.CONVEX_URL!);

// Calendly webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify webhook signature (implement based on Calendly docs)
    const signature = request.headers.get('x-calendly-signature');
    // TODO: Implement signature verification

    const event = body.event;
    const payload = body.payload;

    switch (event) {
      case 'invitee.created':
        // Handle new booking created
        console.log('New booking created:', payload);
        // TODO: Update Convex booking status
        break;

      case 'invitee.canceled':
        // Handle booking cancellation
        console.log('Booking cancelled:', payload);
        // TODO: Update Convex booking status
        break;

      default:
        console.log('Unhandled Calendly event:', event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Calendly webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Get available time slots
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const organizationId = searchParams.get('organizationId');

  if (!date || !organizationId) {
    return NextResponse.json({ error: 'Missing date or organizationId' }, { status: 400 });
  }

  try {
    // Get organization settings
    const org = await convex.query(api.organizations.getOrganizationById, { id: organizationId as any });
    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const { calendlyToken, calendlyEventType } = org.settings.paymentSettings;

    if (!calendlyToken || !calendlyEventType) {
      // Fallback to Convex slots
      const slots = await convex.query(api.bookings.getAvailableSlots, {
        organizationId: organizationId as any,
        date,
      });
      return NextResponse.json({ slots });
    }

    // Call Calendly API for available times
    const response = await fetch(
      `https://api.calendly.com/event_type_available_times?event_type=${calendlyEventType}&start_time=${date}T00:00:00Z&end_time=${date}T23:59:59Z`,
      {
        headers: {
          Authorization: `Bearer ${calendlyToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Calendly API error');
    }

    const data = await response.json();
    const slots = data.collection.map((slot: any) => ({
      start: new Date(slot.start_time).getTime(),
      end: new Date(slot.end_time).getTime(),
      available: true,
    }));

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}