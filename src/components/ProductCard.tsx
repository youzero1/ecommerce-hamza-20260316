'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }: { product: ProductType }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} className="card group hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-900 mt-2 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold text-lg">${Number(product.price).toFixed(2)}</span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="btn-primary text-sm py-1.5 px-3"
          >
            {added ? '✓' : '+ Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
