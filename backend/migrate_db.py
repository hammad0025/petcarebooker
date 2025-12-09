"""
Database migration script to add missing columns
Run this once to update the database schema
"""
from sqlalchemy import text
from database import engine

def migrate():
    """Add missing columns to shops table"""
    
    migrations = [
        # Add subscription columns
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR DEFAULT 'free'",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_status VARCHAR DEFAULT 'active'",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_renewal_date TIMESTAMP",
        "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_cancelled_at TIMESTAMP",
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

