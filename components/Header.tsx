'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Phone, MapPin, Star, Search, ChevronDown, Facebook, Instagram, Twitter, HelpCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ALL_SERVICES } from '@/lib/services-data';

export default function Header() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('/');
    const [showSearch, setShowSearch] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { scrollY, scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                setShowSearch(false);
                setShowContact(false);
            }
            if (e.key === '/' && e.ctrlKey) {
                e.preventDefault();
                setShowSearch(true);
            }
            if (e.key === 'm' && e.ctrlKey) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Track active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['/', '/services', '/about', '/reviews', '/contact'];
            const current = sections.find(section => {
                if (section === '/') return window.scrollY < 100;
                const element = document.querySelector(`[href="${section}"]`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home', icon: Star },
        { href: '/services', label: 'Services', icon: Calendar },
        { href: '/articles', label: 'Articles', icon: BookOpen },
        { href: '/about', label: 'About', icon: MapPin },
        { href: '/reviews', label: 'Reviews', icon: Star },
        { href: '/faq', label: 'FAQ', icon: HelpCircle },
        { href: '/contact', label: 'Contact', icon: Phone },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2,
                staggerChildren: 0.05,
                staggerDirection: -1,
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <>
            {/* Promotional Banner - Hide on home page */}
            {!isHomePage && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: scrolled ? 0 : 40 }}
                    className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary/90 to-primary-light/90 backdrop-blur-sm z-40 overflow-hidden"
                >
                    <div className="container h-full flex items-center justify-center text-black text-sm font-medium">
                        <motion.div
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="whitespace-nowrap"
                        >
                            🎉 Special Offer: Free Ceramic Coating Consultation • 📞 Call (726) 207-1007 • ⭐ 5-Star Rated Service in San Antonio
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Scroll Progress Bar - Hide on home page */}
            {!isHomePage && (
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light z-50 origin-left"
                    style={{ scaleX, y: scrolled ? 0 : 40 }}
                />
            )}

            {/* Header - Hide on home page */}
            {!isHomePage && (
                <motion.header
                    style={{ y: scrolled ? 0 : 40 }}
                    className={cn(
                        "fixed w-full top-0 z-50 transition-all duration-500 border-b overflow-hidden",
                        scrolled
                            ? "bg-[#0a0a0a]/90 backdrop-blur-2xl border-white/20 h-20 shadow-2xl shadow-black/50"
                            : "bg-transparent h-24 border-transparent"
                    )}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                                style={{
                                    left: `${10 + i * 12}%`,
                                    top: `${20 + (i % 3) * 30}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                    <div className="container h-full flex items-center justify-between px-4">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/" className="relative flex items-center group">
                                <motion.div
                                    whileHover={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src="/images/logo.png"
                                        alt="One Detail At A Time"
                                        width={scrolled ? 140 : 170}
                                        height={45}
                                        className="object-contain transition-all duration-500 drop-shadow-lg"
                                        priority
                                    />
                                </motion.div>
                                <motion.div
                                    className="absolute -inset-2 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"
                                    initial={false}
                                />
                            </Link>
                        </motion.div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full group",
                                            activeSection === link.href
                                                ? "text-primary bg-primary/10"
                                                : "text-gray-300 hover:text-primary hover:bg-white/5"
                                        )}
                                    >
                                        <span className="flex items-center gap-2">
                                            <link.icon size={14} className="group-hover:scale-110 transition-transform" />
                                            {link.label}
                                        </span>
                                        {activeSection === link.href && (
                                            <motion.div
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                                                layoutId="activeIndicator"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <motion.div
                                            className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                        />
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="ml-4"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 0 30px rgba(0,174,152,0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/contact"
                                        className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-black font-bold rounded-full text-sm overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                    >
                                        <motion.div
                                            animate={{
                                                rotate: [0, 10, -10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <Calendar size={16} />
                                        </motion.div>
                                        <span>Book Now</span>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                                            initial={false}
                                        />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </nav>

                        {/* Desktop Quick Actions */}
                        <div className="hidden md:flex items-center gap-2">
                            {/* Search Button */}
                            <motion.button
                                onClick={() => setShowSearch(!showSearch)}
                                className="relative p-2 text-white hover:text-primary transition-colors duration-300 rounded-full hover:bg-white/5"
                                aria-label="Search services"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Search size={18} />
                            </motion.button>

                            {/* Contact Dropdown */}
                            <div className="relative">
                                <motion.button
                                    onClick={() => setShowContact(!showContact)}
                                    className="relative p-2 text-white hover:text-primary transition-colors duration-300 rounded-full hover:bg-white/5"
                                    aria-label="Quick contact"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Phone size={18} />
                                    <ChevronDown size={12} className="ml-1" />
                                </motion.button>

                                <AnimatePresence>
                                    {showContact && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/20 rounded-xl p-4 shadow-2xl"
                                        >
                                            <div className="space-y-3">
                                                <a
                                                    href="tel:+17262071007"
                                                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    <Phone size={16} className="text-primary" />
                                                    <div>
                                                        <p className="text-xs text-gray-400">Call Now</p>
                                                        <p className="text-white font-semibold">(726) 207-1007</p>
                                                    </div>
                                                </a>
                                                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                    <MapPin size={16} className="text-primary" />
                                                    <div>
                                                        <p className="text-xs text-gray-400">Location</p>
                                                        <p className="text-white text-sm">11692 Bricken Circle, San Antonio</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 pt-2 border-t border-white/10">
                                                    <motion.a
                                                        href="https://facebook.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Facebook size={16} />
                                                    </motion.a>
                                                    <motion.a
                                                        href="https://instagram.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Instagram size={16} />
                                                    </motion.a>
                                                    <motion.a
                                                        href="https://twitter.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Twitter size={16} />
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden relative p-3 text-white hover:text-primary transition-colors duration-300 rounded-full hover:bg-white/5"
                            aria-label="Toggle menu"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 bg-primary/20 rounded-full opacity-0"
                                animate={{ scale: isOpen ? 1.2 : 0, opacity: isOpen ? 0.3 : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={menuVariants}
                                className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-white/20 overflow-hidden shadow-2xl"
                            >
                                <div className="container px-6 py-8">
                                    <motion.div
                                        variants={itemVariants}
                                        className="mb-8"
                                    >
                                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                            <Phone size={20} className="text-primary" />
                                            <div>
                                                <p className="text-sm text-gray-400">Call us now</p>
                                                <p className="text-white font-semibold">(726) 207-1007</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="space-y-2">
                                        {navLinks.map((link, index) => (
                                            <motion.div
                                                key={link.href}
                                                variants={itemVariants}
                                                custom={index}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="group flex items-center gap-4 p-4 text-lg font-medium text-white/90 hover:text-primary hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10"
                                                >
                                                    <motion.div
                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        <link.icon size={20} />
                                                    </motion.div>
                                                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                                                        {link.label}
                                                    </span>
                                                    <motion.div
                                                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                                                        initial={{ x: -10 }}
                                                        whileHover={{ x: 0 }}
                                                    >
                                                        →
                                                    </motion.div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.div
                                        variants={itemVariants}
                                        className="mt-8 pt-6 border-t border-white/10"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Link
                                                href="/contact"
                                                onClick={() => setIsOpen(false)}
                                                className="group flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-primary to-primary-light text-black font-bold rounded-2xl shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                            >
                                                <motion.div
                                                    animate={{
                                                        rotate: [0, 10, -10, 0],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <Calendar size={20} />
                                                </motion.div>
                                                <span>Book Your Appointment</span>
                                                <motion.div
                                                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                                                    initial={false}
                                                />
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.header>
            )}
            {/* Search Overlay */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-start justify-center pt-32"
                        onClick={() => setShowSearch(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search services..."
                                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                                {ALL_SERVICES
                                    .filter(service =>
                                        searchQuery === '' ||
                                        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .slice(0, 6)
                                    .map((service, index) => (
                                        <motion.div
                                            key={service.slug}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                                            onClick={() => {
                                                setShowSearch(false);
                                                setSearchQuery('');
                                                // Navigate to service page
                                                window.location.href = `/services/${service.slug}`;
                                            }}
                                        >
                                            <p className="text-white font-medium">{service.title}</p>
                                            <p className="text-gray-400 text-sm">{service.shortDescription}</p>
                                        </motion.div>
                                    ))}
                                {ALL_SERVICES.filter(service =>
                                    searchQuery === '' ||
                                    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
                                ).length === 0 && searchQuery && (
                                        <p className="text-gray-400 text-center py-4">No services found</p>
                                    )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
