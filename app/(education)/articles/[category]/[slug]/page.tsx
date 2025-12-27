import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import ArticleHero from '@/components/articles/article-hero';
import ArticleContent from '@/components/articles/article-content';
import ArticleToc from '@/components/articles/article-toc';
import ArticleFaq from '@/components/articles/article-faq';
import ArticleRelated from '@/components/articles/article-related';
import ArticleCta from '@/components/articles/article-cta';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

// Types for table of contents
interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Enable ISR
export const revalidate = 3600;

interface ArticlePageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await fetchQuery(api.articles.getAllArticles);

  return articles.map((article: Doc<"articles">) => ({
    category: article.categorySlug,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;

  const article = await fetchQuery(api.articles.getArticleBySlug, {
    categorySlug: category,
    articleSlug: slug,
  });

  if (!article) {
    return {
      title: 'Article Not Found | One Detail At A Time',
    };
  }

  return {
    title: `${article.title} | San Antonio Auto Detailing Guide`,
    description: `${article.excerpt} Expert IDA certified guidance from One Detail At A Time.`,
    keywords: [
      article.title.toLowerCase(),
      `${article.title} san antonio`,
      `auto detailing ${article.category.toLowerCase()}`,
      'professional car detailing',
    ],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://odaat1.com/articles/${category}/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://odaat1.com/articles/${category}/${slug}`,
    },
    other: {
      "geo.region": "US-TX",
      "geo.placename": "San Antonio",
      "geo.position": "29.4241;-98.4936",
      "ICBM": "29.4241, -98.4936"
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;

  const article = await fetchQuery(api.articles.getArticleBySlug, {
    categorySlug: category,
    articleSlug: slug,
  });

  if (!article) {
    notFound();
  }

  // Generate TOC from content H2 headings
  const tableOfContents: TocItem[] = generateTableOfContents(article.content);
  
  // Inject IDs into H2 elements
  const contentWithIds = injectHeadingIds(article.content, tableOfContents);

  // Helper function to generate table of contents from H2 headings
  function generateTableOfContents(content: string): TocItem[] {
    const headingRegex = /<h2[^>]*>([^<]+)<\/h2>/gi;
    const tocItems: TocItem[] = [];
    let match;
    let index = 0;

    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[1]?.trim() || '';
      if (text) {
        const id = generateSlug(text, index);
        
        tocItems.push({
          id,
          text,
          level: 2
        });
        
        index++;
      }
    }

    return tocItems;
  }

  // Helper function to generate URL-safe slugs
  function generateSlug(text: string, index: number): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      + (index > 0 ? `-${index}` : '');
  }

  // Helper function to inject IDs into H2 elements
  function injectHeadingIds(content: string, tocItems: TocItem[]): string {
    let modifiedContent = content;
    let itemIndex = 0;
    
    modifiedContent = content.replace(/<h2([^>]*)>/gi, (match, attributes) => {
      const tocItem = tocItems[itemIndex];
      if (tocItem) {
        const id = tocItem.id;
        itemIndex++;
        // Check if id attribute already exists
        if (attributes.includes('id=')) {
          return match;
        }
        return `<h2${attributes} id="${id}">`;
      }
      return match;
    });
    
    return modifiedContent;
  }

  // Get related articles from same category (excluding current article)
  const allRelatedArticles = await fetchQuery(api.articles.getArticlesByCategory, {
    categorySlug: category,
  });

  const relatedArticles = allRelatedArticles
    .filter((a: Doc<"articles">) => a.slug !== slug)
    .slice(0, 6);

  // Schema markup for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "author": {
      "@type": "Organization",
      "name": "One Detail At A Time LLC"
    },
    "publisher": {
      "@type": "LocalBusiness",
      "name": "One Detail At A Time LLC",
      "telephone": "(726) 207-1007",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Antonio",
        "addressRegion": "TX"
      }
    },
    "datePublished": new Date(article.publishedAt).toISOString(),
    "articleSection": article.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://odaat1.com/articles/${category}/${slug}`
    }
  };

  // Schema markup for FAQPage
  const faqSchema = article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <ArticleHero article={article} categorySlug={category} />

        <div className="container px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Desktop Sidebar */}
            <aside className="lg:col-span-1">
              <ArticleToc items={tableOfContents} />
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Article Content */}
              <FadeIn>
                <ArticleContent content={contentWithIds} />
              </FadeIn>

              {/* Related Services */}
              {article.relatedServiceSlug && (
                <FadeIn className="mb-16">
                  <GlassCard className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">Related Service</h2>
                    <p className="text-gray-400 mb-6">
                      Ready to experience professional {article.title.toLowerCase()}? Our expert team in San Antonio delivers exceptional results.
                    </p>
                    <Link
                      href={`/services/${article.relatedServiceSlug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all"
                    >
                      Learn More About Our Service
                    </Link>
                  </GlassCard>
                </FadeIn>
              )}

              {/* FAQ Section */}
              <FadeIn>
                <ArticleFaq faqs={article.faqs} />
              </FadeIn>

              {/* Related Articles */}
              <FadeIn>
                <ArticleRelated articles={relatedArticles} categorySlug={category} />
              </FadeIn>

              {/* CTA Section */}
              <FadeIn>
                <ArticleCta topic={article.title} />
              </FadeIn>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}