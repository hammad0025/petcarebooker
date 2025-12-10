# 🚀 Sentry Backend Setup for Render

## ✅ **Backend Code Status**

Your backend is **already configured** for Sentry! ✅
- ✅ Sentry SDK installed (`sentry-sdk[fastapi]`)
- ✅ Sentry initialized in `backend/main.py`
- ✅ FastAPI integration enabled
- ✅ SQLAlchemy integration enabled
- ✅ Ready to track errors and performance

**All you need to do**: Add the DSN to Render!

---

## 📝 **Step-by-Step Setup**

### Step 1: Create Python Project in Sentry (2 minutes)

1. Go to **Sentry Dashboard**: https://sentry.io/
2. Click **Projects** in the sidebar
3. Click **Create Project** (or **+** button)
4. Select **Python** as the platform
5. Configure:
   - **Name**: `petcarebooker-backend` (or `python-backend`)
   - **Team**: petcarebooker (or your team)
6. Click **Create Project**

### Step 2: Get Your Backend DSN (1 minute)

1. In your new Python project, go to **Settings** → **Client Keys (DSN)**
2. Copy the **DSN** (looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)
3. **Save this DSN** - you'll need it for Render

### Step 3: Add DSN to Render (2 minutes)

1. Go to **Render Dashboard**: https://dashboard.render.com/
2. Navigate to your backend service (likely named `petcarebooker` or `petcarebooker-api`)
3. Click on the service
4. Go to **Environment** tab (in the left sidebar)
5. Scroll down to **Environment Variables** section
6. Click **Add Environment Variable**
7. Add:
   - **Key**: `SENTRY_DSN`
   - **Value**: (paste your backend DSN from Step 2)
8. Click **Save Changes**

### Step 4: Redeploy Backend (Automatic)

- Render will **automatically redeploy** when you save the environment variable
- Or manually trigger: **Manual Deploy** → **Deploy latest commit**
- Wait ~2-3 minutes for deployment

---

## 🧪 **Verify It's Working**

### Option 1: Check Render Logs

1. Go to Render Dashboard → Your Service → **Logs**
2. Look for this message:
   ```
   ✅ Sentry error monitoring initialized
   ```
3. If you see this, Sentry is working! ✅

### Option 2: Test Error Tracking

After deployment completes:

1. **Add test endpoint** (temporarily) to `backend/main.py`:
   ```python
   @app.get("/test-sentry")
   def test_sentry():
       """Test endpoint to verify Sentry is working"""
       raise Exception("Test error from backend - Sentry tracking")
   ```

2. **Deploy** (or wait for auto-deploy)

3. **Visit**: `https://petcarebooker.onrender.com/test-sentry`

4. **Check Sentry Dashboard**:
   - Go to: https://sentry.io/
   - Navigate to: **Projects** → Your Python project → **Issues**
   - You should see the test error!

5. **Remove test endpoint** after verifying

---

## 📊 **What Backend Sentry Will Track**

✅ **API Errors**:
- FastAPI exceptions
- HTTP errors (400, 500, etc.)
- Database errors (SQLAlchemy)
- Validation errors

✅ **Performance Metrics**:
- API endpoint response times
- Database query performance
- Request/response sizes

✅ **Request Context**:
- Endpoint URLs
- HTTP methods
- Request parameters (sanitized)
- (No sensitive data - configured to exclude)

---

## ✅ **Verification Checklist**

After adding DSN to Render:

- [ ] Python project created in Sentry
- [ ] Backend DSN copied
- [ ] `SENTRY_DSN` added to Render environment variables
- [ ] Render deployment completed
- [ ] Render logs show "✅ Sentry error monitoring initialized"
- [ ] Test error (if triggered) appears in Sentry dashboard

---

## 🔍 **Troubleshooting**

### "⚠️ Sentry DSN not found" in Logs?

- **Check**: Environment variable name is exactly `SENTRY_DSN` (case-sensitive)
- **Check**: DSN value is correct (starts with `https://`)
- **Check**: Environment variable saved in Render
- **Solution**: Redeploy after fixing

### Errors Not Appearing in Sentry?

- **Check**: DSN is correct (should match your Python project)
- **Check**: Render deployment completed successfully
- **Check**: Sentry project is active
- **Check**: No network/firewall blocking Sentry

### Too Many Errors?

- **Filter**: Add filters in Sentry dashboard
- **Sampling**: Adjust `traces_sample_rate` in `main.py` (currently 1.0 = 100%)

---

## 🎯 **Quick Reference**

### Render Environment Variable:
```
Key: SENTRY_DSN
Value: https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### Backend Code Location:
- `backend/main.py` (lines 11-32)
- Already configured ✅

### Test Endpoint (Temporary):
```python
@app.get("/test-sentry")
def test_sentry():
    raise Exception("Test Sentry error")
```

---

## 🎉 **Status**

**Backend Sentry**: ⏳ **READY TO CONFIGURE**
- ✅ Code configured
- ⏳ Waiting for DSN in Render

**Once you add the DSN to Render, backend error monitoring will be live!** 🚀

