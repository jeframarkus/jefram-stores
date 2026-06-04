import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const VALID_STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

// Expose `id` as `order_id` too, since the admin dashboard reads `order_id`.
const ORDER_SELECT = `
  SELECT id, id AS order_id, customer_name, phone, email, location,
         items, total, payment_method, status, created_at
  FROM orders
`;

// POST /api/orders - public, place an order (from the storefront checkout).
// Accepts either a nested { customer: {...} } object or flat fields.
router.post('/', async (req, res, next) => {
  try {
    const { customer, items, total, payment_method } = req.body;
    const c = customer || req.body;
    const itemsJson = JSON.stringify(Array.isArray(items) ? items : []);
    const { rows } = await query(
      `INSERT INTO orders (customer_name, phone, email, location, items, total, payment_method)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7)
       RETURNING id, id AS order_id, customer_name, phone, email, location,
                 items, total, payment_method, status, created_at`,
      [c.name || null, c.phone || null, c.email || null, c.location || null, itemsJson, total || 0, payment_method || null],
    );
    res.status(201).json({ success: true, order: rows[0] });
  } catch (err) {
    next(err);
  }
});

// GET /api/orders - admin only, list all orders.
router.get('/', requireAuth, async (_req, res, next) => {
  try {
    const { rows } = await query(`${ORDER_SELECT} ORDER BY created_at DESC`);
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
      `UPDATE orders SET status = $1 WHERE id = $2
       RETURNING id, id AS order_id, customer_name, phone, email, location,
                 items, total, payment_method, status, created_at`,
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
