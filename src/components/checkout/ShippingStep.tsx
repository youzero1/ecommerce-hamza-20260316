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
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            required
            value={data.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            required
            value={data.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="input-field"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            className="input-field"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            required
            value={data.address}
            onChange={(e) => update('address', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            required
            value={data.city}
            onChange={(e) => update('city', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            required
            value={data.state}
            onChange={(e) => update('state', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            required
            value={data.zipCode}
            onChange={(e) => update('zipCode', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            value={data.country}
            onChange={(e) => update('country', e.target.value)}
            className="input-field"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button type="submit" className="btn-primary px-8 py-3">
          Continue to Payment
        </button>
      </div>
    </form>
  );
}