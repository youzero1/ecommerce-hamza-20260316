'use client';

import { useEffect, useState } from 'react';
import { ProductType } from '@/lib/types';
import Image from 'next/image';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: 'Electronics',
  imageUrl: '',
  stock: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setProducts(data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleEdit = (p: ProductType) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      category: p.category,
      imageUrl: p.imageUrl,
      stock: p.stock.toString(),
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) fetchProducts();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      };
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save product');
      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Products ({products.length})</h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM); }}
          className="btn-primary"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Product' : 'New Product'}</h3>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input required className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Kitchen</option>
                <option>Books</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea required rows={3} className="input-field resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input required type="number" step="0.01" min="0" className="input-field" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
              <input required type="number" min="0" className="input-field" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
              <input required type="url" className="input-field" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setError(''); }} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card animate-pulse p-4">
              <div className="aspect-square bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-gray-500">Image</th>
                <th className="text-left py-3 text-gray-500">Name</th>
                <th className="text-left py-3 text-gray-500">Category</th>
                <th className="text-left py-3 text-gray-500">Price</th>
                <th className="text-left py-3 text-gray-500">Stock</th>
                <th className="text-left py-3 text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-3 font-medium max-w-xs">
                    <p className="truncate">{p.name}</p>
                  </td>
                  <td className="py-3 text-gray-500">{p.category}</td>
                  <td className="py-3 font-medium">${Number(p.price).toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      p.stock === 0 ? 'bg-red-100 text-red-800' :
                      p.stock < 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Delete
                      </button>
                    </div>
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
