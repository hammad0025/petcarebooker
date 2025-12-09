# 🔍 Error Monitoring Setup Guide

## Recommended: Sentry (Free Tier Available)

### Why Sentry?
- Real-time error tracking
- Stack traces with source maps
- User context & breadcrumbs
- Performance monitoring
- Free tier: 5,000 events/month

---

## 🚀 **QUICK SETUP (15 minutes)**

### Step 1: Create Sentry Account
1. Go to https://sentry.io/signup/
2. Create free account
3. Create new project → Select "Next.js" for frontend, "Python" for backend

### Step 2: Frontend Setup (Next.js)

```bash
cd frontend
npm install @sentry/nextjs
```

Add to `frontend/sentry.client.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

Add to `frontend/sentry.server.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

Add to `frontend/sentry.edge.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

Add to `frontend/.env.local`:
```
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

### Step 3: Backend Setup (FastAPI)

```bash
cd backend
pip install sentry-sdk[fastapi]
```

Add to `backend/main.py`:
```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    environment=os.getenv("ENVIRONMENT", "development"),
    integrations=[
        FastApiIntegration(),
        SqlalchemyIntegration(),
    ],
    traces_sample_rate=1.0,
    send_default_pii=False,  # Don't send user data
)
```

Add to `backend/render.yaml`:
```yaml
envVars:
  - key: SENTRY_DSN
    value: your_sentry_dsn_here
```

### Step 4: Test Error Tracking

Frontend test (add to any page):
```typescript
// Test error
throw new Error("Test error from frontend");
```

Backend test (add to any endpoint):
```python
# Test error
raise Exception("Test error from backend")
```

---

## 📊 **ALTERNATIVE: Simple Log Monitoring**

### Option 1: Render.com Built-in Logs
- ✅ Already available
- ✅ Real-time viewing
- ❌ No alerts
- ❌ No aggregation

**Access**: Render Dashboard → Your Service → Logs

### Option 2: Vercel Logs
- ✅ Already available
- ✅ Real-time viewing
- ❌ No alerts
- ❌ Limited retention

**Access**: Vercel Dashboard → Your Project → Logs

### Option 3: UptimeRobot (Free)
- ✅ Uptime monitoring
- ✅ Email alerts
- ✅ Free tier: 50 monitors
- ❌ No error tracking

**Setup**:
1. Go to https://uptimerobot.com/
2. Add monitor for `https://petcarebooker.onrender.com/health`
3. Set alert email

---

## 🔔 **ALERT SETUP**

### Email Alerts (Sentry)
1. Sentry Dashboard → Settings → Alerts
2. Create alert rule:
   - **Trigger**: When issue count increases
   - **Threshold**: > 5 errors in 1 hour
   - **Action**: Send email

### Slack Integration (Optional)
1. Sentry Dashboard → Settings → Integrations
2. Add Slack integration
3. Configure channel for alerts

---

## 📈 **MONITORING DASHBOARD**

### Key Metrics to Track
1. **Error Rate**: < 1% of requests
2. **Response Time**: < 500ms (p95)
3. **Uptime**: > 99.9%
4. **API Errors**: Track by endpoint
5. **Frontend Errors**: Track by page

### Daily Checks
- [ ] Review error log (Sentry/Logs)
- [ ] Check uptime status
- [ ] Review slow queries
- [ ] Check API response times

---

## 🛠️ **TROUBLESHOOTING**

### Errors Not Appearing?
1. Check DSN is correct
2. Verify environment variables set
3. Check Sentry project settings
4. Verify network requests (browser DevTools)

### Too Many Errors?
1. Filter out known issues
2. Group similar errors
3. Set up error sampling
4. Add ignore patterns

---

## 📝 **BEST PRACTICES**

1. **Don't Log Sensitive Data**
   - No passwords
   - No credit cards
   - No API keys

2. **Add Context**
   - User ID (if logged in)
   - Request URL
   - User agent
   - Timestamp

3. **Use Breadcrumbs**
   - Track user actions
   - Track API calls
   - Track navigation

4. **Set Up Releases**
   - Tag releases in Sentry
   - Track which version has errors
   - Easier debugging

---

## 🎯 **QUICK START CHECKLIST**

- [ ] Create Sentry account
- [ ] Install Sentry SDK (frontend & backend)
- [ ] Add DSN to environment variables
- [ ] Test error tracking
- [ ] Set up email alerts
- [ ] Configure uptime monitoring
- [ ] Review error dashboard daily

---

**Estimated Setup Time**: 15-30 minutes
**Cost**: Free (up to 5,000 events/month)

