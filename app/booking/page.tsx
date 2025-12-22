'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
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
  const [currentStep, setCurrentStep] = useState<BookingStep>('services');
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
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');

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
    if (!clientSecret) {
      setPaymentError('Payment not initialized');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // Create payment intent when entering payment step
      const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
      const deposit = Math.round(total * 0.25);

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: deposit,
          bookingId: 'temp-booking-id', // This would be the actual booking ID
          customerId: 'temp-customer-id', // This would be the actual customer ID
        }),
      });

      const data = await response.json();
      if (data.success) {
        setClientSecret(data.clientSecret);
        // Here you would confirm the payment with Stripe
        // For now, just simulate success
        setTimeout(() => {
          setCurrentStep('confirmation');
          setIsProcessing(false);
        }, 2000);
      } else {
        setPaymentError('Failed to initialize payment');
        setIsProcessing(false);
      }
    } catch (error) {
      setPaymentError('Payment processing failed');
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'services':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Services</h2>
            {/* Mock services - in real app, fetch from Convex */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 1, title: 'Full Detail', price: 150, duration: '3 hours' },
                { id: 2, title: 'Interior Clean', price: 80, duration: '1.5 hours' },
                { id: 3, title: 'Ceramic Coating', price: 300, duration: '4 hours' },
              ].map((service) => (
                <div
                  key={service.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedServices.find(s => s.id === service.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-600 hover:border-primary/50'
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{service.title}</h3>
                      <p className="text-sm text-gray-400">{service.duration}</p>
                    </div>
                    <span className="text-primary font-bold">${service.price}</span>
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
                <Label htmlFor="datetime">Preferred Date & Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={selectedDateTime}
                  onChange={(e) => setSelectedDateTime(e.target.value)}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <p className="text-sm text-gray-400">
                We'll confirm the exact time slot based on availability.
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

            {/* Stripe Payment Form */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div id="stripe-payment-element" className="mb-4">
                {/* Stripe Elements will be mounted here */}
              </div>
              <Button className="w-full" onClick={handlePayment}>
                {isProcessing ? 'Processing...' : `Pay Deposit $${deposit}`}
              </Button>
              {paymentError && (
                <p className="text-red-400 text-sm mt-2">{paymentError}</p>
              )}
            </div>
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
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'border-primary text-primary'
                          : 'border-gray-600 text-gray-600'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <span className={`ml-2 text-sm ${
                        isActive ? 'text-primary' : 'text-gray-400'
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