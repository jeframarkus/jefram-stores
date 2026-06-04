# Jefram Stores API

Backend API for Jefram Stores, built with **Express + PostgreSQL** and deployed on
**Render**. This replaces the previous Google Apps Script + Google Sheets backend.

The old prototype HTML files are kept under [`legacy/`](./legacy) for reference.

## Architecture

- **API** — Node.js / Express web service (this repo) → Render Web Service
- **Database** — PostgreSQL → Render PostgreSQL
- **Frontends** — `jefram-client` (storefront) and `jefram-admin` (dashboard) are
  separate static sites that call this API.

## API endpoints

| Method | Path                  | Auth  | Description                       |
| ------ | --------------------- | ----- | -------------------------------- |
| GET    | `/api/health`         | —     | Health check                     |
| GET    | `/api/products`       | —     | List products                    |
| GET    | `/api/products/:id`   | —     | Get one product                  |
| POST   | `/api/products`       | admin | Create product                   |
| PUT    | `/api/products/:id`   | admin | Update product                   |
| DELETE | `/api/products/:id`   | admin | Delete product                   |
| POST   | `/api/customers`      | —     | Register/save customer (upsert)  |
| GET    | `/api/customers`      | admin | List customers                   |
| POST   | `/api/orders`         | —     | Place an order                   |
| GET    | `/api/orders`         | admin | List orders                      |
| PATCH  | `/api/orders/:id`     | admin | Update order status              |
| GET    | `/api/dashboard/stats`| admin | Dashboard summary stats          |
| POST   | `/api/admin/login`    | —     | Admin login → returns JWT        |
| GET    | `/api/admin/me`       | admin | Verify token                     |

Admin endpoints require an `Authorization: Bearer <token>` header. Get a token
from `POST /api/admin/login`.

## Local development

```bash
cp .env.example .env          # then edit DATABASE_URL / JWT_SECRET
npm install
npm run seed                  # creates tables + sample products + admin
npm run dev                   # starts on http://localhost:3000
```

You need a local PostgreSQL database (or point `DATABASE_URL` at any Postgres
instance). The server runs migrations automatically on startup; `npm run seed`
additionally inserts sample data and the default admin account.

## Deploy to Render

1. Push this repo to GitHub.
2. In Render: **New + → Blueprint**, pick this repo. Render reads
   [`render.yaml`](./render.yaml) and creates the **PostgreSQL database** and the
   **`jefram-api` web service**, wiring `DATABASE_URL` automatically and
   generating `JWT_SECRET`.
3. In the `jefram-api` service settings, set `SEED_ADMIN_PHONE`,
   `SEED_ADMIN_PASSWORD`, and `SEED_ADMIN_NAME`.
4. Open the service **Shell** and run `npm run seed` once to create the admin and
   sample products.
5. Copy the service URL (e.g. `https://jefram-api.onrender.com`) and set it as
   `API_BASE_URL` in the `jefram-client` and `jefram-admin` frontends.

## Environment variables

See [`.env.example`](./.env.example). Key ones:

- `DATABASE_URL` — PostgreSQL connection string (auto-set on Render)
- `JWT_SECRET` — secret for signing admin tokens (auto-generated on Render)
- `CORS_ORIGIN` — allowed frontend origins, or `*`
- `PORT` — listen port (auto-set on Render)
