'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShippingInfo, PaymentInfo } from '@/lib/types';
import ShippingStep from '@/components/checkout/ShippingStep';
import PaymentStep from '@/components/checkout/PaymentStep';
import ReviewStep from '@/components/checkout/ReviewStep';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const shippingCost = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const orderData = {
        customerName: `${shipping.firstName} ${shipping.lastName}`,
        customerEmail: shipping.email,
        shippingAddress: `${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zipCode}, ${shipping.country}`,
        totalAmount: total,
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          priceAtPurchase: i.product.price,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      clearCart();
      router.push(`/order-confirmation/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span
              className={`ml-2 font-medium ${
                i <= step ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-4 flex-1 h-1 w-16 rounded ${
                  i < step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {step === 0 && (
        <ShippingStep
          data={shipping}
          onChange={setShipping}
          onNext={() => setStep(1)}
        />
      )}
      {step === 1 && (
        <PaymentStep
          data={payment}
          onChange={setPayment}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <ReviewStep
          shipping={shipping}
          payment={payment}
          items={items}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
          onBack={() => setStep(1)}
          onPlaceOrder={handlePlaceOrder}
          loading={loading}
        />
      )}
    </div>
  );
}
