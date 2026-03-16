import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Order } from '@/lib/entities/Order';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ds = await getDataSource();
    const repo = ds.getRepository(Order);
    const order = await repo.findOne({
      where: { id: parseInt(id) },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}