---
description: Add a new Service to the website
---

# Add a New Service

This workflow guides you through adding a new service to the ODAAT website.

1.  **Open the Data File**: Open `lib/services-data.ts`.
2.  **Add Service Entry**: Add a new object to the `ALL_SERVICES` array. Use the following template:

```typescript
{
    slug: "new-service-slug", // URL-friendly ID
    title: "New Service Title",
    shortDescription: "Brief summary for cards.",
    fullDescription: "Detailed description for the pillar page.",
    icon: Sparkles, // Import icon from lucide-react
    clusters: [
        {
            slug: "sub-topic-1",
            title: "Sub Topic Title",
            description: "Description of this specific aspect.",
            longTailKeywords: ["keyword1", "keyword2"]
        }
    ]
}
```

3.  **Verify Icons**: Ensure any new icons are imported from `lucide-react` at the top of the file.
4.  **Verify Build**: Run the build to ensure the new routes are generated correctly.

// turbo
5.  Run a build check
pnpm build
