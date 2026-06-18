-- ============================================================
-- KofeeTek – Complete Supabase Database Schema
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── LEADS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name          TEXT NOT NULL,
  company_name  TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT NOT NULL,
  location      TEXT,
  industry      TEXT,
  employees     TEXT,
  inquiry_type  TEXT DEFAULT 'demo',
  status        TEXT DEFAULT 'new'
                  CHECK (status IN ('new','contacted','qualified','demo_scheduled','closed')),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast admin filtering
CREATE INDEX IF NOT EXISTS leads_status_idx    ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created_idx   ON leads(created_at DESC);

-- ── PRODUCTS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category    TEXT NOT NULL,   -- 'machine' | 'consumable'
  name        TEXT NOT NULL,
  description TEXT,
  image       TEXT,
  stock       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── RENTALS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rentals (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name    TEXT NOT NULL,
  contact_person  TEXT,
  phone           TEXT,
  machine_name    TEXT NOT NULL,
  installation_date DATE,
  next_service_date DATE,
  rental_status   TEXT DEFAULT 'active'
                    CHECK (rental_status IN ('active','paused','terminated')),
  monthly_rent    NUMERIC(10,2),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS rentals_status_idx ON rentals(rental_status);

-- ── CUSTOMERS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name    TEXT NOT NULL,
  contact_person  TEXT,
  phone           TEXT,
  email           TEXT,
  address         TEXT,
  city            TEXT,
  industry        TEXT,
  machines_count  INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── INVENTORY ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name  TEXT NOT NULL,
  category      TEXT,   -- 'coffee' | 'tea' | 'consumable' | 'accessory'
  stock         INTEGER DEFAULT 0,
  minimum_stock INTEGER DEFAULT 10,
  unit          TEXT DEFAULT 'kg',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── SEED: Default inventory items ────────────────────────────
INSERT INTO inventory (product_name, category, stock, minimum_stock, unit) VALUES
  ('Filter Coffee Powder',  'coffee',     50,  10, 'kg'),
  ('Fine Assam Tea Powder', 'tea',        40,  10, 'kg'),
  ('Badam Mix Powder',      'consumable', 25,   5, 'kg'),
  ('Masala Tea Powder',     'consumable', 20,   5, 'kg'),
  ('Chocolate Mix Powder',  'consumable', 15,   5, 'kg'),
  ('Natural Jaggery Powder','consumable', 30,  10, 'kg'),
  ('Herbal Lemon Tea Mix',  'consumable', 20,   5, 'kg'),
  ('Protein Ragi Malt',     'consumable', 15,   5, 'kg'),
  ('Paper Cups 100ml',      'accessory', 500, 200, 'pcs'),
  ('Paper Cups 180ml',      'accessory', 300, 100, 'pcs')
ON CONFLICT DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- leads: anyone can INSERT (from contact form); only auth users can SELECT/UPDATE
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leads_insert_public"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "leads_select_admin"
  ON leads FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "leads_update_admin"
  ON leads FOR UPDATE
  USING (auth.role() = 'authenticated');

-- products: public read, auth write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_read_public"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "products_write_admin"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- rentals, customers, inventory: auth only
ALTER TABLE rentals   ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rentals_admin"   ON rentals   FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "customers_admin" ON customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "inventory_admin" ON inventory FOR ALL USING (auth.role() = 'authenticated');
