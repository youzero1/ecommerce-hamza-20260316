import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';

let dataSource: DataSource | null = null;
let initPromise: Promise<DataSource> | null = null;

async function createDataSource(): Promise<DataSource> {
  const ds = new DataSource({
    type: 'sqljs',
    synchronize: true,
    logging: false,
    entities: [Product, Order, OrderItem],
  });

  await ds.initialize();

  // Seed some products if empty
  const productRepo = ds.getRepository(Product);
  const count = await productRepo.count();
  if (count === 0) {
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
        price: 79.99,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        stock: 50,
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with responsive cushioning for maximum comfort.',
        price: 129.99,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        stock: 30,
      },
      {
        name: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans sourced from sustainable farms.',
        price: 24.99,
        category: 'Food',
        imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
        stock: 100,
      },
      {
        name: 'Leather Backpack',
        description: 'Handcrafted leather backpack with laptop compartment and multiple pockets.',
        price: 89.99,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        stock: 25,
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking, GPS, and 7-day battery.',
        price: 199.99,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        stock: 40,
      },
      {
        name: 'Yoga Mat',
        description: 'Extra thick non-slip yoga mat for comfortable practice.',
        price: 34.99,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        stock: 60,
      },
    ];

    for (const p of products) {
      const product = productRepo.create(p);
      await productRepo.save(product);
    }
  }

  return ds;
}

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  if (!initPromise) {
    initPromise = createDataSource().then((ds) => {
      dataSource = ds;
      return ds;
    }).catch((err) => {
      initPromise = null;
      throw err;
    });
  }

  return initPromise;
}