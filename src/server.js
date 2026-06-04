import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { migrate } from './migrate.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import customersRouter from './routes/customers.js';
import adminRouter from './routes/admin.js';
import dashboardRouter from './routes/dashboard.js';

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((s) => s.trim()) }));
app.use(express.json());

// Health check (used by Render).
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/dashboard', dashboardRouter);

// 404 for unknown API routes.
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Not found: ${req.method} ${req.path}` });
});

// Centralized error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

const port = process.env.PORT || 3000;

// Run migrations on boot so a fresh Render database is ready automatically.
migrate()
  .then(() => {
    app.listen(port, () => console.log(`Jefram API listening on port ${port}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
