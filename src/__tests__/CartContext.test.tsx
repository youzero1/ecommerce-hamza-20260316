import { renderHook, act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '@/providers/CartProviderWrapper';
import { ProductType } from '@/lib/types';

// Mock product for testing
const mockProduct: ProductType = {
  id: 1,
  name: 'Test Product',
  description: 'A test product',
  price: 19.99,
  category: 'Electronics',
  imageUrl: 'https://example.com/image.jpg',
  stock: 10,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const mockProduct2: ProductType = {
  id: 2,
  name: 'Test Product 2',
  description: 'Another test product',
  price: 29.99,
  category: 'Sports',
  imageUrl: 'https://example.com/image2.jpg',
  stock: 5,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('CartProvider', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('should start with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product).toEqual(mockProduct);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('should increase quantity when adding the same product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('should calculate subtotal correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });

    // 2 * 19.99 + 1 * 29.99 = 69.97
    expect(result.current.subtotal).toBeCloseTo(69.97, 2);
  });

  it('should calculate totalItems correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });

    expect(result.current.totalItems).toBe(3);
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(mockProduct2.id);
  });

  it('should update quantity correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items[0].quantity).toBe(1);

    act(() => {
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.updateQuantity(mockProduct.id, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should remove item when quantity is set to negative', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.updateQuantity(mockProduct.id, -1);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  it('should throw error when useCart is used outside of CartProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');

    consoleError.mockRestore();
  });
});
