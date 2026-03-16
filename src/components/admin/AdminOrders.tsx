'use client';

import { useEffect, useState } from 'react';
import { OrderType } from '@/lib/types';

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<OrderType | null>(null);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setOrders(data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Orders ({orders.length})</h2>

      {selected && (
        <div className="card p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg">Order #{selected.id.toString().padStart(6, '0')}</h3>
            <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{selected.customerName}</p>
              <p className="text-sm text-gray-600">{selected.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Shipping Address</p>
              <p className="text-sm">{selected.shippingAddress}</p>
            </div>
          </div>
          {selected.items && selected.items.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Items</h4>
              <div className="space-y-2">
                {selected.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm bg-gray-50 rounded p-2">
                    <span>{item.product?.name || `Product #${item.productId}`} × {item.quantity}</span>
                    <span className="font-medium">${(Number(item.priceAtPurchase) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold mt-3 pt-3 border-t">
                <span>Total</span>
                <span>${Number(selected.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-500 text-lg">No orders yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-gray-500">Order #</th>
                <th className="text-left py-3 text-gray-500">Customer</th>
                <th className="text-left py-3 text-gray-500">Email</th>
                <th className="text-left py-3 text-gray-500">Total</th>
                <th className="text-left py-3 text-gray-500">Status</th>
                <th className="text-left py-3 text-gray-500">Date</th>
                <th className="text-left py-3 text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-mono">#{order.id.toString().padStart(6, '0')}</td>
                  <td className="py-3 font-medium">{order.customerName}</td>
                  <td className="py-3 text-gray-500">{order.customerEmail}</td>
                  <td className="py-3 font-medium">${Number(order.totalAmount).toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelected(order)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
