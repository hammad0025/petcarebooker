import os
from twilio.rest import Client
from typing import Optional

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


def notify_shop_new_booking(shop_phone: str, customer_name: str, pet_name: str, service_name: str, appointment_time: str):
    """Notify shop owner of new booking request"""
    message = f"🐕 New booking request!\n\nCustomer: {customer_name}\nPet: {pet_name}\nService: {service_name}\nTime: {appointment_time}\n\nLogin to approve: petcarebooker.com"
    return send_sms(shop_phone, message)


def notify_customer_booking_confirmed(customer_phone: str, shop_name: str, pet_name: str, appointment_time: str):
    """Notify customer that booking was confirmed"""
    message = f"✅ Your booking at {shop_name} has been confirmed!\n\nPet: {pet_name}\nTime: {appointment_time}\n\nSee you soon!"
    return send_sms(customer_phone, message)


def notify_customer_booking_cancelled(customer_phone: str, shop_name: str, pet_name: str):
    """Notify customer that booking was cancelled"""
    message = f"❌ Your booking at {shop_name} for {pet_name} has been cancelled.\n\nPlease contact us or book another time."
    return send_sms(customer_phone, message)


def notify_customer_reminder(customer_phone: str, shop_name: str, pet_name: str, appointment_time: str):
    """Send appointment reminder 24 hours before"""
    message = f"⏰ Reminder: {pet_name} has a grooming appointment tomorrow at {shop_name}\n\nTime: {appointment_time}"
    return send_sms(customer_phone, message)



