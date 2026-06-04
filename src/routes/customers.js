import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/customers - public, register/save a customer by phone (upsert).
router.post('/', async (req, res, next) => {
  try {
    const { phone, name, email, location } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: 'phone is required' });
    }
    const { rows } = await query(
      `INSERT INTO customers (phone, name, email, location)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (phone) DO UPDATE SET
         name = COALESCE(EXCLUDED.name, customers.name),
         email = COALESCE(EXCLUDED.email, customers.email),
         location = COALESCE(EXCLUDED.location, customers.location)
       RETURNING *`,
      [phone, name || null, email || null, location || null],
    );
    res.status(201).json({ success: true, customer: rows[0] });
  } catch (err) {
    next(err);
  }
});

// GET /api/customers - admin only, list customers.
router.get('/', requireAuth, async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json({ success: true, customers: rows });
  } catch (err) {
    next(err);
  }
});

export default router;
