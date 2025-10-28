#!/usr/bin/env python3
"""
Add map and mobile groomer fields to shops table
Run this script to update your Render PostgreSQL database
"""

import psycopg2
import sys
import os

# Database URL
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://petcarebooker_user:8rtqrYSRHOyiAeKSbAAX70Kft6iYG8WP@dpg-d3u6fbbipnbc738ncd40-a/petcarebooker")

def run_migration():
    try:
        print("🔌 Connecting to Render database...")
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        
        # Check if columns already exist
        print("📋 Checking existing columns...")
        cur.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='shops' 
            AND column_name IN ('latitude', 'longitude', 'is_mobile', 'service_area')
        """)
        existing = [row[0] for row in cur.fetchall()]
        print(f"Found existing columns: {existing}")
        
        # Add missing columns
        if 'latitude' not in existing:
            cur.execute('ALTER TABLE shops ADD COLUMN latitude FLOAT;')
            print('✓ Added latitude column')
        else:
            print('ℹ latitude column already exists')
        
        if 'longitude' not in existing:
            cur.execute('ALTER TABLE shops ADD COLUMN longitude FLOAT;')
            print('✓ Added longitude column')
        else:
            print('ℹ longitude column already exists')
        
        if 'is_mobile' not in existing:
            cur.execute('ALTER TABLE shops ADD COLUMN is_mobile BOOLEAN DEFAULT FALSE;')
            print('✓ Added is_mobile column')
        else:
            print('ℹ is_mobile column already exists')
        
        if 'service_area' not in existing:
            cur.execute('ALTER TABLE shops ADD COLUMN service_area TEXT;')
            print('✓ Added service_area column')
        else:
            print('ℹ service_area column already exists')
        
        conn.commit()
        cur.close()
        conn.close()
        print('🎉 Migration complete!')
        return True
        
    except Exception as e:
        print(f'❌ Error: {e}')
        sys.exit(1)

if __name__ == "__main__":
    run_migration()

