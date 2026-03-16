'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = ['Electronics', 'Sports', 'Home', 'Accessories'];

interface CategoryFilterProps {
  activeCategory?: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const searchParams = useSearchParams();

  const buildUrl = (category?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    return `/?${params.toString()}`;
  };

  return (
    <div className="card p-4">
      <h3 className="font-bold text-gray-900 mb-3">Categories</h3>
      <div className="space-y-1">
        <Link
          href={buildUrl()}
          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            !activeCategory
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Products
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={buildUrl(cat)}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}