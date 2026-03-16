'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some products to get started!</p>
        <Link href="/" className="btn-primary text-lg px-8 py-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="card p-4 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/products/${item.product.id}`}
                  className="font-semibold text-gray-900 hover:text-blue-600"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500">{item.product.category}</p>
                <p className="text-blue-600 font-bold mt-1">
                  ${Number(item.product.price).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-500">
                Free shipping on orders over $50
              </p>
            )}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="btn-primary w-full text-center block mt-6 py-3"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/"
            className="btn-secondary w-full text-center block mt-3"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
