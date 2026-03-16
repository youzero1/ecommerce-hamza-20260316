'use client';

import { PaymentInfo } from '@/lib/types';
import { FormEvent } from 'react';

interface Props {
  data: PaymentInfo;
  onChange: (data: PaymentInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ data, onChange, onNext, onBack }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const set = (field: keyof PaymentInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, [field]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="text-xl font-bold mb-2">Payment Details</h2>
      <p className="text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mb-6">
        ⚠️ This is a demo. No real payment will be processed.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
          <input
            required
            className="input-field"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={data.cardNumber}
            onChange={set('cardNumber')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
          <input required className="input-field" placeholder="John Doe" value={data.cardName} onChange={set('cardName')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
            <input
              required
              className="input-field"
              placeholder="MM/YY"
              maxLength={5}
              value={data.expiry}
              onChange={set('expiry')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
            <input
              required
              className="input-field"
              placeholder="123"
              maxLength={4}
              value={data.cvv}
              onChange={set('cvv')}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary px-8 py-3">
          Back
        </button>
        <button type="submit" className="btn-primary px-8 py-3">
          Review Order
        </button>
      </div>
    </form>
  );
}
