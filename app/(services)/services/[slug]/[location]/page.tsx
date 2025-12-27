import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, ChevronRight, MapPin, Clock, Phone } from 'lucide-react';
import { ALL_SERVICES } from '@/lib/services-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schemas';

// San Antonio neighborhoods and areas we serve
const SERVICE_AREAS = {
  'stone-oak': {
    name: 'Stone Oak',
    description: 'Luxury homes and high-end vehicles in the prestigious Stone Oak neighborhood',
    zipCodes: ['78258', '78260'],
    landmarks: 'The Shops at La Cantera, Stone Oak Park'
  },
  'alamo-heights': {
    name: 'Alamo Heights',
    description: 'Historic homes and executive vehicles in the charming Alamo Heights district',
    zipCodes: ['78209'],
    landmarks: 'Alamo Heights City Hall, Fort Sam Houston'
  },
  'san-antonio': {
    name: 'San Antonio',
    description: 'Complete San Antonio metro area coverage for all your auto detailing needs',
    zipCodes: ['78201', '78202', '78203', '78204', '78205', '78207', '78208', '78209', '78210', '78211', '78212', '78213', '78214', '78215', '78216', '78217', '78218', '78219', '78220', '78221', '78222', '78223', '78224', '78225', '78226', '78227', '78228', '78229', '78230', '78231', '78232', '78233', '78234', '78235', '78236', '78237', '78238', '78239', '78240', '78241', '78242', '78243', '78244', '78245', '78246', '78247', '78248', '78249', '78250', '78251', '78252', '78253', '78254', '78255', '78256', '78257', '78258', '78259', '78260', '78261', '78263', '78264', '78265', '78266'],
    landmarks: 'The Alamo, River Walk, SeaWorld, Lackland AFB'
  }
};

// Generate static params for location-specific services
export async function generateStaticParams() {
  const params = [];
  for (const service of ALL_SERVICES) {
    for (const location of Object.keys(SERVICE_AREAS)) {
      params.push({
        slug: service.slug,
        location: location
      });
    }
  }
  return params;
}

// Dynamic SEO Metadata for location-specific services
export async function generateMetadata({ params }: { params: Promise<{ slug: string; location: string }> }): Promise<Metadata> {
  const { slug, location } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);
  const area = SERVICE_AREAS[location as keyof typeof SERVICE_AREAS];

  if (!service || !area) return { title: 'Service Not Found' };

  const locationName = area.name;
  const title = `${service.title} ${locationName} | One Detail At A Time`;
  const description = `${service.title} services in ${locationName}, San Antonio. Professional auto detailing with mobile valet service. ${service.shortDescription}`;

  return {
    title,
    description,
    keywords: [
      `${service.title.toLowerCase()} ${locationName.toLowerCase()}`,
      `auto detailing ${locationName.toLowerCase()}`,
      `car detailing ${locationName.toLowerCase()} san antonio`,
      'mobile auto detailing',
      'valet car wash',
      'professional ceramic coating'
    ],
    openGraph: {
      title: `${service.title} in ${locationName} - Professional Auto Detailing`,
      description,
      url: `https://odaat1.com/services/${service.slug}/${location}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://odaat1.com/services/${service.slug}/${location}`,
    },
  };
}

export default async function LocationServicePage({ params }: { params: Promise<{ slug: string; location: string }> }) {
  const { slug, location } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);
  const area = SERVICE_AREAS[location as keyof typeof SERVICE_AREAS];

  if (!service || !area) {
    notFound();
  }

  // Generate enhanced schemas with location data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Services", url: "https://odaat1.com/services" },
    { name: service.title, url: `https://odaat1.com/services/${service.slug}` },
    { name: `${service.title} ${area.name}`, url: `https://odaat1.com/services/${service.slug}/${location}` }
  ]);

  const locationServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} ${area.name}`,
    "description": `${service.title} services in ${area.name}, San Antonio. ${service.fullDescription}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "One Detail At A Time LLC",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": area.name,
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "City",
        "name": "San Antonio",
        "addressRegion": "TX"
      }
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 29.6199,
        "longitude": -98.4738
      },
      "geoRadius": 50000
    },
    "serviceType": service.title,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="flex-grow pt-32 pb-20">
        {/* Inject Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationServiceSchema) }} />

        <div className="container px-4">
          {/* Breadcrumbs */}
          <FadeIn delay={0} className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link href={`/services/${service.slug}`} className="hover:text-primary transition-colors">{service.title}</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white font-medium">{area.name}</span>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-primary" size={24} />
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
                      {service.title} <span className="text-primary">{area.name}</span>
                    </h1>
                    <p className="text-gray-400 mt-2">Professional auto detailing services in {area.name}, San Antonio</p>
                  </div>
                </div>

                {/* Location Hero */}
                <GlassCard className="w-full aspect-video rounded-2xl mb-12 flex items-center justify-center overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative z-10 text-center text-white">
                    <MapPin size={48} className="text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Serving {area.name}</h2>
                    <p className="text-gray-300">{area.description}</p>
                  </div>
                  <Image
                    src={`/images/services/${service.slug}-hero.jpg`}
                    alt={`${service.title} in ${area.name} - Professional mobile auto detailing San Antonio`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-20"
                  />
                </GlassCard>

                <div className="prose prose-invert max-w-none mb-16 text-gray-300 leading-relaxed">
                  <p className="text-lg mb-8">
                    {service.fullDescription} We bring our professional {service.title.toLowerCase()} services directly to {area.name},
                    serving the {area.landmarks} area and surrounding neighborhoods. Our mobile valet service makes it convenient
                    to get showroom-quality results without leaving your home or office.
                  </p>

                  <h2 className="text-2xl font-bold text-white mt-8 mb-6 font-heading border-l-4 border-primary pl-4">
                    {area.name} Service Area
                  </h2>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={18} className="text-primary" />
                      <span className="font-semibold text-white">Service Coverage</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.zipCodes.slice(0, 8).map(zip => (
                        <span key={zip} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                          {zip}
                        </span>
                      ))}
                      {area.zipCodes.length > 8 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{area.zipCodes.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mt-8 mb-6 font-heading border-l-4 border-primary pl-4">
                    Why Choose Our {area.name} Service?
                  </h2>
                  <ul className="space-y-4 my-6">
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="bg-primary/20 p-1 rounded-full"><CheckCircle className="text-primary" size={16} /></div>
                      <span>Mobile valet service - we come to you in {area.name}</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="bg-primary/20 p-1 rounded-full"><CheckCircle className="text-primary" size={16} /></div>
                      <span>IDA Certified professionals with local expertise</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="bg-primary/20 p-1 rounded-full"><CheckCircle className="text-primary" size={16} /></div>
                      <span>Same-day service available throughout San Antonio</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="bg-primary/20 p-1 rounded-full"><CheckCircle className="text-primary" size={16} /></div>
                      <span>Premium products designed for Texas climate</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              {/* Related Articles for this location */}
              <FadeIn delay={0.2}>
                <GlassCard className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-bold text-white font-heading">Learn More About {service.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href={`/articles/protection/what-is-ceramic-coating`} className="block group">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 h-full">
                        <h3 className="font-bold text-white group-hover:text-primary transition-colors mb-2">
                          What is Ceramic Coating?
                        </h3>
                        <p className="text-sm text-gray-400">Complete guide to ceramic coating technology and benefits</p>
                      </div>
                    </Link>
                    <Link href={`/articles/correction/paint-correction-what-is-it`} className="block group">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 h-full">
                        <h3 className="font-bold text-white group-hover:text-primary transition-colors mb-2">
                          Paint Correction Guide
                        </h3>
                        <p className="text-sm text-gray-400">Professional paint correction services explained</p>
                      </div>
                    </Link>
                  </div>
                </GlassCard>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <FadeIn delay={0.3} direction="left">
                <div className="sticky top-32">
                  {/* Location-Specific Booking CTA */}
                  <GlassCard className="p-8 border-primary/30 shadow-[0_0_50px_-20px_rgba(0,174,152,0.15)]">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="text-primary" size={20} />
                      <h3 className="text-2xl font-bold text-white font-heading">Book in {area.name}</h3>
                    </div>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                      Schedule your {service.title.toLowerCase()} appointment in {area.name}. Mobile valet service available throughout San Antonio.
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-primary text-black font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 mb-4"
                    >
                      Book {area.name} Service
                    </Link>
                    <div className="text-center space-y-2">
                      <a href="tel:+17262071007" className="block text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-gray-500 pb-0.5">
                        📞 Call (726) 207-1007
                      </a>
                      <p className="text-xs text-gray-500">Same-day service available</p>
                    </div>
                  </GlassCard>

                  {/* Service Areas */}
                  <GlassCard className="mt-8 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Service Areas</h3>
                    <div className="space-y-3">
                      {Object.entries(SERVICE_AREAS).map(([key, areaInfo]) => (
                        <Link
                          key={key}
                          href={`/services/${service.slug}/${key}`}
                          className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                            key === location
                              ? 'bg-primary/20 text-primary font-semibold'
                              : 'text-gray-400 hover:text-primary hover:bg-white/5'
                          }`}
                        >
                          {areaInfo.name}
                        </Link>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Other Services in this area */}
                  <GlassCard className="mt-8 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Other Services in {area.name}</h3>
                    <ul className="space-y-3">
                      {ALL_SERVICES.filter(s => s.slug !== service.slug).slice(0, 4).map(s => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}/${location}`}
                            className="text-gray-400 hover:text-primary transition-colors text-sm py-1 flex items-center gap-2 group"
                          >
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