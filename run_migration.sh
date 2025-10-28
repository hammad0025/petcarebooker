#!/bin/bash
# Migration script to add map fields to Render database

echo "🔧 Migration: Add map fields to shops table"
echo ""

# Database connection
DB_URL="postgresql://petcarebooker_user:8rtqrYSRHOyiAeKSbAAX70Kft6iYG8WP@dpg-d3u6fbbipnbc738ncd40-a.oregon-postgres.render.com/petcarebooker"

echo "This will add the following columns to the shops table:"
echo "  - latitude (FLOAT)"
echo "  - longitude (FLOAT)"
echo "  - is_mobile (BOOLEAN)"
echo "  - service_area (TEXT)"
echo ""
echo "Note: You need to run this from Render's environment or with VPN access."
echo ""
echo "To run manually in Render Dashboard:"
echo ""
echo "1. Go to: https://dashboard.render.com"
echo "2. Select your PostgreSQL database"
echo "3. Click 'Connect' → 'Query Editor'"
echo "4. Run these SQL commands:"
echo ""
echo "ALTER TABLE shops ADD COLUMN IF NOT EXISTS latitude FLOAT;"
echo "ALTER TABLE shops ADD COLUMN IF NOT EXISTS longitude FLOAT;"
echo "ALTER TABLE shops ADD COLUMN IF NOT EXISTS is_mobile BOOLEAN DEFAULT FALSE;"
echo "ALTER TABLE shops ADD COLUMN IF NOT EXISTS service_area TEXT;"
echo ""

