import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import ConvexClientProvider from './ConvexClientProvider';
import { websiteSchema, organizationSchema, localBusinessSchema } from '@/lib/schemas';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: {
    template: '%s | One Detail At A Time San Antonio',
    default: 'Auto Detailing San Antonio | One Detail At A Time',
  },
  description: 'Pro Auto Detailing in San Antonio. Certified Ceramic Coating, Paint Correction, & Valet Services. Serving Stone Oak, Alamo Heights & more.',
  metadataBase: new URL('https://odaat1.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'One Detail At A Time',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const BUSINESS_NAP = {
  name: "One Detail At A Time LLC",
  address: "11692 Bricken Circle, San Antonio, TX 78233",
  phone: "(726) 207-1007",
  email: "rromerojr1@gmail.com",
  url: "https://odaat1.com",
  image: "https://odaat1.com/images/logo.png",
  priceRange: "$$"
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": BUSINESS_NAP.name,
  "image": BUSINESS_NAP.image,
  "url": BUSINESS_NAP.url,
  "telephone": BUSINESS_NAP.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11692 Bricken Circle",
    "addressLocality": "San Antonio",
    "addressRegion": "TX",
    "postalCode": "78233",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.6199,
    "longitude": -98.4738
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": BUSINESS_NAP.priceRange
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <ConvexClientProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
