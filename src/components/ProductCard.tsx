'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-blue-600">
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="btn-primary text-sm py-1 px-3"
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}