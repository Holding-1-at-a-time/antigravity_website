import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// Enable ISR
export const revalidate = 3600;

const categories = {
  protection: {
    name: 'Protection',
    description: 'Coatings, sealants, wax, and fabric protection methods',
    icon: '🛡️'
  },
  washing: {
    name: 'Washing',
    description: 'Wash methods, tools, and techniques for vehicle cleaning',
    icon: '🧽'
  },
  correction: {
    name: 'Paint Correction',
    description: 'Polishing, scratch removal, and paint restoration',
    icon: '✨'
  },
  decontaminating: {
    name: 'Decontaminating',
    description: 'Clay, fallout removal, and cleaning methods',
    icon: '🧼'
  },
  guides: {
    name: 'Guides',
    description: 'Step-by-step tutorials and how-to guides',
    icon: '📋'
  },
  maintenance: {
    name: 'Maintenance',
    description: 'Upkeep and care for your vehicle',
    icon: '🔧'
  },
  miscellaneous: {
    name: 'Miscellaneous',
    description: 'Tools, terminology, and business guides',
    icon: '📚'
  }
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = categories[categorySlug as keyof typeof categories];

  if (!category) {
    notFound();
  }

  const articles = await fetchQuery(api.articles.getArticlesByCategory, {
    categorySlug: categorySlug,
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <section className="relative py-16 border-b border-white/10">
        <div className="container px-4">
          <FadeIn>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Articles
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading">
                  {category.name} Articles
                </h1>
                <p className="text-gray-400 mt-2">
                  {category.description}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="container px-4">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <FadeIn key={article.slug} delay={0.1 * index}>
                  <Link href={`/articles/${categorySlug}/${article.slug}`}>
                    <GlassCard className="h-full p-6 group hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {article.readingTime} min read
                          </div>
                        </div>
                        <BookOpen size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </GlassCard>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn className="text-center py-16">
              <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Articles Coming Soon
              </h3>
              <p className="text-gray-500">
                We're working on comprehensive {category.name.toLowerCase()} guides.
                Check back soon for expert insights and tutorials.
              </p>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}