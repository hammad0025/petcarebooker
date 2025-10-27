-- Add map and mobile groomer fields to shops table
-- Run this migration to add support for:
-- 1. Latitude/Longitude for map integration
-- 2. Mobile groomer flag
-- 3. Service area definition

ALTER TABLE shops ADD COLUMN latitude FLOAT;
ALTER TABLE shops ADD COLUMN longitude FLOAT;
ALTER TABLE shops ADD COLUMN is_mobile BOOLEAN DEFAULT FALSE;
ALTER TABLE shops ADD COLUMN service_area TEXT;

-- Example: Update existing shops with dummy locations (you'd want real coordinates)
-- UPDATE shops SET latitude = 26.7153, longitude = -80.0534 WHERE city = 'West Palm Beach';

-- Service area JSON structure:
-- {
--   "radius_miles": 10,
--   "zip_codes": ["33401", "33402", "33403"],
--   "neighborhoods": ["Downtown", "Northwood", "Flamingo Park"],
--   "cities": ["West Palm Beach", "Lake Worth"]
-- }

