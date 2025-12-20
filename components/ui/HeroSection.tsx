'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { Sparkles, Star, ChevronDown } from 'lucide-react';

export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<Array<{ left: string; top: string; duration: number; delay: number }>>([]);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -200]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Generate particle positions on client-side only to avoid hydration mismatch
        const newParticles = [...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <motion.div className="absolute inset-0 z-0" style={{ y }}>
                <Image
                    src="/images/hero-bg.png"
                    alt="Professional auto detailing services in San Antonio featuring ceramic coating, paint correction, and luxury vehicle care for premium results"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Dynamic Gradient Overlays */}
                <div className="absolute inset-0 bg-black/50" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-black/40"
                    animate={{
                        background: [
                            "linear-gradient(to top, #0a0a0a, rgba(0,0,0,0.2), rgba(0,0,0,0.4))",
                            "linear-gradient(to top, #0a0a0a, rgba(0,174,152,0.1), rgba(0,0,0,0.3))",
                            "linear-gradient(to top, #0a0a0a, rgba(0,0,0,0.2), rgba(0,0,0,0.4))"
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-5 pointer-events-none">
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                            left: particle.left,
                            top: particle.top,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </div>

            {/* Mouse Follower */}
            <motion.div
                className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none z-5"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="container relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block mb-6"
                >
                    <span className="px-6 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-sm font-semibold text-primary tracking-wider uppercase shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-2">
                        <Sparkles size={16} />
                        San Antonio's Premier Auto Detailing
                        <Sparkles size={16} />
                    </span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight font-heading"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
                >
                    The Art of <br className="hidden md:block" />
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-white relative"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            backgroundSize: "200% 200%",
                        }}
                    >
                        Vehicle Perfection
                        <motion.div
                            className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-lg blur-xl -z-10"
                            animate={{
                                opacity: [0.5, 0.8, 0.5],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.span>
                </motion.h1>

                <FadeIn delay={0.6} className="max-w-2xl mx-auto mb-10">
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 leading-relaxed"
                        animate={{
                            textShadow: [
                                "0 0 0px rgba(255,255,255,0)",
                                "0 0 10px rgba(255,255,255,0.3)",
                                "0 0 0px rgba(255,255,255,0)"
                            ]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        IDA Certified application of ceramic coatings, paint correction, and premium detailing.
                        We bring the showroom shine to your doorstep or our exclusive studio.
                    </motion.p>
                </FadeIn>

                <FadeIn delay={0.8} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/contact" className="group relative px-10 py-5 bg-gradient-to-r from-primary to-primary-light text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(0,174,152,0.6)] hover:shadow-primary/40">
                            <motion.span
                                className="relative z-10 flex items-center gap-3"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                Book Appointment
                                <Star size={20} className="group-hover:rotate-12 transition-transform" />
                            </motion.span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={false}
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/services" className="group px-10 py-5 rounded-full border-2 border-white/30 hover:border-primary/70 text-white font-semibold transition-all hover:bg-primary/10 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(0,174,152,0.3)]">
                            <motion.span
                                className="flex items-center gap-2"
                                whileHover={{ x: 3 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                Explore Services
                                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                            </motion.span>
                        </Link>
                    </motion.div>
                </FadeIn>

                <FadeIn delay={1.0} className="mt-16 pt-8 border-t border-white/10">
                    <motion.p
                        className="text-sm text-gray-400 mb-6 uppercase tracking-widest font-medium"
                        animate={{
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        Trusted by Luxury Owners In
                    </motion.p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {["STONE OAK", "ALAMO HEIGHTS", "DOMINION", "CORDILERA RANCH"].map((location, index) => (
                            <motion.span
                                key={location}
                                className="text-gray-300 font-heading font-bold opacity-70 hover:opacity-100 hover:text-primary transition-all cursor-default"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 0.7, y: 0 }}
                                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                                whileHover={{
                                    scale: 1.1,
                                    textShadow: "0 0 8px rgba(0,174,152,0.5)",
                                }}
                            >
                                {location}
                            </motion.span>
                        ))}
                    </div>
                </FadeIn>
            </div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
            >
                <motion.span
                    className="text-xs uppercase tracking-widest"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Scroll to Explore
                </motion.span>
                <motion.div
                    className="relative w-[2px] h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"
                    animate={{
                        height: ["0%", "100%", "0%"],
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <motion.div
                        className="absolute top-0 left-0 w-full h-4 bg-primary rounded-full"
                        animate={{
                            y: [0, 48, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
