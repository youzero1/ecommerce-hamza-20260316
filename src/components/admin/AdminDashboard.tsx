'use client';

import { useEffect, useState } from 'react';
import { OrderType, ProductType } from '@/lib/types';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then((r) => r.json()),
      fetch('/api/products').then((r) => r.json()),
    ])
      .then(([o, p]) => {
        if (Array.isArray(o)) setOrders(o);
        if (Array.isArray(p)) setProducts(p);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon="💰" color="blue" />
        <StatCard title="Total Orders" value={orders.length.toString()} icon="📦" color="green" />
        <StatCard title="Pending Orders" value={pendingOrders.toString()} icon="⏳" color="yellow" />
        <StatCard title="Products" value={products.length.toString()} icon="🛍️" color="purple" />
      </div>

      {lowStockProducts > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 font-medium">⚠️ {lowStockProducts} product(s) have low stock (under 10 units)</p>
        </div>
      )}

      <div className="card p-6">
        <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-gray-500">Order #</th>
                  <th className="text-left py-2 text-gray-500">Customer</th>
                  <th className="text-left py-2 text-gray-500">Total</th>
                  <th className="text-left py-2 text-gray-500">Status</th>
                  <th className="text-left py-2 text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">#{order.id.toString().padStart(6, '0')}</td>
                    <td className="py-2">{order.customerName}</td>
                    <td className="py-2 font-medium">${Number(order.totalAmount).toFixed(2)}</td>
                    <td className="py-2">
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs capitalize">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200',
  };
  return (
    <div className={`card p-6 border ${colorMap[color] || 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
