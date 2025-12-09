"""
Seed test data for UAT testing
Creates groomers, services, and business hours
"""
import requests
import json
from datetime import datetime, time

API_BASE = "https://petcarebooker.onrender.com"

# Test groomer accounts
TEST_GROOMERS = [
    {
        "owner_name": "Sarah Johnson",
        "owner_email": "sarah@testgroomer1.com",
        "owner_phone": "5551234567",
        "password": "TestPassword123!",
        "business_name": "Paws & Claws Grooming",
        "slug": "paws-and-claws-miami",
        "description": "Professional pet grooming in Miami with 10+ years experience. We specialize in all breeds and offer mobile services.",
        "address": "123 Ocean Drive",
        "city": "Miami",
        "state": "FL",
        "zip_code": "33139",
        "phone": "3055551234",
        "email": "contact@pawsandclaws.com",
        "services": [
            {"name": "Small Dog Bath & Brush", "description": "Complete bath, brush, nail trim, and ear cleaning for dogs under 20 lbs", "price": 45.00, "duration_minutes": 60, "category": "Small Dog"},
            {"name": "Medium Dog Full Groom", "description": "Full grooming service including bath, haircut, nail trim, and ear cleaning", "price": 75.00, "duration_minutes": 90, "category": "Medium Dog"},
            {"name": "Large Dog Full Groom", "description": "Complete grooming for large breeds with bath, haircut, de-shedding", "price": 95.00, "duration_minutes": 120, "category": "Large Dog"},
            {"name": "Cat Grooming", "description": "Gentle cat grooming with bath, brush, and nail trim", "price": 55.00, "duration_minutes": 60, "category": "Cat"},
        ]
    },
    {
        "owner_name": "Mike Thompson",
        "owner_email": "mike@testgroomer2.com",
        "owner_phone": "5559876543",
        "password": "TestPassword123!",
        "business_name": "Happy Tails Mobile Grooming",
        "slug": "happy-tails-mobile",
        "description": "Mobile grooming service that comes to you! Stress-free grooming in the comfort of your own driveway.",
        "address": "456 Beach Blvd",
        "city": "Miami",
        "state": "FL",
        "zip_code": "33140",
        "phone": "3055559876",
        "email": "info@happytails.com",
        "services": [
            {"name": "Express Bath & Brush", "description": "Quick bath and brush service", "price": 40.00, "duration_minutes": 45, "category": "Small Dog"},
            {"name": "Premium Full Groom", "description": "Premium grooming with specialty shampoo and styling", "price": 85.00, "duration_minutes": 90, "category": "Medium Dog"},
            {"name": "De-shedding Treatment", "description": "Special de-shedding treatment for heavy shedders", "price": 65.00, "duration_minutes": 75, "category": "All Breeds"},
        ]
    },
    {
        "owner_name": "Lisa Martinez",
        "owner_email": "lisa@testgroomer3.com",
        "owner_phone": "5552223333",
        "password": "TestPassword123!",
        "business_name": "Luxury Pet Spa Tampa",
        "slug": "luxury-pet-spa-tampa",
        "description": "Upscale pet grooming salon in Tampa. Spa treatments, organic products, and VIP service for your furry friends.",
        "address": "789 Spa Lane",
        "city": "Tampa",
        "state": "FL",
        "zip_code": "33602",
        "phone": "8135552223",
        "email": "spa@luxurypetspa.com",
        "services": [
            {"name": "Spa Day Package", "description": "Full grooming with aromatherapy bath and paw massage", "price": 120.00, "duration_minutes": 120, "category": "All Sizes"},
            {"name": "Puppy's First Groom", "description": "Gentle introduction to grooming for puppies", "price": 50.00, "duration_minutes": 60, "category": "Puppy"},
            {"name": "Senior Dog Gentle Groom", "description": "Specially designed for older dogs with joint care", "price": 70.00, "duration_minutes": 90, "category": "Senior"},
        ]
    }
]

# Business hours (Monday-Saturday 9am-6pm)
BUSINESS_HOURS = {
    "monday": {"open": "09:00", "close": "18:00"},
    "tuesday": {"open": "09:00", "close": "18:00"},
    "wednesday": {"open": "09:00", "close": "18:00"},
    "thursday": {"open": "09:00", "close": "18:00"},
    "friday": {"open": "09:00", "close": "18:00"},
    "saturday": {"open": "10:00", "close": "16:00"},
    "sunday": {"open": None, "close": None}  # Closed
}

def register_groomer(groomer_data):
    """Register a groomer account"""
    print(f"\n{'='*60}")
    print(f"Registering: {groomer_data['business_name']}")
    print(f"{'='*60}")
    
    # Prepare registration data
    reg_data = {
        "owner_name": groomer_data["owner_name"],
        "owner_email": groomer_data["owner_email"],
        "owner_phone": groomer_data["owner_phone"],
        "password": groomer_data["password"],
        "business_name": groomer_data["business_name"],
        "slug": groomer_data["slug"],
        "description": groomer_data["description"],
        "address": groomer_data["address"],
        "city": groomer_data["city"],
        "state": groomer_data["state"],
        "zip_code": groomer_data["zip_code"],
        "phone": groomer_data["phone"],
        "email": groomer_data["email"],
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/api/auth/register",
            json=reg_data,
            timeout=10
        )
        
        if response.status_code == 201:
            data = response.json()
            token = data['access_token']
            shop_id = data['shop_id']
            print(f"✅ Groomer registered successfully!")
            print(f"   Shop ID: {shop_id}")
            print(f"   Token: {token[:20]}...")
            return token, shop_id
        elif response.status_code == 400 and "already registered" in response.text:
            print(f"⚠️  Groomer already exists, trying to login...")
            # Try to login instead
            login_response = requests.post(
                f"{API_BASE}/api/auth/login",
                json={
                    "email": groomer_data["owner_email"],
                    "password": groomer_data["password"]
                },
                timeout=10
            )
            if login_response.status_code == 200:
                data = login_response.json()
                token = data['access_token']
                shop_id = data['shop_id']
                print(f"✅ Logged in successfully!")
                print(f"   Shop ID: {shop_id}")
                return token, shop_id
            else:
                print(f"❌ Login failed: {login_response.status_code} - {login_response.text}")
                return None, None
        else:
            print(f"❌ Registration failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return None, None
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None, None

def create_services(token, services):
    """Create services for a groomer"""
    print(f"\nCreating {len(services)} services...")
    
    headers = {"Authorization": f"Bearer {token}"}
    created = 0
    
    for service in services:
        try:
            response = requests.post(
                f"{API_BASE}/api/services",
                json=service,
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                print(f"  ✅ Created: {service['name']} - ${service['price']}")
                created += 1
            else:
                print(f"  ❌ Failed to create {service['name']}: {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ Error creating {service['name']}: {str(e)}")
    
    print(f"\n✅ Created {created}/{len(services)} services")
    return created

def set_business_hours(token):
    """Set business hours for a groomer"""
    print(f"\nSetting business hours...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        response = requests.put(
            f"{API_BASE}/api/shops/me/hours",
            json={"hours": BUSINESS_HOURS},
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            print(f"✅ Business hours set successfully!")
            return True
        else:
            print(f"❌ Failed to set hours: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error setting hours: {str(e)}")
        return False

def main():
    print(f"\n{'='*60}")
    print(f"SEEDING TEST DATA FOR PETCAREBOOKER")
    print(f"{'='*60}")
    print(f"API Base: {API_BASE}\n")
    
    total_groomers = 0
    total_services = 0
    
    for groomer in TEST_GROOMERS:
        token, shop_id = register_groomer(groomer)
        
        if token and shop_id:
            total_groomers += 1
            
            # Create services
            created_services = create_services(token, groomer['services'])
            total_services += created_services
            
            # Set business hours
            set_business_hours(token)
        
        print(f"\n{'-'*60}\n")
    
    print(f"\n{'='*60}")
    print(f"SEEDING COMPLETE!")
    print(f"{'='*60}")
    print(f"✅ Groomers Created: {total_groomers}/{len(TEST_GROOMERS)}")
    print(f"✅ Services Created: {total_services}")
    print(f"\n🎉 Test data is ready for UAT testing!")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()

