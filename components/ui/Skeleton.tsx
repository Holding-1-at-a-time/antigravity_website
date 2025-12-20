'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    animate?: boolean;
}

export function Skeleton({ className, animate = true }: SkeletonProps) {
    return (
        <div
            className={cn(
                "bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 rounded-md",
                animate && "animate-pulse",
                className
            )}
        />
    );
}

export function ServiceCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
        >
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                {/* Image Section Skeleton */}
                <div className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary-light/10">
                        {/* Floating Particles Skeleton */}
                        <div className="absolute inset-0">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
                                    style={{
                                        left: `${20 + i * 30}%`,
                                        top: `${30 + i * 20}%`,
                                    }}
                                    animate={{
                                        opacity: [0.2, 0.5, 0.2],
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Icon and Title Skeleton */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Skeleton className="w-16 h-16 rounded-full mb-4" />
                            <div className="text-center">
                                <Skeleton className="h-6 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section Skeleton */}
                <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <Skeleton className="h-8 w-3/4 mb-2" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                    </div>

                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6 mb-6" />

                    {/* Features Preview Skeleton */}
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                    </div>

                    {/* CTA Skeleton */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-24" />
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="w-4 h-4 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function TestimonialSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500"
        >
            {/* Quote Icon */}
            <Skeleton className="w-12 h-12 rounded-full mb-6" />

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-5 h-5 rounded-full" />
                ))}
            </div>

            {/* Testimonial Text */}
            <div className="space-y-3 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-3/6" />
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </motion.div>
    );
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 text-center rounded-2xl hover:bg-white/10 transition-all duration-300">
                        <Skeleton className="w-8 h-8 mx-auto mb-3 rounded-full" />
                        <Skeleton className="h-8 w-16 mx-auto mb-1" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background Skeleton */}
            <Skeleton className="absolute inset-0" />

            <div className="container relative z-10 text-center px-4">
                {/* Badge Skeleton */}
                <Skeleton className="w-64 h-12 rounded-full mx-auto mb-6" />

                {/* Title Skeleton */}
                <div className="space-y-4 mb-8">
                    <Skeleton className="h-16 md:h-24 w-full max-w-4xl mx-auto" />
                    <Skeleton className="h-16 md:h-24 w-3/4 max-w-3xl mx-auto" />
                </div>

                {/* Subtitle Skeleton */}
                <Skeleton className="h-6 w-96 max-w-2xl mx-auto mb-10" />

                {/* Buttons Skeleton */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <Skeleton className="w-48 h-14 rounded-full" />
                    <Skeleton className="w-48 h-14 rounded-full" />
                </div>

                {/* Trusted By Skeleton */}
                <div className="border-t border-white/5 pt-8">
                    <Skeleton className="h-4 w-48 mx-auto mb-6" />
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-6 w-24" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}