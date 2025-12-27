'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/ui/HeroSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { STATIC_REVIEWS } from '@/lib/reviews-data';
import { Star, Shield, Award, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const stats = [
    { value: '6+', label: 'Years Experience', icon: Award },
    { value: '5.0', label: '5 Star Google Review Since 2019', icon: Star },
    { value: 'IDA', label: 'Certified Detailer', icon: Shield },
    { value: '100%', label: 'Satisfaction', icon: CheckCircle2 },
  ];

  const services = [
    {
      title: 'Ceramic Coating',
      description: 'Long-term protection and gloss enhancement for up to 5 years.',
      link: '/services/ceramic-coating'
    },
    {
      title: 'Paint Correction',
      description: 'Remove swirls, scratches, and oxidation to restore brilliance.',
      link: '/services/paint-correction'
    },
    {
      title: 'Interior Detailing',
      description: 'Deep cleaning, conditioning, and sanitization of all surfaces.',
      link: '/services/interior-deep-cleansing'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="flex-grow">
        <HeroSection />

        {/* Stats Section */}
        <section className="relative z-20 -mt-10 pb-20 px-4">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <FadeIn key={index} delay={0.2 * index} direction="up">
                  <GlassCard className="p-6 text-center h-full flex flex-col items-center justify-center group hover:bg-white/10">
                    <stat.icon className="w-8 h-8 text-primary mb-3 opacity-80 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-heading">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Services Teaser */}
        <section className="py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="container relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto px-4">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">Our Premium Services</h2>
                <p className="text-gray-400 text-lg">
                  Comprehensive auto care solutions tailored to your vehicle's specific needs,
                  from maintenance washes to museum-quality restoration.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {services.map((service, index) => (
                <FadeIn key={index} delay={0.2 * index}>
                  <Link href={service.link} className="block h-full">
                    <GlassCard className="h-full group p-8 flex flex-col justify-between hover:bg-white/10 transition-colors">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center text-sm font-semibold text-primary gap-2 group-hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight size={16} />
                      </div>
                    </GlassCard>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4} className="text-center mt-16">
              <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all hover:border-primary/50">
                View All Services
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
