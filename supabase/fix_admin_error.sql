-- ============================================================
-- KofeeTek – COMPLETE FIX for "Invalid path" admin panel error
-- Run this ENTIRE file in Supabase → SQL Editor → New Query
-- ============================================================

-- STEP 1: Create tables if they don't exist yet
-- ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS leads (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name          TEXT NOT NULL,
  company_name  TEXT,
  phone         TEXT,
  email         TEXT,
  location      TEXT,
  industry      TEXT,
  employees     TEXT,
  inquiry_type  TEXT DEFAULT 'demo',
  status        TEXT DEFAULT 'new',
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category    TEXT NOT NULL DEFAULT 'machine',
  name        TEXT NOT NULL,
  description TEXT,
  image       TEXT,
  stock       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rentals (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name      TEXT NOT NULL,
  contact_person    TEXT,
  phone             TEXT,
  machine_name      TEXT,
  installation_date DATE,
  next_service_date DATE,
  rental_status     TEXT DEFAULT 'active',
  monthly_rent      NUMERIC(10,2),
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS inventory (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name  TEXT NOT NULL,
  category      TEXT DEFAULT 'consumable',
  stock         INTEGER DEFAULT 0,
  minimum_stock INTEGER DEFAULT 10,
  unit          TEXT DEFAULT 'kg',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 2: Drop ALL old policies
-- ──────────────────────────────
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public' LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- STEP 3: Disable RLS on all tables temporarily
-- ──────────────────────────────────────────────
ALTER TABLE leads     DISABLE ROW LEVEL SECURITY;
ALTER TABLE products  DISABLE ROW LEVEL SECURITY;
ALTER TABLE rentals   DISABLE ROW LEVEL SECURITY;
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;

-- STEP 4: Re-enable with correct open policies
-- ────────────────────────────────────────────
-- LEADS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_anon_insert"  ON leads FOR INSERT TO anon      WITH CHECK (true);
CREATE POLICY "leads_auth_all"     ON leads FOR ALL    TO authenticated USING (true) WITH CHECK (true);

-- PRODUCTS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products_auth_write"  ON products FOR ALL   TO authenticated USING (true) WITH CHECK (true);

-- RENTALS
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rentals_auth_all" ON rentals FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- CUSTOMERS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "customers_auth_all" ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- INVENTORY
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inventory_auth_all" ON inventory FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- STEP 5: Grant permissions
-- ─────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- STEP 6: Seed inventory if empty
-- ────────────────────────────────
INSERT INTO inventory (product_name, category, stock, minimum_stock, unit)
SELECT * FROM (VALUES
  ('Filter Coffee Powder',  'coffee',     50, 10, 'kg'),
  ('Fine Assam Tea Powder', 'tea',        40, 10, 'kg'),
  ('Badam Mix Powder',      'consumable', 25,  5, 'kg'),
  ('Masala Tea Powder',     'consumable', 20,  5, 'kg'),
  ('Chocolate Mix Powder',  'consumable', 15,  5, 'kg'),
  ('Natural Jaggery Powder','consumable', 30, 10, 'kg'),
  ('Herbal Lemon Tea Mix',  'consumable', 20,  5, 'kg'),
  ('Protein Ragi Malt',     'consumable', 15,  5, 'kg'),
  ('Paper Cups 100ml',      'accessory', 500,200, 'pcs'),
  ('Paper Cups 180ml',      'accessory', 300,100, 'pcs')
) AS v(product_name, category, stock, minimum_stock, unit)
WHERE NOT EXISTS (SELECT 1 FROM inventory LIMIT 1);

-- STEP 7: Verify — you should see 5 tables listed
-- ─────────────────────────────────────────────────
SELECT 
  t.table_name,
  COUNT(p.policyname) as policy_count
FROM information_schema.tables t
LEFT JOIN pg_policies p ON p.tablename = t.table_name AND p.schemaname = 'public'
WHERE t.table_schema = 'public' 
  AND t.table_name IN ('leads','products','rentals','customers','inventory')
GROUP BY t.table_name
ORDER BY t.table_name;
