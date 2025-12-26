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

// Create subscription checkout session
export async function POST(request: NextRequest) {
  try {
    const { tierId, customerId, successUrl, cancelUrl } = await request.json();

    if (!tierId || !customerId || !successUrl || !cancelUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get tier details from Convex
    const tier = await convex.query(api.subscriptions.getTierByStripePlanId, { stripePlanId: tierId });
    if (!tier) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Get customer details from Convex
    const customer = await convex.query(api.customers.getCustomer, { customerId });
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Check if customer already has an active subscription
    const existingSubscription = await convex.query(api.subscriptions.getSubscriptionForCustomer, { customerId });
    if (existingSubscription) {
      return NextResponse.json({ error: 'Customer already has an active subscription' }, { status: 400 });
    }

    // Create Stripe checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: tier.stripePlanId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customer.email,
      metadata: {
        customerId,
        tierId: tier._id,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Subscription checkout creation error:', error);
    return NextResponse.json({ error: 'Subscription creation failed' }, { status: 500 });
  }
}

// Handle Stripe subscription webhooks
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
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Subscription checkout completed:', session.id);

        if (session.mode === 'subscription' && session.metadata?.tierId && session.metadata?.customerId) {
          // Get customer to determine organization
          const customer = await convex.query(api.customers.getCustomer, {
            customerId: session.metadata.customerId as any
          });

          if (customer) {
            // Create subscription record in Convex
            await convex.mutation(api.subscriptions.createSubscription, {
              organizationId: customer.organizationId,
              customerId: session.metadata.customerId as any,
              tierId: session.metadata.tierId as any,
              stripeSubscriptionId: session.subscription as string,
              currentPeriodStart: Date.now(), // Will be updated by subscription events
              currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
            });
          }
        }
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);

        // Find Convex subscription by Stripe subscription ID
        const convexSubscription = await convex.query(api.subscriptions.getSubscriptionByStripeId, {
          stripeSubscriptionId: subscription.id
        });

        if (convexSubscription) {
          // Update subscription in Convex
          await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
            subscriptionId: convexSubscription._id,
            status: subscription.status === 'active' ? 'active' :
                   subscription.status === 'canceled' ? 'cancelled' :
                   subscription.status === 'past_due' ? 'past_due' : 'incomplete',
            currentPeriodStart: subscription.current_period_start * 1000,
            currentPeriodEnd: subscription.current_period_end * 1000,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          });
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', deletedSubscription.id);

        // Find Convex subscription by Stripe subscription ID
        const convexDeletedSubscription = await convex.query(api.subscriptions.getSubscriptionByStripeId, {
          stripeSubscriptionId: deletedSubscription.id
        });

        if (convexDeletedSubscription) {
          // Update subscription status to cancelled
          await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
            subscriptionId: convexDeletedSubscription._id,
            status: 'cancelled',
          });
        }
        break;

      default:
        console.log('Unhandled Stripe subscription webhook event:', event.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}