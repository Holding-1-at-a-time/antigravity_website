import { MetadataRoute } from 'next';
import { ALL_SERVICES } from '@/lib/services-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://odaat1.com';

    // Base routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/reviews',
        '/faq',
        '/services',

    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Service Pillars
    const serviceRoutes = ALL_SERVICES.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Service Clusters
    const clusterRoutes = ALL_SERVICES.flatMap((service) =>
        service.clusters.map((cluster) => ({
            url: `${baseUrl}/services/${service.slug}/${cluster.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    );

    return [...routes, ...serviceRoutes, ...clusterRoutes];
}
