import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

console.log("NEXT_PUBLIC_CONVEX_URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    console.error("Missing NEXT_PUBLIC_CONVEX_URL");
    process.exit(1);
}

import { ConvexHttpClient } from "convex/browser";

try {
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    console.log("Convex client initialized");
} catch (error) {
    console.error("Failed to initialize Convex client:", error);
}
