export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export interface OrderItemType {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product?: ProductType;
}

export interface OrderType {
  id: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  totalAmount: number;
  status: string;
  items: OrderItemType[];
  createdAt: string;
  updatedAt: string;
}