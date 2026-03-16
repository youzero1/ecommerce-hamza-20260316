import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Order } from '@/lib/entities/Order';
import { OrderItem } from '@/lib/entities/OrderItem';
import { Product } from '@/lib/entities/Product';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Order);
    const orders = await repo.find({
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const orderRepo = ds.getRepository(Order);
    const itemRepo = ds.getRepository(OrderItem);
    const productRepo = ds.getRepository(Product);

    const body = await request.json();
    const { customerName, customerEmail, shippingAddress, totalAmount, items } = body;

    if (!customerName || !customerEmail || !shippingAddress || !totalAmount || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = orderRepo.create({
      customerName,
      customerEmail,
      shippingAddress,
      totalAmount,
      status: 'pending',
    });
    const savedOrder = await orderRepo.save(order);

    for (const item of items) {
      const product = await productRepo.findOne({ where: { id: item.productId } });
      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productRepo.save(product);
      }

      const orderItem = itemRepo.create({
        orderId: savedOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      });
      await itemRepo.save(orderItem);
    }

    const fullOrder = await orderRepo.findOne({
      where: { id: savedOrder.id },
      relations: ['items', 'items.product'],
    });

    return NextResponse.json(fullOrder, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
