# 🚗 Auto-Detailing Booking Platform

A comprehensive, self-sufficient booking and sales platform for auto-detailing businesses, built with Next.js, Convex, Clerk, and Stripe.

## 🎯 Overview

This platform automates the entire booking and sales process for auto-detailing businesses, enabling 24/7 operations without manual intervention. Key features include:

- **Automated Booking System**: 5-step booking flow with real-time availability
- **Digital Service Menu**: Add-to-cart functionality with dynamic pricing
- **Payment Processing**: Secure Stripe integration with deposit handling
- **Multi-Organization Support**: Separate businesses with isolated data
- **Admin Dashboard**: Complete business management interface
- **Email Notifications**: Automated customer and admin communications
- **Calendar Integration**: Optional Calendly sync for scheduling

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Convex (real-time database + serverless functions)
- **Authentication**: Clerk (with organization support)
- **Payments**: Stripe (with webhook handling)
- **Email**: Resend (transactional emails)
- **Calendar**: Calendly API (optional integration)

### Project Structure

```
app/
├── (marketing)/          # Public marketing pages
├── (services)/           # Service browsing pages
├── admin/                # Admin dashboard
├── booking/              # 5-step booking flow
├── api/                  # API routes (payments, calendar, email)
└── layout.tsx           # Root layout with providers

convex/
├── schema.ts            # Database schema definition
├── bookings.ts          # Booking CRUD operations
├── services.ts          # Service management
├── customers.ts         # Customer data handling
├── organizations.ts     # Multi-tenant organization setup
└── seed.ts             # Initial data seeding

components/
├── ui/                  # shadcn/ui components
└── ...                  # Custom business components

lib/
├── schemas.ts           # Zod validation schemas
├── services-data.ts     # Static service definitions
└── utils.ts            # Utility functions
```

## 📊 Database Schema

### Core Tables

```typescript
// Organizations (multi-tenant support)
organizations: {
  _id: Id<"organizations">
  name: string
  slug: string
  clerkId: string
  settings: OrganizationSettings
}

// Services (dynamic service catalog)
services: {
  _id: Id<"services">
  organizationId: Id<"organizations">
  name: string
  description: string
  category: string
  basePrice: number
  duration: number
  isActive: boolean
}

// Customers (user profiles)
customers: {
  _id: Id<"customers">
  organizationId: Id<"organizations">
  clerkId: string
  email: string
  name: string
  phone?: string
  vehicleInfo?: VehicleInfo
}

// Bookings (core business logic)
bookings: {
  _id: Id<"bookings">
  organizationId: Id<"organizations">
  customerId: Id<"customers">
  services: ServiceSelection[]
  totalAmount: number
  depositAmount: number
  status: BookingStatus
  scheduledDate?: string
  paymentIntentId?: string
}
```

### Indexes & Performance

- Composite indexes on `organizationId` + frequently queried fields
- Optimized for organization-scoped queries
- Paginated queries for large datasets

## 🔄 Booking Flow

### 5-Step Process

1. **Service Selection**: Browse and add services to cart
2. **Customer Information**: Collect contact and vehicle details
3. **Date & Time**: Select preferred service date/time
4. **Payment**: Secure deposit payment via Stripe
5. **Confirmation**: Booking confirmation with details

### State Management

- Client-side cart state with localStorage persistence
- Server-side booking validation and creation
- Real-time booking status updates via Convex subscriptions

## 💳 Payment Integration

### Stripe Implementation

- **Checkout Sessions**: Secure payment processing
- **Webhooks**: Automated payment status updates
- **Deposit Handling**: Configurable deposit percentages
- **Refunds**: Admin refund capabilities

### Webhook Events

- `checkout.session.completed`: Mark booking as paid
- `payment_intent.succeeded`: Update payment status
- `payment_intent.payment_failed`: Handle payment failures

## 🔐 Authentication & Authorization

### Clerk Integration

- **Organization-scoped**: Users belong to specific businesses
- **Role-based Access**: Admin vs customer permissions
- **Middleware Protection**: Route-level authentication
- **Profile Management**: Customer profile updates

### Security Features

- Row-level security (RLS) via Convex
- API key validation for webhooks
- Input sanitization and validation
- Rate limiting on sensitive endpoints

## 📧 Communication System

### Email Notifications

- **Customer Confirmations**: Booking details and payment receipts
- **Admin Notifications**: New bookings and payment alerts
- **Status Updates**: Booking status changes
- **Reminders**: Upcoming service notifications

### Templates

- HTML email templates with responsive design
- Dynamic content insertion
- Branded styling matching the platform

## 📱 Admin Dashboard

### Key Features

- **Booking Management**: View, update, and cancel bookings
- **Service Configuration**: Add/edit/delete services and pricing
- **Customer Database**: Customer history and contact information
- **Analytics**: Booking trends and revenue tracking
- **Settings**: Business configuration and preferences

### Real-time Updates

- Live booking notifications
- Real-time dashboard metrics
- Instant status updates across devices

## 🔄 API Integrations

### Calendly (Optional)

- **Webhook Integration**: Sync calendar events
- **Availability Checking**: Real-time slot availability
- **Automated Scheduling**: Calendar event creation

### External APIs

- **Maps Integration**: Service area validation
- **SMS Notifications**: Optional text message alerts
- **CRM Integration**: Customer data synchronization

## 🧪 Testing Strategy

### Test Coverage

- **Unit Tests**: Utility functions and business logic
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Complete booking flow simulation
- **Payment Testing**: Stripe webhook handling

### Test Scripts

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run booking flow test
node scripts/test-booking-flow.js
```

## 🚀 Deployment

### Environment Setup

Required environment variables:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (optional)
RESEND_API_KEY=re_...
```

### Deployment Steps

1. **Convex Setup**: Deploy database schema and functions
2. **Environment Config**: Set up all required API keys
3. **Database Migration**: Run service data migration
4. **Build & Deploy**: Deploy to hosting platform
5. **Testing**: Verify all functionality in production

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📈 Performance & Scaling

### Optimization Features

- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: Static content and API response caching
- **Image Optimization**: Next.js image optimization
- **Code Splitting**: Dynamic imports for large components

### Monitoring

- **Convex Dashboard**: Database performance metrics
- **Stripe Dashboard**: Payment processing analytics
- **Application Logs**: Error tracking and debugging
- **User Analytics**: Booking conversion tracking

## 🔧 Development

### Local Setup

```bash
# Install dependencies
pnpm install

# Start Convex development
npx convex dev

# Start Next.js development
pnpm dev
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks

### Best Practices

- **Component Composition**: Reusable UI components
- **Custom Hooks**: Business logic encapsulation
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during async operations

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues:**
- Verify Convex deployment status
- Check NEXT_PUBLIC_CONVEX_URL environment variable
- Ensure organization scoping in queries

**Authentication Problems:**
- Confirm Clerk application configuration
- Verify middleware setup
- Check domain allowlist in Clerk

**Payment Failures:**
- Validate Stripe webhook configuration
- Check API key permissions
- Review payment intent creation

**Build Errors:**
- Clear node_modules and reinstall
- Check TypeScript compilation
- Verify all dependencies are installed

## 📚 API Reference

### Convex Functions

```typescript
// Booking operations
api.bookings.createBooking
api.bookings.updateBooking
api.bookings.cancelBooking

// Service management
api.services.getServices
api.services.createService
api.services.updateService

// Customer operations
api.customers.getCustomer
api.customers.updateCustomer
```

### REST API Endpoints

- `POST /api/payments`: Stripe webhook handler
- `POST /api/calendar`: Calendly webhook handler
- `POST /api/email`: Email sending endpoint

## 🤝 Contributing

### Development Workflow

1. **Branch**: Create feature branch from `main`
2. **Develop**: Implement changes with tests
3. **Test**: Run full test suite
4. **Review**: Create pull request
5. **Deploy**: Merge and deploy to staging

### Code Standards

- Follow existing TypeScript and React patterns
- Maintain test coverage above 80%
- Use descriptive commit messages
- Document complex business logic

## 📄 License

This project is proprietary software. See LICENSE file for details.

## 🆘 Support

For technical support or questions:

- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for deployment issues
- Review Convex documentation for database questions
- Consult Stripe docs for payment integration issues
- Check Clerk documentation for authentication setup

---

**Built with ❤️ for auto-detailing businesses**