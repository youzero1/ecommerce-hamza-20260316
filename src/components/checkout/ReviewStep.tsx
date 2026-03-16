'use client';

import { CartItem, ShippingInfo, PaymentInfo } from '@/lib/types';
import Image from 'next/image';

interface Props {
  shipping: ShippingInfo;
  payment: PaymentInfo;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  onBack: () => void;
  onPlaceOrder: () => void;
  loading: boolean;
}

export default function ReviewStep({
  shipping, payment, items, subtotal, shippingCost, total, onBack, onPlaceOrder, loading
}: Props) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Order Review</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Shipping To</h3>
            <p className="text-sm text-gray-600">{shipping.firstName} {shipping.lastName}</p>
            <p className="text-sm text-gray-600">{shipping.email}</p>
            <p className="text-sm text-gray-600">{shipping.address}</p>
            <p className="text-sm text-gray-600">{shipping.city}, {shipping.state} {shipping.zipCode}</p>
            <p className="text-sm text-gray-600">{shipping.country}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Payment</h3>
            <p className="text-sm text-gray-600">{shipping.cardName || payment.cardName}</p>
            <p className="text-sm text-gray-600">
              •••• •••• •••• {payment.cardNumber.slice(-4) || '****'}
            </p>
            <p className="text-sm text-gray-600">Expires: {payment.expiry}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-700 mb-3">Items</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(Number(item.product.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span>{shippingCost === 0 ? <span className="text-green-600">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary px-8 py-3">
          Back
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={loading}
          className="btn-primary px-8 py-3 text-lg"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
