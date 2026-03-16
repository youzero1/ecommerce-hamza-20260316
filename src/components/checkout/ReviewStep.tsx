'use client';

import { ShippingInfo, PaymentInfo, CartItem } from '@/lib/types';

interface ReviewStepProps {
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
  shipping,
  payment,
  items,
  subtotal,
  shippingCost,
  total,
  onBack,
  onPlaceOrder,
  loading,
}: ReviewStepProps) {
  return (
    <div className="card p-6 space-y-6">
      <h2 className="text-xl font-bold">Review Your Order</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
          <p className="text-gray-600 text-sm">
            {shipping.firstName} {shipping.lastName}<br />
            {shipping.address}<br />
            {shipping.city}, {shipping.state} {shipping.zipCode}<br />
            {shipping.country}
          </p>
          <p className="text-gray-600 text-sm mt-2">{shipping.email}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
          <p className="text-gray-600 text-sm">
            Card ending in {payment.cardNumber.slice(-4)}<br />
            {payment.cardName}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Order Items</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex-1 py-3"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={loading}
          className="btn-primary flex-1 py-3 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
