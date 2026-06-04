import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/dashboard/stats - admin only, summary stats for the dashboard.
router.get('/stats', requireAuth, async (_req, res, next) => {
  try {
    const { rows } = await query(`
      SELECT
        (SELECT COUNT(*)::int FROM orders) AS "totalOrders",
        (SELECT COALESCE(SUM(total), 0)::float FROM orders WHERE status <> 'cancelled') AS "totalRevenue",
        (SELECT COUNT(*)::int FROM products) AS "totalProducts",
        (SELECT COUNT(*)::int FROM customers) AS "totalCustomers"
    `);
    res.json({ success: true, stats: rows[0] });
  } catch (err) {
    next(err);
  }
});

export default router;
