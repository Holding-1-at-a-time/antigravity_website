interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // Add IDs to H2 headings for table of contents navigation
  const contentWithIds = addIdsToHeadings(content);

  return (
    <div
      className="prose prose-lg prose-invert max-w-none mb-16"
      dangerouslySetInnerHTML={{ __html: contentWithIds }}
    />
  );
}

// Helper function to add IDs to H2 headings
function addIdsToHeadings(content: string): string {
  const headingRegex = /<h2([^>]*)>([^<]+)<\/h2>/gi;
  let index = 0;
  
  return content.replace(headingRegex, (match, attributes, text) => {
    const id = generateSlug(text.trim(), index);
    const hasId = attributes.includes('id=');
    
    if (hasId) {
      // If heading already has an ID, don't modify it
      return match;
    }
    
    index++;
    return `<h2${attributes} id="${id}">${text}</h2>`;
  });
}

// Helper function to generate URL-safe slugs (same as in page.tsx)
function generateSlug(text: string, index: number): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    + (index > 0 ? `-${index}` : '');
}