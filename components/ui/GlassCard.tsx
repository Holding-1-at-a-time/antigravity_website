'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import Spotlight from './Spotlight';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    spotlight?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = true, spotlight = true }: GlassCardProps) => {
    return (
        <motion.div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl group",
                "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
                hoverEffect && "hover:border-primary/50 hover:bg-white/10 transition-colors duration-300",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Glossy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {spotlight && <Spotlight />}

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
