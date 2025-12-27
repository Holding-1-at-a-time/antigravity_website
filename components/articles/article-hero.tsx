import Link from 'next/link';
import { Clock, Phone, MessageCircle } from 'lucide-react';
import CategoryBadge from './category-badge';
import Breadcrumbs from './breadcrumbs';
import type { Article } from '@/lib/articles-data';

interface ArticleHeroProps {
  article: Article;
  categorySlug: string;
}

export default function ArticleHero({ article, categorySlug }: ArticleHeroProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: article.category, href: `/articles/${categorySlug}` },
    { label: article.title, href: '#' },
  ];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-16 border-b border-white/10">
        <div className="container px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <CategoryBadge category={article.category} />
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock size={14} />
                {article.readingTime} min read
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-heading leading-tight">
              {article.title}
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {article.excerpt}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:(726) 207-1007"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all"
              >
                <Phone size={16} />
                Call (726) 207-1007
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all"
              >
                <MessageCircle size={16} />
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}