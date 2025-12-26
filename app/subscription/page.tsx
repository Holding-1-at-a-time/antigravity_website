"use client";

import { useState } from "react";
import { SubscriptionTiers } from "@/components/SubscriptionTiers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Crown, Sparkles } from "lucide-react";

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    // In a real app, this would redirect to checkout or login
    console.log(`Selected tier: ${tierId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Maintenance Club
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Join Our Maintenance Club
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Keep your vehicle in perfect condition with our comprehensive maintenance subscription.
            Choose the plan that fits your needs and enjoy priority service, exclusive discounts, and peace of mind.
          </p>
        </div>

        {/* Subscription Tiers */}
        <SubscriptionTiers onSelectTier={handleSelectTier} />

        {/* Benefits Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Maintenance Club?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Star className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Priority Service</CardTitle>
                <CardDescription>
                  Skip the wait and get faster booking slots with our premium and VIP plans.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Crown className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>Exclusive Discounts</CardTitle>
                <CardDescription>
                  Save on deep detail services with VIP membership and enjoy special pricing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>Dedicated Support</CardTitle>
                <CardDescription>
                  Get personalized attention and quarterly complimentary services with VIP.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What services qualify for VIP discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  VIP members receive 10% off deep detail services including ceramic coating, paint correction, and interior restoration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I cancel my subscription?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can cancel anytime from your account dashboard. You'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a setup fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No setup fees! You only pay the monthly subscription price. All plans include our standard booking process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription>
                Join thousands of satisfied customers who trust us with their vehicle maintenance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full md:w-auto">
                Choose Your Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}