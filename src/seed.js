import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';
import { migrate } from './migrate.js';

const sampleProducts = [
  {
    name: 'Samsung Galaxy A15',
    price: 750000,
    stock: 25,
    category: 'Phones',
    subcategory: 'Smartphones',
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    description: '6.5" display, 50MP camera, 5000mAh battery.',
  },
  {
    name: 'HP Pavilion Laptop',
    price: 2800000,
    stock: 10,
    category: 'Laptops',
    subcategory: 'Notebooks',
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    description: 'Intel Core i5, 8GB RAM, 512GB SSD.',
  },
  {
    name: 'Wireless Earbuds',
    price: 120000,
    stock: 50,
    category: 'Electronics',
    subcategory: 'Audio',
    image_url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
    description: 'Bluetooth 5.3 earbuds with charging case.',
  },
  {
    name: "Men's Cotton T-Shirt",
    price: 35000,
    stock: 100,
    category: 'Clothing',
    subcategory: 'Tops',
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    description: 'Soft 100% cotton t-shirt, multiple sizes.',
  },
  {
    name: 'Blender 1.5L',
    price: 95000,
    stock: 30,
    category: 'Home',
    subcategory: 'Kitchen',
    image_url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400',
    description: 'Powerful 500W blender with glass jar.',
  },
  {
    name: 'Facial Cleanser',
    price: 28000,
    stock: 40,
    category: 'Beauty',
    subcategory: 'Skincare',
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    description: 'Gentle daily facial cleanser, 200ml.',
  },
];

async function seed() {
  await migrate();

  // Seed products only if the table is empty, so re-running is safe.
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM products');
  if (rows[0].count === 0) {
    for (const p of sampleProducts) {
      await pool.query(
        `INSERT INTO products (name, price, stock, category, subcategory, image_url, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [p.name, p.price, p.stock, p.category, p.subcategory, p.image_url, p.description],
      );
    }
    console.log(`Seeded ${sampleProducts.length} products.`);
  } else {
    console.log('Products already exist, skipping product seed.');
  }

  // Seed (or upsert) the default admin.
  const phone = process.env.SEED_ADMIN_PHONE || '256700000000';
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  const name = process.env.SEED_ADMIN_NAME || 'Administrator';
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO admins (phone, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (phone) DO UPDATE SET password_hash = EXCLUDED.password_hash, name = EXCLUDED.name`,
    [phone, hash, name],
  );
  console.log(`Seeded admin account for phone ${phone}.`);
}

seed()
  .then(() => pool.end())
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
