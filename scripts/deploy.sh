#!/bin/bash

# Auto-Detailing Booking Platform Deployment Script
# Compatible with both Unix-like systems and Windows
# Run with: ./scripts/deploy.sh (Unix) or bash scripts/deploy.sh (Windows)

set -e

# Detect OS for compatibility
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OS" == "Windows_NT" ]]; then
    IS_WINDOWS=true
    echo "🔧 Detected Windows environment"
else
    IS_WINDOWS=false
    echo "🔧 Detected Unix-like environment"
fi

echo "🚀 Starting Auto-Detailing Booking Platform Deployment"
echo "=================================================="

# Check if all required environment variables are set
echo "🔍 Checking environment variables..."

required_vars=(
    "NEXT_PUBLIC_CONVEX_URL"
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    "CLERK_SECRET_KEY"
    "STRIPE_PUBLISHABLE_KEY"
    "STRIPE_SECRET_KEY"
    "STRIPE_WEBHOOK_SECRET"
    "RESEND_API_KEY"
)

missing_vars=()
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Missing required environment variables:"
    printf '   - %s\n' "${missing_vars[@]}"
    echo ""
    echo "Please set these in your .env.local file or environment"
    echo "See DEPLOYMENT_GUIDE.md for detailed setup instructions"
    exit 1
fi

echo "✅ All required environment variables are set"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "⚠️  Warning: Not in a git repository"
    echo "   Consider initializing git for better deployment tracking"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
else
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy Convex functions (optional - requires manual confirmation)
echo "☁️ Convex deployment check..."
echo "   Note: Run 'npx convex deploy' manually when ready"
echo "   Make sure your Convex project is set up first"

# Run database migrations (optional)
echo "🗄️ Database migration check..."
echo "   Note: Run 'node scripts/migrate-services.js' after Convex deployment"
echo "   This will migrate your service data to the database"

# Run tests
echo "🧪 Running tests..."
if [ -f "scripts/test-booking-flow.js" ]; then
    node scripts/test-booking-flow.js
else
    echo "⚠️  Test script not found, skipping tests"
fi

echo ""
echo "🎉 Pre-deployment checks completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Set up Convex: Run 'npx convex dev --once' then 'npx convex deploy'"
echo "2. Update NEXT_PUBLIC_CONVEX_URL with your Convex deployment URL"
echo "3. Run database migration: 'node scripts/migrate-services.js'"
echo "4. Deploy to hosting platform (Vercel/Netlify)"
echo "5. Set up domain and SSL certificates"
echo "6. Configure Calendly webhooks (if using)"
echo "7. Test the complete booking flow in production"
echo "8. Set up monitoring and alerts"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo "🔗 Useful links:"
echo "   - Convex: https://docs.convex.dev"
echo "   - Clerk: https://clerk.com/docs"
echo "   - Stripe: https://stripe.com/docs"
echo "   - Calendly API: https://developer.calendly.com"