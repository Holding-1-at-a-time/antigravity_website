interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div
      className="prose prose-lg prose-invert max-w-none mb-16"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}