"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Tier {
  _id: string;
  name: string;
  price: number;
  benefits: string;
  maintenanceWashes: number;
  discountPercentage: number;
  _creationTime: number;
}

interface SubscriptionTiersProps {
  currentTier?: string;
  onSelectTier?: (tierId: string) => void;
  showSelectButtons?: boolean;
}

export function SubscriptionTiers({
  currentTier,
  onSelectTier,
  showSelectButtons = true
}: SubscriptionTiersProps) {
  const tiers = useQuery(api.subscriptions.listTiers) as Tier[] | undefined;

  if (!tiers) {
    return <div>Loading subscription options...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier._id}
          className={`relative ${tier.name === "Premium" ? 'border-primary shadow-lg' : ''} ${
            currentTier === tier._id ? 'ring-2 ring-primary' : ''
          }`}
        >
          {tier.name === "Premium" && (
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              Most Popular
            </Badge>
          )}
          {currentTier === tier._id && (
            <Badge variant="secondary" className="absolute -top-2 right-4">
              Current Plan
            </Badge>
          )}

          <CardHeader>
            <CardTitle className="text-2xl">{tier.name}</CardTitle>
            <CardDescription>{tier.benefits}</CardDescription>
            <div className="text-3xl font-bold">
              ${(tier.price / 100).toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{tier.maintenanceWashes} maintenance washes per month</span>
              </li>
              {tier.discountPercentage > 0 && (
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{tier.discountPercentage}% discount on deep detail services</span>
                </li>
              )}
            </ul>
          </CardContent>

          {showSelectButtons && (
            <CardFooter>
              <Button
                className="w-full"
                variant={tier.name === "Premium" ? "default" : "outline"}
                onClick={() => onSelectTier?.(tier._id)}
                disabled={currentTier === tier._id}
              >
                {currentTier === tier._id ? "Current Plan" : `Select ${tier.name}`}
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}