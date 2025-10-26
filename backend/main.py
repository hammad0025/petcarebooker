from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta, time
import re
import json

from database import engine, get_db, Base
from models import Shop, Service, Booking, BookingStatus, Customer, Pet
from schemas import (
    ShopCreate, ShopResponse, ShopListItem, ShopUpdate,
    ServiceCreate, ServiceResponse,
    BookingCreate, BookingResponse, BookingUpdate,
    LoginRequest, TokenResponse,
    CustomerRegister, CustomerResponse,
    PetCreate, PetResponse,
    BusinessHoursUpdate, AvailableSlot, AvailableSlotsResponse
)
from auth import hash_password, verify_password, create_access_token, get_current_shop, get_current_customer
from notifications import notify_shop_new_booking, notify_customer_booking_confirmed, notify_customer_booking_cancelled

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PetCareBooker API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:8081",  # Expo mobile app
        "http://10.0.0.181:8081",   # Expo on network
        "https://petcarebooker.com",  # Production domain
        "https://www.petcarebooker.com",  # WWW production domain
        "https://frontend-1vjods97p-syed-haques-projects-689f876f.vercel.app",  # Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        booking_buffer_minutes=15
    )
    
    db.add(shop)
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
    query = db.query(Shop)
    
    if city:
        query = query.filter(Shop.city.ilike(f"%{city}%"))
    if state:
        query = query.filter(Shop.state.ilike(f"%{state}%"))
    if search:
        query = query.filter(Shop.business_name.ilike(f"%{search}%"))
    
    return query.all()


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
    
    # Send SMS notification to shop owner
    if shop.phone:
        notify_shop_new_booking(
            shop_phone=shop.phone,
            customer_name=booking.customer_name,
            pet_name=booking.pet_name,
            service_name=service.name,
            appointment_time=booking.appointment_date.strftime("%m/%d/%Y %I:%M %p")
        )
    
    return booking


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
    
    for field, value in update_data.items():
        setattr(booking, field, value)
    
    # Set timestamps based on status
    if updates.status == BookingStatus.CONFIRMED and not booking.confirmed_at:
        booking.confirmed_at = datetime.utcnow()
        # Notify customer of confirmation
        notify_customer_booking_confirmed(
            customer_phone=booking.customer_phone,
            shop_name=shop.business_name,
            pet_name=booking.pet_name,
            appointment_time=booking.appointment_date.strftime("%m/%d/%Y %I:%M %p")
        )
    elif updates.status == BookingStatus.COMPLETED and not booking.completed_at:
        booking.completed_at = datetime.utcnow()
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


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

