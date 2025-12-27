import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// Enable ISR
export const revalidate = 3600;

const categories = [
  {
    slug: 'protection',
    name: 'Protection',
    description: 'Coatings, sealants, wax, and fabric protection methods',
    icon: '🛡️'
  },
  {
    slug: 'washing',
    name: 'Washing',
    description: 'Wash methods, tools, and techniques for vehicle cleaning',
    icon: '🧽'
  },
  {
    slug: 'correction',
    name: 'Paint Correction',
    description: 'Polishing, scratch removal, and paint restoration',
    icon: '✨'
  },
  {
    slug: 'decontaminating',
    name: 'Decontaminating',
    description: 'Clay, fallout removal, and cleaning methods',
    icon: '🧼'
  },
  {
    slug: 'guides',
    name: 'Guides',
    description: 'Step-by-step tutorials and how-to guides',
    icon: '📋'
  },
  {
    slug: 'maintenance',
    name: 'Maintenance',
    description: 'Upkeep and care for your vehicle',
    icon: '🔧'
  },
  {
    slug: 'miscellaneous',
    name: 'Miscellaneous',
    description: 'Tools, terminology, and business guides',
    icon: '📚'
  }
];

export default async function ArticlesHub() {
  const allArticles = await fetchQuery(api.articles.getAllArticles);
  const featuredArticles = await fetchQuery(api.articles.getFeaturedArticles, { limit: 3 });

  // Group and count articles by category
  const categoryCounts = allArticles.reduce((acc, article) => {
    acc[article.categorySlug] = (acc[article.categorySlug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container relative z-10 px-4">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
              Auto Detailing <span className="text-primary">Education Hub</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
              Master the art of auto detailing with our comprehensive guides, tutorials, and expert insights.
              From ceramic coatings to paint correction, learn everything you need to know about professional vehicle care in San Antonio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all"
              >
                Explore Categories <ArrowRight size={16} />
              </Link>
              <a
                href="tel:(726) 207-1007"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all"
              >
                Call for Service
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 relative">
        <div className="container px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
              Browse by Category
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover detailed guides organized by topic. Whether you're a DIY enthusiast or professional detailer,
              find the information you need to achieve showroom-quality results.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <FadeIn key={category.slug} delay={0.1 * index}>
                <Link href={`/articles/${category.slug}`}>
                  <GlassCard className="h-full p-8 group hover:bg-white/10 transition-all cursor-pointer">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary font-semibold">
                        {categoryCounts[category.slug] || 0} articles
                      </span>
                      <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-24 relative bg-black/20">
        <div className="container px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
              Featured Articles
            </h2>
            <p className="text-gray-400 text-lg">
              Start with our most popular and essential guides
            </p>
          </FadeIn>

          {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <FadeIn key={article.slug} delay={0.1 * index}>
                  <Link href={`/articles/${article.categorySlug}/${article.slug}`}>
                    <GlassCard className="h-full p-6 group hover:bg-white/10 transition-all cursor-pointer">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          {article.readingTime} min read
                        </div>
                        <BookOpen size={14} className="text-primary" />
                      </div>
                    </GlassCard>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">Featured articles coming soon...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}