import { ALL_SERVICES } from './services-data';
import { FAQ_DATA } from './faq-data';

// Base business information
const BUSINESS_INFO = {
  name: "One Detail At A Time LLC",
  url: "https://odaat1.com",
  logo: "https://odaat1.com/images/logo.png",
  description: "Professional auto detailing services in San Antonio. Certified Ceramic Coating, Paint Correction, & Valet Services. Serving Stone Oak, Alamo Heights & more.",
  foundingDate: "2019",
  telephone: "(726) 207-1007",
  email: "rromerojr1@gmail.com",
  address: {
    streetAddress: "11692 Bricken Circle",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    postalCode: "78233",
    addressCountry: "US"
  },
  geo: {
    latitude: 29.6199,
    longitude: -98.4738
  },
  openingHours: "Mo-Sa 08:00-18:00",
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "San Antonio" },
    { "@type": "Neighborhood", name: "Stone Oak" },
    { "@type": "Neighborhood", name: "Alamo Heights" }
  ]
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": BUSINESS_INFO.name,
  "url": BUSINESS_INFO.url,
  "description": BUSINESS_INFO.description,
  "publisher": {
    "@type": "Organization",
    "name": BUSINESS_INFO.name
  },
  "potentialAction": {
    "@type": "ContactAction",
    "target": `${BUSINESS_INFO.url}/contact`,
    "description": "Contact us for auto detailing services"
  }
};

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": BUSINESS_INFO.name,
  "url": BUSINESS_INFO.url,
  "logo": BUSINESS_INFO.logo,
  "foundingDate": BUSINESS_INFO.foundingDate,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": BUSINESS_INFO.telephone,
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://facebook.com/odaat1",
    "https://instagram.com/odaat1"
  ]
};

// Enhanced LocalBusiness Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BUSINESS_INFO.url}/#localbusiness`,
  "name": BUSINESS_INFO.name,
  "image": BUSINESS_INFO.logo,
  "description": BUSINESS_INFO.description,
  "url": BUSINESS_INFO.url,
  "telephone": BUSINESS_INFO.telephone,
  "email": BUSINESS_INFO.email,
  "address": {
    "@type": "PostalAddress",
    ...BUSINESS_INFO.address
  },
  "geo": {
    "@type": "GeoCoordinates",
    ...BUSINESS_INFO.geo
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": BUSINESS_INFO.priceRange,
  "areaServed": BUSINESS_INFO.areaServed,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Auto Detailing Services",
    "itemListElement": ALL_SERVICES.slice(0, 5).map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.title,
        "description": service.shortDescription
      }
    }))
  }
};

// About Page Schema
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About One Detail At A Time",
  "description": "Founded in 2019, One Detail At A Time was born from a simple belief: every vehicle deserves showroom-quality care.",
  "mainEntity": {
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.url}/#localbusiness`,
    "name": BUSINESS_INFO.name,
    "foundingDate": BUSINESS_INFO.foundingDate,
    "description": "Premier auto detailing destination in San Antonio specializing in ceramic coatings and paint correction.",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IDA Certified Detailer"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Ceramic Pro Certified Installer"
      }
    ]
  }
};

// Contact Page Schema
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact One Detail At A Time",
  "description": "Get in touch with One Detail At A Time for professional auto detailing services in San Antonio.",
  "mainEntity": {
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.url}/#localbusiness`,
    "name": BUSINESS_INFO.name,
    "address": {
      "@type": "PostalAddress",
      ...BUSINESS_INFO.address
    },
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "openingHours": BUSINESS_INFO.openingHours
  }
};

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// Service Schema Generator
export const generateServiceSchema = (serviceSlug: string) => {
  const service = ALL_SERVICES.find(s => s.slug === serviceSlug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.fullDescription,
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}/#localbusiness`
    },
    "serviceType": "Auto Detailing",
    "areaServed": BUSINESS_INFO.areaServed,
    "offers": {
      "@type": "Offer",
      "priceRange": BUSINESS_INFO.priceRange
    }
  };
};

// Service Cluster Schema Generator
export const generateServiceClusterSchema = (serviceSlug: string, clusterSlug: string) => {
  const service = ALL_SERVICES.find(s => s.slug === serviceSlug);
  if (!service) return null;

  const cluster = service.clusters.find(c => c.slug === clusterSlug);
  if (!cluster) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": cluster.title,
    "description": cluster.description,
    "mainEntity": {
      "@type": "Service",
      "name": service.title,
      "description": service.fullDescription
    },
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS_INFO.name
    }
  };
};

// FAQ Page Schema
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Frequently Asked Questions - One Detail At A Time",
  "description": "Comprehensive FAQ covering auto detailing services, business information, pricing, and processes in San Antonio.",
  "mainEntity": FAQ_DATA.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  })),
  "publisher": {
    "@type": "Organization",
    "name": BUSINESS_INFO.name
  }
};