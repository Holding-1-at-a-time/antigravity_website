'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
    className?: string;
    duration?: number;
    once?: boolean;
    threshold?: number;
    stagger?: boolean;
    staggerDelay?: number;
}

export const FadeIn = ({
    children,
    delay = 0,
    direction = 'up',
    className,
    duration = 0.7,
    once = true,
    threshold = 0.1,
    stagger = false,
    staggerDelay = 0.1
}: FadeInProps) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else if (!once) {
            controls.start("hidden");
        }
    }, [controls, isInView, once]);

    const directions = {
        up: { y: 60, x: 0, scale: 1, rotate: 0 },
        down: { y: -60, x: 0, scale: 1, rotate: 0 },
        left: { x: 60, y: 0, scale: 1, rotate: 0 },
        right: { x: -60, y: 0, scale: 1, rotate: 0 },
        scale: { x: 0, y: 0, scale: 0.8, rotate: 0 },
        rotate: { x: 0, y: 0, scale: 1, rotate: 10 },
    };

    const variants = {
        hidden: {
            opacity: 0,
            ...directions[direction],
            transition: { duration: 0.3 }
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98] as const,
                staggerChildren: stagger ? staggerDelay : 0,
            }
        }
    };

    if (stagger && Array.isArray(children)) {
        return (
            <motion.div
                ref={ref}
                className={className}
                initial="hidden"
                animate={controls}
                variants={variants}
            >
                {children.map((child, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { delay: index * staggerDelay }
                            }
                        }}
                    >
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};
