import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Phone, MessageCircle } from 'lucide-react';

interface ArticleCtaProps {
  topic: string;
}

export default function ArticleCta({ topic }: ArticleCtaProps) {
  return (
    <GlassCard className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Questions about {topic}?
      </h2>
      <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
        Our IDA-certified detailers in San Antonio are here to help. Get expert advice and professional service for all your auto detailing needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="tel:(726) 207-1007"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all"
        >
          <Phone size={16} />
          Call (726) 207-1007
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all"
        >
          <MessageCircle size={16} />
          Contact Us
        </Link>
      </div>
    </GlassCard>
  );
}