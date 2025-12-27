import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const LOCAL_URL = 'http://localhost:3000';

async function checkUrl(url: string): Promise<boolean> {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.status === 200;
    } catch (e) {
        return false;
    }
}

async function verifyLinks() {
    console.log("Fetching articles from Convex...");
    const articles = await client.query(api.articles.getAllArticles);
    console.log(`Found ${articles.length} articles.`);

    // 1. Verify Pages Load (Random Sample)
    const SAMPLE_SIZE = 20;
    const sample = articles.sort(() => 0.5 - Math.random()).slice(0, SAMPLE_SIZE);

    console.log(`\nVerifying ${SAMPLE_SIZE} random article pages...`);
    let successCount = 0;

    for (const article of sample) {
        const url = `${LOCAL_URL}/articles/${article.categorySlug}/${article.slug}`;
        process.stdout.write(`Checking ${article.slug}... `);

        // We can't easily check localhost from this node script if it's not on the same network/environment effectively without fetch
        // But assuming we are in the same environment:
        const isOk = await checkUrl(url);
        if (isOk) {
            console.log("✅ OK");
            successCount++;
        } else {
            console.log("❌ FAILED (Possible 404 or Server Error)");
        }
    }

    console.log(`\nResults: ${successCount}/${SAMPLE_SIZE} pages accessible.`);

    // 2. Scan for Internal Links
    console.log("\nScanning content for internal links...");
    let articlesWithLinks = 0;
    let totalLinks = 0;

    for (const article of articles) {
        const content = article.content || "";
        // Regex for <a href="...">
        const links = content.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g);

        if (links && links.length > 0) {
            articlesWithLinks++;
            totalLinks += links.length;
            // console.log(`Article ${article.slug} has ${links.length} links.`);
        }
    }

    console.log(`\nLink Audit:`);
    console.log(`- Articles with links: ${articlesWithLinks}/${articles.length}`);
    console.log(`- Total links found: ${totalLinks}`);

    if (articlesWithLinks === 0) {
        console.log("\n⚠️  No internal links found in article content. This is expected if they were just imported plain text.");
        console.log("Suggestion: Run an internal linking script to inject service page links.");
    }
}

verifyLinks().catch(console.error);
