
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function main() {
    const articles = await client.query(api.articles.getAllArticles);
    console.log(`Total Articles in DB: ${articles.length}`);
}

main().catch(console.error);
