'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ShopNext
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Shop
          </Link>
          <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
            Admin
          </Link>
          <Link href="/cart" className="relative flex items-center gap-2 btn-primary">
            <span>🛒</span>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/admin" className="block py-2 text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
