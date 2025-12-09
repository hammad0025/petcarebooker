"""
Database migration script to add missing columns
Run this once to update the database schema
"""
from sqlalchemy import text
from database import engine

def migrate():
    """Add missing columns to shops table"""
    
    migrations = [
        # Add subscription columns to shops
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR DEFAULT 'free'",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_status VARCHAR DEFAULT 'active'",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_renewal_date TIMESTAMP",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_cancelled_at TIMESTAMP",
        
        # Add missing columns to pets
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS photo_url VARCHAR",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS birth_date TIMESTAMP",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS gender VARCHAR",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS color VARCHAR",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS special_notes TEXT",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS health_notes TEXT",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS favorite_groomer_id INTEGER",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS grooming_frequency_days INTEGER",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS last_groom_date TIMESTAMP",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS next_groom_due TIMESTAMP",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()",
        "ALTER TABLE pets ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()",
        
        # Add missing columns to bookings
        "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS shop_commission_percentage NUMERIC(5, 2) DEFAULT 0.0",
        "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS platform_commission_percentage NUMERIC(5, 2) DEFAULT 0.0",
    ]
    
    with engine.connect() as conn:
        for migration in migrations:
            try:
                conn.execute(text(migration))
                conn.commit()
                print(f"✅ Executed: {migration[:80]}...")
            except Exception as e:
                print(f"⚠️  Skipped (probably already exists): {str(e)[:100]}")
    
    print("\n🎉 Migration complete!")

if __name__ == "__main__":
    migrate()

