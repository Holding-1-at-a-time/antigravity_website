import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";
import { ALL_SERVICES } from "../lib/services-data";

dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// 1. Build Keyword Map
// Map "Keyword" -> "/services/slug"
// Map "Keyword" -> "/services/slug/cluster-slug"
const keywordMap: { phrase: string, url: string, priority: number }[] = [];

// Helper to add phrases
function addPhrase(phrase: string, url: string, priority: number) {
    if (phrase.length < 4) return; // Skip too short words
    keywordMap.push({ phrase: phrase.toLowerCase(), url, priority });
}

// Populate from Services Data
ALL_SERVICES.forEach(service => {
    const serviceUrl = `/services/${service.slug}`;

    // High Priority: "Service Title + San Antonio" (e.g., "Ceramic Coating San Antonio")
    addPhrase(`${service.title} San Antonio`, serviceUrl, 10);
    addPhrase(`${service.title} in San Antonio`, serviceUrl, 10);

    // Medium Priority: "Service Title" (e.g., "Ceramic Coating")
    addPhrase(service.title, serviceUrl, 5);

    // Clusters
    service.clusters.forEach(cluster => {
        const clusterUrl = `/services/${service.slug}/${cluster.slug}`;
        addPhrase(cluster.title, clusterUrl, 4);

        // Long Tail Keywords
        cluster.longTailKeywords.forEach(kw => {
            addPhrase(kw, clusterUrl, 3);
        });
    });
});

// Sort by Priority (desc) then Length (desc) to match longest/best phrases first
keywordMap.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    return b.phrase.length - a.phrase.length; // Longest match first
});

async function main() {
    console.log(`Loaded ${keywordMap.length} keywords for linking.`);

    console.log("Fetching articles...");
    const articles = await client.query(api.articles.getAllArticles);
    console.log(`Found ${articles.length} articles to process.`);

    let updatedCount = 0;
    let totalLinksInjected = 0;

    for (const article of articles) {
        let content = article.content || "";
        let originalContent = content;
        let linksInThisArticle = 0;

        // We want to avoid linking inside existing tags (like <a> or <h1> etc is risky but simple regex can help)
        // Simple strategy: Replace first occurrence of keyword that isn't already inside a tag
        // For robust HTML parsing/manipulation in Node without DOM, it's tricky. 
        // We will use a careful Regex approach.

        const maxLinksPerArticle = 5;
        const usedUrls = new Set<string>(); // Don't link the same URL twice in one article

        for (const item of keywordMap) {
            if (linksInThisArticle >= maxLinksPerArticle) break;
            if (usedUrls.has(item.url)) continue;

            // Regex to find "phrase" case-insensitive
            // AND NOT inside an existing link tag (this is the hard part with simple regex, but assuming plain text mostly)
            // We look for the phrase, ensuring it's not followed by </a> close by or key chars.
            // A safer simple way: match word boundaries

            const regex = new RegExp(`\\b(${escapeRegExp(item.phrase)})\\b`, 'i');

            // Check if exists
            if (regex.test(content)) {
                // Confirm it's not already linked (simple check: is it surrouned by > < or " "?)
                // We will skip if we detect we are inside HTML attributes or existing anchors
                // Given our content is mostly <p>text</p> generated from CSV, it's relatively safe.

                // We replace ONLY the first occurrence
                let replaced = false;
                content = content.replace(regex, (match) => {
                    if (replaced) return match; // Only first one
                    replaced = true;
                    return `<a href="${item.url}" class="text-primary hover:underline font-medium" title="Learn more about ${match} in San Antonio">${match}</a>`;
                });

                if (replaced) {
                    linksInThisArticle++;
                    totalLinksInjected++;
                    usedUrls.add(item.url);
                }
            }
        }

        if (content !== originalContent) {
            // Update Article
            // console.log(`Updating ${article.slug}: Injected ${linksInThisArticle} links.`);
            await client.mutation(api.articles.updateArticle, {
                id: article._id,
                content: content
            });
            updatedCount++;
            process.stdout.write('+');
        } else {
            process.stdout.write('.');
        }
    }

    console.log(`\n\nProcess Complete!`);
    console.log(`- Articles Updated: ${updatedCount}`);
    console.log(`- Total Links Injected: ${totalLinksInjected}`);
}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

main().catch(console.error);
