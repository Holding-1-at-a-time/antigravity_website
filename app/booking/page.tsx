'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useConvex, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Car, CreditCard, CheckCircle } from 'lucide-react';

type BookingStep = 'services' | 'customer' | 'datetime' | 'payment' | 'confirmation';




export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const convex = useConvex();
  const { organization } = useOrganization();
  const [currentStep, setCurrentStep] = useState<BookingStep>('services');
  const [services, setServices] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
  });
  const [selectedDateTime, setSelectedDateTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');

  // Get organization from Convex using Clerk ID
  const convexOrg = useQuery(
    api.organizations.getOrganization,
    organization?.id ? { clerkId: organization.id } : 'skip'
  );

  const organizationId = convexOrg?._id;

  // Show loading if organization is not loaded yet
  if (organization?.id && !convexOrg) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
        <Header />
        <main className="flex-grow pt-32 pb-20">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="text-center text-white">Loading organization...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error if organization not found
  if (organization?.id && convexOrg === null) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
        <Header />
        <main className="flex-grow pt-32 pb-20">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="text-center text-red-400">
              Organization not found. Please contact support.
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Require organization to proceed
  if (!organizationId) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
        <Header />
        <main className="flex-grow pt-32 pb-20">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="text-center text-white">No organization selected.</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await convex.query(api.services.getServices, { organizationId });
        setServices(servicesData);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };
    if (organizationId) {
      fetchServices();
    }
  }, [convex, organizationId]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setCurrentStep('confirmation');
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        try {
          const response = await fetch(`/api/calendar?date=${selectedDate}&organizationId=${organizationId}`);
          const data = await response.json();
          setAvailableSlots(data.slots || []);
        } catch (error) {
          console.error('Failed to fetch slots:', error);
        }
      };
      fetchSlots();
    }
  }, [selectedDate, organizationId]);

  const steps = [
    { id: 'services', title: 'Select Services', icon: Car },
    { id: 'customer', title: 'Your Information', icon: User },
    { id: 'datetime', title: 'Date & Time', icon: Calendar },
    { id: 'payment', title: 'Payment', icon: CreditCard },
    { id: 'confirmation', title: 'Confirmation', icon: CheckCircle },
  ];

  const handleServiceSelect = (service: any) => {
    setSelectedServices(prev =>
      prev.find(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleNext = () => {
    const stepOrder: BookingStep[] = ['services', 'customer', 'datetime', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]!);
    }
  };

  const handleBack = () => {
    const stepOrder: BookingStep[] = ['services', 'customer', 'datetime', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]!);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError('');

    try {
      // Create customer first
      const customer = await convex.mutation(api.customers.createCustomer, {
        organizationId,
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        vehicleInfo: {
          make: customerInfo.vehicleMake,
          model: customerInfo.vehicleModel,
          year: parseInt(customerInfo.vehicleYear),
          color: customerInfo.vehicleColor,
        },
      });

      // Create booking
      const booking = await convex.mutation(api.bookings.createBooking, {
        organizationId,
        customerId: customer,
        services: selectedServices.map(s => ({
          serviceId: s._id,
          packageName: s.selectedPackage,
          addOns: s.selectedAddOns || [],
        })),
        scheduledAt: new Date(selectedDateTime).getTime(),
      });

      // Calculate deposit
      const total = selectedServices.reduce((sum, service) => {
        let price = service.basePrice;
        if (service.selectedPackage) {
          const pkg = service.packages.find((p: any) => p.name === service.selectedPackage);
          if (pkg) price = pkg.price;
        }
        if (service.selectedAddOns) {
          service.selectedAddOns.forEach((addOn: string) => {
            const add = service.addOns.find((a: any) => a.name === addOn);
            if (add) price += add.price;
          });
        }
        return sum + price;
      }, 0);
      const deposit = Math.round(total * 0.25);

      // Create checkout session
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: deposit,
          bookingId: booking,
          customerId: customer,
          successUrl: `${window.location.origin}/booking?success=true`,
          cancelUrl: `${window.location.origin}/booking?canceled=true`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        setPaymentError('Failed to create checkout session');
        setIsProcessing(false);
      }
    } catch (error) {
      setPaymentError('Booking creation failed');
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'services':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service._id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedServices.find(s => s._id === service._id)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-600 hover:border-primary/50'
                    }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{service.title}</h3>
                      <p className="text-sm text-gray-400">{service.duration} minutes</p>
                    </div>
                    <span className="text-primary font-bold">${service.basePrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'customer':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={customerInfo.vehicleMake}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, vehicleMake: e.target.value }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={customerInfo.vehicleModel}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, vehicleModel: e.target.value }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={customerInfo.vehicleYear}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, vehicleYear: e.target.value }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={customerInfo.vehicleColor}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, vehicleColor: e.target.value }))}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
            </div>
          </div>
        );

      case 'datetime':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Select Date & Time</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-gray-800 border-gray-600"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {availableSlots.length > 0 && (
                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {availableSlots.map((slot: any) => (
                      <button
                        key={slot.start}
                        className={`p-2 border rounded ${selectedDateTime === new Date(slot.start).toISOString().slice(0, 16)
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-600 hover:border-primary/50'
                          }`}
                        onClick={() => setSelectedDateTime(new Date(slot.start).toISOString().slice(0, 16))}
                      >
                        {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-400">
                Select a date to see available time slots.
              </p>
            </div>
          </div>
        );

      case 'payment':
        const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
        const deposit = Math.round(total * 0.25);

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Payment</h2>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Booking Summary</h3>
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between py-2">
                  <span>{service.title}</span>
                  <span>${service.price}</span>
                </div>
              ))}
              <div className="border-t border-gray-600 mt-4 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total: ${total}</span>
                </div>
                <div className="flex justify-between text-primary mt-2">
                  <span>Deposit Required: ${deposit}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> A ${deposit} deposit is required to secure your booking.
                The remaining balance will be collected at the time of service.
              </p>
            </div>

            <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? 'Creating Booking...' : `Proceed to Payment - $${deposit} Deposit`}
            </Button>
            {paymentError && (
              <p className="text-red-400 text-sm mt-2">{paymentError}</p>
            )}
          </div>
        );

      case 'confirmation':
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
            <p className="text-gray-300">
              Thank you for your booking. We'll send a confirmation email shortly.
            </p>
            <div className="bg-gray-800 p-6 rounded-lg text-left max-w-md mx-auto">
              <h3 className="font-semibold text-white mb-4">Booking Details</h3>
              <p><strong>Name:</strong> {customerInfo.name}</p>
              <p><strong>Email:</strong> {customerInfo.email}</p>
              <p><strong>Services:</strong> {selectedServices.map(s => s.title).join(', ')}</p>
              <p><strong>Date:</strong> {selectedDateTime || 'To be confirmed'}</p>
            </div>
            <Button onClick={() => router.push('/')}>
              Return to Home
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4 mx-auto max-w-4xl">
          <FadeIn>
            <h1 className="text-4xl font-bold text-white text-center mb-12">
              Book Your Service
            </h1>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStep;
                  const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                            ? 'border-primary text-primary'
                            : 'border-gray-600 text-gray-600'
                        }`}>
                        <Icon size={20} />
                      </div>
                      <span className={`ml-2 text-sm ${isActive ? 'text-primary' : 'text-gray-400'
                        }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className="w-12 h-px bg-gray-600 mx-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <GlassCard className="p-8">
              {renderStepContent()}

              {/* Navigation */}
              {currentStep !== 'confirmation' && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 'services'}
                  >
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    {currentStep === 'payment' ? 'Complete Booking' : 'Next'}
                  </Button>
                </div>
              )}
            </GlassCard>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}