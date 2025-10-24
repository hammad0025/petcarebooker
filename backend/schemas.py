from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List
from models import BookingStatus


# Shop Schemas
class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    duration_minutes: int
    category: Optional[str] = None


class ServiceCreate(ServiceBase):
    pass


class ServiceResponse(ServiceBase):
    id: int
    shop_id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ShopBase(BaseModel):
    business_name: str
    description: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None


class ShopCreate(ShopBase):
    owner_name: str
    owner_email: EmailStr
    owner_phone: str
    password: str
    slug: str


class ShopUpdate(BaseModel):
    business_name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    business_hours: Optional[str] = None
    logo_url: Optional[str] = None
    cover_image_url: Optional[str] = None


class ShopResponse(ShopBase):
    id: int
    slug: str
    owner_name: str
    logo_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    business_hours: Optional[str] = None
    auto_approve_bookings: Optional[bool] = None
    booking_buffer_minutes: Optional[int] = None
    created_at: datetime
    services: List[ServiceResponse] = []

    class Config:
        from_attributes = True


class ShopListItem(BaseModel):
    id: int
    business_name: str
    slug: str
    description: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    logo_url: Optional[str] = None

    class Config:
        from_attributes = True


# Booking Schemas
class BookingCreate(BaseModel):
    service_id: int
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    pet_name: str
    pet_type: str = Field(..., pattern="^(dog|cat)$")
    pet_breed: Optional[str] = None
    pet_weight: Optional[str] = None
    special_notes: Optional[str] = None
    appointment_date: datetime


class BookingResponse(BaseModel):
    id: int
    shop_id: int
    service_id: int
    customer_name: str
    customer_email: str
    customer_phone: str
    pet_name: str
    pet_type: str
    pet_breed: Optional[str] = None
    pet_weight: Optional[str] = None
    special_notes: Optional[str] = None
    appointment_date: datetime
    duration_minutes: int
    status: BookingStatus
    created_at: datetime
    service: ServiceResponse

    class Config:
        from_attributes = True


class BookingUpdate(BaseModel):
    status: Optional[BookingStatus] = None
    appointment_date: Optional[datetime] = None


# Auth Schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    shop_id: int
    business_name: str


# Customer Schemas
class CustomerRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str


class CustomerResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    customer_id: int
    name: str


class PetCreate(BaseModel):
    name: str
    pet_type: str
    breed: Optional[str] = None
    weight: Optional[str] = None
    special_notes: Optional[str] = None


class PetResponse(BaseModel):
    id: int
    name: str
    pet_type: str
    breed: Optional[str] = None
    weight: Optional[str] = None
    special_notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Business Hours Schemas
class DayHours(BaseModel):
    open: str  # "09:00"
    close: str  # "17:00"
    is_closed: bool = False


class BusinessHoursUpdate(BaseModel):
    monday: Optional[DayHours] = None
    tuesday: Optional[DayHours] = None
    wednesday: Optional[DayHours] = None
    thursday: Optional[DayHours] = None
    friday: Optional[DayHours] = None
    saturday: Optional[DayHours] = None
    sunday: Optional[DayHours] = None
    auto_approve_bookings: Optional[bool] = None
    booking_buffer_minutes: Optional[int] = None


class AvailableSlot(BaseModel):
    start_time: datetime
    end_time: datetime
    available: bool


class AvailableSlotsResponse(BaseModel):
    date: str  # "2025-10-24"
    slots: List[AvailableSlot]

