'use client';

import { ShippingInfo } from '@/lib/types';
import { FormEvent } from 'react';

interface Props {
  data: ShippingInfo;
  onChange: (data: ShippingInfo) => void;
  onNext: () => void;
}

export default function ShippingStep({ data, onChange, onNext }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const set = (field: keyof ShippingInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...data, [field]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input required className="input-field" value={data.firstName} onChange={set('firstName')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input required className="input-field" value={data.lastName} onChange={set('lastName')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input required type="email" className="input-field" value={data.email} onChange={set('email')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
          <input required className="input-field" value={data.address} onChange={set('address')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input required className="input-field" value={data.city} onChange={set('city')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
          <input required className="input-field" value={data.state} onChange={set('state')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
          <input required className="input-field" value={data.zipCode} onChange={set('zipCode')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
          <select required className="input-field" value={data.country} onChange={set('country')}>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
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
