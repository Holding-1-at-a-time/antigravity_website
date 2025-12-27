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
  openingHours: "Tu-Su 07:00-22:00",
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "San Antonio" },
    { "@type": "Place", name: "Stone Oak" },
    { "@type": "Place", name: "Alamo Heights" }
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
    "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "07:00",
    "closes": "22:00"
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
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "28",
    "bestRating": "5",
    "worstRating": "1",
    "url": "https://maps.app.goo.gl/3rRGzaQPwc3X7RweA"
  },
  "accountablePerson": {
    "@type": "Person",
    "name": "Robert Romero Jr",
    "jobTitle": "CEO/Owner/Founder/Professional Detailer",
    "affiliation": {
      "@type": "Organization",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.url
    },
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Chief Executive Officer"
      },
      {
        "@type": "Occupation",
        "name": "Business Owner"
      },
      {
        "@type": "Occupation",
        "name": "Founder"
      },
      {
        "@type": "Occupation",
        "name": "Professional Auto Detailer"
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.url,
      "address": {
        "@type": "PostalAddress",
        ...BUSINESS_INFO.address
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": BUSINESS_INFO.telephone,
      "email": BUSINESS_INFO.email,
      "contactType": "business"
    }
  },
  "accessModeSufficient": ["textual", "visual"],
  "sourceOrganization": {
    "@type": "Organization",
    "name": BUSINESS_INFO.name,
    "url": BUSINESS_INFO.url
  },
  "mainEntityOfPage": {
    "@type": "ItemList",
    "name": "Business Values",
    "description": "Core values that guide One Detail At A Time's commitment to excellence",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Excellence",
        "description": "Uncompromising commitment to quality in every service"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Integrity",
        "description": "Transparent pricing, honest recommendations, and fully insured services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Community",
        "description": "Proud supporters of Junior Achievement of South Texas"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Service",
        "description": "Customer-first approach with convenient valet options"
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
      "availability": "https://schema.org/InStock"
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