'use client';

import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { FAQ_DATA, FAQ_CATEGORIES } from '@/lib/faq-data';
import { faqPageSchema } from '@/lib/schemas';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Everything you need to know about our auto detailing services, processes, and business.
              Can't find what you're looking for? Contact us directly.
            </p>
          </FadeIn>

          {/* Search and Filter */}
          <FadeIn delay={0.2} className="mb-12">
            <GlassCard className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="md:w-64">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {Object.entries(FAQ_CATEGORIES).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </GlassCard>
          </FadeIn>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <FadeIn>
                <GlassCard className="p-8 text-center">
                  <HelpCircle className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-white mb-2">No questions found</h3>
                  <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
                </GlassCard>
              </FadeIn>
            ) : (
              filteredFAQs.map((faq, index) => (
                <FadeIn key={index} delay={index * 0.05}>
                  <GlassCard className="overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 text-left hover:bg-white/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                            faq.category === 'business' ? 'bg-blue-500' :
                            faq.category === 'services' ? 'bg-green-500' :
                            faq.category === 'process' ? 'bg-purple-500' :
                            faq.category === 'pricing' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} />
                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`text-primary transition-transform duration-200 flex-shrink-0 ${
                            openItems.has(index) ? 'rotate-180' : ''
                          }`}
                          size={20}
                        />
                      </div>
                      <div className={`mt-4 text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ${
                        openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        {faq.answer}
                      </div>
                    </button>
                  </GlassCard>
                </FadeIn>
              ))
            )}
          </div>

          {/* Contact CTA */}
          <FadeIn delay={0.5} className="mt-16 text-center">
            <GlassCard className="p-8 border-primary/30">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Our team is here to help. Contact us for personalized answers about your specific vehicle and detailing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+17262071007"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-primary/20"
                >
                  Call (726) 207-1007
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-black transition-all"
                >
                  Send Message
                </a>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}