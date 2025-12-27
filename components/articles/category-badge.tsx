interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryColors = {
  Protection: 'bg-blue-500/20 text-blue-400',
  Washing: 'bg-cyan-500/20 text-cyan-400',
  'Paint Correction': 'bg-purple-500/20 text-purple-400',
  Decontaminating: 'bg-green-500/20 text-green-400',
  Guides: 'bg-orange-500/20 text-orange-400',
  Maintenance: 'bg-yellow-500/20 text-yellow-400',
  Miscellaneous: 'bg-gray-500/20 text-gray-400',
};

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const colorClass = categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500/20 text-gray-400';

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass} ${className}`}>
      {category}
    </span>
  );
}