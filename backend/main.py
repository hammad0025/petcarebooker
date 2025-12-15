from fastapi import FastAPI, Depends, HTTPException, status, Query, Request, Body
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta, time
import re
import json
import os

# Sentry error monitoring
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration

# Initialize Sentry if DSN is provided
sentry_dsn = os.getenv("SENTRY_DSN")
if sentry_dsn:
    sentry_sdk.init(
        dsn=sentry_dsn,
        environment=os.getenv("ENVIRONMENT", "development"),
        integrations=[
            FastApiIntegration(),
            SqlalchemyIntegration(),
        ],
        traces_sample_rate=1.0,  # Capture 100% of transactions
        send_default_pii=False,  # Don't send user data
        before_send=lambda event, hint: event,  # Can add filtering here
    )
    print("✅ Sentry error monitoring initialized")
else:
    print("⚠️  Sentry DSN not found - error monitoring disabled")

from database import engine, get_db, Base
from models import Shop, Service, Booking, BookingStatus, Customer, Pet, PasswordResetToken
from schemas import (
    CustomerProfile,
    ShopCreate, ShopResponse, ShopListItem, ShopUpdate,
    ServiceCreate, ServiceResponse,
    BookingCreate, BookingResponse, BookingUpdate,
    LoginRequest, TokenResponse,
    CustomerRegister, CustomerResponse,
    PetCreate, PetResponse,
    BusinessHoursUpdate, AvailableSlot, AvailableSlotsResponse
)
from auth import hash_password, verify_password, create_access_token, get_current_shop, get_current_customer, validate_password_strength, generate_reset_token
from notifications import notify_shop_new_booking, notify_customer_booking_confirmed, notify_customer_booking_cancelled
from email_service import send_contact_email
# from email_service import send_reset_email
from stripe_service import create_stripe_customer, create_subscription_checkout_session, get_subscription_details, cancel_subscription, handle_webhook_event
from google_booking_api import (
    get_availability as gb_get_availability,
    create_booking as gb_create_booking,
    update_booking as gb_update_booking,
    cancel_booking as gb_cancel_booking,
    get_services as gb_get_services,
    get_booking_by_google_id
)
from calendar_sync import (
    get_authorization_url, exchange_code_for_tokens, get_calendar_service,
    create_calendar_event, update_calendar_event, delete_calendar_event,
    get_busy_times, get_primary_calendar_id, refresh_access_token
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Run migrations to add any missing columns
try:
    from sqlalchemy import text
    print("🔄 Running database migrations...")
    with engine.connect() as conn:
        # Migrations for all tables
        migrations = [
            # Shops table
            "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR DEFAULT 'free'",
            "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_status VARCHAR DEFAULT 'active'",
            "ALTER TABLE shops ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR",
            "ALTER TABLE shops ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR",
            "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP",
            "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_renewal_date TIMESTAMP",
            "ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_cancelled_at TIMESTAMP",
            
            # Pets table
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS photo_url VARCHAR",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS birth_date TIMESTAMP",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS gender VARCHAR",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS color VARCHAR",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS special_notes TEXT",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS health_notes TEXT",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS favorite_groomer_id INTEGER REFERENCES shops(id)",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS grooming_frequency_days INTEGER",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS last_groom_date TIMESTAMP",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS next_groom_due TIMESTAMP",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()",
            "ALTER TABLE pets ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()",
            
            # Bookings table - payment and commission tracking
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS amount_paid DOUBLE PRECISION",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR DEFAULT 'pending'",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS platform_commission DOUBLE PRECISION",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS groomer_payout DOUBLE PRECISION",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS commission_processed BOOLEAN DEFAULT FALSE",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP",
            "ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP",
        ]
        
        for migration in migrations:
            try:
                conn.execute(text(migration))
                conn.commit()
            except Exception as e:
                pass  # Column probably already exists
    print("✅ Migrations complete!")
except Exception as e:
    print(f"⚠️  Migration error (non-fatal): {e}")

app = FastAPI(title="PetCareBooker API", version="1.0.0")

# Health check endpoint (no database required)
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "cors_origins": ["https://petcarebooker.com", "https://www.petcarebooker.com"] if os.getenv("ENVIRONMENT") == "production" else ["*"]
    }

# CORS Configuration
def get_allowed_origins():
    """Get CORS origins based on environment"""
    if os.getenv("ENVIRONMENT") == "production":
        return [
            "https://petcarebooker.com",
            "https://www.petcarebooker.com",
            "https://*.vercel.app",  # Vercel preview deployments
        ]
    else:
        # Development: allow localhost on various ports
        return [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:8081",
            "http://10.0.0.181:8081",  # Expo dev server
            "https://*.vercel.app",  # Also allow Vercel in dev
        ]

# Get allowed origins based on environment
allowed_origins = get_allowed_origins()

# Use specific origins in production, wildcard in development
is_production = os.getenv("ENVIRONMENT") == "production"

if is_production:
    # Production: specific origins with credentials
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "https://petcarebooker.com",
            "https://www.petcarebooker.com",
        ],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )
else:
    # Development: allow all origins without credentials
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )


# Helper Functions
def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text


# ============================================================================
# AUTH ENDPOINTS
# ============================================================================

@app.post("/api/auth/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register_shop(shop_data: ShopCreate, db: Session = Depends(get_db)):
    """Register a new shop"""
    # Check if email already exists
    existing = db.query(Shop).filter(Shop.owner_email == shop_data.owner_email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if slug already exists
    existing_slug = db.query(Shop).filter(Shop.slug == shop_data.slug).first()
    if existing_slug:
        raise HTTPException(status_code=400, detail="Shop URL already taken")
    
    # Create shop with auto-approve enabled by default (Booksy-style)
    shop = Shop(
        owner_name=shop_data.owner_name,
        owner_email=shop_data.owner_email,
        owner_phone=shop_data.owner_phone,
        password_hash=hash_password(shop_data.password),
        business_name=shop_data.business_name,
        slug=shop_data.slug,
        description=shop_data.description,
        address=shop_data.address,
        city=shop_data.city,
        state=shop_data.state,
        zip_code=shop_data.zip_code,
        phone=shop_data.phone,
        email=shop_data.email,
        auto_approve_bookings=True,  # Enable instant booking by default
        booking_buffer_minutes=15,
        referred_by_code=shop_data.referral_code  # Track referral code used
    )
    
    db.add(shop)
    db.commit()
    db.refresh(shop)
    
    # Generate referral code for new shop
    shop.referral_code = generate_referral_code(shop.id)
    
    # If they used a referral code, credit the referring shop
    if shop_data.referral_code:
        referring_shop = db.query(Shop).filter(Shop.referral_code == shop_data.referral_code).first()
        if referring_shop:
            referring_shop.referrals_count = (referring_shop.referrals_count or 0) + 1
            # Award 1 credit per referral (can be used for 1 month free subscription)
            referring_shop.referral_credits = (referring_shop.referral_credits or 0) + 1
    
    db.commit()
    db.refresh(shop)
    
    # Create access token
    token = create_access_token(data={"shop_id": shop.id})
    
    return TokenResponse(
        access_token=token,
        shop_id=shop.id,
        business_name=shop.business_name
    )


@app.post("/api/auth/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """Login for shop owners"""
    shop = db.query(Shop).filter(Shop.owner_email == credentials.email).first()
    
    if not shop or not verify_password(credentials.password, shop.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    token = create_access_token(data={"shop_id": shop.id})
    
    return TokenResponse(
        access_token=token,
        shop_id=shop.id,
        business_name=shop.business_name
    )


# ============================================================================
# CUSTOMER AUTH ENDPOINTS
# ============================================================================

@app.post("/api/customer/register", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
def register_customer(
    customer_data: CustomerRegister,
    db: Session = Depends(get_db)
):
    """Register a new customer"""
    existing = db.query(Customer).filter(Customer.email == customer_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Validate password strength
    is_valid, error_msg = validate_password_strength(customer_data.password)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error_msg)
    
    customer = Customer(
        name=customer_data.name,
        email=customer_data.email,
        phone=customer_data.phone,
        password_hash=hash_password(customer_data.password)
    )
    
    db.add(customer)
    db.commit()
    db.refresh(customer)
    
    token = create_access_token(data={"customer_id": customer.id})
    
    return CustomerResponse(
        access_token=token,
        customer_id=customer.id,
        name=customer.name
    )


@app.post("/api/customer/login", response_model=CustomerResponse)
def customer_login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """Login for customers"""
    customer = db.query(Customer).filter(Customer.email == credentials.email).first()
    
    if not customer or not verify_password(credentials.password, customer.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    token = create_access_token(data={"customer_id": customer.id})
    
    return CustomerResponse(
        access_token=token,
        customer_id=customer.id,
        name=customer.name
    )


# ============================================================================
# FORGOT PASSWORD ENDPOINTS
# ============================================================================

@app.post("/api/customer/forgot-password")
def forgot_password(request: dict, db: Session = Depends(get_db)):
    """Request password reset"""
    email = request.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    
    customer = db.query(Customer).filter(Customer.email == email).first()
    
    # Always return success to prevent email enumeration
    # If email exists, create and send reset token
    if customer:
        # Generate secure token
        token = generate_reset_token()
        expires_at = datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
        
        # Invalidate any existing tokens for this customer
        db.query(PasswordResetToken).filter(
            PasswordResetToken.customer_id == customer.id,
            PasswordResetToken.used == False
        ).delete()
        
        # Create new reset token
        reset_token = PasswordResetToken(
            customer_id=customer.id,
            token=token,
            expires_at=expires_at
        )
        db.add(reset_token)
        db.commit()
        
        # Send password reset email
        # send_reset_email(customer.email, token)
        print(f"Password reset token for {customer.email}: {token}")
    
    return {"message": "If an account exists with this email, a password reset link has been sent"}


@app.post("/api/customer/reset-password")
def reset_password(request: dict, db: Session = Depends(get_db)):
    """Reset password with token"""
    token = request.get("token")
    new_password = request.get("new_password")
    
    if not token or not new_password:
        raise HTTPException(status_code=400, detail="Token and new password are required")
    
    # Find token
    reset_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == token,
        PasswordResetToken.used == False
    ).first()
    
    if not reset_token:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    if reset_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Validate new password
    is_valid, error_msg = validate_password_strength(new_password)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error_msg)
    
    # Update customer password
    customer = db.query(Customer).filter(Customer.id == reset_token.customer_id).first()
    customer.password_hash = hash_password(new_password)
    
    # Mark token as used
    reset_token.used = True
    
    db.commit()
    
    return {"message": "Password reset successfully"}


# ============================================================================
# CUSTOMER PROFILE ENDPOINTS
# ============================================================================

@app.get("/api/customer/me", response_model=CustomerProfile)
def get_my_profile(customer: Customer = Depends(get_current_customer)):
    """Get current customer's profile"""
    return customer


# ============================================================================
# PET ENDPOINTS
# ============================================================================

@app.get("/api/customer/pets", response_model=List[PetResponse])
def get_my_pets(customer: Customer = Depends(get_current_customer), db: Session = Depends(get_db)):
    """Get all pets for logged-in customer"""
    return customer.pets


@app.post("/api/customer/pets", response_model=PetResponse, status_code=status.HTTP_201_CREATED)
def add_pet(
    pet_data: PetCreate,
    customer: Customer = Depends(get_current_customer),
    db: Session = Depends(get_db)
):
    """Add a new pet"""
    pet = Pet(
        customer_id=customer.id,
        name=pet_data.name,
        pet_type=pet_data.pet_type,
        breed=pet_data.breed,
        weight=pet_data.weight,
        special_notes=pet_data.special_notes
    )
    
    db.add(pet)
    db.commit()
    db.refresh(pet)
    
    return pet


@app.delete("/api/customer/pets/{pet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pet(
    pet_id: int,
    customer: Customer = Depends(get_current_customer),
    db: Session = Depends(get_db)
):
    """Delete a pet"""
    pet = db.query(Pet).filter(Pet.id == pet_id, Pet.customer_id == customer.id).first()
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    
    db.delete(pet)
    db.commit()


# ============================================================================
# SHOP ENDPOINTS
# ============================================================================

@app.get("/api/shops", response_model=List[ShopListItem])
def get_shops(
    city: Optional[str] = None,
    state: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all shops with optional filters"""
    try:
        query = db.query(Shop)
        
        if city:
            query = query.filter(Shop.city.ilike(f"%{city}%"))
        if state:
            query = query.filter(Shop.state.ilike(f"%{state}%"))
        if search:
            query = query.filter(Shop.business_name.ilike(f"%{search}%"))
        
        shops = query.all()
        return shops
    except Exception as e:
        print(f"ERROR in get_shops: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.get("/api/shops/{slug}", response_model=ShopResponse)
def get_shop(slug: str, db: Session = Depends(get_db)):
    """Get shop by slug"""
    shop = db.query(Shop).filter(Shop.slug == slug).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    return shop


@app.get("/api/shops/me/profile", response_model=ShopResponse)
def get_my_shop(shop: Shop = Depends(get_current_shop)):
    """Get current authenticated shop's profile"""
    return shop


@app.patch("/api/shops/me", response_model=ShopResponse)
def update_shop(
    updates: ShopUpdate,
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Update shop profile"""
    update_data = updates.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(shop, field, value)
    
    db.commit()
    db.refresh(shop)
    return shop


@app.put("/api/shops/me/hours", response_model=ShopResponse)
def update_business_hours(
    hours_data: BusinessHoursUpdate,
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Update business hours and booking settings"""
    # Convert pydantic model to dict, excluding None values
    hours_dict = hours_data.model_dump(exclude_unset=True, exclude_none=True)
    
    # Extract non-hours fields
    if "auto_approve_bookings" in hours_dict:
        shop.auto_approve_bookings = hours_dict.pop("auto_approve_bookings")
    if "booking_buffer_minutes" in hours_dict:
        shop.booking_buffer_minutes = hours_dict.pop("booking_buffer_minutes")
    
    # Store remaining hours as JSON
    if hours_dict:
        shop.business_hours = json.dumps(hours_dict)
    
    db.commit()
    db.refresh(shop)
    return shop


@app.get("/api/shops/{slug}/available-slots")
def get_available_slots(
    slug: str,
    service_id: int,
    date: str,  # Format: "2025-10-24"
    db: Session = Depends(get_db)
):
    """Get available time slots for a service on a specific date"""
    shop = db.query(Shop).filter(Shop.slug == slug).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    service = db.query(Service).filter(
        Service.id == service_id,
        Service.shop_id == shop.id
    ).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Parse business hours
    if not shop.business_hours:
        raise HTTPException(status_code=400, detail="Business hours not set")
    
    try:
        business_hours = json.loads(shop.business_hours)
    except:
        raise HTTPException(status_code=500, detail="Invalid business hours format")
    
    # Parse target date
    try:
        target_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Get day of week (monday, tuesday, etc.)
    day_name = target_date.strftime("%A").lower()
    
    if day_name not in business_hours or business_hours[day_name].get("is_closed", False):
        return {"date": date, "slots": []}
    
    day_hours = business_hours[day_name]
    
    # Parse open/close times
    try:
        open_time = datetime.strptime(day_hours["open"], "%H:%M").time()
        close_time = datetime.strptime(day_hours["close"], "%H:%M").time()
    except (KeyError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid business hours")
    
    # Get existing bookings for this date
    start_of_day = datetime.combine(target_date, time.min)
    end_of_day = datetime.combine(target_date, time.max)
    
    existing_bookings = db.query(Booking).filter(
        Booking.shop_id == shop.id,
        Booking.appointment_date >= start_of_day,
        Booking.appointment_date <= end_of_day,
        Booking.status.in_([BookingStatus.PENDING, BookingStatus.CONFIRMED])
    ).all()
    
    # Generate time slots
    slots = []
    current_time = datetime.combine(target_date, open_time)
    end_time = datetime.combine(target_date, close_time)
    
    service_duration = timedelta(minutes=service.duration_minutes)
    buffer = timedelta(minutes=shop.booking_buffer_minutes or 0)
    slot_interval = timedelta(minutes=30)  # Generate slots every 30 minutes
    
    while current_time + service_duration <= end_time:
        # Check if this slot overlaps with any existing booking
        slot_end = current_time + service_duration
        is_available = True
        
        for booking in existing_bookings:
            booking_start = booking.appointment_date
            booking_end = booking_start + timedelta(minutes=booking.duration_minutes) + buffer
            
            # Check for overlap
            if not (slot_end <= booking_start or current_time >= booking_end):
                is_available = False
                break
        
        slots.append(AvailableSlot(
            start_time=current_time,
            end_time=slot_end,
            available=is_available
        ))
        
        current_time += slot_interval
    
    return AvailableSlotsResponse(date=date, slots=slots)


# ============================================================================
# SERVICE ENDPOINTS
# ============================================================================

@app.post("/api/shops/me/services", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(
    service_data: ServiceCreate,
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Create a new service"""
    service = Service(
        shop_id=shop.id,
        **service_data.model_dump()
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@app.get("/api/shops/{slug}/services", response_model=List[ServiceResponse])
def get_shop_services(slug: str, db: Session = Depends(get_db)):
    """Get all services for a shop"""
    shop = db.query(Shop).filter(Shop.slug == slug).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    return db.query(Service).filter(
        Service.shop_id == shop.id,
        Service.is_active == True
    ).all()


@app.patch("/api/services/{service_id}", response_model=ServiceResponse)
def update_service(
    service_id: int,
    updates: ServiceCreate,
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Update a service"""
    service = db.query(Service).filter(
        Service.id == service_id,
        Service.shop_id == shop.id
    ).first()
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    for field, value in updates.model_dump().items():
        setattr(service, field, value)
    
    db.commit()
    db.refresh(service)
    return service


@app.delete("/api/services/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: int,
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Delete a service"""
    service = db.query(Service).filter(
        Service.id == service_id,
        Service.shop_id == shop.id
    ).first()
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(service)
    db.commit()


# ============================================================================
# BOOKING ENDPOINTS
# ============================================================================

@app.post("/api/shops/{slug}/bookings", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    slug: str,
    booking_data: BookingCreate,
    db: Session = Depends(get_db)
):
    """Create a new booking (guest booking)"""
    shop = db.query(Shop).filter(Shop.slug == slug).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop not found")
    
    # Check booking limits for free tier
    if shop.subscription_tier == "free":
        # Count bookings this month
        start_of_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        bookings_this_month = db.query(Booking).filter(
            Booking.shop_id == shop.id,
            Booking.created_at >= start_of_month
        ).count()
        
        if bookings_this_month >= 5:
            raise HTTPException(
                status_code=403,
                detail="Free tier limit reached (5 bookings/month). Please upgrade to continue accepting bookings."
            )
    
    service = db.query(Service).filter(
        Service.id == booking_data.service_id,
        Service.shop_id == shop.id
    ).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Create booking
    booking = Booking(
        shop_id=shop.id,
        service_id=service.id,
        customer_name=booking_data.customer_name,
        customer_email=booking_data.customer_email,
        customer_phone=booking_data.customer_phone,
        pet_name=booking_data.pet_name,
        pet_type=booking_data.pet_type,
        pet_breed=booking_data.pet_breed,
        pet_weight=booking_data.pet_weight,
        special_notes=booking_data.special_notes,
        appointment_date=booking_data.appointment_date,
        duration_minutes=service.duration_minutes,
        status=BookingStatus.CONFIRMED if shop.auto_approve_bookings else BookingStatus.PENDING
    )
    
    db.add(booking)
    db.commit()
    db.refresh(booking)
    
    # Create Google Calendar event if sync is enabled
    if shop.google_calendar_sync_enabled and shop.google_calendar_access_token:
        try:
            service = get_calendar_service(shop.google_calendar_access_token, shop.google_calendar_refresh_token)
            if service and shop.google_calendar_id:
                start_time = booking.appointment_date
                end_time = start_time + timedelta(minutes=booking.duration_minutes)
                
                booking_title = f"{booking.pet_name} - {service.name}"
                description = f"Customer: {booking.customer_name}\nPhone: {booking.customer_phone}\nEmail: {booking.customer_email}\nPet: {booking.pet_name} ({booking.pet_type})\nService: {service.name}\nDuration: {booking.duration_minutes} minutes"
                if booking.special_notes:
                    description += f"\nNotes: {booking.special_notes}"
                
                event_id = create_calendar_event(
                    service=service,
                    calendar_id=shop.google_calendar_id,
                    booking_title=booking_title,
                    start_time=start_time,
                    end_time=end_time,
                    description=description,
                    customer_email=booking.customer_email,
                    customer_phone=booking.customer_phone
                )
                
                # Store event ID in booking
                if event_id:
                    booking.google_calendar_event_id = event_id
                    db.commit()
                    print(f"✅ Created Google Calendar event: {event_id}")
        except Exception as e:
            print(f"⚠️ Failed to create Google Calendar event: {str(e)}")
            # Don't fail the booking if calendar sync fails
    
    # Format appointment time for notifications
    appointment_time_str = booking.appointment_date.strftime("%A, %B %d, %Y at %I:%M %p")
    
    # Send notifications to shop owner (SMS + Email)
    if shop.phone or shop.email:
        notify_shop_new_booking(
            shop_phone=shop.phone,
            shop_email=shop.email,
            shop_name=shop.business_name,
            customer_name=booking.customer_name,
            customer_email=booking.customer_email,
            customer_phone=booking.customer_phone,
            pet_name=booking.pet_name,
            pet_type=booking.pet_type,
            service_name=service.name,
            appointment_time=appointment_time_str,
            special_notes=booking.special_notes
        )
    
    # Send confirmation to customer (SMS + Email)
    if booking.customer_phone or booking.customer_email:
        # Format address for email
        shop_address = f"{shop.address}, {shop.city}, {shop.state} {shop.zip_code}"
        
        notify_customer_booking_confirmed(
            customer_phone=booking.customer_phone,
            customer_email=booking.customer_email,
            customer_name=booking.customer_name,
            pet_name=booking.pet_name,
            service_name=service.name,
            shop_name=shop.business_name,
            shop_address=shop_address,
            shop_phone=shop.phone,
            appointment_time=appointment_time_str,
            duration_minutes=service.duration_minutes,
            special_notes=booking.special_notes
        )
    
    # Refresh to get relationships
    db.refresh(booking)
    
    # Manually set shop info since it's not a relationship
    booking_response = BookingResponse(
        id=booking.id,
        shop_id=booking.shop_id,
        service_id=booking.service_id,
        customer_name=booking.customer_name,
        customer_email=booking.customer_email,
        customer_phone=booking.customer_phone,
        pet_name=booking.pet_name,
        pet_type=booking.pet_type,
        pet_breed=booking.pet_breed,
        pet_weight=booking.pet_weight,
        special_notes=booking.special_notes,
        appointment_date=booking.appointment_date,
        duration_minutes=booking.duration_minutes,
        status=booking.status,
        created_at=booking.created_at,
        service=service,
        shop=ShopListItem(
            id=shop.id,
            business_name=shop.business_name,
            slug=shop.slug,
            description=shop.description,
            city=shop.city,
            state=shop.state,
            address=shop.address,
            phone=shop.phone,
        )
    )
    
    return booking_response


@app.get("/api/bookings/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    """Get a booking by ID (public endpoint for confirmation page)"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    service = db.query(Service).filter(Service.id == booking.service_id).first()
    shop = db.query(Shop).filter(Shop.id == booking.shop_id).first()
    
    if not service or not shop:
        raise HTTPException(status_code=404, detail="Booking data incomplete")
    
    # Manually set shop info
    booking_response = BookingResponse(
        id=booking.id,
        shop_id=booking.shop_id,
        service_id=booking.service_id,
        customer_name=booking.customer_name,
        customer_email=booking.customer_email,
        customer_phone=booking.customer_phone,
        pet_name=booking.pet_name,
        pet_type=booking.pet_type,
        pet_breed=booking.pet_breed,
        pet_weight=booking.pet_weight,
        special_notes=booking.special_notes,
        appointment_date=booking.appointment_date,
        duration_minutes=booking.duration_minutes,
        status=booking.status,
        created_at=booking.created_at,
        service=service,
        shop=ShopListItem(
            id=shop.id,
            business_name=shop.business_name,
            slug=shop.slug,
            description=shop.description,
            city=shop.city,
            state=shop.state,
            address=shop.address,
            phone=shop.phone,
        )
    )
    
    return booking_response


@app.get("/api/shops/me/bookings", response_model=List[BookingResponse])
def get_my_bookings(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    status: Optional[BookingStatus] = None,
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Get all bookings for the authenticated shop"""
    query = db.query(Booking).filter(Booking.shop_id == shop.id)
    
    if start_date:
        query = query.filter(Booking.appointment_date >= start_date)
    if end_date:
        query = query.filter(Booking.appointment_date <= end_date)
    if status:
        query = query.filter(Booking.status == status)
    
    return query.order_by(Booking.appointment_date).all()


@app.patch("/api/bookings/{booking_id}", response_model=BookingResponse)
def update_booking(
    booking_id: int,
    updates: BookingUpdate,
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Update a booking (approve, deny, reschedule, complete)"""
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.shop_id == shop.id
    ).first()
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    
    # Store old appointment date for calendar sync
    old_appointment_date = booking.appointment_date
    old_status = booking.status
    
    for field, value in update_data.items():
        setattr(booking, field, value)
    
    # Get service details for notifications and calendar
    service = db.query(Service).filter(Service.id == booking.service_id).first()
    
    # Sync with Google Calendar if enabled
    if shop.google_calendar_sync_enabled and shop.google_calendar_access_token and shop.google_calendar_id:
        try:
            calendar_service = get_calendar_service(shop.google_calendar_access_token, shop.google_calendar_refresh_token)
            if calendar_service and booking.google_calendar_event_id:
                # Update calendar event if appointment date or time changed
                if old_appointment_date != booking.appointment_date or old_status != booking.status:
                    start_time = booking.appointment_date
                    end_time = start_time + timedelta(minutes=booking.duration_minutes)
                    
                    booking_title = f"{booking.pet_name} - {service.name if service else 'Grooming'}"
                    description = f"Customer: {booking.customer_name}\nPhone: {booking.customer_phone}\nEmail: {booking.customer_email}\nPet: {booking.pet_name} ({booking.pet_type})\nService: {service.name if service else 'Grooming'}\nDuration: {booking.duration_minutes} minutes"
                    if booking.special_notes:
                        description += f"\nNotes: {booking.special_notes}"
                    
                    update_calendar_event(
                        service=calendar_service,
                        calendar_id=shop.google_calendar_id,
                        event_id=booking.google_calendar_event_id,
                        booking_title=booking_title,
                        start_time=start_time,
                        end_time=end_time,
                        description=description
                    )
        except Exception as e:
            print(f"⚠️ Failed to sync with Google Calendar: {str(e)}")
    
    # Set timestamps based on status
    if updates.status == BookingStatus.CONFIRMED and not booking.confirmed_at:
        booking.confirmed_at = datetime.utcnow()
        
        # Format appointment time and address
        appointment_time_str = booking.appointment_date.strftime("%A, %B %d, %Y at %I:%M %p")
        shop_address = f"{shop.address}, {shop.city}, {shop.state} {shop.zip_code}"
        
        # Notify customer of confirmation (SMS + Email)
        notify_customer_booking_confirmed(
            customer_phone=booking.customer_phone,
            customer_email=booking.customer_email,
            customer_name=booking.customer_name,
            pet_name=booking.pet_name,
            service_name=service.name if service else "Grooming Service",
            shop_name=shop.business_name,
            shop_address=shop_address,
            shop_phone=shop.phone,
            appointment_time=appointment_time_str,
            duration_minutes=service.duration_minutes if service else 60,
            special_notes=booking.special_notes
        )
    elif updates.status == BookingStatus.COMPLETED and not booking.completed_at:
        booking.completed_at = datetime.utcnow()
        
        # Calculate commission (3% of service price)
        if service and service.price:
            commission_rate = 0.03  # 3%
            booking.amount_paid = service.price
            booking.platform_commission = round(service.price * commission_rate, 2)
            booking.groomer_payout = round(service.price - booking.platform_commission, 2)
            booking.payment_status = "paid"
            booking.payment_date = datetime.utcnow()
    elif updates.status == BookingStatus.CANCELLED and not booking.cancelled_at:
        booking.cancelled_at = datetime.utcnow()
        # Notify customer of cancellation
        notify_customer_booking_cancelled(
            customer_phone=booking.customer_phone,
            shop_name=shop.business_name,
            pet_name=booking.pet_name
        )
    
    db.commit()
    db.refresh(booking)
    
    return booking


# ============================================================================
# GOOGLE BOOKING API ENDPOINTS - GMB INTEGRATION
# ============================================================================

@app.get("/api/google/booking/availability")
def google_booking_availability(
    shop_id: int = Query(..., description="Shop ID"),
    service_id: Optional[int] = Query(None, description="Optional service ID"),
    start_date: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    end_date: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    """
    Get available time slots for Google Booking API.
    Compatible with Google My Business booking integration.
    """
    try:
        # Parse dates
        if start_date:
            start_dt = datetime.strptime(start_date, "%Y-%m-%d")
        else:
            start_dt = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        
        if end_date:
            end_dt = datetime.strptime(end_date, "%Y-%m-%d") + timedelta(days=1)
        else:
            end_dt = start_dt + timedelta(days=30)
        
        slots = gb_get_availability(
            db=db,
            shop_id=shop_id,
            service_id=service_id,
            start_date=start_dt,
            end_date=end_dt
        )
        
        return {
            "available_slots": slots,
            "shop_id": shop_id,
            "service_id": service_id,
            "date_range": {
                "start": start_dt.isoformat(),
                "end": end_dt.isoformat()
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get availability: {str(e)}")


@app.post("/api/google/booking/create", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def google_booking_create(
    booking_data: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db)
):
    """
    Create a booking from Google Booking API.
    Expected fields:
    - shop_id: int
    - service_id: int
    - start_time: str (ISO format)
    - customer_name: str
    - customer_email: str
    - customer_phone: str
    - pet_name: Optional[str]
    - pet_type: Optional[str]
    - notes: Optional[str]
    - google_booking_id: Optional[str]
    """
    try:
        # Parse start_time
        start_time_str = booking_data.get("start_time")
        if not start_time_str:
            raise HTTPException(status_code=400, detail="start_time is required")
        
        start_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
        if start_time.tzinfo:
            start_time = start_time.replace(tzinfo=None)
        
        booking = gb_create_booking(
            db=db,
            shop_id=booking_data["shop_id"],
            service_id=booking_data["service_id"],
            start_time=start_time,
            customer_name=booking_data["customer_name"],
            customer_email=booking_data["customer_email"],
            customer_phone=booking_data["customer_phone"],
            pet_name=booking_data.get("pet_name"),
            pet_type=booking_data.get("pet_type"),
            notes=booking_data.get("notes"),
            google_booking_id=booking_data.get("google_booking_id")
        )
        
        # Send notifications
        shop = db.query(Shop).filter(Shop.id == booking.shop_id).first()
        service = db.query(Service).filter(Service.id == booking.service_id).first()
        
        if shop and service:
            notify_shop_new_booking(
                shop_phone=shop.phone,
                shop_email=shop.email,
                shop_name=shop.business_name,
                customer_name=booking.customer_name,
                customer_phone=booking.customer_phone,
                pet_name=booking.pet_name,
                service_name=service.name,
                appointment_time=booking.appointment_date.strftime("%A, %B %d, %Y at %I:%M %p")
            )
            
            if booking.status == BookingStatus.CONFIRMED:
                appointment_time_str = booking.appointment_date.strftime("%A, %B %d, %Y at %I:%M %p")
                shop_address = f"{shop.address}, {shop.city}, {shop.state} {shop.zip_code}"
                
                notify_customer_booking_confirmed(
                    customer_phone=booking.customer_phone,
                    customer_email=booking.customer_email,
                    customer_name=booking.customer_name,
                    pet_name=booking.pet_name,
                    service_name=service.name,
                    shop_name=shop.business_name,
                    shop_address=shop_address,
                    shop_phone=shop.phone,
                    appointment_time=appointment_time_str,
                    duration_minutes=service.duration_minutes,
                    special_notes=booking.notes
                )
        
        return booking
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create booking: {str(e)}")


@app.patch("/api/google/booking/{booking_id}", response_model=BookingResponse)
def google_booking_update(
    booking_id: int,
    updates: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db)
):
    """
    Update a booking from Google Booking API.
    """
    try:
        # Parse status if provided
        status_update = None
        if "status" in updates:
            status_str = updates["status"].upper()
            if status_str == "CONFIRMED":
                status_update = BookingStatus.CONFIRMED
            elif status_str == "CANCELLED":
                status_update = BookingStatus.CANCELLED
            elif status_str == "COMPLETED":
                status_update = BookingStatus.COMPLETED
            elif status_str == "PENDING":
                status_update = BookingStatus.PENDING
        
        # Parse start_time if provided
        start_time_update = None
        if "start_time" in updates:
            start_time_str = updates["start_time"]
            start_time_update = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
            if start_time_update.tzinfo:
                start_time_update = start_time_update.replace(tzinfo=None)
        
        booking = gb_update_booking(
            db=db,
            booking_id=booking_id,
            google_booking_id=updates.get("google_booking_id"),
            status=status_update,
            start_time=start_time_update,
            notes=updates.get("notes")
        )
        
        return booking
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update booking: {str(e)}")


@app.delete("/api/google/booking/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
def google_booking_cancel(
    booking_id: int,
    reason: Optional[str] = Query(None, description="Cancellation reason"),
    db: Session = Depends(get_db)
):
    """
    Cancel a booking from Google Booking API.
    """
    try:
        booking = gb_cancel_booking(db=db, booking_id=booking_id, reason=reason)
        
        # Send cancellation notification
        shop = db.query(Shop).filter(Shop.id == booking.shop_id).first()
        if shop:
            notify_customer_booking_cancelled(
                customer_phone=booking.customer_phone,
                shop_name=shop.business_name,
                pet_name=booking.pet_name
            )
        
        return None
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to cancel booking: {str(e)}")


@app.get("/api/google/booking/services")
def google_booking_services(
    shop_id: int = Query(..., description="Shop ID"),
    db: Session = Depends(get_db)
):
    """
    Get service catalog for Google Booking API.
    """
    try:
        services = gb_get_services(db=db, shop_id=shop_id)
        return {
            "services": services,
            "shop_id": shop_id
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get services: {str(e)}")


@app.post("/api/google/booking/webhook")
def google_booking_webhook(
    webhook_data: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db)
):
    """
    Handle webhook events from Google Booking API.
    Events: booking.created, booking.updated, booking.cancelled
    """
    try:
        event_type = webhook_data.get("event_type")
        booking_data = webhook_data.get("booking", {})
        google_booking_id = booking_data.get("id")
        
        if not google_booking_id:
            raise HTTPException(status_code=400, detail="Booking ID is required")
        
        # Find existing booking by Google ID
        booking = get_booking_by_google_id(db=db, google_booking_id=google_booking_id)
        
        if event_type == "booking.created":
            if booking:
                # Update existing booking
                booking = gb_update_booking(
                    db=db,
                    booking_id=booking.id,
                    google_booking_id=google_booking_id,
                    status=BookingStatus.CONFIRMED if booking_data.get("confirmed") else BookingStatus.PENDING
                )
            else:
                # Create new booking
                start_time_str = booking_data.get("start_time")
                start_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
                if start_time.tzinfo:
                    start_time = start_time.replace(tzinfo=None)
                
                booking = gb_create_booking(
                    db=db,
                    shop_id=booking_data["shop_id"],
                    service_id=booking_data["service_id"],
                    start_time=start_time,
                    customer_name=booking_data["customer_name"],
                    customer_email=booking_data["customer_email"],
                    customer_phone=booking_data["customer_phone"],
                    pet_name=booking_data.get("pet_name"),
                    pet_type=booking_data.get("pet_type"),
                    notes=booking_data.get("notes"),
                    google_booking_id=google_booking_id
                )
        
        elif event_type == "booking.updated":
            if not booking:
                raise HTTPException(status_code=404, detail="Booking not found")
            
            status_update = None
            if booking_data.get("confirmed"):
                status_update = BookingStatus.CONFIRMED
            elif booking_data.get("cancelled"):
                status_update = BookingStatus.CANCELLED
            
            start_time_update = None
            if booking_data.get("start_time"):
                start_time_str = booking_data["start_time"]
                start_time_update = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
                if start_time_update.tzinfo:
                    start_time_update = start_time_update.replace(tzinfo=None)
            
            booking = gb_update_booking(
                db=db,
                booking_id=booking.id,
                status=status_update,
                start_time=start_time_update,
                notes=booking_data.get("notes")
            )
        
        elif event_type == "booking.cancelled":
            if not booking:
                raise HTTPException(status_code=404, detail="Booking not found")
            
            booking = gb_cancel_booking(
                db=db,
                booking_id=booking.id,
                reason=booking_data.get("cancellation_reason", "Cancelled via Google")
            )
        
        return {"status": "success", "booking_id": booking.id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process webhook: {str(e)}")


# ============================================================================
# STRIPE ENDPOINTS - REVENUE
# ============================================================================

@app.post("/api/subscription/create-checkout")
def create_checkout_session(
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Create Stripe Checkout session for subscription"""
    # Create Stripe customer if doesn't exist
    if not shop.stripe_customer_id:
        stripe_customer_id = create_stripe_customer(shop.owner_email, shop.owner_name)
        if stripe_customer_id:
            shop.stripe_customer_id = stripe_customer_id
            db.commit()
    
    # Create checkout session
    success_url = f"{os.getenv('FRONTEND_URL', 'https://www.petcarebooker.com')}/dashboard/subscription/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{os.getenv('FRONTEND_URL', 'https://www.petcarebooker.com')}/dashboard/subscription/cancel"
    
    checkout_data = create_subscription_checkout_session(
        customer_id=shop.stripe_customer_id,
        success_url=success_url,
        cancel_url=cancel_url,
        shop_id=shop.id
    )
    
    if not checkout_data:
        raise HTTPException(status_code=500, detail="Failed to create checkout session")
    
    return checkout_data


@app.post("/api/subscription/cancel")
def cancel_shop_subscription(
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Cancel shop subscription"""
    if not shop.stripe_subscription_id:
        raise HTTPException(status_code=400, detail="No active subscription to cancel")
    
    success = cancel_subscription(shop.stripe_subscription_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to cancel subscription")
    
    # Update shop status
    shop.subscription_status = "cancelled"
    shop.subscription_cancelled_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Subscription cancelled successfully"}


@app.get("/api/subscription/status")
def get_subscription_status(shop: Shop = Depends(get_current_shop)):
    """Get current subscription status"""
    return {
        "subscription_tier": shop.subscription_tier,
        "subscription_status": shop.subscription_status,
        "subscription_start_date": shop.subscription_start_date.isoformat() if shop.subscription_start_date else None,
        "subscription_renewal_date": shop.subscription_renewal_date.isoformat() if shop.subscription_renewal_date else None,
        "subscription_cancelled_at": shop.subscription_cancelled_at.isoformat() if shop.subscription_cancelled_at else None,
    }


# ============================================================================
# GOOGLE CALENDAR INTEGRATION ENDPOINTS
# ============================================================================

@app.get("/api/shops/me/calendar/authorize")
def get_calendar_authorization_url(shop: Shop = Depends(get_current_shop)):
    """Get Google Calendar OAuth authorization URL"""
    auth_url = get_authorization_url(shop.id)
    if not auth_url:
        raise HTTPException(
            status_code=500,
            detail="Google Calendar integration not configured. Please contact support."
        )
    return {"authorization_url": auth_url}


@app.post("/api/shops/me/calendar/connect")
def connect_google_calendar(
    code: str = Body(...),
    state: str = Body(...),
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Connect Google Calendar using OAuth code"""
    tokens = exchange_code_for_tokens(code, state)
    if not tokens:
        raise HTTPException(status_code=400, detail="Failed to exchange authorization code")
    
    # Verify shop_id matches
    if tokens.get("shop_id") != shop.id:
        raise HTTPException(status_code=403, detail="Invalid authorization")
    
    # Get calendar service to fetch primary calendar ID
    service = get_calendar_service(tokens["access_token"], tokens["refresh_token"])
    if not service:
        raise HTTPException(status_code=500, detail="Failed to connect to Google Calendar")
    
    calendar_id = get_primary_calendar_id(service)
    if not calendar_id:
        raise HTTPException(status_code=500, detail="Failed to get calendar ID")
    
    # Store tokens and calendar info
    shop.google_calendar_id = calendar_id
    shop.google_calendar_sync_enabled = True
    shop.google_calendar_access_token = tokens["access_token"]
    shop.google_calendar_refresh_token = tokens["refresh_token"]
    shop.google_calendar_last_sync = datetime.utcnow()
    
    db.commit()
    db.refresh(shop)
    
    return {
        "message": "Google Calendar connected successfully",
        "calendar_id": calendar_id,
        "sync_enabled": True
    }


@app.get("/api/shops/me/calendar/status")
def get_calendar_status(shop: Shop = Depends(get_current_shop)):
    """Get Google Calendar sync status"""
    return {
        "connected": shop.google_calendar_sync_enabled and shop.google_calendar_access_token is not None,
        "sync_enabled": shop.google_calendar_sync_enabled or False,
        "calendar_id": shop.google_calendar_id,
        "last_sync": shop.google_calendar_last_sync.isoformat() if shop.google_calendar_last_sync else None
    }


@app.post("/api/shops/me/calendar/disconnect")
def disconnect_google_calendar(
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Disconnect Google Calendar"""
    shop.google_calendar_sync_enabled = False
    shop.google_calendar_access_token = None
    shop.google_calendar_refresh_token = None
    shop.google_calendar_id = None
    shop.google_calendar_last_sync = None
    
    db.commit()
    
    return {"message": "Google Calendar disconnected successfully"}


@app.post("/api/shops/me/calendar/sync-now")
def sync_calendar_now(
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Manually trigger calendar sync"""
    if not shop.google_calendar_sync_enabled or not shop.google_calendar_access_token:
        raise HTTPException(status_code=400, detail="Google Calendar not connected")
    
    # Refresh token if needed
    service = get_calendar_service(shop.google_calendar_access_token, shop.google_calendar_refresh_token)
    if not service:
        # Try refreshing token
        new_tokens = refresh_access_token(shop.google_calendar_refresh_token)
        if new_tokens:
            shop.google_calendar_access_token = new_tokens["access_token"]
            db.commit()
            service = get_calendar_service(shop.google_calendar_access_token, shop.google_calendar_refresh_token)
    
    if not service:
        raise HTTPException(status_code=500, detail="Failed to connect to Google Calendar")
    
    # Update last sync time
    shop.google_calendar_last_sync = datetime.utcnow()
    db.commit()
    
    return {
        "message": "Calendar sync completed",
        "last_sync": shop.google_calendar_last_sync.isoformat()
    }


# ============================================================================
# REFERRAL SYSTEM ENDPOINTS
# ============================================================================

import secrets
import string

def generate_referral_code(shop_id: int) -> str:
    """Generate a unique referral code for a shop"""
    # Format: PCB-{shop_id}-{random}
    random_part = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(6))
    return f"PCB-{shop_id}-{random_part}"

@app.get("/api/shops/me/referral-code")
def get_referral_code(
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Get or create referral code for current shop"""
    if not shop.referral_code:
        # Generate new referral code
        shop.referral_code = generate_referral_code(shop.id)
        db.commit()
        db.refresh(shop)
    
    frontend_url = os.getenv("FRONTEND_URL", "https://www.petcarebooker.com")
    referral_link = f"{frontend_url}/register?ref={shop.referral_code}"
    
    return {
        "referral_code": shop.referral_code,
        "referral_link": referral_link,
        "referrals_count": shop.referrals_count or 0,
        "referral_credits": shop.referral_credits or 0
    }

@app.get("/api/shops/me/referrals")
def get_referrals(
    shop: Shop = Depends(get_current_shop),
    db: Session = Depends(get_db)
):
    """Get list of shops referred by current shop"""
    # Find shops that registered with this shop's referral code
    referred_shops = db.query(Shop).filter(
        Shop.referred_by_code == shop.referral_code
    ).all()
    
    # Format response
    referrals_list = [
        {
            "id": s.id,
            "business_name": s.business_name,
            "owner_email": s.owner_email,
            "created_at": s.created_at.isoformat() if s.created_at else None
        }
        for s in referred_shops
    ]
    
    return {
        "referrals": referrals_list,
        "total_count": shop.referrals_count or 0,
        "total_credits": shop.referral_credits or 0
    }


@app.post("/api/stripe/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """Handle Stripe webhook events"""
    import stripe
    
    body = await request.body()
    signature = request.headers.get("stripe-signature")
    
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    if not webhook_secret:
        raise HTTPException(status_code=500, detail="Webhook secret not configured")
    
    try:
        event = stripe.Webhook.construct_event(
            body, signature, webhook_secret
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    result = handle_webhook_event(event)
    
    if result and isinstance(result, dict):
        shop_id = result.get('shop_id')
        action = result.get('action')
        
        if shop_id:
            shop = db.query(Shop).filter(Shop.id == shop_id).first()
            if shop:
                if action == 'activate_subscription':
                    shop.subscription_tier = 'basic'
                    shop.subscription_status = 'active'
                    shop.stripe_subscription_id = result.get('subscription_id')
                    shop.stripe_customer_id = result.get('customer_id')
                    shop.subscription_start_date = datetime.utcnow()
                    # Set renewal date to 1 month from now
                    shop.subscription_renewal_date = datetime.utcnow() + timedelta(days=30)
                elif action == 'cancel_subscription':
                    shop.subscription_status = 'cancelled'
                    shop.subscription_cancelled_at = datetime.utcnow()
                
                db.commit()
    
    return {"status": "success"}
#     
#     if result and result.get('action') == 'activate_subscription':
#         shop_id = result.get('shop_id')
#         subscription_id = result.get('subscription_id')
#         customer_id = result.get('customer_id')
#         
#         db = next(get_db())
#         shop = db.query(Shop).filter(Shop.id == shop_id).first()
#         
#         if shop:
#             shop.stripe_customer_id = customer_id
#             shop.stripe_subscription_id = subscription_id
#             shop.subscription_tier = "basic"
#             shop.subscription_status = "active"
#             shop.subscription_start_date = datetime.utcnow()
#             shop.subscription_renewal_date = datetime.utcnow() + timedelta(days=30)
#             
#             db.commit()
#     
#     elif result and result.get('action') == 'cancel_subscription':
#         shop_id = result.get('shop_id')
#         
#         db = next(get_db())
#         shop = db.query(Shop).filter(Shop.id == shop_id).first()
#         
#         if shop:
#             shop.subscription_status = "cancelled"
#             shop.subscription_cancelled_at = datetime.utcnow()
#             
#             db.commit()
#     
#     return {"status": "success"}


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@app.post("/api/contact")
def submit_contact_form(contact: ContactForm = Body(...)):
    """
    Submit contact form - sends email to haquemediagroup@gmail.com
    """
    try:
        # Send email
        print(f"📧 Received contact form submission:")
        print(f"   Name: {contact.name}")
        print(f"   Email: {contact.email}")
        print(f"   Subject: {contact.subject}")
        
        success = send_contact_email(contact.name, contact.email, contact.subject, contact.message)
        
        if success:
            return {"message": "Contact form submitted successfully", "status": "success"}
        else:
            # Log the submission even if email fails
            print(f"⚠️ Email sending failed, but form was submitted. Check logs above.")
            return {
                "message": "Contact form submitted", 
                "status": "success", 
                "note": "Email may not have been sent - check backend logs"
            }
            
    except Exception as e:
        print(f"❌ Error in contact form endpoint: {str(e)}")
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Failed to submit contact form: {str(e)}")


@app.get("/api/test")
def test_endpoint():
    """Simple test endpoint without database"""
    return {"message": "Backend is working", "timestamp": datetime.utcnow().isoformat()}


@app.get("/sentry-debug")
async def trigger_error():
    """
    Test endpoint to verify Sentry error tracking is working.
    This will trigger a division by zero error that Sentry will capture.
    """
    division_by_zero = 1 / 0


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

