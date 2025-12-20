export interface FAQItem {
  question: string;
  answer: string;
  category: 'business' | 'services' | 'process' | 'pricing' | 'safety';
}

export const FAQ_DATA: FAQItem[] = [
  // Business Questions
  {
    question: "Where is One Detail At A Time located?",
    answer: "We're located at 11692 Bricken Circle, San Antonio, TX 78233. We serve the greater San Antonio area including Stone Oak, Alamo Heights, and surrounding communities with our mobile valet service.",
    category: 'business'
  },
  {
    question: "What are your business hours?",
    answer: "We operate Monday through Saturday from 8:00 AM to 6:00 PM. We're closed on Sundays to spend time with family. Our mobile service allows us to work flexible hours to accommodate your schedule.",
    category: 'business'
  },
  {
    question: "Are you certified and insured?",
    answer: "Yes, we're fully insured and our team holds certifications from the International Detailing Association (IDA). This includes Certified Detailer (CD), Skills Validated (SV), and Ceramic Pro Certified Installer credentials.",
    category: 'business'
  },
  {
    question: "How long have you been in business?",
    answer: "Founded in 2019, One Detail At A Time has been serving San Antonio with professional auto detailing services for over 4 years. Our experience ensures we stay current with the latest techniques and products.",
    category: 'business'
  },
  {
    question: "Do you support the community?",
    answer: "Yes, we're proud supporters of Junior Achievement of South Texas, investing in programs that inspire and prepare young people for success in life and work.",
    category: 'business'
  },

  // Service Questions
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive auto detailing services including: Auto Detailing, Ceramic Coating, Paint Correction, Interior Deep Cleansing, Exterior Hand Wash, Headlight Restoration, Engine Detailing, Wheel & Tire Detailing, Scratch Removal, Odor Elimination, Leather Conditioning, Pet Hair Removal, Water Spot Removal, Glass Treatment, and Chrome Polishing.",
    category: 'services'
  },
  {
    question: "What's the difference between a full detail and mini detail?",
    answer: "A full detail includes complete interior and exterior cleaning, while a mini detail focuses on exterior surfaces only. Full details take 4-6 hours, mini details take 2-3 hours. Both use the same high-quality products and techniques.",
    category: 'services'
  },
  {
    question: "How long does ceramic coating last?",
    answer: "Professional ceramic coatings typically last 2-5 years depending on driving conditions, maintenance, and the specific product used. We use industry-leading coatings that provide superior UV protection and hydrophobicity.",
    category: 'services'
  },
  {
    question: "Do you work on all vehicle types?",
    answer: "Yes, we work on all vehicle types including cars, trucks, SUVs, motorcycles, and RVs. Our mobile service can accommodate most vehicles at your location.",
    category: 'services'
  },
  {
    question: "Can you remove scratches from my car?",
    answer: "We can reduce or eliminate most scratches depending on depth. Light surface scratches can often be completely removed, while deeper scratches may be minimized. We always assess scratches during consultation to set realistic expectations.",
    category: 'services'
  },
  {
    question: "How do you handle pet hair removal?",
    answer: "We use specialized rubber brushes, static electricity techniques, and high-velocity air to remove embedded pet hair that vacuums miss. This includes hair woven into carpets, cloth seats, and even air vents.",
    category: 'services'
  },
  {
    question: "What causes water spots and how do you remove them?",
    answer: "Water spots are caused by mineral deposits from hard water evaporation. We use pH-balanced chemical treatments and mechanical polishing to safely remove them without damaging your paint or glass.",
    category: 'services'
  },
  {
    question: "How do you restore headlights?",
    answer: "Headlight restoration involves wet sanding with progressively finer grits, followed by polishing and UV-protective coating. This removes yellowing and restores clarity for better night visibility.",
    category: 'services'
  },
  {
    question: "What's involved in paint correction?",
    answer: "Paint correction removes swirl marks, scratches, oxidation, and water spots using multi-stage polishing. We use different abrasive levels (1-step or 2-step) based on your paint's condition and desired finish.",
    category: 'services'
  },
  {
    question: "How do you eliminate odors?",
    answer: "We use ozone treatment, enzyme cleaners, and thorough extraction to permanently remove organic and chemical odors. This includes smoke, food spills, pet odors, and musty smells from AC systems.",
    category: 'services'
  },

  // Process Questions
  {
    question: "How does your valet service work?",
    answer: "Our mobile service comes to you! We bring all equipment and products to your home, office, or preferred location. This saves you time and eliminates the need to drive to a shop.",
    category: 'process'
  },
  {
    question: "How do I book a service?",
    answer: "You can book by calling (726) 207-1007, filling out our contact form, or emailing rromerojr1@gmail.com. We'll discuss your needs, schedule a convenient time, and confirm all details.",
    category: 'process'
  },
  {
    question: "What should I do to prepare for my appointment?",
    answer: "Remove personal items from the vehicle. If possible, empty the trunk and glovebox. For interior services, vacuuming beforehand helps but isn't required. We'll handle everything else.",
    category: 'process'
  },
  {
    question: "How long does a typical detailing take?",
    answer: "Service times vary: exterior wash (1-2 hours), mini detail (2-3 hours), full detail (4-6 hours), ceramic coating (6-8 hours). We'll give you an exact estimate during booking.",
    category: 'process'
  },
  {
    question: "Do you provide estimates?",
    answer: "Yes, we provide free, no-obligation estimates. We'll assess your vehicle and discuss service options. All pricing is transparent with no hidden fees.",
    category: 'process'
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, credit cards, and digital payments. Payment is due upon completion of service. We can provide invoices for insurance or business purposes.",
    category: 'process'
  },
  {
    question: "Do you offer warranties or guarantees?",
    answer: "Yes, we stand behind our work. Ceramic coatings come with manufacturer warranties. All services include a satisfaction guarantee - if you're not happy, we'll make it right.",
    category: 'process'
  },
  {
    question: "What if it rains during my appointment?",
    answer: "We monitor weather forecasts and can reschedule if needed. For outdoor services, we have contingency plans. Your satisfaction and vehicle protection are our priorities.",
    category: 'process'
  },

  // Pricing Questions
  {
    question: "How much do your services cost?",
    answer: "Pricing varies by vehicle size and service type. Exterior washes start at $50, full details range from $150-$400, and ceramic coatings start at $800. We provide detailed quotes after vehicle assessment.",
    category: 'pricing'
  },
  {
    question: "Do you offer package deals?",
    answer: "Yes, we offer package deals that combine services at discounted rates. For example, combining paint correction with ceramic coating saves you money compared to separate services.",
    category: 'pricing'
  },
  {
    question: "Are there additional fees?",
    answer: "No hidden fees! Our quotes include all products, labor, and travel within San Antonio. We only charge for the services discussed and agreed upon.",
    category: 'pricing'
  },

  // Safety Questions
  {
    question: "Are your products safe for my vehicle?",
    answer: "Yes, we use professional-grade, pH-balanced products that are safe for all vehicle surfaces. Our IDA certification ensures we follow industry safety standards and use environmentally responsible products.",
    category: 'safety'
  },
  {
    question: "Do you protect sensitive vehicle components?",
    answer: "Absolutely. We use protective coverings for electronics, plastics, and sensitive areas. For engine detailing, we protect alternators, batteries, and electrical components.",
    category: 'safety'
  },
  {
    question: "How do you handle different paint types?",
    answer: "We assess each vehicle's paint type and condition before beginning work. Our techniques are adjusted for clear coat, single-stage, matte, and specialty paints to ensure safe, effective results.",
    category: 'safety'
  },
  {
    question: "Are your products environmentally friendly?",
    answer: "We prioritize eco-friendly products whenever possible. Our water reclamation system recycles water, and we use biodegradable, low-VOC products that are safe for the environment.",
    category: 'safety'
  },
  {
    question: "What if something goes wrong during service?",
    answer: "While rare, if any issues occur, we immediately stop work and consult with you. Our insurance covers any accidental damage, and we have processes to address concerns promptly.",
    category: 'safety'
  }
];

export const FAQ_CATEGORIES = {
  business: 'About Our Business',
  services: 'Our Services',
  process: 'How We Work',
  pricing: 'Pricing & Packages',
  safety: 'Safety & Quality'
};