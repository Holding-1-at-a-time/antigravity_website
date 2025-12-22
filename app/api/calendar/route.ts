import { NextRequest, NextResponse } from 'next/server';

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
    // TODO: Call Convex function to get available slots
    // const slots = await convex.query(api.bookings.getAvailableSlots, {
    //   organizationId,
    //   date,
    // });

    // For now, return mock data
    const mockSlots = [
      { start: Date.now() + 3600000, end: Date.now() + 7200000, available: true },
      { start: Date.now() + 7200000, end: Date.now() + 10800000, available: true },
    ];

    return NextResponse.json({ slots: mockSlots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}