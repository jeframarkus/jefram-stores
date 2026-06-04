import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const VALID_STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

// POST /api/orders - public, place an order (from the storefront checkout).
router.post('/', async (req, res, next) => {
  try {
    const { phone, items, total } = req.body;
    const itemsJson = JSON.stringify(Array.isArray(items) ? items : []);
    const { rows } = await query(
      `INSERT INTO orders (customer_phone, items, total)
       VALUES ($1, $2::jsonb, $3) RETURNING *`,
      [phone || null, itemsJson, total || 0],
    );
    res.status(201).json({ success: true, order: rows[0] });
  } catch (err) {
    next(err);
  }
});

// GET /api/orders - admin only, list all orders.
router.get('/', requireAuth, async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json({ success: true, orders: rows });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/orders/:id - admin only, update order status.
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }
    const { rows } = await query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, order: rows[0] });
  } catch (err) {
    next(err);
  }
});

export default router;
