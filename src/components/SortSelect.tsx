'use client';

import { useRouter } from 'next/navigation';

interface SortSelectProps {
  defaultValue?: string;
}

export default function SortSelect({ defaultValue = 'newest' }: SortSelectProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', e.target.value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <select
      defaultValue={defaultValue}
      onChange={handleChange}
      className="input-field"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A-Z</option>
    </select>
  );
}