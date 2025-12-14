"""
Google Booking API Service
Handles Google My Business booking integration
"""
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta, time
from sqlalchemy.orm import Session
from models import Shop, Service, Booking, BookingStatus, Customer
import json


def get_availability(
    db: Session,
    shop_id: int,
    service_id: Optional[int] = None,
    start_date: datetime = None,
    end_date: datetime = None
) -> List[Dict[str, Any]]:
    """
    Get available time slots for a shop/service.
    Returns format compatible with Google Booking API.
    
    Args:
        db: Database session
        shop_id: Shop ID
        service_id: Optional service ID to filter by
        start_date: Start of date range (defaults to today)
        end_date: End of date range (defaults to 30 days from start)
    
    Returns:
        List of available time slots in Google Booking API format
    """
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if not shop:
        raise ValueError("Shop not found")
    
    # Default date range
    if not start_date:
        start_date = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    if not end_date:
        end_date = start_date + timedelta(days=30)
    
    # Get services
    if service_id:
        services = db.query(Service).filter(
            Service.id == service_id,
            Service.shop_id == shop_id
        ).all()
    else:
        services = db.query(Service).filter(Service.shop_id == shop_id).all()
    
    if not services:
        return []
    
    # Parse business hours
    if not shop.business_hours:
        return []
    
    try:
        business_hours = json.loads(shop.business_hours)
    except:
        return []
    
    # Get existing bookings
    existing_bookings = db.query(Booking).filter(
        Booking.shop_id == shop_id,
        Booking.appointment_date >= start_date,
        Booking.appointment_date <= end_date,
        Booking.status.in_([BookingStatus.PENDING, BookingStatus.CONFIRMED])
    ).all()
    
    # Generate available slots
    available_slots = []
    current_date = start_date.date()
    end_date_only = end_date.date()
    
    while current_date <= end_date_only:
        day_name = current_date.strftime("%A").lower()
        
        if day_name not in business_hours or business_hours[day_name].get("is_closed", False):
            current_date += timedelta(days=1)
            continue
        
        day_hours = business_hours[day_name]
        
        try:
            open_time = datetime.strptime(day_hours["open"], "%H:%M").time()
            close_time = datetime.strptime(day_hours["close"], "%H:%M").time()
        except (KeyError, ValueError):
            current_date += timedelta(days=1)
            continue
        
        # Generate slots for each service
        for service in services:
            service_duration = timedelta(minutes=service.duration_minutes)
            buffer = timedelta(minutes=shop.booking_buffer_minutes or 15)
            slot_interval = timedelta(minutes=30)
            
            current_time = datetime.combine(current_date, open_time)
            end_time = datetime.combine(current_date, close_time)
            
            while current_time + service_duration <= end_time:
                slot_end = current_time + service_duration
                is_available = True
                
                # Check for conflicts with existing bookings
                for booking in existing_bookings:
                    booking_start = booking.appointment_date
                    booking_end = booking_start + timedelta(minutes=booking.duration_minutes) + buffer
                    
                    if not (slot_end <= booking_start or current_time >= booking_end):
                        is_available = False
                        break
                
                if is_available:
                    available_slots.append({
                        "service_id": service.id,
                        "service_name": service.name,
                        "start_time": current_time.isoformat(),
                        "end_time": slot_end.isoformat(),
                        "duration_minutes": service.duration_minutes,
                        "price": float(service.price),
                    })
                
                current_time += slot_interval
        
        current_date += timedelta(days=1)
    
    return available_slots


def create_booking(
    db: Session,
    shop_id: int,
    service_id: int,
    start_time: datetime,
    customer_name: str,
    customer_email: str,
    customer_phone: str,
    pet_name: Optional[str] = None,
    pet_type: Optional[str] = None,
    notes: Optional[str] = None,
    google_booking_id: Optional[str] = None
) -> Booking:
    """
    Create a booking from Google Booking API.
    
    Args:
        db: Database session
        shop_id: Shop ID
        service_id: Service ID
        start_time: Appointment start time
        customer_name: Customer name
        customer_email: Customer email
        customer_phone: Customer phone
        pet_name: Optional pet name
        pet_type: Optional pet type
        notes: Optional booking notes
        google_booking_id: Google's booking ID
    
    Returns:
        Created Booking object
    """
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if not shop:
        raise ValueError("Shop not found")
    
    service = db.query(Service).filter(
        Service.id == service_id,
        Service.shop_id == shop_id
    ).first()
    if not service:
        raise ValueError("Service not found")
    
    # Check if slot is still available
    end_time = start_time + timedelta(minutes=service.duration_minutes)
    buffer = timedelta(minutes=shop.booking_buffer_minutes or 15)
    
    conflicting_booking = db.query(Booking).filter(
        Booking.shop_id == shop_id,
        Booking.appointment_date < end_time + buffer,
        Booking.appointment_date + timedelta(minutes=Booking.duration_minutes) + buffer > start_time,
        Booking.status.in_([BookingStatus.PENDING, BookingStatus.CONFIRMED])
    ).first()
    
    if conflicting_booking:
        raise ValueError("Time slot no longer available")
    
    # Get or create customer
    customer = db.query(Customer).filter(Customer.email == customer_email).first()
    if not customer:
        customer = Customer(
            name=customer_name,
            email=customer_email,
            phone=customer_phone
        )
        db.add(customer)
        db.flush()
    
    # Create booking
    booking = Booking(
        shop_id=shop_id,
        service_id=service_id,
        customer_id=customer.id,
        appointment_date=start_time,
        duration_minutes=service.duration_minutes,
        status=BookingStatus.PENDING if not shop.auto_approve_bookings else BookingStatus.CONFIRMED,
        customer_name=customer_name,
        customer_email=customer_email,
        customer_phone=customer_phone,
        pet_name=pet_name,
        pet_type=pet_type,
        notes=notes or f"Booking created via Google My Business",
        google_booking_id=google_booking_id,
        source='google',
        amount_paid=service.price,
        platform_commission=service.price * 0.03,  # 3% commission
        groomer_payout=service.price * 0.97,
    )
    
    db.add(booking)
    db.commit()
    db.refresh(booking)
    
    return booking


def update_booking(
    db: Session,
    booking_id: int,
    google_booking_id: Optional[str] = None,
    status: Optional[BookingStatus] = None,
    start_time: Optional[datetime] = None,
    notes: Optional[str] = None
) -> Booking:
    """
    Update an existing booking.
    
    Args:
        db: Database session
        booking_id: Booking ID
        google_booking_id: Google's booking ID
        status: New booking status
        start_time: New appointment time
        notes: Updated notes
    
    Returns:
        Updated Booking object
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise ValueError("Booking not found")
    
    if google_booking_id:
        booking.google_booking_id = google_booking_id
    
    if status:
        booking.status = status
    
    if start_time:
        booking.appointment_date = start_time
    
    if notes:
        booking.notes = notes
    
    db.commit()
    db.refresh(booking)
    
    return booking


def cancel_booking(
    db: Session,
    booking_id: int,
    reason: Optional[str] = None
) -> Booking:
    """
    Cancel a booking.
    
    Args:
        db: Database session
        booking_id: Booking ID
        reason: Cancellation reason
    
    Returns:
        Cancelled Booking object
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise ValueError("Booking not found")
    
    booking.status = BookingStatus.CANCELLED
    booking.cancelled_at = datetime.utcnow()
    if reason:
        booking.notes = f"{booking.notes or ''}\nCancelled: {reason}"
    
    db.commit()
    db.refresh(booking)
    
    return booking


def get_services(
    db: Session,
    shop_id: int
) -> List[Dict[str, Any]]:
    """
    Get service catalog for a shop in Google Booking API format.
    
    Args:
        db: Database session
        shop_id: Shop ID
    
    Returns:
        List of services in Google Booking API format
    """
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    if not shop:
        raise ValueError("Shop not found")
    
    services = db.query(Service).filter(Service.shop_id == shop_id).all()
    
    return [
        {
            "id": service.id,
            "name": service.name,
            "description": service.description or service.name,
            "price": float(service.price),
            "duration_minutes": service.duration_minutes,
            "currency": "USD",
        }
        for service in services
    ]


def get_booking(
    db: Session,
    booking_id: int
) -> Optional[Booking]:
    """
    Get a booking by ID.
    
    Args:
        db: Database session
        booking_id: Booking ID
    
    Returns:
        Booking object or None
    """
    return db.query(Booking).filter(Booking.id == booking_id).first()


def get_booking_by_google_id(
    db: Session,
    google_booking_id: str
) -> Optional[Booking]:
    """
    Get a booking by Google booking ID.
    
    Args:
        db: Database session
        google_booking_id: Google's booking ID
    
    Returns:
        Booking object or None
    """
    return db.query(Booking).filter(Booking.google_booking_id == google_booking_id).first()

