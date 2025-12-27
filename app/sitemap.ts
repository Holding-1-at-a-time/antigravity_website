import { MetadataRoute } from 'next';
import { ALL_SERVICES } from '@/lib/services-data';
import { ARTICLES } from '@/lib/articles-data';

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

    // Articles Hub
    const articlesHubRoute = {
        url: `${baseUrl}/articles`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    };

    // Article Categories
    const categoryRoutes = [
        'protection',
        'washing',
        'correction',
        'decontaminating',
        'guides',
        'maintenance',
        'miscellaneous'
    ].map((category) => ({
        url: `${baseUrl}/articles/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Individual Articles
    const articleRoutes = ARTICLES.map((article) => ({
        url: `${baseUrl}/articles/${article.categorySlug}/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...serviceRoutes, ...clusterRoutes, articlesHubRoute, ...categoryRoutes, ...articleRoutes];
}
