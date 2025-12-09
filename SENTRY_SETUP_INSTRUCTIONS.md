# 🎯 Sentry Setup Instructions

## ✅ **What's Already Done**

1. ✅ Sentry packages installed (frontend & backend)
2. ✅ Sentry config files created
3. ✅ Backend integration added
4. ✅ Requirements.txt updated

## 📝 **What You Need to Do**

### Step 1: Create Sentry Account (2 minutes)

1. Go to https://sentry.io/signup/
2. Sign up for a free account
3. Create a new **Organization** (if prompted)
4. Create **TWO projects**:
   - **Frontend Project**: 
     - Name: "PetCareBooker Frontend"
     - Platform: **Next.js**
   - **Backend Project**:
     - Name: "PetCareBooker Backend"
     - Platform: **Python**

### Step 2: Get Your DSNs (1 minute)

For each project:
1. Go to **Settings** → **Projects** → Select your project
2. Click **Client Keys (DSN)**
3. Copy the **DSN** (looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

You'll have **TWO DSNs**:
- Frontend DSN (for Next.js)
- Backend DSN (for FastAPI)

### Step 3: Add DSNs to Environment Variables

#### Frontend (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_SENTRY_DSN = your_frontend_dsn_here
   ```
3. Select **Production**, **Preview**, and **Development**
4. Click **Save**
5. **Redeploy** your frontend (Vercel will auto-deploy on next push, or manually trigger)

#### Backend (Render)

1. Go to Render Dashboard → Your Service → Environment
2. Add:
   ```
   SENTRY_DSN = your_backend_dsn_here
   ```
3. Click **Save Changes**
4. **Redeploy** your backend (Render will auto-deploy on next push, or manually trigger)

### Step 4: Test Error Tracking (2 minutes)

#### Test Frontend

1. Add this temporarily to any page (e.g., `frontend/app/page.tsx`):
   ```typescript
   useEffect(() => {
     // Test Sentry - remove after testing
     if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
       throw new Error("Test error from frontend");
     }
   }, []);
   ```
2. Deploy and visit the page
3. Check Sentry dashboard - you should see the error!

#### Test Backend

1. Add this temporarily to `backend/main.py` in any endpoint:
   ```python
   @app.get("/test-sentry")
   def test_sentry():
       raise Exception("Test error from backend")
   ```
2. Deploy and visit `https://petcarebooker.onrender.com/test-sentry`
3. Check Sentry dashboard - you should see the error!

**⚠️ Remember to remove test code after verifying!**

### Step 5: Set Up Alerts (3 minutes)

1. Go to Sentry Dashboard → **Alerts** → **Create Alert Rule**
2. Configure:
   - **Name**: "High Error Rate"
   - **Conditions**: 
     - When an issue is seen more than **5 times** in **1 hour**
   - **Actions**:
     - Send email to your email address
3. Click **Save Rule**

### Step 6: Verify Setup (1 minute)

1. Check Sentry Dashboard → **Issues** (should be empty initially)
2. Check **Performance** tab (should show API calls)
3. Verify both projects are receiving data

---

## 🎉 **You're Done!**

Sentry is now tracking:
- ✅ Frontend errors (JavaScript, React, Next.js)
- ✅ Backend errors (FastAPI, Python)
- ✅ Performance metrics
- ✅ User context (anonymized)

---

## 📊 **Daily Monitoring**

1. Check Sentry dashboard daily
2. Review new issues
3. Fix critical errors immediately
4. Monitor error trends

---

## 🔧 **Troubleshooting**

### Errors Not Appearing?

1. **Check DSN is correct**: Should start with `https://`
2. **Verify environment variables**: Check Vercel/Render dashboard
3. **Check Sentry project settings**: Make sure project is active
4. **Check browser console**: Look for Sentry initialization errors
5. **Verify deployment**: Make sure latest code is deployed

### Too Many Errors?

1. **Filter known issues**: Sentry → Settings → Filters
2. **Set up sampling**: Reduce `tracesSampleRate` in config files
3. **Ignore patterns**: Add to `beforeSend` function

---

## 📝 **Next Steps**

1. ✅ Set up Sentry (you're here!)
2. ⏭️ Set up uptime monitoring (UptimeRobot - free)
3. ⏭️ Configure email alerts
4. ⏭️ Review error dashboard daily

---

**Estimated Time**: 10-15 minutes  
**Cost**: Free (5,000 events/month per project)

