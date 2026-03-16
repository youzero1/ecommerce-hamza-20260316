'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books'];

export default function CategoryFilter({ activeCategory }: { activeCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (cat?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set('category', cat);
    else params.delete('category');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="card p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => handleCategory()}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeCategory
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Products
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => handleCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
