import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Clock } from 'lucide-react';
import type { Article } from '@/lib/articles-data';

interface ArticleRelatedProps {
  articles: Article[];
  categorySlug: string;
}

export default function ArticleRelated({ articles, categorySlug }: ArticleRelatedProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 font-heading">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${categorySlug}/${article.slug}`}>
            <GlassCard className="p-6 h-full group hover:bg-white/10 transition-all cursor-pointer">
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} />
                {article.readingTime} min read
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}