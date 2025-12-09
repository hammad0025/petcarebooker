# 🚀 Sentry Quick Reference

## ✅ **Setup Complete!**

All code is ready. You just need to:
1. Create Sentry account
2. Get DSNs
3. Add to environment variables

---

## 📍 **Where to Add DSNs**

### Frontend (Vercel)
- **Dashboard**: Vercel → Project → Settings → Environment Variables
- **Variable**: `NEXT_PUBLIC_SENTRY_DSN`
- **Value**: Your frontend DSN from Sentry

### Backend (Render)
- **Dashboard**: Render → Service → Environment
- **Variable**: `SENTRY_DSN`
- **Value**: Your backend DSN from Sentry

---

## 🔍 **Check if Sentry is Working**

### Frontend
1. Open browser console
2. Look for: `✅ Sentry initialized` (or similar)
3. Check Sentry dashboard for events

### Backend
1. Check Render logs
2. Look for: `✅ Sentry error monitoring initialized`
3. Check Sentry dashboard for events

---

## 🧪 **Test Error Tracking**

### Quick Test (Frontend)
```typescript
// Add to any page temporarily
throw new Error("Test Sentry frontend");
```

### Quick Test (Backend)
```python
# Add to any endpoint temporarily
raise Exception("Test Sentry backend")
```

**⚠️ Remove test code after verifying!**

---

## 📊 **Sentry Dashboard**

- **URL**: https://sentry.io/
- **Issues**: View all errors
- **Performance**: View API performance
- **Alerts**: Configure email notifications

---

## 🔔 **Set Up Alerts**

1. Sentry Dashboard → **Alerts** → **Create Alert Rule**
2. **Condition**: Issue count > 5 in 1 hour
3. **Action**: Send email
4. **Save**

---

## 📝 **Files Created**

- ✅ `frontend/sentry.client.config.ts`
- ✅ `frontend/sentry.server.config.ts`
- ✅ `frontend/sentry.edge.config.ts`
- ✅ `backend/main.py` (Sentry added)
- ✅ `backend/requirements.txt` (sentry-sdk added)
- ✅ `SENTRY_SETUP_INSTRUCTIONS.md` (detailed guide)

---

## 🆘 **Troubleshooting**

**Not seeing errors?**
1. Check DSN is correct
2. Verify environment variables set
3. Check Sentry project is active
4. Verify deployment completed

**Too many errors?**
1. Adjust `tracesSampleRate` (currently 1.0 = 100%)
2. Add filters in Sentry dashboard
3. Ignore known issues

---

**Next Step**: Follow `SENTRY_SETUP_INSTRUCTIONS.md` to complete setup!

