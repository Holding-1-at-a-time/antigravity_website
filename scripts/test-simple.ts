console.log("SCRIPT STARTING");
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function populateArticles() {
    const articles = [
        {
            slug: "test-article",
            title: "Test Article",
            category: "Maintenance",
            categorySlug: "maintenance",
            excerpt: "Test",
            content: "<p>Test</p>",
            readingTime: 1,
            publishedAt: Date.now(),
            updatedAt: Date.now(),
            faqs: []
        }
    ];

    console.log("Starting article population...");
    console.log("URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
        console.error("Missing NEXT_PUBLIC_CONVEX_URL. Make sure .env.local is populated.");
        return;
    }

    for (const article of articles) {
        try {
            console.log(`Attempting to populate: ${article.title}`);
            const result = await client.mutation(api.articles.createArticle, article as any);
            console.log(`Successfully populated: ${article.title}, ID: ${result}`);
        } catch (error) {
            console.error(`Failed to populate ${article.title}:`, error);
        }
    }

    console.log("Population complete!");
}

populateArticles().catch(console.error);
