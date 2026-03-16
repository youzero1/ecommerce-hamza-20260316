'use client';

import { ShippingInfo } from '@/lib/types';

interface ShippingStepProps {
  data: ShippingInfo;
  onChange: (data: ShippingInfo) => void;
  onNext: () => void;
}

export default function ShippingStep({ data, onChange, onNext }: ShippingStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const update = (field: keyof ShippingInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h2 className="text-xl font-bold">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            required
            value={data.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            required
            value={data.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          required
          type="email"
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          required
          value={data.address}
          onChange={(e) => update('address', e.target.value)}
          className="input-field"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            required
            value={data.city}
            onChange={(e) => update('city', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            required
            value={data.state}
            onChange={(e) => update('state', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            required
            value={data.zipCode}
            onChange={(e) => update('zipCode', e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      <button type="submit" className="btn-primary w-full py-3">
        Continue to Payment
      </button>
    </form>
  );
}