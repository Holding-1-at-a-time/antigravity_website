'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, Star, Calendar, CheckCircle2, Award, Clock } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
        { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' },
        { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
    ];

    const quickLinks = [
        { href: '/services', label: 'Services' },
        { href: '/articles', label: 'Articles' },
        { href: '/about', label: 'About Us' },
        { href: '/reviews', label: 'Reviews' },
        { href: '/contact', label: 'Contact' },
    ];

    const serviceAreas = [
        'Stone Oak', 'Alamo Heights', 'Downtown San Antonio',
        'Medical Center', 'Dominion', 'Cordillera Ranch'
    ];

    return (
        <footer className="relative bg-gradient-to-t from-black via-[#0a0a0a] to-[#0a0a0a] border-t border-white/10 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 pt-20 pb-12">
                <div className="container px-4">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                        {/* Brand Section */}
                        <FadeIn className="space-y-6">
                            <div>
                                <motion.h3
                                    className="text-3xl font-bold text-white font-heading mb-4"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    ODAAT
                                </motion.h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Professional auto detailing in San Antonio. IDA Certified. Delivering showroom results to your doorstep.
                                </p>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                        <Award size={14} className="text-primary" />
                                        <span className="text-xs text-primary font-medium">IDA Certified</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                                        <Star size={14} className="text-yellow-400" />
                                        <span className="text-xs text-yellow-400 font-medium">5.0 Rating</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 font-heading">Follow Us</h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            className={`group p-3 bg-white/5 rounded-xl border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-primary/20`}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: [0, -5, 5, 0],
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            aria-label={social.label}
                                        >
                                            <social.icon size={20} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Quick Links */}
                        <FadeIn delay={0.1}>
                            <h4 className="text-white font-bold mb-6 font-heading">Quick Links</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="group flex items-center gap-3 text-gray-400 hover:text-primary transition-all duration-300 py-2"
                                        >
                                            <motion.div
                                                className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                initial={false}
                                            />
                                            <span className="group-hover:translate-x-2 transition-transform duration-300">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>

                        {/* Service Areas */}
                        <FadeIn delay={0.2}>
                            <h4 className="text-white font-bold mb-6 font-heading">Service Areas</h4>
                            <ul className="space-y-3">
                                {serviceAreas.map((area, index) => (
                                    <motion.li
                                        key={area}
                                        className="flex items-center gap-3 text-gray-400 py-1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                    >
                                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                                        <span className="text-sm">{area}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>

                        {/* Contact Info */}
                        <FadeIn delay={0.3}>
                            <h4 className="text-white font-bold mb-6 font-heading">Get In Touch</h4>
                            <ul className="space-y-4">
                                <motion.li
                                    className="flex items-start gap-3 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Clock size={18} className="text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                    <div className="text-gray-400 text-sm">
                                        <p className="group-hover:text-white transition-colors">Tue-Sun: 7:00 AM - 10:00 PM</p>
                                        <p className="text-red-400/80 text-xs mt-0.5">Monday: Closed</p>
                                    </div>
                                </motion.li>

                                <motion.li
                                    className="flex items-start gap-3 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <MapPin size={18} className="text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                    <div className="text-gray-400 text-sm">
                                        <p className="group-hover:text-white transition-colors">11692 Bricken Circle</p>
                                        <p className="group-hover:text-white transition-colors">San Antonio, TX 78233</p>
                                    </div>
                                </motion.li>

                                <motion.li
                                    className="flex items-center gap-3 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Phone size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                                    <a
                                        href="tel:+17262071007"
                                        className="text-gray-400 hover:text-white transition-colors font-medium"
                                    >
                                        (726) 207-1007
                                    </a>
                                </motion.li>

                                <motion.li
                                    className="flex items-center gap-3 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Mail size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                                    <a
                                        href="mailto:rromerojr1@gmail.com"
                                        className="text-gray-400 hover:text-white transition-colors break-all text-sm"
                                    >
                                        rromerojr1@gmail.com
                                    </a>
                                </motion.li>

                                {/* CTA Button */}
                                <motion.div
                                    className="pt-4"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/contact"
                                        className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-black font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                    >
                                        <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
                                        <span>Book Appointment</span>
                                    </Link>
                                </motion.div>
                            </ul>
                        </FadeIn>
                    </div>

                    {/* Newsletter/CTA Section */}
                    <FadeIn delay={0.4} className="mb-12">
                        <motion.div
                            className="bg-gradient-to-r from-primary/10 to-primary-light/10 border border-primary/20 rounded-2xl p-8 text-center"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                                Ready for Showroom Shine?
                            </h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Join hundreds of satisfied customers who trust us with their vehicles.
                                Professional detailing that exceeds expectations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-black font-bold rounded-xl hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                                    >
                                        <Star size={18} />
                                        Get Your Quote
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/services"
                                        className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
                                    >
                                        View Services
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </FadeIn>

                    {/* Bottom Section */}
                    <div className="border-t border-white/10 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <motion.p
                                className="text-gray-500 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                &copy; {currentYear} One Detail At A Time LLC. All rights reserved.
                            </motion.p>

                            <motion.div
                                className="flex items-center gap-6 text-sm text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                                <span className="text-primary">✨ Made with passion</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
