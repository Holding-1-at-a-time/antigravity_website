import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  articles: defineTable({
    slug: v.string(),
    title: v.string(),
    category: v.string(),
    categorySlug: v.string(),
    excerpt: v.string(),
    content: v.string(), // Full HTML content
    readingTime: v.number(),
    publishedAt: v.number(),
    updatedAt: v.number(),
    relatedServiceSlug: v.optional(v.string()),
    faqs: v.array(v.object({
      question: v.string(),
      answer: v.string(),
    })),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categorySlug"])
    .index("by_published", ["publishedAt"]),
});