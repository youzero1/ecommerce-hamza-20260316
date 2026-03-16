'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ProductType } from '@/lib/types';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="card group hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
          {product.category}
        </span>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mt-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link