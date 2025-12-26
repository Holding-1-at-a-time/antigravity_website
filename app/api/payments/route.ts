import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../convex/_generated/api';

// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.CONVEX_URL!);

// Create checkout session
export async function POST(request: NextRequest) {
  try {
    const { amount, bookingId, customerId, successUrl, cancelUrl } = await request.json();

    if (!amount || !bookingId || !successUrl || !cancelUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Auto Detailing Service Booking',
              description: `Booking ID: ${bookingId}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        bookingId,
        customerId,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout session creation error:', error);
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
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout completed:', session.id);

        // Update booking payment status
        if (session.metadata?.bookingId) {
          await convex.mutation(api.bookings.updatePaymentStatus, {
            bookingId: session.metadata.bookingId as any,
            paymentStatus: 'paid',
            stripePaymentIntentId: session.payment_intent as string,
          });
        }
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object;
        console.log('Checkout expired:', expiredSession.id);

        // Update booking payment status
        if (expiredSession.metadata?.bookingId) {
          await convex.mutation(api.bookings.updatePaymentStatus, {
            bookingId: expiredSession.metadata.bookingId as any,
            paymentStatus: 'unpaid',
          });
        }
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