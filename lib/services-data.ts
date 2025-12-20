export interface ServiceCluster {
    slug: string;
    title: string;
    description: string;
    longTailKeywords: string[];
    wikiContent?: string;
}

export interface ServiceData {
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon?: string; // name of Lucide icon or image path
    clusters: ServiceCluster[];
}

// Full 15 Services Data Set for ODAAT
export const ALL_SERVICES: ServiceData[] = [
    {
        slug: 'auto-detailing',
        title: 'Auto Detailing',
        shortDescription: 'Comprehensive interior and exterior rejuvenation for all vehicle types.',
        fullDescription: 'Professional auto detailing services in San Antonio that go beyond a simple wash. We meticulously clean, restore, and protect every inch of your vehicle using industry-leading techniques.',
        clusters: [
            { slug: 'full-vs-mini-detail', title: 'Full Detail vs Mini Detail', description: 'Which package is right for your vehicle?', longTailKeywords: ['mini detail vs full detail', 'maintenance detailing san antonio'] },
            { slug: 'mobile-detailing-benefits', title: 'Why Choose Mobile Detailing', description: 'The convenience of valet service at your home or office.', longTailKeywords: ['mobile car wash stone oak', 'valet interior cleaning'] },
            { slug: 'selling-your-car', title: 'Detailing Before Selling', description: 'Maximize your resale value with a showroom finish.', longTailKeywords: ['pre-sale detailing', 'increase car value san antonio'] },
            { slug: 'seasonal-care', title: 'San Antonio Seasonal Care', description: 'Protecting your car from Texas heat and pollen.', longTailKeywords: ['summer car care texas', 'protect paint from sun'] },
            { slug: 'luxury-car-care', title: 'Exotic & Luxury Car Care', description: 'Specialized handling for high-end vehicles.', longTailKeywords: ['luxury car detailing san antonio', 'porsche detailing service'] },
        ]
    },
    {
        slug: 'ceramic-coating',
        title: 'Ceramic Coating',
        shortDescription: 'Long-lasting paint protection and gloss enhancement.',
        fullDescription: 'Industry-leading ceramic coating application using certified products to form a semi-permanent bond with your vehicle’s paint, offering superior UV and chemical resistance.',
        clusters: [
            { slug: 'benefits', title: 'Benefits of Ceramic Coating', description: 'Why choose ceramic over wax or sealant?', longTailKeywords: ['ceramic coating benefits', 'is ceramic coating worth it san antonio'], wikiContent: "Hydrophobic is the term used when a surface 'pushes away water'. The word means as much as 'fear/anxiety for water'. Although there is no actual fear or anxiety, it refers to the effect that looks as if it is pushing away the water." },
            { slug: 'maintenance', title: 'Coating Maintenance Guide', description: 'How to wash and care for your coated vehicle.', longTailKeywords: ['how to wash ceramic coated car', 'ph neutral soap'] },
            { slug: 'ceramic-vs-ppf', title: 'Ceramic Coating vs PPF', description: 'Understanding the difference between liquid protection and film.', longTailKeywords: ['ppf vs ceramic coating', 'paint protection options'] },
            { slug: 'new-car-protection', title: 'New Car Protection', description: 'Why you should coat your new vehicle immediately.', longTailKeywords: ['new car detailing', 'protect new paint'] },
            { slug: 'longevity', title: 'How Long Does It Last?', description: 'Real-world durability in the Texas climate.', longTailKeywords: ['ceramic coating warranty', '5 year coating'] }
        ]
    },
    {
        slug: 'paint-correction',
        title: 'Paint Correction',
        shortDescription: 'Restoring depth and clarity by removing swirls.',
        fullDescription: 'Multi-stage paint correction to permanently remove scratches, swirls, oxidation, and marring, revealing the true potential of your paintwork.',
        clusters: [
            { slug: 'swirl-removal', title: 'Swirl Mark Removal', description: 'Eliminating those spiderweb scratches from automatic washes.', longTailKeywords: ['remove swirl marks', 'buffing out scratches'], wikiContent: "For removing defects with the Kevin Brown Method we first apply a massive amount of the finishing polish on the pad and massage it in. This is to prime your pad properly, so that the product covers the whole face of the pad." },
            { slug: 'one-step-vs-two-step', title: '1-Step vs 2-Step Correction', description: 'Choosing the right level of aggression for your paint.', longTailKeywords: ['paint polishing levels', 'cut and polish'] },
            { slug: 'restoring-black-paint', title: 'Restoring Black Paint', description: 'Making black cars look like a mirror again.', longTailKeywords: ['black car scratch repair', 'hologram removal'] },
            { slug: 'oxidation-removal', title: 'Fixing Faded Paint', description: 'Restoring color to oxidized, dull surfaces.', longTailKeywords: ['faded car paint repair', 'dull paint fix'] },
            { slug: 'clear-coat-safety', title: 'Is Polishing Safe?', description: 'Understanding clear coat thickness and preservation.', longTailKeywords: ['clear coat thickness', 'paint depth gauge'], wikiContent: "The minimum paint thickness is an indication that there is no paint left to polish and should be avoided as much as possible. Going passed this minimum thickness will result in strike-through of burn-through." },
        ]
    },
    {
        slug: 'interior-deep-cleansing',
        title: 'Interior Deep Cleansing',
        shortDescription: 'Steam cleaning and extraction for fresh interiors.',
        fullDescription: 'A deep dive into your vehicle’s interior, utilizing steam cleaning and hot water extraction to remove stains, bacteria, and allergens.',
        clusters: [
            { slug: 'steam-cleaning', title: 'Power of Steam Cleaning', description: 'Sanitizing surfaces without harsh chemicals.', longTailKeywords: ['steam clean car interior', 'chemical free cleaning'], wikiContent: "A steamer is a device that uses the steam from heated water (under pressure) to pump through a hose. The advantage of using steam is the relative high temperature that can help to loosen up dirt and certain chemicals." },
            { slug: 'fabric-extraction', title: 'Hot Water Extraction', description: 'Removing deep-set stains from cloth seats.', longTailKeywords: ['shampoo car seats', 'remove coffee stain car'] },
            { slug: 'dashboard-restoration', title: 'Dashboard & Trim Care', description: 'Cleaning and UV protecting vinyl and plastic.', longTailKeywords: ['sticky dashboard fix', 'interior uv protection'] },
            { slug: 'mold-mildew', title: 'Mold & Mildew Prevention', description: 'Keeping your AC system and carpets healthy.', longTailKeywords: ['car interior mold removal', 'musty smell car'] },
            { slug: 'family-car-detailing', title: 'The Family Hauler', description: 'Recovering your car from kids and spills.', longTailKeywords: ['clean car seat crumbs', 'sticky candy removal'] }
        ]
    },
    {
        slug: 'exterior-hand-wash',
        title: 'Exterior Hand Wash',
        shortDescription: 'Scratch-free hand wash techniques.',
        fullDescription: 'A meticulous hand wash process designed to safely remove dirt without inflicting swirl marks, unlike automated tunnel washes.',
        clusters: [
            { slug: 'two-bucket-method', title: 'The Two Bucket Method', description: 'The safest way to wash a vehicle.', longTailKeywords: ['how to wash car without scratching', 'grit guard'], wikiContent: "The 3-bucket method is just like the 2-bucket method, a generally accepted safe way to wash a vehicle. The difference is that you use 3 buckets instead of 2. The third bucket can be used for wheels or arches." },
            { slug: 'automatic-wash-dangers', title: 'Avoid Tunnel Washes', description: 'Why automatic car washes damage your paint.', longTailKeywords: ['scratch and swirl car wash', 'touchless vs soft cloth'], wikiContent: "Although carwashes are very popular, they are not the place where detailers are found. There is a reason why detailers don’t like a carwash. The art called detailing/valeting is very different to the service that is offered by a carwash." },
            { slug: 'clay-bar-treatment', title: 'Clay Bar Treatment', description: 'Removing bonded contaminants for smooth paint.', longTailKeywords: ['rough car paint', 'how to clay bar'], wikiContent: "A claybar is a piece of clay, mixed with abrasive components, that is used to clean the surface of very persistent contamination. It removes contamination that is stuck on the surface which normal washing can't remove." },
            { slug: 'iron-decontamination', title: 'Iron Decontamination', description: 'Dissolving industrial fallout and brake dust.', longTailKeywords: ['rust spots on white car', 'iron remover'], wikiContent: "Iron Fallout Remover is a special product that has the chemical ability to help to remove iron particles from a surface. These iron particles can come from brake dust or from railways/trains (industrial fallout)." },
            { slug: 'drying-techniques', title: 'Safe Drying Techniques', description: 'Preveting water spots and towel marring.', longTailKeywords: ['drying car with blower', 'microfiber drying towel'] }
        ]
    },
    {
        slug: 'headlight-restoration',
        title: 'Headlight Restoration',
        shortDescription: 'Restore visibility and aesthetics.',
        fullDescription: 'Restoring foggy, yellowed headlights to crystal clear condition for improved night visibility and vehicle aesthetics.',
        clusters: [
            { slug: 'safety-visibility', title: 'Safety & Night Visibility', description: 'Why clear headlights are crucial for driving.', longTailKeywords: ['dim headlights fix', 'night driving safety'], wikiContent: "Headlights are often made from plastic, which can turn dull over time. Polishing will remove the matte layer and slowly reveal the clear and transparent finish again." },
            { slug: 'prevent-yellowing', title: 'Why Headlights Yellow', description: 'Understanding UV damage on polycarbonate.', longTailKeywords: ['foggy headlights cause', 'oxidized plastic'] },
            { slug: 'diy-vs-pro', title: 'DIY Kits vs Professional', description: 'Why store-bought kits often fail quickly.', longTailKeywords: ['toothpaste headlight hack', 'permanent headlight fix'] },
            { slug: 'ceramic-headlight', title: 'Ceramic Coating Headlights', description: 'Sealing the lens to prevent future fading.', longTailKeywords: ['protect headlights from sun', 'headlight uv coating'] },
            { slug: 'resale-value', title: 'Impact on Resale Value', description: 'How clear eyes make a car look newer.', longTailKeywords: ['sell car appearance', 'curb appeal'] }
        ]
    },
    {
        slug: 'engine-detailing',
        title: 'Engine Detailing',
        shortDescription: 'Safe degreasing and dressing of engine bays.',
        fullDescription: 'Careful cleaning and degreasing of the engine bay, followed by dressing plastics to make the engine look brand new.',
        clusters: [
            { slug: 'safe-engine-wash', title: 'Washing Engines Safely', description: 'Protecting sensitive electronics and alternators.', longTailKeywords: ['water in engine bay', 'cover alternator'], wikiContent: "Detailing an electric engine bay is slightly different to a normal engine bay because the lack of a combustible engine. Electric engines require attention to different aspects than combustion engines." },
            { slug: 'identifying-leaks', title: 'Spotting Leaks Early', description: 'How a clean engine helps maintenance.', longTailKeywords: ['oil leak detection', 'clean engine bay benefits'] },
            { slug: 'rodent-prevention', title: 'Rodent Prevention', description: 'Removing nesting materials and scents.', longTailKeywords: ['rats in car engine', 'keep mice out of car'] },
            { slug: 'plastic-dressing', title: 'Dressing Engine Plastics', description: 'Non-greasy finishes for a factory look.', longTailKeywords: ['engine shine dressing', 'matte engine finish'] },
            { slug: 'battery-terminal', title: 'Battery Terminal Care', description: 'Cleaning corrosion for better starts.', longTailKeywords: ['battery corrosion removal', 'clean car battery'] }
        ]
    },
    {
        slug: 'wheel-tire-detailing',
        title: 'Wheel & Tire Detailing',
        shortDescription: 'Deep cleaning for wheels and wheel wells.',
        fullDescription: 'Removing baked-on brake dust and road grime from wheels, tires, and wheel wells for a complete detail.',
        clusters: [
            { slug: 'brake-dust-removal', title: 'Removing Baked Brake Dust', description: 'Safe chemical cleaning for alloy wheels.', longTailKeywords: ['clean brown tires', 'remove brake dust'], wikiContent: "Within detailing, there are many different types of product. Among them is the wheel cleaner. This product will be specifically aimed at removing dirt that is most common for this area, such as brake dust, grime, mud, tar and several more." },
            { slug: 'tire-dressing-types', title: 'Gel vs Spray Tire Shine', description: 'Choosing the right finish: matte vs gloss.', longTailKeywords: ['no sling tire shine', 'matte tire dressing'] },
            { slug: 'wheel-coating', title: 'Ceramic Coating Wheels', description: 'Making wheels easier to clean next time.', longTailKeywords: ['protect wheels from dust', 'wheel ceramic coating'] },
            { slug: 'wheel-well-cleaning', title: 'Wheel Wells & Calipers', description: 'The often overlooked hidden areas.', longTailKeywords: ['clean fender liners', 'painted calipers cleaning'] },
            { slug: 'polishing-aluminum', title: 'Polishing Aluminum Wheels', description: 'Restoring shine to uncoated metal.', longTailKeywords: ['polish billett wheels', 'remove oxidation aluminum'], wikiContent: "Aluminium brighteners are essentially forms of hydrofluoric acid. The pure product is extremely toxic and dangerous. Aluminium brightener is another name for 'wheel cleaner' or 'metal cleaner'." },
        ]
    },
    {
        slug: 'scratch-removal',
        title: 'Scratch Removal',
        shortDescription: 'Targeted scratch repair.',
        fullDescription: 'Specialized focus on removing or reducing specific deep scratches that may not come out with general correction.',
        clusters: [
            { slug: 'fingernail-test', title: 'The Fingernail Test', description: 'How to know if a scratch is too deep.', longTailKeywords: ['is scratch too deep', 'fix deep car scratch'], wikiContent: "RDS is an abbreviation for Random Deep Scratch. This refers to a scratch of which the origin is not directly clear or obvious, it is most often an isolated mark." },
            { slug: 'touch-up-paint', title: 'Touch Up Paint', description: 'Filling chips and deep scratches correctly.', longTailKeywords: ['dr colorchip', 'apply touch up paint'] },
            { slug: 'key-scratch-repair', title: 'Key Scratch Repair', description: 'Fixing vandalism and malicious damage.', longTailKeywords: ['car keyed repair cost', 'vandalism repair'] },
            { slug: 'wet-sanding', title: 'Wet Sanding Basics', description: 'Advanced leveling for severe defects.', longTailKeywords: ['wet sand clear coat', 'remove orange peel'], wikiContent: "Orange peel is the term for the unevenness of a layer of paint on top of a surface. When you look closely, the surface resembles the skin of an orange. Many detailers consider orange peel unwanted, ugly and a fault of the painter." },
            { slug: 'transfer-removal', title: 'Paint Transfer Removal', description: 'Removing paint from bumping another car.', longTailKeywords: ['remove paint SCUFF', 'parking lot scuff'] }
        ]
    },
    {
        slug: 'odor-elimination',
        title: 'Odor Elimination',
        shortDescription: 'Ozone treatment and deep cleaning.',
        fullDescription: 'Permanent removal of organic and chemical odors using enzyme cleaners, ozone generators, and thorough extraction.',
        clusters: [
            { slug: 'ozone-treatment', title: 'Science of Ozone', description: 'How O3 neutralizes bacteria and smells.', longTailKeywords: ['ozone generator car', 'remove smoke smell'], wikiContent: "Odor removal might be needed when there is a lingering smell inside a vehicle that can be difficult to remove. Most of the time, this originates from a source that can be difficult to reach and/or clean." },
            { slug: 'cigarette-smoke', title: 'Cigarette Smoke Removal', description: 'Cleaning headliners and vents for smokers.', longTailKeywords: ['buy smoker car', 'remove nicotine stain'] },
            { slug: 'spilled-milk', title: 'Spilled Milk & Food', description: 'Fighting sour organic smells.', longTailKeywords: ['rotten milk smell car', 'enzyme cleaner car'] },
            { slug: 'ac-vent-cleaning', title: 'AC System Cleaning', description: 'Killing mold in the ventilation system.', longTailKeywords: ['smelly ac car', 'clean evaporator core'] },
            { slug: 'cabin-filter', title: 'Cabin Air Filter', description: 'The first line of defense against odors.', longTailKeywords: ['change cabin filter', 'hepa filter car'] }
        ]
    },
    {
        slug: 'leather-conditioning',
        title: 'Leather Conditioning',
        shortDescription: 'Clean and protect leather seats.',
        fullDescription: 'Gentle cleaning to remove body oils followed by premium conditioning to keep leather soft, supple, and protected from UV rays.',
        clusters: [
            { slug: 'prevent-cracking', title: 'Preventing Leather Cracks', description: 'Why hydration is key for leather longevity.', longTailKeywords: ['leather seat repair', 'dry leather car'], wikiContent: "Leather itself has to withstand a lot of abuse over the years. Jeans rubbing over it, dirty clothes, UV, high temperatures, dry air, humid air, chemicals etc. To keep the leather looking fresh and prevent it from drying out, a leather protection can be used." },
            { slug: 'perforated-leather', title: 'Cleaning Perforated Leather', description: 'Avoiding clogged pores in cooled seats.', longTailKeywords: ['clean ventilated seats', 'perforated leather care'] },
            { slug: 'matte-finish', title: 'Matte vs Shiny Leather', description: 'Why clean leather should not be shiny.', longTailKeywords: ['remove shiny oil leather', 'factory matte look'] },
            { slug: 'vegan-leather', title: 'Vegan & Synthetic Leather', description: 'Care for Tesla seats and MB-Tex.', longTailKeywords: ['tesla white seat cleaning', 'vinyl seat care'] },
            { slug: 'dye-transfer', title: 'Dye Transfer Removal', description: 'Removing blue jean stains from light leather.', longTailKeywords: ['blue jean stain car seat', 'light leather cleaner'] }
        ]
    },
    {
        slug: 'pet-hair-removal',
        title: 'Pet Hair Removal',
        shortDescription: 'Specialized tools to remove stubborn pet hair.',
        fullDescription: 'Using specialized rubber brushes, static electricity, and high-velocity air to remove woven-in pet hair that vacuums miss.',
        clusters: [
            { slug: 'tools-techniques', title: 'Tools for Dog Hair', description: 'Beyond just vacuuming.', longTailKeywords: ['lily brush', 'pumice stone car carpet'], wikiContent: "Dog hair in the interior of a car can be real nuisance. The hairs get stuck in the fibers of the fabric and become very difficult to remove. Using just a vacuum cleaner is often unsuccesfull, however, with a few tips these hairs can be removed much easier." },
            { slug: 'allergies', title: 'Detailing for Allergies', description: 'Removing dander for sensitive passengers.', longTailKeywords: ['car air quality', 'remove dander'] },
            { slug: 'cargo-protection', title: 'Protecting Cargo Areas', description: 'Liners and covers for dog owners.', longTailKeywords: ['canvasback liners', 'dog hammock car'] },
            { slug: 'fabric-vs-leather', title: 'Fabric vs Leather for Pets', description: 'Which interior handles dogs better?', longTailKeywords: ['best car interior for dogs', 'cleaning dog drool'] },
            { slug: 'wet-dog-smell', title: 'Removing "Wet Dog" Smell', description: 'Deodorizing after a lake trip.', longTailKeywords: ['dog smell removal', 'enzyme treatment'] }
        ]
    },
    {
        slug: 'water-spot-removal',
        title: 'Water Spot Removal',
        shortDescription: 'Removing mineral deposits from paint and glass.',
        fullDescription: 'Chemical and mechanical removal of hard water spots (calcium and magnesium deposits) that etch into paint and glass.',
        clusters: [
            { slug: 'spot-types', title: 'Type 1 vs Type 2 Spots', description: 'Surface deposits vs etched damage.', longTailKeywords: ['etched water spots', 'hard water stain'], wikiContent: "Mineral deposits are spots of minerals that are left behind when the carrier evaporated. Although the liquid evaporates, the minerals in that liquid don’t. They are left behind." },
            { slug: 'glass-vs-paint', title: 'Glass vs Paint', description: 'Different techniques for different surfaces.', longTailKeywords: ['clean shower glass', 'polish windshield'] },
            { slug: 'prevention', title: 'Preventing Spots', description: 'Dealing with San Antonio hard water.', longTailKeywords: ['water softener car wash', 'dry car fast'] },
            { slug: 'acid-rain', title: 'Acid Rain Damage', description: 'Environmental fallout on your paint.', longTailKeywords: ['industrial fallout', 'chemical decontamination'] },
            { slug: 'sprinkler-damage', title: 'Sprinkler Water Damage', description: 'The worst enemy of parked cars.', longTailKeywords: ['remove sprinkler stains', 'golf course water spots'] }
        ]
    },
    {
        slug: 'glass-treatment',
        title: 'Glass Treatment',
        shortDescription: 'Hydrophobic coatings for windshields.',
        fullDescription: 'Polishing glass to absolute clarity and applying a durable hydrophobic coating for better vision in rain.',
        clusters: [
            { slug: 'rain-repellency', title: 'Rain Repellency Safety', description: 'Improving reaction time in storms.', longTailKeywords: ['rain-x alternative', 'glass ceramic coating'] },
            { slug: 'tint-safe-cleaning', title: 'Cleaning Tinted Windows', description: 'Ammonia-free cleaning for aftermarket tint.', longTailKeywords: ['safe glass cleaner', 'streak free windows'] },
            { slug: 'windshield-haze', title: 'Removing Windshield Haze', description: 'Deep cleaning off-gassing residues.', longTailKeywords: ['foggy inside cylinder', 'clean inside windshield'] },
            { slug: 'glass-polishing', title: 'Glass Polishing', description: 'Removing wiper scratches and grit.', longTailKeywords: ['remove wiper scratches', 'cerium oxide'], wikiContent: "Wiper marks are surface imperfections in the direction and line that windscreen wipers move. Simply put, these are marks in the glass caused by the movement of the windscreen wipers. They can affect your vision and are difficult to remove." },
            { slug: 'wiper-maintenance', title: 'Wiper Blade Maintenance', description: 'Making your blades last longer.', longTailKeywords: ['clean wiper blades', 'silicone wipers'] }
        ]
    },
    {
        slug: 'chrome-polishing',
        title: 'Chrome Polishing',
        shortDescription: 'Restoring shine to chrome trim and bumpers.',
        fullDescription: 'Restoring the mirror-like finish to chrome bumpers, trim, and exhaust tips by removing tarnish and oxidation.',
        clusters: [
            { slug: 'rust-pitting', title: 'Removing Rust Pitting', description: 'Saving vintage chrome from replacements.', longTailKeywords: ['chrome rust removal', '0000 steel wool'], wikiContent: "Salt is an unwelcome type of contamination on your vehicle. Salt can cause rapid corrosion and extreme damage to unprotected metals. It can also severely stain polished metals and create a matte look over the surface." },
            { slug: 'exhaust-tips', title: 'Polishing Exhaust Tips', description: 'Removing carbon buildup and soot.', longTailKeywords: ['black exhaust tips clean', 'metal polish'] },
            { slug: 'plastic-chrome', title: 'Real vs Plastic Chrome', description: 'How to treat modern plastic trim.', longTailKeywords: ['clean plastic chrome', 'water spots on grill'] },
            { slug: 'protecting-metal', title: 'Protecting Metal Trim', description: 'Sealing chrome against future rust.', longTailKeywords: ['metal sealant', 'sharkhide'] },
            { slug: 'grill-restoration', title: 'Restoring Grill Shine', description: 'Detailed cleaning of complex grilles.', longTailKeywords: ['clean truck grill', 'water spot removal chrome'] }
        ]
    },
];
