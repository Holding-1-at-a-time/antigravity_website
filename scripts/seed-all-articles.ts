
import fs from 'fs';
import path from 'path';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
    console.error("Missing NEXT_PUBLIC_CONVEX_URL in .env.local");
    process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

// Categories mapping
const CATEGORY_MAP: Record<string, { title: string; slug: string }> = {
    'protection': { title: 'Protection', slug: 'protection' },
    'washing': { title: 'Washing', slug: 'washing' },
    'correction': { title: 'Paint Correction', slug: 'correction' },
    'decontaminating': { title: 'Decontaminating', slug: 'decontaminating' },
    'guides': { title: 'Guides', slug: 'guides' },
    'maintenance': { title: 'Maintenance', slug: 'maintenance' },
    'miscellaneous': { title: 'Miscellaneous', slug: 'miscellaneous' },
};

// CSV Mapping Helper
function mapCsvCategory(csvTagUrl: string, csvContent: string): { title: string; slug: string } {
    const contentLower = csvContent.toLowerCase();
    const urlLower = csvTagUrl.toLowerCase();

    if (urlLower.includes('correction') || contentLower.includes('correction') || contentLower.includes('polish')) return CATEGORY_MAP['correction'];
    if (urlLower.includes('wash') || contentLower.includes('wash')) return CATEGORY_MAP['washing'];
    if (urlLower.includes('protect') || contentLower.includes('coat') || contentLower.includes('sealant')) return CATEGORY_MAP['protection'];
    if (urlLower.includes('decon') || contentLower.includes('clay') || contentLower.includes('tar') || contentLower.includes('iron')) return CATEGORY_MAP['decontaminating'];
    if (urlLower.includes('guide') || contentLower.includes('how to')) return CATEGORY_MAP['guides'];
    if (urlLower.includes('maintain') || contentLower.includes('maintenance')) return CATEGORY_MAP['maintenance'];

    return CATEGORY_MAP['miscellaneous'];
}

function parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuote = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

const CSV_PATH = path.join(process.cwd(), 'DETAILING_WIKI - DETAILING_WIKI.csv');

async function main() {
    console.log("Reading CSV...");
    const fileContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = fileContent.split('\n');

    // Skip header
    const dataLines = lines.slice(1);

    let count = 0;

    console.log(`Found ${dataLines.length} lines. Processing...`);

    for (const line of dataLines) {
        if (!line.trim()) continue;

        const columns = parseCSVLine(line);
        // Columns: uuid, article_url, article
        if (columns.length < 3) continue;

        const url = columns[1];
        const content = columns[2].replace(/^"|"$/g, '').replace(/""/g, '"'); // Remove surrounding quotes and unescape

        // Extract slug from URL: https://www.detailingwiki.org/tag/slug/
        const match = url.match(/\/tag\/([^/]+)\/?/);
        if (!match) continue;

        const slug = match[1];
        const category = mapCsvCategory(url, content);

        // Format Title: slug-to-title
        const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        // Generate Article Object
        const article = {
            slug: slug,
            title: title,
            category: category.title,
            categorySlug: category.slug,
            excerpt: content.substring(0, 150) + '...',
            content: `
          <p>${content}</p>
          <h2>About ${title}</h2>
          <p>This article covers key aspects of ${title} in the context of auto detailing.</p>
          <p>For professional ${title} services in San Antonio, contact One Detail At A Time.</p>
        `,
            readingTime: Math.ceil(content.length / 200) || 1,
            publishedAt: Date.now(),
            updatedAt: Date.now(),
            faqs: [
                {
                    question: `What is ${title}?`,
                    answer: content.substring(0, 200)
                }
            ]
        };

        try {
            await client.mutation(api.articles.seedArticle, article);
            process.stdout.write('.');
            count++;
            if (count % 100 === 0) console.log(`\nSeeded ${count} articles...`);
        } catch (e) {
            console.error(`\nFailed to seed ${slug}:`, e);
        }
    }

    console.log(`\nFinished! Seeded ${count} articles.`);
}

main().catch(console.error);
