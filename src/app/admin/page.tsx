'use client';

import { useState } from 'react';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminDashboard from '@/components/admin/AdminDashboard';

type Tab = 'dashboard' | 'products' | 'orders';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {(['dashboard', 'products', 'orders'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && <AdminDashboard />}
      {activeTab === 'products' && <AdminProducts />}
      {activeTab === 'orders' && <AdminOrders />}
    </div>
  );
}
