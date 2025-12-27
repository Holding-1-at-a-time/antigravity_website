import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-400 mb-8">
      {items.map((item, index) => (
        <span key={item.href}>
          {index > 0 && <span className="mx-2">/</span>}
          {index === items.length - 1 ? (
            <span className="text-white">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}