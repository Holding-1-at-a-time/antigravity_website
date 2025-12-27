import { MetadataRoute } from 'next';
import { ALL_SERVICES } from '@/lib/services-data';
import { fetchQuery } from 'convex/nextjs/server';
import { api } from '@/convex/_generated/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://odaat1.com';

    // Fetch all articles from Convex
    const articles = await fetchQuery(api.articles.getAllArticles, {});

    // Base routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/reviews',
        '/faq',
        '/services',
        '/articles',
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

    // Individual Articles from Convex
    const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/articles/${article.categorySlug}/${article.slug}`,
        lastModified: new Date(article.updatedAt || Date.now()),
        changeFrequency: 'yearly' as const, // Wiki content changes less often
        priority: 0.6,
    }));

    return [...routes, ...serviceRoutes, ...clusterRoutes, ...categoryRoutes, ...articleRoutes];
}
