import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/admin/login - authenticate an admin, return a JWT.
router.post('/login', async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ success: false, error: 'phone and password are required' });
    }

    const { rows } = await query('SELECT * FROM admins WHERE phone = $1', [phone]);
    const admin = rows[0];
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = signToken({ id: admin.id, phone: admin.phone });
    res.json({ success: true, token, admin: { id: admin.id, phone: admin.phone, name: admin.name } });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/me - verify the current token (used by the dashboard on load).
router.get('/me', requireAuth, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

export default router;
