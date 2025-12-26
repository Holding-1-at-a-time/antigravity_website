"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SubscriptionManager } from "@/components/SubscriptionManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionManagePage() {
  const router = useRouter();

  // This would need to be replaced with actual user authentication
  // For now, assuming we have a customerId from auth
  const customerId = "placeholder-customer-id"; // Replace with actual auth

  const customerWithSubscription = useQuery(
    api.customers.getCustomerWithSubscription,
    customerId ? { customerId } : "skip"
  );

  const updateSubscription = useMutation(api.subscriptions.updateSubscriptionStatus);
  const cancelSubscription = useMutation(api.subscriptions.cancelSubscription);

  const handleUpgrade = async (tierId: string) => {
    // Redirect to checkout with new tier
    router.push(`/subscription/checkout?tier=${tierId}`);
  };

  const handleCancel = async () => {
    if (!customerWithSubscription?.subscription) return;

    try {
      await cancelSubscription({
        subscriptionId: customerWithSubscription.subscription._id,
        cancelAtPeriodEnd: true,
      });
      // Refresh the page or show success message
      window.location.reload();
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    }
  };

  if (!customerId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              Please sign in to manage your subscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/auth/signin")} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (customerWithSubscription === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
            <p className="text-muted-foreground">
              Manage your Maintenance Club subscription and billing preferences.
            </p>
          </div>

          <SubscriptionManager
            subscription={customerWithSubscription?.subscription || null}
            onUpgrade={handleUpgrade}
            onCancel={handleCancel}
            loading={false}
          />

          {/* Account Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your customer details and vehicle information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm text-muted-foreground">
                    {customerWithSubscription?.name || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">
                    {customerWithSubscription?.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground">
                    {customerWithSubscription?.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Vehicle</label>
                  <p className="text-sm text-muted-foreground">
                    {customerWithSubscription?.vehicleInfo
                      ? `${customerWithSubscription.vehicleInfo.year} ${customerWithSubscription.vehicleInfo.make} ${customerWithSubscription.vehicleInfo.model}`
                      : "Not provided"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your past payments and invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Billing history will be available once you have an active subscription.</p>
                <p className="text-sm mt-2">
                  All billing is handled securely through Stripe.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}