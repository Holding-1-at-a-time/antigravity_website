import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Create payment intent
export async function POST(request: NextRequest) {
  try {
    const { amount, bookingId, customerId } = await request.json();

    if (!amount || !bookingId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId,
        customerId,
      },
      description: `Booking payment for ${bookingId}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}

// Handle Stripe webhooks
export async function PUT(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event: Stripe.Event;

    // Verify webhook signature in production
    if (process.env.NODE_ENV === 'production') {
      if (!signature) {
        return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
      }
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } else {
      // For development, parse directly (less secure but easier for testing)
      event = JSON.parse(body);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);

        // TODO: Update booking payment status
        // await convex.mutation(api.bookings.updatePaymentStatus, {
        //   bookingId: paymentIntent.metadata.bookingId,
        //   paymentStatus: 'paid',
        //   stripePaymentId: paymentIntent.id,
        // });
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);

        // TODO: Update booking payment status
        // await convex.mutation(api.bookings.updatePaymentStatus, {
        //   bookingId: failedPayment.metadata.bookingId,
        //   paymentStatus: 'failed',
        //   stripePaymentId: failedPayment.id,
        // });
        break;

      default:
        console.log('Unhandled Stripe webhook event:', event.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}