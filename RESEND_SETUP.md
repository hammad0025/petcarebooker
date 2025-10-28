# Resend Email Setup Guide

## Quick Setup (5 minutes)

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### 2. Get API Key
1. Go to "API Keys" in the sidebar
2. Click "Create API Key"
3. Name it "PetCareBooker Production"
4. Copy the API key (starts with `re_...`)

### 3. Add to Render
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add new variable:
   - Key: `RESEND_API_KEY`
   - Value: Your Resend API key (paste it)
5. Click "Save Changes"

### 4. Set Sender Email Domain
1. Go to "Domains" in Resend
2. Add your domain `petcarebooker.com` (if you have it)
   - OR use Resend's default domain for testing
   - OR verify your personal email to send from that

### 5. Deploy
The code is already set up! Just push and Render will auto-deploy.

---

## Testing

### Manual Test
```bash
curl -X POST "https://petcarebooker.onrender.com/api/customer/forgot-password?email=shaque025@gmail.com"
```

### Expected Behavior
- If email configured: User receives email with reset link
- If NOT configured: Token prints in backend logs for testing

---

## Environment Variables Reference

Add these to your Render backend service:

```
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=PetCareBooker <noreply@petcarebooker.com>
FRONTEND_URL=https://www.petcarebooker.com
```

---

## Future Migration to AWS SES

The code is designed to be easily migrated to AWS SES:

1. Replace `email_service.py` with SES implementation
2. Update environment variables
3. Test email sending

The interface stays the same (`send_reset_email()` function), so no changes needed in `main.py`!

