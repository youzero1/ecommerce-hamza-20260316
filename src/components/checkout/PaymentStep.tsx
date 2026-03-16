'use client';

import { PaymentInfo } from '@/lib/types';

interface PaymentStepProps {
  data: PaymentInfo;
  onChange: (data: PaymentInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ data, onChange, onNext, onBack }: PaymentStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const update = (field: keyof PaymentInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h2 className="text-xl font-bold">Payment Information</h2>
      <p className="text-sm text-gray-500">This is a demo — no real payment is processed.</p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <input
          required
          value={data.cardNumber}
          onChange={(e) => update('cardNumber', e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
        <input
          required
          value={data.cardName}
          onChange={(e) => update('cardName', e.target.value)}
          className="input-field"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
          <input
            required
            value={data.expiry}
            onChange={(e) => update('expiry', e.target.value)}
            placeholder="MM/YY"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input
            required
            value={data.cvv}
            onChange={(e) => update('cvv', e.target.value)}
            placeholder="123"
            className="input-field"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 py-3">
          Back
        </button>
        <button type="submit" className="btn-primary flex-1 py-3">
          Review Order
        </button>
      </div>
    </form>
  );
}