import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewsList from './ReviewsList';
import { FadeIn } from '@/components/ui/FadeIn';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
    title: 'Customer Reviews | One Detail At A Time',
    description: 'Read 5-star reviews from our satisfied customers in San Antonio, Stone Oak, and Alamo Heights.',
};

export default function ReviewsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-32 pb-20 bg-[#0a0a0a]">
                <div className="container px-4">
                    <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">Client Success Stories</h1>
                        <p className="text-lg text-gray-400 mb-8">Join our community of satisfied car enthusiasts who trust us with their prized possessions.</p>
                        <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="flex text-yellow-400">
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                            </div>
                            <span className="text-white font-bold ml-2">5.0/5.0 Average</span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ReviewsList />
                    </FadeIn>

                    <FadeIn delay={0.4} className="mt-20">
                        <GlassCard className="p-10 text-center max-w-2xl mx-auto border-primary/30 bg-primary/5">
                            <h2 className="text-3xl font-bold text-white mb-4 font-heading">Have you used our services?</h2>
                            <p className="text-gray-300 mb-8 text-lg">We'd love to hear about your experience. Your feedback helps us maintain our high standards.</p>
                            <a
                                href="https://g.page/r/example"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-primary text-black font-bold py-4 px-10 rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg shadow-primary/20"
                            >
                                Write a Google Review
                            </a>
                        </GlassCard>
                    </FadeIn>
                </div>
            </main>

            <Footer />
        </div>
    );
}
