import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  const initSqlJs = require('sql.js');
  const SQL = await initSqlJs();

  dataSource = new DataSource({
    type: 'sqljs',
    driver: SQL,
    synchronize: true,
    logging: false,
    entities: [Product, Order, OrderItem],
  });

  await dataSource.initialize();

  // Seed some products if empty
  const productRepo = dataSource.getRepository(Product);
  const count = await productRepo.count();
  if (count === 0) {
    const seedProducts = [
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
        description: 'Lightweight and comfortable running shoes for everyday training.',
        price: 129.99,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        stock: 30,
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic drip coffee maker with programmable timer and thermal carafe.',
        price: 49.99,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        stock: 25,
      },
      {
        name: 'Backpack',
        description: 'Durable laptop backpack with multiple compartments and USB charging port.',
        price: 59.99,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        stock: 40,
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health monitoring and GPS tracking.',
        price: 199.99,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        stock: 20,
      },
      {
        name: 'Yoga Mat',
        description: 'Extra thick non-slip yoga mat with carrying strap.',
        price: 34.99,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        stock: 60,
      },
    ];

    for (const p of seedProducts) {
      const product = productRepo.create(p);
      await productRepo.save(product);
    }
  }

  return dataSource;
}