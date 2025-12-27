import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import ContactForm from './ContactForm';
import { contactPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
    title: 'Contact Us | One Detail At A Time',
    description: 'Get in touch with One Detail At A Time. Located at 11692 Bricken Circle, San Antonio, TX. Call (726) 207-1007.',
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            <Header />

            <main className="flex-grow pt-32 pb-20 bg-[#0a0a0a]">
                <div className="container px-4">
                    <FadeIn className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">Get In Touch</h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            We'd love to hear from you. Reach out for quotes, questions, or booking inquiries.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Info */}
                        <FadeIn delay={0.2} className="space-y-8">
                            <GlassCard className="p-8">
                                <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Contact Information</h2>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4 group">
                                        <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">Location</h3>
                                            <p className="text-gray-400 leading-relaxed">11692 Bricken Circle<br />San Antonio, TX 78233</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">Phone</h3>
                                            <a href="tel:+17262071007" className="text-gray-400 hover:text-primary transition-colors text-lg font-medium block">(726) 207-1007</a>
                                            <div className="flex flex-col gap-1 mt-2">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Tue-Sun: 7am - 10pm</p>
                                                <p className="text-xs text-red-400/80 uppercase tracking-wider">Mon: Closed</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">Email</h3>
                                            <a href="mailto:rromerojr1@gmail.com" className="text-gray-400 hover:text-primary transition-colors">rromerojr1@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* Google Map */}
                            <GlassCard className="relative overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1735.510682438983!2d-98.3608387306064!3d29.544872112531685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c5924a5906631%3A0xee3fca2a37a14f63!2sOne%20Detail%20At%20A%20Time%20LLC!5e0!3m2!1sen!2sus!4v1766193641276!5m2!1sen!2sus"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-lg"
                                />
                            </GlassCard>
                        </FadeIn>

                        {/* Contact Form */}
                        <FadeIn delay={0.4}>
                            <ContactForm />
                        </FadeIn>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
