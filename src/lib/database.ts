import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';
import path from 'path';
import fs from 'fs';

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  const dbPath = process.env.DATABASE_PATH || './data/ecommerce.sqlite';
  const resolvedPath = path.resolve(process.cwd(), dbPath);
  const dir = path.dirname(resolvedPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  dataSource = new DataSource({
    type: 'sqljs',
    location: resolvedPath,
    autoSave: true,
    entities: [Product, Order, OrderItem],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  await seedDatabase(dataSource);

  return dataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const productRepo = ds.getRepository(Product);
  const count = await productRepo.count();
  if (count > 0) return;

  const products = [
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
      price: 79.99,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      stock: 50,
    },
    {
      name: 'Smartphone Stand & Charger',
      description: 'Adjustable aluminum stand with built-in wireless charging pad. Compatible with all Qi-enabled devices.',
      price: 34.99,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      stock: 30,
    },
    {
      name: 'Mechanical Keyboard',
      description: 'Compact TKL mechanical keyboard with RGB backlight and tactile switches. Perfect for gaming and typing.',
      price: 89.99,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1601445638532-1f0e89f14d5a?w=400&h=400&fit=crop',
      stock: 25,
    },
    {
      name: '4K Webcam',
      description: 'Crystal clear 4K webcam with auto-focus and built-in noise-canceling microphone for professional video calls.',
      price: 129.99,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1623949360967-b4de1dfa54a8?w=400&h=400&fit=crop',
      stock: 15,
    },
    {
      name: 'Men\'s Classic Oxford Shirt',
      description: 'Timeless button-down Oxford shirt in 100% cotton. Available in multiple colors. Perfect for casual and formal occasions.',
      price: 44.99,
      category: 'Clothing',
      imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop',
      stock: 100,
    },
    {
      name: 'Women\'s Running Sneakers',
      description: 'Lightweight and breathable running shoes with superior cushioning and support. Ideal for daily runs.',
      price: 64.99,
      category: 'Clothing',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      stock: 75,
    },
    {
      name: 'Unisex Hoodie',
      description: 'Cozy fleece-lined hoodie with kangaroo pocket. A wardrobe staple for any season.',
      price: 39.99,
      category: 'Clothing',
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop',
      stock: 80,
    },
    {
      name: 'Stainless Steel Cookware Set',
      description: '10-piece professional-grade stainless steel cookware set. Dishwasher safe and oven compatible up to 550°F.',
      price: 149.99,
      category: 'Home & Kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      stock: 20,
    },
    {
      name: 'Smart Air Purifier',
      description: 'HEPA air purifier covering up to 500 sq ft. Removes 99.97% of airborne particles. App-controlled.',
      price: 119.99,
      category: 'Home & Kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
      stock: 18,
    },
    {
      name: 'Bamboo Cutting Board Set',
      description: 'Set of 3 eco-friendly bamboo cutting boards with juice grooves. Naturally antimicrobial and easy to clean.',
      price: 29.99,
      category: 'Home & Kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&h=400&fit=crop',
      stock: 60,
    },
    {
      name: 'The Art of Clean Code',
      description: 'A comprehensive guide to writing maintainable, readable, and efficient code. Essential for every developer.',
      price: 24.99,
      category: 'Books',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
      stock: 200,
    },
    {
      name: 'Mindfulness & Productivity',
      description: 'Discover the connection between mindfulness practices and peak productivity. Transform your work and personal life.',
      price: 18.99,
      category: 'Books',
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop',
      stock: 150,
    },
  ];

  for (const p of products) {
    const product = productRepo.create(p);
    await productRepo.save(product);
  }
}
