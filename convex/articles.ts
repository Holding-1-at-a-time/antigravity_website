import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all articles
export const getAllArticles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("articles").collect();
  },
});

// Get article by slug
export const getArticleBySlug = query({
  args: {
    categorySlug: v.string(),
    articleSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const article = await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", args.articleSlug))
      .first();

    // Also check category matches
    if (article && article.categorySlug === args.categorySlug) {
      return article;
    }
    return null;
  },
});

// Get articles by category
export const getArticlesByCategory = query({
  args: {
    categorySlug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("articles")
      .withIndex("by_category", (q) => q.eq("categorySlug", args.categorySlug))
      .collect();
  },
});

// Get featured articles (most recent)
export const getFeaturedArticles = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 6;
    return await ctx.db
      .query("articles")
      .withIndex("by_published", (q) => q)
      .order("desc")
      .take(limit);
  },
});

// Create article (admin only)
export const createArticle = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    category: v.string(),
    categorySlug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    readingTime: v.number(),
    publishedAt: v.number(),
    updatedAt: v.number(),
    relatedServiceSlug: v.optional(v.string()),
    faqs: v.array(v.object({
      question: v.string(),
      answer: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    // TODO: Add authentication check for admin
    return await ctx.db.insert("articles", args);
  },
});

// Update article (admin only)
export const updateArticle = mutation({
  args: {
    id: v.id("articles"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    categorySlug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    readingTime: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    relatedServiceSlug: v.optional(v.string()),
    faqs: v.optional(v.array(v.object({
      question: v.string(),
      answer: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    // TODO: Add authentication check for admin
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Delete article (admin only)
export const deleteArticle = mutation({
  args: {
    id: v.id("articles"),
  },
  handler: async (ctx, args) => {
    // TODO: Add authentication check for admin
    return await ctx.db.delete(args.id);
  },
});