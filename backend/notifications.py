import os
from twilio.rest import Client
from typing import Optional
from email_service import send_booking_confirmation_email, send_shop_new_booking_email

# Twilio configuration
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

# Initialize Twilio client
client = None
if TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def send_sms(to_phone: str, message: str) -> bool:
    """Send SMS using Twilio"""
    if not client:
        print(f"Twilio not configured. Would send: {message} to {to_phone}")
        return False
    
    try:
        message = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=to_phone
        )
        print(f"SMS sent successfully: {message.sid}")
        return True
    except Exception as e:
        print(f"Failed to send SMS: {str(e)}")
        return False


def notify_shop_new_booking(
    shop_phone: str,
    shop_email: str,
    shop_name: str,
    customer_name: str,
    customer_email: str,
    customer_phone: str,
    pet_name: str,
    pet_type: str,
    service_name: str,
    appointment_time: str,
    special_notes: str = None
):
    """Notify shop owner of new booking request via SMS and Email"""
    # Send SMS
    sms_message = f"🐕 New booking request!\n\nCustomer: {customer_name}\nPet: {pet_name}\nService: {service_name}\nTime: {appointment_time}\n\nLogin to approve: petcarebooker.com"
    sms_sent = send_sms(shop_phone, sms_message)
    
    # Send Email
    email_sent = send_shop_new_booking_email(
        to_email=shop_email,
        shop_name=shop_name,
        customer_name=customer_name,
        customer_email=customer_email,
        customer_phone=customer_phone,
        pet_name=pet_name,
        pet_type=pet_type,
        service_name=service_name,
        appointment_time=appointment_time,
        special_notes=special_notes
    )
    
    return sms_sent or email_sent


def notify_customer_booking_confirmed(
    customer_phone: str,
    customer_email: str,
    customer_name: str,
    pet_name: str,
    service_name: str,
    shop_name: str,
    shop_address: str,
    shop_phone: str,
    appointment_time: str,
    duration_minutes: int,
    special_notes: str = None
):
    """Notify customer that booking was confirmed via SMS and Email"""
    # Send SMS
    sms_message = f"✅ Your booking at {shop_name} has been confirmed!\n\nPet: {pet_name}\nTime: {appointment_time}\n\nSee you soon!"
    sms_sent = send_sms(customer_phone, sms_message)
    
    # Send Email
    email_sent = send_booking_confirmation_email(
        to_email=customer_email,
        customer_name=customer_name,
        pet_name=pet_name,
        service_name=service_name,
        shop_name=shop_name,
        appointment_time=appointment_time,
        shop_address=shop_address,
        shop_phone=shop_phone,
        duration_minutes=duration_minutes,
        special_notes=special_notes
    )
    
    return sms_sent or email_sent


def notify_customer_booking_cancelled(customer_phone: str, shop_name: str, pet_name: str):
    """Notify customer that booking was cancelled"""
    message = f"❌ Your booking at {shop_name} for {pet_name} has been cancelled.\n\nPlease contact us or book another time."
    return send_sms(customer_phone, message)


def notify_customer_reminder(customer_phone: str, shop_name: str, pet_name: str, appointment_time: str):
    """Send appointment reminder 24 hours before"""
    message = f"⏰ Reminder: {pet_name} has a grooming appointment tomorrow at {shop_name}\n\nTime: {appointment_time}"
    return send_sms(customer_phone, message)



