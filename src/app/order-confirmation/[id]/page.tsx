'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { OrderType } from '@/lib/types';

export default function OrderConfirmationPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params?.id) {
      fetch(`/api/orders/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setOrder(data);
        })
        .catch(() => setError('Failed to load order'))
        .finally(() => setLoading(false));
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600">{error || 'Order not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="card p-8 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-6">Thank you for your purchase, {order.customerName}!</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-600 font-medium">Order Number</p>
          <p className="text-2xl font-bold text-blue-800">#{order.id.toString().padStart(6, '0')}</p>
        </div>

        <div className="text-left space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{order.customerEmail}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping to</span>
            <span className="font-medium text-right max-w-xs">{order.shippingAddress}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-blue-600">${Number(order.totalAmount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
              {order.status}
            </span>
          </div>
        </div>

        {order.items && order.items.length > 0 && (
          <div className="text-left mb-6">
            <h3 className="font-semibold mb-3">Items Ordered</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product?.name || `Product #${item.productId}`} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(Number(item.priceAtPurchase) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Link href="/" className="btn-primary flex-1 text-center py-3">
            Continue Shopping
          </Link>
          <Link href="/admin" className="btn-secondary flex-1 text-center py-3">
            View Admin
          </Link>
        </div>
      </div>
    </div>
  );
}