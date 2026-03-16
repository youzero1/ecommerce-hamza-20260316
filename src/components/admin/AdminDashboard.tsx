'use client';

import { useEffect, useState } from 'react';
import { ProductType, OrderType } from '@/lib/types';

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/orders').then((r) => r.json()),
    ])
      .then(([prods, ords]) => {
        if (Array.isArray(prods)) setProducts(prods);
        if (Array.isArray(ords)) setOrders(ords);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse">Loading dashboard...</div>;

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const lowStock = products.filter((p) => p.stock < 10).length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-bold text-purple-600">{totalProducts}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <p className="text-3xl font-bold text-red-600">{lowStock}</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Order ID</th>
                  <th className="text-left py-2 px-3">Customer</th>
                  <th className="text-left py-2 px-3">Total</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2 px-3">#{order.id.toString().padStart(6, '0')}</td>
                    <td className="py-2 px-3">{order.customerName}</td>
                    <td className="py-2 px-3">${Number(order.totalAmount).toFixed(2)}</td>
                    <td className="py-2 px-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs capitalize">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
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