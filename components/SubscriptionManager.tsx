"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Crown, Star, X } from "lucide-react";
import { SubscriptionTiers } from "./SubscriptionTiers";

interface Subscription {
  _id: string;
  tier: "basic" | "premium" | "vip";
  status: "active" | "cancelled" | "past_due" | "incomplete";
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId: string;
}

interface SubscriptionManagerProps {
  subscription: Subscription | null;
  onUpgrade?: (tierId: string) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const tierConfig = {
  basic: {
    name: "Basic",
    icon: Star,
    color: "text-blue-500",
  },
  premium: {
    name: "Premium",
    icon: Crown,
    color: "text-purple-500",
  },
  vip: {
    name: "VIP",
    icon: Crown,
    color: "text-yellow-500",
  },
};

export function SubscriptionManager({
  subscription,
  onUpgrade,
  onCancel,
  loading = false
}: SubscriptionManagerProps) {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>
            Join our Maintenance Club to get exclusive benefits and priority service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubscriptionTiers onSelectTier={onUpgrade} />
        </CardContent>
      </Card>
    );
  }

  const tierInfo = tierConfig[subscription.tier];
  const Icon = tierInfo.icon;
  const isActive = subscription.status === "active";
  const isCancelling = subscription.cancelAtPeriodEnd;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${tierInfo.color}`} />
              <div>
                <CardTitle className="flex items-center gap-2">
                  {tierInfo.name} Plan
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {subscription.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Your Maintenance Club membership
                </CardDescription>
              </div>
            </div>
            {isCancelling && (
              <Badge variant="destructive">Cancelling at period end</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Current Period</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">Managed by Stripe</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowUpgradeDialog(true)}
              disabled={loading}
            >
              Change Plan
            </Button>

            {isActive && !isCancelling && (
              <Button
                variant="destructive"
                disabled={loading}
                onClick={() => {
                  if (window.confirm(
                    `Are you sure you want to cancel your ${tierInfo.name} subscription? You'll continue to have access until ${formatDate(subscription.currentPeriodEnd)}.`
                  )) {
                    onCancel?.();
                  }
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel Subscription
              </Button>
            )}

            {isCancelling && (
              <Button variant="outline" disabled>
                Subscription ending {formatDate(subscription.currentPeriodEnd)}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {showUpgradeDialog && (
        <Card>
          <CardHeader>
            <CardTitle>Change Your Plan</CardTitle>
            <CardDescription>
              Select a new plan. Changes will be prorated and applied to your next billing cycle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionTiers
              currentTier={subscription.tier}
              onSelectTier={(tierId) => {
                onUpgrade?.(tierId);
                setShowUpgradeDialog(false);
              }}
            />
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}