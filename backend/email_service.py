import os
import resend
from typing import Optional

# Initialize Resend client
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
else:
    resend = None

# Email configuration
FROM_EMAIL = os.getenv("FROM_EMAIL", "PetCareBooker <noreply@petcarebooker.com>")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://www.petcarebooker.com")


def send_reset_email(to_email: str, reset_token: str) -> bool:
    """
    Send password reset email using Resend (or AWS SES later)
    
    Args:
        to_email: Recipient email address
        reset_token: The reset token for the password reset link
        
    Returns:
        True if email was sent successfully, False otherwise
    """
    
    # If no API key is configured, log the token instead
    if not RESEND_API_KEY or not resend:
        print(f"\n{'='*60}")
        print(f"🔐 PASSWORD RESET TOKEN")
        print(f"{'='*60}")
        print(f"Email: {to_email}")
        print(f"Token: {reset_token}")
        print(f"Reset Link: {FRONTEND_URL}/customer/reset-password?token={reset_token}")
        print(f"{'='*60}\n")
        return False
    
    try:
        reset_link = f"{FRONTEND_URL}/customer/reset-password?token={reset_token}"
        
        # Send email via Resend
        response = resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [to_email],
            "subject": "Reset Your Password - PetCareBooker",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">🐾 PetCareBooker</h1>
                </div>
                
                <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
                    
                    <p style="font-size: 16px;">Hello there!</p>
                    
                    <p style="font-size: 16px;">Someone requested a password reset for your PetCareBooker account.</p>
                    
                    <p style="font-size: 16px;">If this was you, click the button below to reset your password:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{reset_link}" 
                           style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                  color: white; 
                                  padding: 15px 40px; 
                                  text-decoration: none; 
                                  border-radius: 30px; 
                                  font-weight: bold; 
                                  display: inline-block;
                                  font-size: 16px;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p style="font-size: 14px; color: #666;">
                        Or copy and paste this link into your browser:<br>
                        <a href="{reset_link}" style="color: #667eea; word-break: break-all;">{reset_link}</a>
                    </p>
                    
                    <div style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
                        <p style="font-size: 14px; color: #666; margin: 0;">
                            <strong>⏰ This link expires in 1 hour</strong><br>
                            If you didn't request a password reset, you can safely ignore this email.
                        </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                    
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        This email was sent from PetCareBooker.<br>
                        If you have any questions, please contact support.
                    </p>
                </div>
            </body>
            </html>
            """,
        })
        
        print(f"✅ Password reset email sent to {to_email}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send reset email to {to_email}: {str(e)}")
        return False


def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Send contact form email to haquemediagroup@gmail.com
    
    Args:
        name: Sender's name
        email: Sender's email
        subject: Email subject
        message: Email message
        
    Returns:
        True if email was sent successfully, False otherwise
    """
    recipient_email = "haquemediagroup@gmail.com"
    
    # If no API key is configured, log the message instead
    if not RESEND_API_KEY or not resend:
        print(f"\n{'='*60}")
        print(f"📧 CONTACT FORM SUBMISSION")
        print(f"{'='*60}")
        print(f"From: {name} <{email}>")
        print(f"Subject: {subject}")
        print(f"Message: {message}")
        print(f"{'='*60}\n")
        return False
    
    try:
        # Send email via Resend
        print(f"📧 Attempting to send contact email to {recipient_email}...")
        print(f"   From: {FROM_EMAIL}")
        print(f"   Reply-To: {email}")
        print(f"   Subject: {subject}")
        
        response = resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [recipient_email],
            "reply_to": email,
            "subject": f"Contact Form: {subject}",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">🐾 PetCareBooker Contact Form</h1>
                </div>
                
                <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
                    
                    <div style="margin-bottom: 20px;">
                        <p style="margin: 5px 0;"><strong>Name:</strong> {name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                        <p style="margin: 5px 0;"><strong>Subject:</strong> {subject}</p>
                    </div>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 0; white-space: pre-wrap;">{message}</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                    
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        This email was sent from the PetCareBooker contact form.<br>
                        Reply directly to this email to respond to {name}.
                    </p>
                </div>
            </body>
            </html>
            """,
        })
        
        print(f"✅ Contact form email sent successfully!")
        print(f"   Response: {response}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send contact email: {str(e)}")
        print(f"   Error type: {type(e).__name__}")
        import traceback
        print(f"   Traceback: {traceback.format_exc()}")
        return False


def send_booking_confirmation_email(
    to_email: str,
    customer_name: str,
    pet_name: str,
    service_name: str,
    shop_name: str,
    appointment_time: str,
    shop_address: str,
    shop_phone: str,
    duration_minutes: int,
    special_notes: str = None
) -> bool:
    """
    Send booking confirmation email to customer
    """
    # If no API key is configured, log the confirmation instead
    if not RESEND_API_KEY or not resend:
        print(f"\n{'='*60}")
        print(f"🐕 BOOKING CONFIRMATION EMAIL")
        print(f"{'='*60}")
        print(f"To: {to_email}")
        print(f"Customer: {customer_name}")
        print(f"Pet: {pet_name}")
        print(f"Service: {service_name}")
        print(f"Shop: {shop_name}")
        print(f"Time: {appointment_time}")
        print(f"{'='*60}\n")
        return False
    
    try:
        duration_text = f"{duration_minutes // 60}h {duration_minutes % 60}min" if duration_minutes >= 60 else f"{duration_minutes}min"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🐾 Booking Confirmed!</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #333; margin-top: 0;">Hi {customer_name}!</h2>
                
                <p style="font-size: 16px;">Great news! Your pet grooming appointment has been confirmed.</p>
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin: 20px 0; color: white;">
                    <p style="margin: 8px 0; font-size: 16px;"><strong>🐕 Pet:</strong> {pet_name}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>✂️ Service:</strong> {service_name}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>⏰ Duration:</strong> {duration_text}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>📅 Date & Time:</strong> {appointment_time}</p>
                </div>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; color: #333;">📍 Location</h3>
                    <p style="margin: 5px 0; font-size: 16px;"><strong>{shop_name}</strong></p>
                    <p style="margin: 5px 0; color: #666;">{shop_address}</p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:{shop_phone}" style="color: #667eea;">{shop_phone}</a></p>
                </div>
                
                {f'''
                <div style="background: #fef3c7; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0; color: #92400e;"><strong>📝 Special Notes:</strong></p>
                    <p style="margin: 5px 0 0 0; color: #92400e;">{special_notes}</p>
                </div>
                ''' if special_notes else ''}
                
                <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <h3 style="margin: 0 0 10px 0; color: #1e40af;">💡 Before Your Appointment</h3>
                    <ul style="margin: 10px 0; padding-left: 20px; color: #1e40af;">
                        <li>Arrive 5-10 minutes early</li>
                        <li>Bring any special grooming tools if requested</li>
                        <li>Make sure {pet_name} has been recently fed</li>
                        <li>Bring your pet's medical records if this is your first visit</li>
                    </ul>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                
                <p style="font-size: 14px; color: #666; text-align: center;">
                    Need to reschedule or cancel?<br>
                    Please contact {shop_name} at <a href="tel:{shop_phone}" style="color: #667eea;">{shop_phone}</a>
                </p>
                
                <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
                    This email was sent from PetCareBooker.<br>
                    Thank you for choosing {shop_name}!
                </p>
            </div>
        </body>
        </html>
        """
        
        response = resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [to_email],
            "subject": f"✅ Booking Confirmed - {pet_name} at {shop_name}",
            "html": html_content,
        })
        
        print(f"✅ Booking confirmation email sent to {to_email}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send booking confirmation email to {to_email}: {str(e)}")
        return False


def send_shop_new_booking_email(
    to_email: str,
    shop_name: str,
    customer_name: str,
    customer_email: str,
    customer_phone: str,
    pet_name: str,
    pet_type: str,
    service_name: str,
    appointment_time: str,
    special_notes: str = None
) -> bool:
    """
    Send new booking notification email to shop owner
    """
    # If no API key is configured, log the notification instead
    if not RESEND_API_KEY or not resend:
        print(f"\n{'='*60}")
        print(f"🔔 NEW BOOKING NOTIFICATION EMAIL")
        print(f"{'='*60}")
        print(f"To: {to_email}")
        print(f"Shop: {shop_name}")
        print(f"Customer: {customer_name}")
        print(f"Pet: {pet_name}")
        print(f"Service: {service_name}")
        print(f"Time: {appointment_time}")
        print(f"{'='*60}\n")
        return False
    
    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🎉 New Booking!</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #333; margin-top: 0;">You have a new booking request!</h2>
                
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 10px; margin: 20px 0; color: white;">
                    <p style="margin: 8px 0; font-size: 16px;"><strong>📅 Appointment:</strong> {appointment_time}</p>
                    <p style="margin: 8px 0; font-size: 16px;"><strong>✂️ Service:</strong> {service_name}</p>
                </div>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; color: #333;">👤 Customer Information</h3>
                    <p style="margin: 5px 0;"><strong>Name:</strong> {customer_name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:{customer_email}" style="color: #667eea;">{customer_email}</a></p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:{customer_phone}" style="color: #667eea;">{customer_phone}</a></p>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                    <h3 style="margin: 0 0 10px 0; color: #92400e;">🐕 Pet Information</h3>
                    <p style="margin: 5px 0; color: #92400e;"><strong>Name:</strong> {pet_name}</p>
                    <p style="margin: 5px 0; color: #92400e;"><strong>Type:</strong> {pet_type}</p>
                </div>
                
                {f'''
                <div style="background: #e0e7ff; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #6366f1;">
                    <p style="margin: 0; color: #3730a3;"><strong>📝 Special Notes:</strong></p>
                    <p style="margin: 5px 0 0 0; color: #3730a3;">{special_notes}</p>
                </div>
                ''' if special_notes else ''}
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{FRONTEND_URL}/dashboard/bookings" 
                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                              color: white; 
                              padding: 15px 40px; 
                              text-decoration: none; 
                              border-radius: 30px; 
                              font-weight: bold; 
                              display: inline-block;
                              font-size: 16px;">
                        View in Dashboard
                    </a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                
                <p style="font-size: 12px; color: #999; text-align: center;">
                    This email was sent from PetCareBooker.<br>
                    Login to your dashboard to manage this booking.
                </p>
            </div>
        </body>
        </html>
        """
        
        response = resend.Emails.send({
            "from": FROM_EMAIL,
            "to": [to_email],
            "subject": f"🐕 New Booking: {pet_name} - {appointment_time}",
            "html": html_content,
        })
        
        print(f"✅ New booking notification email sent to {to_email}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send new booking notification email to {to_email}: {str(e)}")
        return False


# Future: Add SES support when switching
def send_reset_email_ses(to_email: str, reset_token: str) -> bool:
    """
    Future: Send password reset email using AWS SES
    This allows easy migration from Resend to SES later
    """
    # TODO: Implement AWS SES email sending
    # Will use boto3 and SES
    pass

