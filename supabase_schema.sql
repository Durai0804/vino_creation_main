-- ============================================================
-- Vino's Creation - Supabase Database Schema
-- Run this SQL in the Supabase SQL Editor to set up your database
-- ============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Products Table
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  size VARCHAR(20) NOT NULL,
  price VARCHAR(50),
  image_url TEXT NOT NULL,
  material VARCHAR(100),
  usage_suggestion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_size ON products(size);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- ============================================================
-- Enable Row Level Security
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow full access for service role (used by backend)
CREATE POLICY "Allow service role full access"
  ON products
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Supabase Storage Setup
-- ============================================================
-- 1. Create a public bucket called 'product-images' in the Supabase Dashboard
-- 2. Run these policies if they aren't created automatically

-- Allow public read
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'product-images');

-- Allow backend service role to do everything
CREATE POLICY "Backend Full Access" 
ON storage.objects FOR ALL 
TO service_role 
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- ============================================================
-- Optional: Admin table for tracking admin users
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admins
INSERT INTO admins (email, role)
VALUES 
  ('pvino4898@gmail.com', 'admin'),
  ('chairmadurai0804@gmail.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- Sample products (optional - for testing)
-- ============================================================
-- INSERT INTO products (name, description, size, image_url, material, usage_suggestion)
-- VALUES 
--   ('Traditional Lotus Kolam', 'A beautiful traditional lotus kolam pattern featuring intricate petal designs radiating from a central point. Perfect for festivals and daily decoration.', '8x8', 'https://placehold.co/800x800/D4A853/1A1A1A?text=Lotus+Kolam', 'Premium PVC', 'Best used with white rangoli powder on a clean, flat surface. Ideal for Pongal and Diwali celebrations.'),
--   ('Sacred Geometry Mandala', 'An exquisite mandala-inspired kolam featuring sacred geometric patterns. Each line flows naturally into the next, creating a mesmerizing visual harmony.', '12x12', 'https://placehold.co/800x800/C4725B/FEFCF9?text=Mandala+Kolam', 'Premium PVC', 'Perfect for entrance decorations. Use colored rangoli powder for a vibrant effect.'),
--   ('Peacock Feather Design', 'Elegant peacock feather motif kolam with flowing curves and detailed eye patterns. A statement piece for any threshold.', '10x10', 'https://placehold.co/800x800/8B6F47/FEFCF9?text=Peacock+Kolam', 'Acrylic', 'Apply on dry surfaces. Looks stunning with multi-colored powder combinations.'),
--   ('Simple Daily Kolam', 'A clean, minimal kolam design perfect for everyday use. Quick to apply and creates a beautiful welcoming pattern at your doorstep.', '6x6', 'https://placehold.co/800x800/B8963E/1A1A1A?text=Daily+Kolam', 'Premium PVC', 'Quick daily use design. Apply with white powder for a classic look.'),
--   ('Festival Star Kolam', 'A grand star-shaped kolam pattern designed for special occasions. Features multiple layers of intricate border designs.', '12x12', 'https://placehold.co/800x800/D4A853/1A1A1A?text=Star+Kolam', 'Premium PVC', 'Perfect for Pongal, Diwali, and other festivals. Use at main entrance for maximum impact.'),
--   ('Floral Vine Pattern', 'Delicate floral vine kolam with intertwining flowers and leaves. Brings a garden-fresh feel to your threshold.', '8x8', 'https://placehold.co/800x800/C4725B/FEFCF9?text=Floral+Kolam', 'Acrylic', 'Works beautifully on both white and colored surfaces. Great for temple entrances.');
