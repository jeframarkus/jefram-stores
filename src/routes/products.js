import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/products - public list of products.
router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM products ORDER BY created_at DESC');
    res.json({ success: true, products: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id - public single product.
router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product: rows[0] });
  } catch (err) {
    next(err);
  }
});

// POST /api/products - admin only, create a product.
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, price, stock, category, subcategory, image_url, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, error: 'name is required' });
    }
    const { rows } = await query(
      `INSERT INTO products (name, price, stock, category, subcategory, image_url, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, price || 0, stock || 0, category, subcategory, image_url, description],
    );
    res.status(201).json({ success: true, product: rows[0] });
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - admin only, update a product.
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { name, price, stock, category, subcategory, image_url, description } = req.body;
    const { rows } = await query(
      `UPDATE products
         SET name = COALESCE($1, name),
             price = COALESCE($2, price),
             stock = COALESCE($3, stock),
             category = COALESCE($4, category),
             subcategory = COALESCE($5, subcategory),
             image_url = COALESCE($6, image_url),
             description = COALESCE($7, description)
       WHERE id = $8
       RETURNING *`,
      [name, price, stock, category, subcategory, image_url, description, req.params.id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product: rows[0] });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - admin only.
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { rowCount } = await query('DELETE FROM products WHERE id = $1', [req.params.id]);
    if (rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
