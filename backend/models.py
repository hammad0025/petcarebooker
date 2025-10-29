from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from database import Base


class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"
    NO_SHOW = "no_show"


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    pets = relationship("Pet", back_populates="customer", cascade="all, delete-orphan")
    bookings = relationship("Booking", back_populates="customer", cascade="all, delete-orphan")
    password_reset_tokens = relationship("PasswordResetToken", back_populates="customer", cascade="all, delete-orphan")


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    token = Column(String, unique=True, nullable=False, index=True)
    expires_at = Column(DateTime, nullable=False)
    used = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    customer = relationship("Customer", back_populates="password_reset_tokens")


class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    
    name = Column(String, nullable=False)
    pet_type = Column(String, nullable=False)  # "dog" or "cat"
    breed = Column(String)
    weight = Column(String)
    
    # Enhanced pet-centric fields
    photo_url = Column(String)  # Pet profile photo
    birth_date = Column(DateTime)  # For age calculation
    gender = Column(String)  # Male, Female, Unknown
    color = Column(String)  # For description
    special_notes = Column(Text)  # Allergies, fears, preferences
    health_notes = Column(Text)  # Medical notes, vaccinations
    favorite_groomer_id = Column(Integer, ForeignKey("shops.id"), nullable=True)  # Auto-select preferred groomer
    grooming_frequency_days = Column(Integer)  # How often they need grooming (e.g., 30, 60, 90)
    last_groom_date = Column(DateTime)  # Last grooming appointment
    next_groom_due = Column(DateTime)  # When next groom is recommended
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    customer = relationship("Customer", back_populates="pets")
    bookings = relationship("Booking", back_populates="pet")
    favorite_groomer = relationship("Shop", foreign_keys=[favorite_groomer_id])


class Shop(Base):
    __tablename__ = "shops"

    id = Column(Integer, primary_key=True, index=True)
    owner_name = Column(String, nullable=False)
    owner_email = Column(String, unique=True, index=True, nullable=False)
    owner_phone = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    
    # Shop details
    business_name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)  # URL-friendly name
    description = Column(Text)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    phone = Column(String)
    email = Column(String)
    
    # Subscription & Billing - REVENUE MODEL
    subscription_tier = Column(String, default="free")  # free, basic, premium
    subscription_status = Column(String, default="active")  # active, cancelled, trial
    stripe_customer_id = Column(String)  # Stripe customer ID for billing
    stripe_subscription_id = Column(String)  # Stripe subscription ID
    subscription_start_date = Column(DateTime)
    subscription_renewal_date = Column(DateTime)
    subscription_cancelled_at = Column(DateTime)
    
    # Location (for map integration)
    latitude = Column(Float)  # e.g., 26.7153 for West Palm Beach
    longitude = Column(Float)  # e.g., -80.0534 for West Palm Beach
    
    # Mobile groomer support
    is_mobile = Column(Boolean, default=False)  # Is this a mobile groomer?
    service_area = Column(Text)  # JSON: {"radius_miles": 10, "zip_codes": ["33401", "33402"], "neighborhoods": ["Downtown", "Northwood"]}
    
    # Business hours (stored as JSON string)
    business_hours = Column(Text)  # JSON: {"monday": {"open": "09:00", "close": "17:00"}, ...}
    
    # Images
    logo_url = Column(String)
    cover_image_url = Column(String)
    
    # Settings
    auto_approve_bookings = Column(Boolean, default=False)
    booking_buffer_minutes = Column(Integer, default=15)  # Buffer between appointments
    advance_booking_days = Column(Integer, default=30)  # How far in advance customers can book
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    services = relationship("Service", back_populates="shop", cascade="all, delete-orphan")
    bookings = relationship("Booking", back_populates="shop", cascade="all, delete-orphan")


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=False)
    
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    
    # Category for filtering (e.g., "Small Dog", "Large Dog", "Cat")
    category = Column(String)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    shop = relationship("Shop", back_populates="services")
    bookings = relationship("Booking", back_populates="service")


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    shop_id = Column(Integer, ForeignKey("shops.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    
    # Customer (optional - can be guest or logged in)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=True)
    
    # Guest customer info (used if customer_id is null)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    
    # Pet info (used if pet_id is null)
    pet_name = Column(String, nullable=False)
    pet_type = Column(String, nullable=False)  # "dog" or "cat"
    pet_breed = Column(String)
    pet_weight = Column(String)  # "Small", "Medium", "Large" or actual weight
    special_notes = Column(Text)
    
    # Appointment details
    appointment_date = Column(DateTime, nullable=False, index=True)
    duration_minutes = Column(Integer, nullable=False)
    status = Column(Enum(BookingStatus), default=BookingStatus.PENDING, index=True)
    
    # Payment fields - REVENUE TRACKING
    amount_paid = Column(Float)  # Amount customer paid
    stripe_payment_intent_id = Column(String)  # Stripe payment intent ID
    payment_status = Column(String, default="pending")  # pending, paid, refunded
    payment_date = Column(DateTime)
    
    # Commission tracking - YOUR REVENUE
    platform_commission = Column(Float)  # Your cut (e.g., 5-10%)
    groomer_payout = Column(Float)  # What groomer gets
    commission_processed = Column(Boolean, default=False)
    
    # Tracking
    created_at = Column(DateTime, default=datetime.utcnow)
    confirmed_at = Column(DateTime)
    completed_at = Column(DateTime)
    cancelled_at = Column(DateTime)
    
    # Relationships
    shop = relationship("Shop", back_populates="bookings")
    service = relationship("Service", back_populates="bookings")
    customer = relationship("Customer", back_populates="bookings")
    pet = relationship("Pet", back_populates="bookings")

