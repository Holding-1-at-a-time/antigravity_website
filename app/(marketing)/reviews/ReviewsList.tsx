"use client";

import { Star, User } from 'lucide-react';
import { STATIC_REVIEWS } from '@/lib/reviews-data';
import { GlassCard } from '@/components/ui/GlassCard';

export default function ReviewsList() {
    const reviews = STATIC_REVIEWS;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
                <GlassCard key={review.id} className="p-8 h-full flex flex-col hover:border-primary/30 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-1 text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{new Date(review.date).toLocaleDateString()}</span>
                    </div>

                    <p className="text-gray-300 mb-8 italic leading-relaxed flex-grow">"{review.text}"</p>

                    <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-black shadow-lg shadow-primary/20">
                            <User size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">{review.author}</h4>
                            <p className="text-xs text-primary font-medium uppercase tracking-wide">{review.service}</p>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
