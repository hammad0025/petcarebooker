# Twilio SMS Setup Guide

## 📱 How to Enable SMS Notifications

SMS notifications are already integrated into the codebase. You just need to:

1. **Create a Twilio Account** (Free trial available)
2. **Get your credentials**
3. **Add them to Render environment variables**

---

## Step 1: Create Twilio Account

1. Go to **https://www.twilio.com/try-twilio**
2. Sign up for a free account (no credit card needed for trial)
3. Verify your email and phone number

---

## Step 2: Get Your Twilio Credentials

After signing up, you'll land on the Twilio Console Dashboard:

### A. Get Account SID & Auth Token

1. On the dashboard, you'll see:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click "View" to reveal it)

2. Copy both values - you'll need them for Render

### B. Get a Phone Number

1. In the Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a number**
2. Click **Buy a number**
3. Select:
   - **Country**: United States (or your country)
   - **Type**: SMS Capable
   - **Features**: SMS
4. Click **Search** and pick a number
5. Click **Buy** (Free trial includes $15.50 credit - enough for ~1,500 SMS)

---

## Step 3: Add Credentials to Render

1. Go to your **Render Dashboard** → **petcarebooker-api** service
2. Click **Environment** tab
3. Add these 3 environment variables:

   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_PHONE_NUMBER=+1234567890
   ```

   **Important:**
   - `TWILIO_PHONE_NUMBER` must include country code (e.g., `+15551234567`)
   - No spaces in the phone number
   - Copy the exact values from Twilio Console

4. Click **Save Changes**
5. Render will automatically restart your service

---

## Step 4: Test SMS Notifications

1. Make a test booking on your site
2. Check the **Render logs** to see if SMS was sent:
   ```bash
   render logs
   ```
   Look for: `✅ SMS sent successfully: SMxxxxxxxxxxxxx`

3. The customer and shop owner should receive SMS messages!

---

## 📊 Twilio Pricing (After Free Trial)

- **US SMS**: ~$0.0075 per message (less than 1 cent)
- **International SMS**: Varies by country (~$0.01-0.05)
- **Free Trial**: $15.50 credit = ~1,500 SMS messages

---

## 🔍 Troubleshooting

### SMS Not Sending?

1. **Check Render Logs:**
   ```bash
   render logs
   ```
   Look for errors like:
   - `Twilio not configured` → Missing env vars
   - `Invalid phone number` → Wrong format
   - `Insufficient funds` → Need to add payment method

2. **Verify Environment Variables:**
   - Go to Render → Environment tab
   - Make sure all 3 Twilio vars are set
   - No typos or extra spaces

3. **Check Phone Number Format:**
   - Must be: `+1234567890` (with country code)
   - No spaces, dashes, or parentheses
   - US numbers: `+1` followed by 10 digits

4. **Twilio Console:**
   - Go to **Monitor** → **Logs** → **Messaging**
   - See if messages are being sent
   - Check for error messages

### "Twilio not configured" in logs?

- Environment variables aren't set in Render
- Service needs to be restarted after adding vars
- Check that vars are spelled exactly: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`

### "Invalid phone number" error?

- Phone number must include country code: `+1` for US
- Format: `+15551234567` (not `555-123-4567` or `(555) 123-4567`)
- Customer phone numbers from booking form should already be formatted correctly

---

## ✅ Success Indicators

When SMS is working, you'll see in Render logs:

```
✅ SMS sent successfully: SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

And customers/shop owners will receive text messages like:

**Customer:**
```
✅ Your booking at Paw Perfect Grooming has been confirmed!

Pet: Max
Time: Wednesday, December 17, 2025 at 02:30 PM

See you soon!
```

**Shop Owner:**
```
🐕 New booking request!

Customer: John Doe
Pet: Max
Service: Full Grooming - Large Dog
Time: Wednesday, December 17, 2025 at 02:30 PM

Login to approve: petcarebooker.com
```

---

## 🎯 Quick Setup Checklist

- [ ] Created Twilio account
- [ ] Got Account SID from Twilio Console
- [ ] Got Auth Token from Twilio Console
- [ ] Bought a Twilio phone number
- [ ] Added `TWILIO_ACCOUNT_SID` to Render
- [ ] Added `TWILIO_AUTH_TOKEN` to Render
- [ ] Added `TWILIO_PHONE_NUMBER` to Render (with + and country code)
- [ ] Restarted Render service
- [ ] Tested booking and checked logs
- [ ] Received SMS notifications ✅

---

**That's it! Once you add the 3 environment variables to Render, SMS notifications will start working automatically.** 🚀

