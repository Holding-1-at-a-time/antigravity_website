export interface Article {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  readingTime: number;
  publishedAt: number;
  updatedAt: number;
  relatedServiceSlug?: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'what-is-ceramic-coating',
    title: 'What is Ceramic Coating? Complete Guide for San Antonio Car Owners',
    category: 'Protection',
    categorySlug: 'protection',
    excerpt: 'Discover everything about ceramic coating - the ultimate protection for your vehicle in San Antonio\'s climate. Learn how this advanced nanotechnology provides long-lasting shine and protection.',
    content: `
      <h2>Understanding Ceramic Coating Technology</h2>
      <p>Ceramic coating represents a revolutionary advancement in automotive protection technology. Unlike traditional waxes or sealants, ceramic coatings form a permanent chemical bond with your vehicle's paint, creating a protective layer that can last for years.</p>

      <h2>How Ceramic Coating Works</h2>
      <p>The coating consists of silicon dioxide (SiO2) and other ceramic compounds suspended in a liquid polymer. When applied to your vehicle, these compounds chemically bond with the paint surface, creating a hydrophobic barrier that repels water, dirt, and contaminants.</p>

      <h2>Benefits of Ceramic Coating in San Antonio</h2>
      <p>San Antonio's hot, humid climate and frequent rain showers make ceramic coating particularly beneficial. The coating provides:</p>
      <ul>
        <li>Superior water repellency</li>
        <li>Enhanced UV protection</li>
        <li>Easier cleaning and maintenance</li>
        <li>Long-lasting gloss and shine</li>
        <li>Chemical resistance</li>
      </ul>

      <h2>Ceramic Coating vs Traditional Protection Methods</h2>
      <p>While wax provides temporary protection and requires frequent reapplication, ceramic coating offers:</p>
      <ul>
        <li>2-5 years of protection (depending on the product)</li>
        <li>Chemical resistance to acidic contaminants</li>
        <li>Reduced water spotting</li>
        <li>Easier maintenance</li>
      </ul>
    `,
    readingTime: 8,
    publishedAt: Date.now(),
    updatedAt: Date.now(),
    relatedServiceSlug: 'ceramic-coating',
    faqs: [
      {
        question: 'What is ceramic coating?',
        answer: 'Ceramic coating is a liquid polymer that chemically bonds with your vehicle\'s paint to create a protective layer that repels water, dirt, and contaminants while providing long-lasting shine.'
      },
      {
        question: 'How much does ceramic coating cost in San Antonio?',
        answer: 'Professional ceramic coating services in San Antonio typically range from $800-$2,500 depending on the vehicle size and coating quality. Our services start at competitive rates with expert application.'
      },
      {
        question: 'How long does ceramic coating last?',
        answer: 'Quality ceramic coatings last 2-5 years with proper maintenance. Some premium coatings can last up to 7 years, though this varies based on driving conditions and care.'
      },
      {
        question: 'Can I apply ceramic coating myself?',
        answer: 'While DIY ceramic coating kits exist, professional application ensures proper bonding and coverage. Improper application can lead to poor results and wasted investment.'
      },
      {
        question: 'Do you offer ceramic coating at One Detail At A Time?',
        answer: 'Yes! We specialize in professional ceramic coating applications in San Antonio using premium products with our IDA-certified expertise. Contact us for a consultation.'
      }
    ]
  },
  {
    slug: 'paint-correction-what-is-it',
    title: 'Paint Correction: What It Is and Why Your San Antonio Car Needs It',
    category: 'Paint Correction',
    categorySlug: 'correction',
    excerpt: 'Learn about paint correction services in San Antonio. Discover how professional polishing removes swirls, scratches, and oxidation to restore your vehicle\'s showroom finish.',
    content: `
      <h2>What is Paint Correction?</h2>
      <p>Paint correction is the process of removing imperfections from your vehicle's paint surface to restore its original clarity and gloss. This professional service uses specialized tools and compounds to eliminate swirls, scratches, oxidation, and other defects.</p>

      <h2>Common Paint Imperfections</h2>
      <p>San Antonio's environment contributes to several types of paint damage:</p>
      <ul>
        <li><strong>Swirl marks</strong> from improper washing techniques</li>
        <li><strong>Scratches</strong> from car washes, parking lots, or accidents</li>
        <li><strong>Oxidation</strong> from UV exposure and environmental contaminants</li>
        <li><strong>Water spots</strong> from mineral deposits in water</li>
        <li><strong>Bird droppings and tree sap</strong> etching</li>
      </ul>

      <h2>The Paint Correction Process</h2>
      <p>Professional paint correction involves multiple steps:</p>
      <ol>
        <li>Thorough vehicle inspection and defect assessment</li>
        <li>Paint depth measurement to ensure safe correction</li>
        <li>Multi-stage polishing with progressively finer compounds</li>
        <li>Quality inspection under various lighting conditions</li>
        <li>Protective coating application</li>
      </ol>

      <h2>Why Choose Professional Paint Correction?</h2>
      <p>While DIY polishing can work for minor issues, professional correction offers:</p>
      <ul>
        <li>Advanced equipment and techniques</li>
        <li>Expert assessment of paint health</li>
        <li>Consistent, showroom-quality results</li>
        <li>Warranty on the work performed</li>
      </ul>
    `,
    readingTime: 6,
    publishedAt: Date.now(),
    updatedAt: Date.now(),
    relatedServiceSlug: 'paint-correction',
    faqs: [
      {
        question: 'What is paint correction?',
        answer: 'Paint correction is the professional process of removing swirls, scratches, oxidation, and other imperfections from your vehicle\'s paint to restore its original clarity and gloss.'
      },
      {
        question: 'How much does paint correction cost in San Antonio?',
        answer: 'Paint correction costs vary based on vehicle condition and correction level needed. Basic single-stage correction starts around $300, while extensive multi-stage work can range from $800-$1,500.'
      },
      {
        question: 'How long does paint correction take?',
        answer: 'Single-stage correction typically takes 4-6 hours, while multi-stage correction can take 8-12 hours or more. Complex cases may require multiple days.'
      },
      {
        question: 'Can paint correction remove deep scratches?',
        answer: 'Paint correction can remove shallow scratches and swirls, but deep scratches that penetrate through the clear coat may require touch-up paint or PDR. We assess each vehicle individually.'
      },
      {
        question: 'Do you offer paint correction at One Detail At A Time?',
        answer: 'Absolutely! Our IDA-certified detailers specialize in professional paint correction using premium tools and techniques. We serve San Antonio and surrounding areas.'
      }
    ]
  },
  {
    slug: 'proper-car-washing-techniques',
    title: 'Proper Car Washing Techniques: Protect Your Investment in San Antonio',
    category: 'Washing',
    categorySlug: 'washing',
    excerpt: 'Master the art of washing your car properly. Learn techniques that prevent swirls, water spots, and damage while keeping your vehicle looking its best in San Antonio\'s climate.',
    content: `
      <h2>Why Proper Washing Matters</h2>
      <p>Improper car washing is the leading cause of paint damage. San Antonio's mineral-rich water and frequent dust storms make proper technique even more crucial for maintaining your vehicle's appearance and value.</p>

      <h2>Essential Washing Supplies</h2>
      <p>Before you begin, gather the right tools:</p>
      <ul>
        <li>pH-balanced car shampoo</li>
        <li>Two-bucket washing method (one for washing, one for rinsing)</li>
        <li>Microfiber wash mitts</li>
        <li>Wheel cleaning brush</li>
        <li>Quick detailer spray</li>
        <li>Clean microfiber drying towels</li>
      </ul>

      <h2>The Two-Bucket Washing Method</h2>
      <p>This technique prevents dirt from scratching your paint:</p>
      <ol>
        <li>Fill one bucket with soapy water</li>
        <li>Fill the second bucket with clean water for rinsing</li>
        <li>Wash one panel at a time, rinsing the mitt frequently</li>
        <li>Change rinse water when it becomes dirty</li>
      </ol>

      <h2>Washing Order</h2>
      <p>Always wash from top to bottom:</p>
      <ol>
        <li>Rinse the entire vehicle</li>
        <li>Wash the wheels and wheel wells first</li>
        <li>Wash the upper body panels</li>
        <li>Wash the lower body panels</li>
        <li>Rinse thoroughly</li>
        <li>Dry immediately</li>
      </ol>

      <h2>Drying Techniques</h2>
      <p>Proper drying prevents water spots:</p>
      <ul>
        <li>Use clean, dry microfiber towels</li>
        <li>Start from the top and work down</li>
        <li>Use a leaf blower for hard-to-reach areas</li>
        <li>Don't let water air dry in direct sunlight</li>
      </ul>
    `,
    readingTime: 5,
    publishedTime: Date.now(),
    updatedAt: Date.now(),
    faqs: [
      {
        question: 'What\'s the proper way to wash a car?',
        answer: 'Use the two-bucket method with pH-balanced shampoo, wash from top to bottom, rinse thoroughly, and dry immediately with clean microfiber towels to prevent water spots and swirls.'
      },
      {
        question: 'How often should I wash my car in San Antonio?',
        answer: 'In San Antonio\'s climate, we recommend washing every 1-2 weeks during dry seasons and weekly during rainy periods. More frequent washing may be needed if driving on dusty roads.'
      },
      {
        question: 'Can I use household cleaners on my car?',
        answer: 'No, household cleaners are too harsh and can damage paint, rubber, and plastic. Always use car-specific products designed for automotive surfaces.'
      },
      {
        question: 'What causes water spots?',
        answer: 'Water spots are caused by mineral deposits in water that evaporate and leave behind residue. Using distilled water for final rinses and immediate drying helps prevent them.'
      },
      {
        question: 'Do you offer professional car washing at One Detail At A Time?',
        answer: 'Yes! Our professional washing services use proper techniques and premium products to protect your vehicle while achieving a spotless finish. Safe for all paint types and coatings.'
      }
    ]
  }
];

// Helper functions
export function getArticleBySlug(categorySlug: string, articleSlug: string): Article | null {
  return ARTICLES.find(article =>
    article.categorySlug === categorySlug && article.slug === articleSlug
  ) || null;
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter(article => article.categorySlug === categorySlug);
}

export function getAllArticles(): Article[] {
  return ARTICLES;
}

export function getFeaturedArticles(): Article[] {
  // Return first 3 articles as featured for now
  return ARTICLES.slice(0, 3);
}