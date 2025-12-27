import { GlassCard } from '@/components/ui/GlassCard';

interface FaqItem {
  question: string;
  answer: string;
}

interface ArticleFaqProps {
  faqs: FaqItem[];
}

export default function ArticleFaq({ faqs }: ArticleFaqProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 font-heading">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <GlassCard key={index} className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-white">{faq.question}</h3>
            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}