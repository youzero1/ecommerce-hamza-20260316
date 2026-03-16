import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Product } from '@/lib/entities/Product';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';

    let query = repo.createQueryBuilder('product');

    if (category) {
      query = query.where('product.category = :category', { category });
    }

    if (search) {
      const condition = category
        ? 'AND (LOWER(product.name) LIKE :search OR LOWER(product.description) LIKE :search)'
        : 'WHERE (LOWER(product.name) LIKE :search OR LOWER(product.description) LIKE :search)';
      // rebuild
      let q = repo.createQueryBuilder('product');
      if (category) {
        q = q.where('product.category = :category', { category });
        q = q.andWhere(
          '(LOWER(product.name) LIKE :search OR LOWER(product.description) LIKE :search)',
          { search: `%${search.toLowerCase()}%` }
        );
      } else {
        q = q.where(
          '(LOWER(product.name) LIKE :search OR LOWER(product.description) LIKE :search)',
          { search: `%${search.toLowerCase()}%` }
        );
      }
      query = q;
    }

    switch (sort) {
      case 'price-asc':
        query = query.orderBy('product.price', 'ASC');
        break;
      case 'price-desc':
        query = query.orderBy('product.price', 'DESC');
        break;
      case 'name-asc':
        query = query.orderBy('product.name', 'ASC');
        break;
      default:
        query = query.orderBy('product.createdAt', 'DESC');
    }

    const products = await query.getMany();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Product);
    const body = await request.json();

    const { name, description, price, category, imageUrl, stock } = body;
    if (!name || !description || price == null || !category || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = repo.create({ name, description, price, category, imageUrl, stock: stock || 0 });
    await repo.save(product);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
