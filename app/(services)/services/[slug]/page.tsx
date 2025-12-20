import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { ALL_SERVICES } from '@/lib/services-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schemas';

// Generate segments for all 15 services (SSG)
export async function generateStaticParams() {
    return ALL_SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

// Dynamic SEO Metadata
// Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = ALL_SERVICES.find((s) => s.slug === slug);
    if (!service) return { title: 'Service Not Found' };

    return {
        title: `${service.title} San Antonio | One Detail At A Time`,
        description: service.shortDescription,
        openGraph: {
            title: `${service.title} - Professional Auto Detailing San Antonio`,
            description: service.fullDescription,
        }
    };
}

export default async function ServicePillarPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = ALL_SERVICES.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    // Generate schemas
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Services", url: "https://odaat1.com/services" },
        { name: service.title, url: `https://odaat1.com/services/${service.slug}` }
    ]);
    const serviceSchema = generateServiceSchema(service.slug);

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                {/* Inject Schemas */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

                <div className="container px-4">
                    {/* Breadcrumbs */}
                    <FadeIn delay={0} className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                        <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                        <ChevronRight size={16} className="mx-2" />
                        <span className="text-white font-medium">{service.title}</span>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <FadeIn delay={0.1}>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-heading">
                                    {service.title} <span className="text-primary">San Antonio</span>
                                </h1>

                                {/* Hero Image */}
                                <GlassCard className="w-full aspect-video rounded-2xl mb-12 flex items-center justify-center overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
                                    <Image
                                        src={`/images/services/${service.slug}-hero.jpg`}
                                        alt={`${service.title} mobile auto detailing San Antonio TX - Professional ceramic coating, paint correction, and interior detailing services for luxury vehicles in Stone Oak, Alamo Heights, and surrounding areas`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </GlassCard>

                                <div className="prose prose-invert max-w-none mb-16 text-gray-300 leading-relaxed">
                                    <p className="text-lg mb-8">
                                        {service.fullDescription} We provide top-tier {service.title.toLowerCase()} services
                                        for residents in Stone Oak, Alamo Heights, and across San Antonio. Our valet service
                                        makes it easy to get showroom results without leaving your home.
                                    </p>

                                    <h2 className="text-2xl font-bold text-white mt-8 mb-6 font-heading border-l-4 border-primary pl-4">Why Choose Us?</h2>
                                    <ul className="space-y-4 my-6">
                                        <li className="flex items-center gap-3 text-gray-300">
                                            <div className="bg-primary/20 p-1 rounded-full"><CheckCircle className="text-primary" size={16} /></div>
                                            <span>IDA Certified Professionals</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-300">
                                            <div className="bg-primary/20 p-1 rounded-full"><CheckCircle className="text-primary" size={16} /></div>
                                            <span>Premium Products & Techniques</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-300">
                                            <div className="bg-primary/20 p-1 rounded-full"><CheckCircle className="text-primary" size={16} /></div>
                                            <span>Satisfaction Guaranteed</span>
                                        </li>
                                    </ul>
                                </div>
                            </FadeIn>

                            {/* Topic Clusters Section */}
                            {service.clusters.length > 0 && (
                                <FadeIn delay={0.2}>
                                    <GlassCard className="p-8 md:p-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="h-8 w-1 bg-primary rounded-full" />
                                            <h2 className="text-2xl font-bold text-white font-heading">Related {service.title} Topics</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {service.clusters.map((cluster, idx) => (
                                                <Link
                                                    key={cluster.slug}
                                                    href={`/services/${service.slug}/${cluster.slug}`}
                                                    className="block group"
                                                >
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 h-full">
                                                        <h3 className="font-bold text-white group-hover:text-primary transition-colors mb-2 flex items-center justify-between">
                                                            {cluster.title}
                                                            <ArrowLeft className="rotate-135 text-primary/0 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" size={16} />
                                                        </h3>
                                                        <p className="text-sm text-gray-400 line-clamp-2">{cluster.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </GlassCard>
                                </FadeIn>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Booking CTA */}
                            <FadeIn delay={0.3} direction="left">
                                <div className="sticky top-32">
                                    <GlassCard className="p-8 border-primary/30 shadow-[0_0_50px_-20px_rgba(0,174,152,0.15)]">
                                        <h3 className="text-2xl font-bold text-white mb-4 font-heading">Ready to Book?</h3>
                                        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                            Schedule your {service.title.toLowerCase()} appointment today. We offer convenient valet pickup at your home or office.
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="block w-full text-center bg-primary text-black font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 mb-4"
                                        >
                                            Book Now
                                        </Link>
                                        <div className="text-center">
                                            <a href="tel:+17262071007" className="text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-gray-500 pb-0.5">
                                                Or call (726) 207-1007
                                            </a>
                                        </div>
                                    </GlassCard>

                                    {/* Other Services */}
                                    <GlassCard className="mt-8 p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Other Services</h3>
                                        <ul className="space-y-3">
                                            {ALL_SERVICES.filter(s => s.slug !== service.slug).slice(0, 5).map(s => (
                                                <li key={s.slug}>
                                                    <Link href={`/services/${s.slug}`} className="text-gray-400 hover:text-primary transition-colors text-sm py-1 flex items-center gap-2 group">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
                                                        {s.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </GlassCard>
                                </div>
                            </FadeIn>
                        </aside>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
