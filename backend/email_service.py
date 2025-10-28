import os
from resend import Resend
from typing import Optional

# Initialize Resend client
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
resend = Resend(api_key=RESEND_API_KEY) if RESEND_API_KEY else None

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
    if not RESEND_API_KEY:
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
        response = resend.emails.send({
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


# Future: Add SES support when switching
def send_reset_email_ses(to_email: str, reset_token: str) -> bool:
    """
    Future: Send password reset email using AWS SES
    This allows easy migration from Resend to SES later
    """
    # TODO: Implement AWS SES email sending
    # Will use boto3 and SES
    pass

