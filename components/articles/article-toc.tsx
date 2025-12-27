interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTocProps {
  items: TocItem[];
}

export default function ArticleToc({ items }: ArticleTocProps) {
  if (items.length === 0) return null;

  return (
    <div className="sticky top-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 text-white">Table of Contents</h3>
        <nav className="space-y-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm hover:text-primary transition-colors ${
                item.level === 2 ? 'text-gray-300' : 'text-gray-400 ml-4'
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}