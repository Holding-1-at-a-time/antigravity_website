'use client';

import { useState } from 'react';
import { User, Mail as MailIcon, Phone as PhoneIcon, MapPin as MapPinIcon, Car, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    service: string;
    vehicleYear: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleColor: string;
    message: string;
    confirmData: boolean;
}

interface FormErrors {
    [key: string]: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        service: '',
        vehicleYear: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleColor: '',
        message: '',
        confirmData: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [showVehicleFields, setShowVehicleFields] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.service) newErrors.service = 'Please select a service';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        if (!formData.confirmData) newErrors.confirmData = 'Please confirm data sharing';

        // Vehicle validation only if service requires it
        if (showVehicleFields) {
            if (!formData.vehicleYear.trim()) newErrors.vehicleYear = 'Vehicle year is required';
            if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Vehicle make is required';
            if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }

        // Show vehicle fields for detailing services
        if (field === 'service') {
            const detailingServices = ['Auto Detailing', 'Ceramic Coating', 'Paint Correction', 'Interior Deep Cleansing', 'Wheel & Tire Detailing'];
            setShowVehicleFields(detailingServices.includes(value as string));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }

            // Reset form after success
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                service: '',
                vehicleYear: '',
                vehicleMake: '',
                vehicleModel: '',
                vehicleColor: '',
                message: '',
                confirmData: false,
            });
            setShowVehicleFields(false);

        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <GlassCard className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/20 p-3 rounded-xl">
                    <Send className="text-primary" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                    <p className="text-gray-400 text-sm">We'll get back to you within 24 hours</p>
                </div>
            </div>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-green-400">Message sent successfully! We'll contact you soon.</span>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                    <AlertCircle className="text-red-500" size={20} />
                    <span className="text-red-400">Failed to send message. Please try again.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <User size={16} />
                            First Name *
                        </label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full bg-black/40 border rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                                errors.firstName ? 'border-red-500' : 'border-white/10'
                            }`}
                            placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <User size={16} />
                            Last Name *
                        </label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full bg-black/40 border rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                                errors.lastName ? 'border-red-500' : 'border-white/10'
                            }`}
                            placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
                    </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <MailIcon size={16} />
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full bg-black/40 border rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                                errors.email ? 'border-red-500' : 'border-white/10'
                            }`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <PhoneIcon size={16} />
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full bg-black/40 border rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                                errors.phone ? 'border-red-500' : 'border-white/10'
                            }`}
                            placeholder="(123) 456-7890"
                        />
                        {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                        <MapPinIcon size={16} />
                        Home Address
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                        placeholder="123 Main St, San Antonio, TX 78201"
                    />
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Service *</label>
                    <select
                        value={formData.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                        className={`w-full bg-black/40 border rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all appearance-none cursor-pointer ${
                            errors.service ? 'border-red-500' : 'border-white/10'
                        }`}
                    >
                        <option value="">Select a service</option>
                        <option>Auto Detailing</option>
                        <option>Ceramic Coating</option>
                        <option>Paint Correction</option>
                        <option>Interior Deep Cleansing</option>
                        <option>Exterior Hand Wash</option>
                        <option>Headlight Restoration</option>
                        <option>Engine Detailing</option>
                        <option>Wheel & Tire Detailing</option>
                        <option>Scratch Removal</option>
                        <option>Odor Elimination</option>
                        <option>Leather Conditioning</option>
                        <option>Pet Hair Removal</option>
                        <option>Water Spot Removal</option>
                        <option>Glass Treatment</option>
                        <option>Chrome Polishing</option>
                        <option>Other</option>
                    </select>
                    {errors.service && <p className="text-red-400 text-xs">{errors.service}</p>}
                </div>

                {/* Vehicle Information - Conditional */}
                {showVehicleFields && (
                    <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <Car size={18} className="text-primary" />
                            <label className="text-sm font-medium text-gray-400">Vehicle Information</label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Year *</label>
                                <input
                                    type="text"
                                    value={formData.vehicleYear}
                                    onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                                    className={`w-full bg-black/40 border rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                                        errors.vehicleYear ? 'border-red-500' : 'border-white/10'
                                    }`}
                                    placeholder="2020"
                                />
                                {errors.vehicleYear && <p className="text-red-400 text-xs">{errors.vehicleYear}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Make *</label>
                                <input
                                    type="text"
                                    value={formData.vehicleMake}
                                    onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                                    className={`w-full bg-black/40 border rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                                        errors.vehicleMake ? 'border-red-500' : 'border-white/10'
                                    }`}
                                    placeholder="Toyota"
                                />
                                {errors.vehicleMake && <p className="text-red-400 text-xs">{errors.vehicleMake}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Model *</label>
                                <input
                                    type="text"
                                    value={formData.vehicleModel}
                                    onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                                    className={`w-full bg-black/40 border rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                                        errors.vehicleModel ? 'border-red-500' : 'border-white/10'
                                    }`}
                                    placeholder="Camry"
                                />
                                {errors.vehicleModel && <p className="text-red-400 text-xs">{errors.vehicleModel}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Color</label>
                                <input
                                    type="text"
                                    value={formData.vehicleColor}
                                    onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                                    placeholder="Black"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Message */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Message *</label>
                    <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full bg-black/40 border rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none ${
                            errors.message ? 'border-red-500' : 'border-white/10'
                        }`}
                        placeholder="Tell us about your vehicle and what services you're interested in..."
                    />
                    {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
                </div>

                {/* Confirmation */}
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <input
                        type="checkbox"
                        id="confirm-data"
                        checked={formData.confirmData}
                        onChange={(e) => handleInputChange('confirmData', e.target.checked)}
                        className="mt-1 bg-black/40 border border-white/10 rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    />
                    <div className="flex-1">
                        <label htmlFor="confirm-data" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                            I confirm that I am providing this information voluntarily and understand it will be used to provide detailing services and communicate about my vehicle. *
                        </label>
                        {errors.confirmData && <p className="text-red-400 text-xs mt-1">{errors.confirmData}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,174,152,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </GlassCard>
    );
}