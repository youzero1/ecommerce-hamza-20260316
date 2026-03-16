import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';

let dataSource: DataSource | null = null;
let initPromise: Promise<DataSource> | null = null;

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
    description: 'Lightweight and comfortable running shoes for daily training.',
    price: 129.99,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 30,
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe. Brews up to 12 cups.',
    price: 49.99,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    stock: 25,
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with laptop compartment and multiple pockets.',
    price: 59.99,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 40,
  },
  {
    name: 'Smartwatch',
    description: 'Feature-rich smartwatch with heart rate monitor and GPS tracking.',
    price: 199.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 20,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with alignment lines. Extra thick for comfort.',
    price: 34.99,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 60,
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    price: 39.99,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500',
    stock: 35,
  },
  {
    name: 'Sunglasses',
    description: 'Polarized sunglasses with UV400 protection. Classic aviator style.',
    price: 24.99,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    stock: 45,
  },
];

async function initializeDataSource(): Promise<DataSource> {
  const ds = new DataSource({
    type: 'sqljs',
    synchronize: true,
    entities: [Product, Order, OrderItem],
    logging: false,
  });

  await ds.initialize();

  // Seed products if empty
  const productRepo = ds.getRepository(Product);
  const count = await productRepo.count();
  if (count === 0) {
    for (const p of seedProducts) {
      const product = productRepo.create(p);
      await productRepo.save(product);
    }
    console.log('Database seeded with sample products');
  }

  return ds;
}

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  if (!initPromise) {
    initPromise = initializeDataSource().then((ds) => {
      dataSource = ds;
      return ds;
    }).catch((err) => {
      initPromise = null;
      throw err;
    });
  }

  return initPromise;
}