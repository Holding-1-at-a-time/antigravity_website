'use client';

import Image from 'next/image';
import { Award, Heart, ShieldCheck, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FadeIn } from '@/components/ui/FadeIn';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Header />

            <main className="flex-grow pt-24 pb-20">
                {/* Hero Section */}
                <section className="relative py-20 min-h-[60vh] flex items-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/images/about-hero.jpg"
                            alt="IDA certified auto detailer working on luxury vehicle in San Antonio detailing studio with professional equipment and ceramic coating products"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                    <div className="container px-4 text-center relative z-10">
                        <FadeIn>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
                                Passion Meets <span className="text-primary">Perfection</span>
                            </h1>
                            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Founded in 2019, One Detail At A Time was born from a simple belief:
                                every vehicle deserves showroom-quality care. What started as a mobile service
                                has grown into San Antonio's premier detailing destination.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* Values Grid */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container px-4 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: Award,
                                    title: "Excellence",
                                    desc: "Uncompromising commitment to quality in every service, from basic washes to ceramic coatings."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Integrity",
                                    desc: "Transparent pricing, honest recommendations, and fully insured services for your peace of mind."
                                },
                                {
                                    icon: Users,
                                    title: "Community",
                                    desc: "Proud supporters of Junior Achievement of South Texas, investing in the next generation."
                                },
                                {
                                    icon: Heart,
                                    title: "Service",
                                    desc: "Customer-first approach with convenient valet options and flexible scheduling."
                                }
                            ].map((item, idx) => (
                                <FadeIn key={idx} delay={idx * 0.1}>
                                    <GlassCard className="p-8 h-full hover:scale-[1.02] transition-transform">
                                        <item.icon className="text-primary mb-6" size={40} />
                                        <h3 className="text-xl font-bold text-white mb-3 font-heading">{item.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </GlassCard>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team / Certifications */}
                <section className="py-20">
                    <div className="container px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <FadeIn direction="right">
                                <GlassCard className="aspect-video flex items-center justify-center p-0 overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                                        <Image
                                            src="/images/detailer-at-work.jpg"
                                            alt="IDA certified auto detailer applying ceramic coating to luxury vehicle in San Antonio professional detailing studio"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </GlassCard>
                            </FadeIn>

                            <FadeIn direction="left">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">IDA Certified Expertise</h2>
                                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                                    Our team holds certifications from the International Detailing Association (IDA),
                                    ensuring we use the latest techniques and safest products for your vehicle.
                                    We continuously train to stay ahead of industry standards.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Certified Detailer (CD)",
                                        "Skills Validated (SV)",
                                        "RUPES Advanced Training",
                                        "Ceramic Pro Certified Installer"
                                    ].map((cert, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </FadeIn>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
