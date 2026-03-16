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
      <h2 className="text-xl font-bold">Review