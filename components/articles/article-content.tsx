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
  if (typeof window === 'undefined') {
    // Server-side: use a library like 'node-html-parser' or 'jsdom'
    return content;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const h2Elements = doc.querySelectorAll('h2');

  let index = 0;
  h2Elements.forEach((h2) => {
    if (!h2.hasAttribute('id')) {
      const text = h2.textContent || '';
      const id = generateSlug(text.trim(), index);
      h2.setAttribute('id', id);
      index++;
    }
  });

  return doc.body.innerHTML;
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