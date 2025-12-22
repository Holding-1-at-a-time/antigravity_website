# 🚀 Booking Platform Deployment Guide

This guide provides step-by-step instructions for deploying the auto-detailing booking platform to production.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ installed
- ✅ pnpm or npm package manager
- ✅ Git repository initialized
- ✅ All required API accounts set up

## 🔧 Required API Setup

### 1. Convex Database Setup

1. **Install Convex CLI** (if not already installed):
   ```bash
   npm install -g convex
   ```

2. **Initialize Convex project**:
   ```bash
   npx convex dev --once
   ```

3. **Deploy Convex functions**:
   ```bash
   npx convex deploy
   ```

4. **Get your Convex URL** from the dashboard and update `.env.local`:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud
   ```

### 2. Clerk Authentication Setup

1. **Create a Clerk application** at [clerk.com](https://clerk.com)

2. **Enable Organizations** in your Clerk dashboard:
   - Go to Organizations settings
   - Enable "Organizations" feature
   - Configure organization settings

3. **Get API keys** from Clerk dashboard and add to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

4. **Configure sign-in/sign-up URLs** in Clerk:
   - Add your production domain to allowed origins
   - Set up redirect URLs for authentication flows

### 3. Stripe Payment Processing

1. **Create a Stripe account** at [stripe.com](https://stripe.com)

2. **Get API keys** from Stripe dashboard:
   - Go to Developers → API keys
   - Copy publishable and secret keys

3. **Add to `.env.local`**:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. **Set up webhooks**:
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/payments`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy webhook secret to `.env.local`:
     ```
     STRIPE_WEBHOOK_SECRET=whsec_...
     ```

### 4. Resend Email Service (Optional)

1. **Create account** at [resend.com](https://resend.com)

2. **Get API key** and add to `.env.local`:
   ```
   RESEND_API_KEY=re_...
   ```

### 5. Calendly Integration (Optional)

1. **Get Calendly API token** from developer settings

2. **Set up webhook** for calendar events (if using calendar sync)

## 🗄️ Database Migration

After setting up Convex, run the migration script to populate initial service data:

```bash
node scripts/migrate-services.js
```

This will:
- Create organization records
- Migrate service data from static files
- Set up initial admin users

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)

1. **Connect your repository** to Vercel

2. **Configure environment variables** in Vercel dashboard:
   - Add all variables from `.env.local`
   - Set production values for API keys

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Convex functions deploy separately

### Option 2: Netlify

1. **Connect repository** to Netlify

2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Configure environment variables** in Netlify dashboard

4. **Deploy**

### Option 3: Manual Deployment

1. **Run the deployment script**:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

2. **Deploy to your hosting platform** of choice

## 🧪 Testing Deployment

### Automated Testing

Run the test script to verify core functionality:

```bash
node scripts/test-booking-flow.js
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Organization creation/setup
- [ ] Service browsing and selection
- [ ] Booking flow (5 steps)
- [ ] Payment processing with Stripe
- [ ] Admin dashboard access
- [ ] Email notifications
- [ ] Mobile responsiveness

### End-to-End Testing

1. **Create a test organization**
2. **Add services and pricing**
3. **Complete a full booking** as a customer
4. **Verify payment processing**
5. **Check admin notifications**

## 🔒 Security Checklist

- [ ] All API keys are environment variables (not in code)
- [ ] Webhook endpoints are secured with proper secrets
- [ ] Database access is properly scoped by organization
- [ ] Authentication is required for sensitive operations
- [ ] HTTPS is enabled on production domain
- [ ] CORS is properly configured

## 📊 Monitoring & Maintenance

### Essential Monitoring

1. **Convex Dashboard**: Monitor database performance and function calls
2. **Stripe Dashboard**: Track payments and failed transactions
3. **Clerk Dashboard**: Monitor user authentication and organization activity
4. **Hosting Platform**: Monitor server performance and errors

### Logs to Monitor

- Payment webhook failures
- Authentication errors
- Database query timeouts
- Email delivery failures

### Regular Maintenance

- Update dependencies monthly
- Monitor Stripe compliance
- Review and rotate API keys annually
- Backup database regularly

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version compatibility
- Verify all environment variables are set
- Ensure Convex is properly deployed

**Authentication Issues:**
- Verify Clerk keys are correct
- Check domain configuration in Clerk
- Ensure middleware is properly configured

**Payment Issues:**
- Confirm Stripe webhook endpoint is active
- Check webhook secret matches
- Verify API keys are for correct environment

**Database Issues:**
- Ensure Convex deployment is complete
- Check organization scoping in queries
- Verify migration script ran successfully

### Support Resources

- **Convex**: [docs.convex.dev](https://docs.convex.dev)
- **Clerk**: [clerk.com/docs](https://clerk.com/docs)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

## 🎯 Post-Deployment

After successful deployment:

1. **Set up custom domain** and SSL certificates
2. **Configure DNS** records if needed
3. **Set up monitoring** and alerting
4. **Test all user flows** thoroughly
5. **Create admin accounts** for business owners
6. **Document any custom configurations**

## 📈 Scaling Considerations

As your platform grows:

- Monitor Convex usage limits
- Consider Stripe payment optimization
- Implement caching for frequently accessed data
- Set up CDN for static assets
- Plan for multi-region deployment if needed

---

**Need help?** Check the [BOOKING_PLATFORM_README.md](BOOKING_PLATFORM_README.md) for detailed technical documentation.