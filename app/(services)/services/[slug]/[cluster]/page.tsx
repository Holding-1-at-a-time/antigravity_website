import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ALL_SERVICES, ServiceCluster } from '@/lib/services-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { generateBreadcrumbSchema, generateServiceClusterSchema } from '@/lib/schemas';

// Generate segments for all clusters
export async function generateStaticParams() {
    const params: { slug: string; cluster: string }[] = [];

    ALL_SERVICES.forEach(service => {
        service.clusters.forEach(cluster => {
            params.push({
                slug: service.slug,
                cluster: cluster.slug
            });
        });
    });

    return params;
}

// Metadata
// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string; cluster: string }> }): Promise<Metadata> {
    const { slug, cluster: clusterSlug } = await params;

    const service = ALL_SERVICES.find((s) => s.slug === slug);
    const cluster = service?.clusters.find((c) => c.slug === clusterSlug);

    if (!service || !cluster) return { title: 'Topic Not Found' };

    return {
        title: `${cluster.title} | ${service.title} San Antonio`,
        description: cluster.description,
    };
}

export default async function ServiceClusterPage({ params }: { params: Promise<{ slug: string; cluster: string }> }) {
    const { slug, cluster: clusterSlug } = await params;

    const service = ALL_SERVICES.find((s) => s.slug === slug);
    const cluster = service?.clusters.find((c) => c.slug === clusterSlug);

    if (!service || !cluster) {
        notFound();
    }

    // Generate schemas
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Services", url: "https://odaat1.com/services" },
        { name: service.title, url: `https://odaat1.com/services/${service.slug}` },
        { name: cluster.title, url: `https://odaat1.com/services/${service.slug}/${cluster.slug}` }
    ]);
    const clusterSchema = generateServiceClusterSchema(service.slug, cluster.slug);

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                {clusterSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clusterSchema) }} />}

                <div className="container px-4">
                    {/* Breadcrumbs */}
                    <FadeIn delay={0} className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                        <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                        <ChevronRight size={16} className="mx-2" />
                        <Link href={`/services/${service.slug}`} className="hover:text-primary transition-colors">{service.title}</Link>
                        <ChevronRight size={16} className="mx-2" />
                        <span className="text-white font-medium">{cluster.title}</span>
                    </FadeIn>

                    <div className="max-w-4xl mx-auto">
                        <FadeIn delay={0.1}>
                            <Link
                                href={`/services/${service.slug}`}
                                className="inline-flex items-center text-primary mb-8 hover:text-white transition-colors font-bold tracking-wide group"
                            >
                                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to {service.title} Guide
                            </Link>

                            <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                                {cluster.title}
                            </h1>

                            <GlassCard className="p-8 md:p-12 mb-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                                <article className="prose prose-invert prose-lg max-w-none relative z-10">
                                    <p className="lead text-xl text-gray-300 leading-relaxed font-light">
                                        Everything you need to know about <span className="text-white font-medium">{cluster.title.toLowerCase()}</span> in San Antonio.
                                        This is part of our comprehensive guide to <Link href={`/services/${service.slug}`} className="text-primary no-underline hover:underline">{service.title}</Link>.
                                    </p>

                                    <div className="bg-black/30 p-6 rounded-xl border border-white/10 my-10 not-prose shadow-inner">
                                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            Key Takeaways
                                        </h3>
                                        <p className="text-gray-400 text-base mb-4 leading-relaxed">{cluster.description}</p>
                                        {cluster.longTailKeywords.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {cluster.longTailKeywords.map(kw => (
                                                    <span key={kw} className="text-xs font-medium bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-400">#{kw}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6 text-gray-300">
                                        {cluster.wikiContent ? (
                                            <div className="bg-white/5 p-6 rounded-lg border-l-4 border-primary">
                                                <h3 className="text-white font-heading font-bold mb-2">Wiki Definition</h3>
                                                <p className="italic text-gray-300">"{cluster.wikiContent}"</p>
                                            </div>
                                        ) : (
                                            <p>
                                                Detailed content regarding {cluster.title} would go here. It would explain the nuances,
                                                process, and why it matters for your vehicle's longevity and aesthetics in the San Antonio climate.
                                            </p>
                                        )}

                                        <h3 className="text-white font-heading mt-8">Why this matters</h3>
                                        <p>
                                            Proper understanding of {cluster.title.toLowerCase()} ensures you make the best decision for your vehicle.
                                            Whether you are in Stone Oak or downtown, our valet service brings expertise to you.
                                        </p>
                                    </div>
                                </article>
                            </GlassCard>
                        </FadeIn>

                        {/* Links to Other Clusters */}
                        {service.clusters.length > 1 && (
                            <FadeIn delay={0.2} className="mt-16">
                                <h3 className="text-xl font-bold text-white mb-6 font-heading border-b border-white/10 pb-4">Explore More Topics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.clusters.filter(c => c.slug !== cluster.slug).map(c => (
                                        <Link
                                            key={c.slug}
                                            href={`/services/${service.slug}/${c.slug}`}
                                            className="block group"
                                        >
                                            <GlassCard className="p-6 hover:scale-[1.01] transition-transform h-full">
                                                <span className="text-primary font-bold block mb-2 group-hover:text-white transition-colors">{c.title}</span>
                                                <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                    Read article <ArrowLeft className="rotate-180" size={12} />
                                                </span>
                                            </GlassCard>
                                        </Link>
                                    ))}
                                </div>
                            </FadeIn>
                        )}

                        <FadeIn delay={0.3} className="mt-16 text-center">
                            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-white transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                                Book {service.title} Service
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
