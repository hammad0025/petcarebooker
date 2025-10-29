# Stripe Setup Guide

## Step 1: Get Your Stripe Keys

1. Go to https://dashboard.stripe.com
2. If you don't have an account, create one
3. Make sure you're in TEST MODE (you'll see "Test mode" toggle in the top right)

## Step 2: Get Your API Keys

1. Click on "Developers" in the sidebar
2. Click on "API keys"
3. Copy the following:
   - **Publishable key** (starts with `pk_test_`) - For frontend
   - **Secret key** (starts with `sk_test_`) - For backend

## Step 3: Create a Subscription Product

1. In Stripe Dashboard, go to "Products"
2. Click "+ Add product"
3. Fill in:
   - Name: "PetCareBooker Subscription"
   - Description: "Monthly subscription for groomers"
4. Add a price:
   - Amount: $24.99
   - Billing: Recurring
   - Interval: Monthly
5. Click "Save product"

## Step 4: Configure Webhook

1. Go to "Developers" → "Webhooks"
2. Click "+ Add endpoint"
3. Endpoint URL: `https://petcarebooker.onrender.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Click on the endpoint to view details
7. Click "Reveal" to show webhook signing secret
8. Copy the signing secret (starts with `whsec_`)

## Step 5: Add Keys to Render (Backend)

1. Go to your Render dashboard
2. Select your backend service
3. Click on "Environment"
4. Add these variables:
   - `STRIPE_SECRET_KEY`: (your secret key from step 2)
   - `STRIPE_WEBHOOK_SECRET`: (your signing secret from step 4)
   - `FRONTEND_URL`: `https://www.petcarebooker.com`

## Step 6: Add Keys to Vercel (Frontend - Optional)

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `STRIPE_PUBLISHABLE_KEY` (for future use)

## Step 7: Redeploy

The app will automatically redeploy when you add environment variables.

## Testing

Use this test card in Stripe Checkout:
- Card: 4242 4242 4242 4242
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)
