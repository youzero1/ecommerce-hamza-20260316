'use client';

import Link from 'next/link';

const CATEGORIES = ['Electronics', 'Sports', 'Home', 'Accessories'];

interface CategoryFilterProps {
  activeCategory?: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  return (
    <div className="card p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
      <div className="space-y-1">
        <Link
          href="/"
          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            !activeCategory
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Products
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${cat}`}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}