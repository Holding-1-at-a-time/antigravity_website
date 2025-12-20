'use client';

import Link from 'next/link';
import { ALL_SERVICES } from '@/lib/services-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Palette,
    Wrench,
    Car,
    Shield,
    Droplets,
    Lightbulb,
    Cog,
    Star,
    ArrowRight,
    CheckCircle
} from 'lucide-react';

// Service icons mapping
const serviceIcons: Record<string, any> = {
    'auto-detailing': Car,
    'ceramic-coating': Shield,
    'paint-correction': Palette,
    'interior-deep-cleansing': Droplets,
    'exterior-hand-wash': Sparkles,
    'headlight-restoration': Lightbulb,
    'engine-detailing': Cog,
    'wheel-tire-detailing': Wrench,
    'scratch-removal': Palette,
    'odor-elimination': Sparkles,
    'leather-conditioning': Shield,
    'pet-hair-removal': Sparkles,
    'water-spot-removal': Droplets,
    'glass-treatment': Lightbulb,
    'chrome-polishing': Star,
};

export default function ServicesIndex() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="container px-4 relative z-10">
                    <FadeIn className="text-center mb-20 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary font-semibold text-sm tracking-wider uppercase">
                                Professional Auto Detailing Services
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-7xl font-bold text-white mb-8 font-heading leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Auto Care</span>
                            <br />Services
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            From basic maintenance to museum-quality restoration, we deliver exceptional results
                            that protect and enhance your vehicle's beauty and value.
                        </motion.p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ALL_SERVICES.map((service, index) => {
                            const IconComponent = serviceIcons[service.slug] || Car;

                            return (
                                <FadeIn key={service.slug} delay={index * 0.1}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ y: -8 }}
                                        className="h-full"
                                    >
                                        <Link href={`/services/${service.slug}`} className="block h-full group">
                                            <GlassCard className="h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 border border-white/5 hover:border-primary/30">
                                                {/* Enhanced Image Section */}
                                                <div className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
                                                    {/* Animated Background */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary-light/10"
                                                        initial={{ opacity: 0.3 }}
                                                        whileHover={{ opacity: 0.8 }}
                                                        transition={{ duration: 0.3 }}
                                                    />

                                                    {/* Floating Particles */}
                                                    <div className="absolute inset-0">
                                                        {[...Array(3)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                                                                style={{
                                                                    left: `${20 + i * 30}%`,
                                                                    top: `${30 + i * 20}%`,
                                                                }}
                                                                animate={{
                                                                    y: [0, -10, 0],
                                                                    opacity: [0.3, 0.8, 0.3],
                                                                }}
                                                                transition={{
                                                                    duration: 2 + i * 0.5,
                                                                    repeat: Infinity,
                                                                    delay: i * 0.3,
                                                                }}
                                                            />
                                                        ))}
                                                    </div>

                                                    {/* Icon and Title */}
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                        <motion.div
                                                            className="mb-4 p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30"
                                                            whileHover={{
                                                                scale: 1.1,
                                                                rotate: [0, -5, 5, 0],
                                                            }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <IconComponent size={32} className="text-primary" />
                                                        </motion.div>

                                                        <motion.div
                                                            className="text-center"
                                                            initial={{ opacity: 0.7 }}
                                                            whileHover={{ opacity: 1 }}
                                                        >
                                                            <h3 className="text-white font-bold text-lg tracking-wider uppercase font-heading">
                                                                {service.title.split(' ')[0]}
                                                            </h3>
                                                            <p className="text-gray-400 text-sm mt-1">
                                                                Professional Service
                                                            </p>
                                                        </motion.div>
                                                    </div>

                                                    {/* Hover Overlay */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        initial={false}
                                                    />
                                                </div>

                                                {/* Content Section */}
                                                <div className="p-8">
                                                    <motion.div
                                                        className="flex items-start justify-between mb-4"
                                                        initial={{ opacity: 0.8 }}
                                                        whileHover={{ opacity: 1 }}
                                                    >
                                                        <div className="flex-1">
                                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300 font-heading leading-tight">
                                                                {service.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                                                <CheckCircle size={16} />
                                                                <span>IDA Certified</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    <p className="text-gray-400 text-base mb-6 leading-relaxed line-clamp-3">
                                                        {service.shortDescription}
                                                    </p>

                                                    {/* Features Preview */}
                                                    <div className="mb-6">
                                                        <div className="flex flex-wrap gap-2">
                                                            {service.clusters.slice(0, 2).map((cluster, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                                                                >
                                                                    {cluster.title}
                                                                </span>
                                                            ))}
                                                            {service.clusters.length > 2 && (
                                                                <span className="text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                                                                    +{service.clusters.length - 2} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* CTA */}
                                                    <motion.div
                                                        className="flex items-center justify-between"
                                                        whileHover={{ x: 5 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        <span className="text-primary font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                                                            Explore Service
                                                            <ArrowRight size={16} className="group-hover:scale-110 transition-transform" />
                                                        </span>
                                                        <motion.div
                                                            className="flex items-center gap-1 text-yellow-400"
                                                            whileHover={{ scale: 1.1 }}
                                                        >
                                                            <Star size={14} fill="currentColor" />
                                                            <Star size={14} fill="currentColor" />
                                                            <Star size={14} fill="currentColor" />
                                                            <Star size={14} fill="currentColor" />
                                                            <Star size={14} fill="currentColor" />
                                                        </motion.div>
                                                    </motion.div>
                                                </div>

                                                {/* Animated Border */}
                                                <motion.div
                                                    className="absolute inset-0 border-2 border-primary/0 rounded-lg pointer-events-none"
                                                    whileHover={{ borderColor: "rgba(0,174,152,0.3)" }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </GlassCard>
                                        </Link>
                                    </motion.div>
                                </FadeIn>
                            );
                        })}
                    </div>

                    {/* Bottom CTA Section */}
                    <FadeIn delay={0.8} className="text-center mt-20">
                        <motion.div
                            className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl border border-primary/20"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                                Ready to Transform Your Vehicle?
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Book your professional detailing service today and experience the difference
                                that quality craftsmanship makes.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-black font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                >
                                    <Sparkles size={20} />
                                    Schedule Your Service
                                    <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </FadeIn>
                </div>
            </main>

            <Footer />
        </div>
    );
}
