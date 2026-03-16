import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Product } from '@/lib/entities/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);
    const product = await repo.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);
    const product = await repo.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    const body = await request.json();
    Object.assign(product, body);
    await repo.save(product);
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);
    const product = await repo.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    await repo.remove(product);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
