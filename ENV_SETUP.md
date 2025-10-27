# Environment Setup Guide

This guide explains how to configure environment variables for local development and production deployment across all platforms (Backend, Frontend, Mobile).

---

## 🎯 Quick Start

### Local Development

1. **Backend** - Copy and configure:
   ```bash
   cd backend
   cp env.example.txt .env
   # Edit .env with your local database URL and leave ENVIRONMENT=development
   ```

2. **Frontend** - Copy and configure:
   ```bash
   cd frontend
   cp env.example.txt .env.local
   # Edit .env.local: NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Mobile Apps** - Copy and configure:
   ```bash
   cd mobile
   cp env.example.txt .env
   # Edit .env: EXPO_PUBLIC_API_URL=http://localhost:8000
   
   cd ../mobile-consumer
   cp env.example.txt .env
   # Edit .env: EXPO_PUBLIC_API_URL=http://localhost:8000
   ```

---

## 🔧 Environment Variables by Platform

### Backend (FastAPI on Render)

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT signing key (generate with `openssl rand -hex 32`)
- `ENVIRONMENT` - Set to `production` for production, `development` for local

**Optional:**
- `TWILIO_ACCOUNT_SID` - For SMS notifications
- `TWILIO_AUTH_TOKEN` - For SMS notifications
- `TWILIO_PHONE_NUMBER` - Your Twilio phone number
- `FRONTEND_URL` - Frontend URL (for future CORS/redirects)

**Example `.env` for local:**
```bash
DATABASE_URL=postgresql://user:password@localhost/petcarebooker
SECRET_KEY=dev-secret-key-only-for-local-development
ENVIRONMENT=development
```

**Render Configuration:**
```bash
DATABASE_URL=<your-render-postgres-url>
SECRET_KEY=<strong-random-key>
ENVIRONMENT=production
FRONTEND_URL=https://petcarebooker.com
```

---

### Frontend (Next.js on Vercel)

**Required:**
- `NEXT_PUBLIC_API_URL` - Backend API URL

**Example `.env.local` for local:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Vercel Configuration:**
- Go to Project Settings → Environment Variables
- Add `NEXT_PUBLIC_API_URL=https://petcarebooker.onrender.com`
- Apply to: Production, Preview, Development

---

### Mobile Apps (Expo)

**Required:**
- `EXPO_PUBLIC_API_URL` - Backend API URL

**Example `.env` for local:**
```bash
EXPO_PUBLIC_API_URL=http://localhost:8000
# For physical device testing, use your computer's IP:
# EXPO_PUBLIC_API_URL=http://192.168.1.XXX:8000
```

**EAS Build Configuration:**

Edit `eas.json` to include environment variables for production builds:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://petcarebooker.onrender.com"
      }
    },
    "development": {
      "developmentClient": true,
      "env": {
        "EXPO_PUBLIC_API_URL": "http://localhost:8000"
      }
    }
  }
}
```

---

## 🚀 Deployment Checklist

### Before Deploying Backend to Render:

1. ✅ Set `DATABASE_URL` to your Render PostgreSQL internal URL
2. ✅ Generate a strong `SECRET_KEY`: `openssl rand -hex 32`
3. ✅ Set `ENVIRONMENT=production`
4. ✅ (Optional) Configure Twilio credentials for SMS

### Before Deploying Frontend to Vercel:

1. ✅ Set `NEXT_PUBLIC_API_URL=https://petcarebooker.onrender.com`
2. ✅ Apply to all environments (Production, Preview, Development)
3. ✅ Trigger a new deployment to pick up env vars

### Before Building Mobile Apps:

1. ✅ Update `eas.json` with production `EXPO_PUBLIC_API_URL`
2. ✅ Run `eas build --platform ios/android --profile production`

---

## 🔍 How It Works

### Backend (Python/FastAPI)

```python
# backend/auth.py
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    if os.getenv("ENVIRONMENT") == "production":
        raise ValueError("SECRET_KEY must be set in production!")
    print("⚠️  WARNING: Using dev SECRET_KEY")
    SECRET_KEY = "dev-secret-key-only-for-local-development"
```

```python
# backend/main.py
def get_allowed_origins():
    if os.getenv("ENVIRONMENT") == "production":
        return ["https://petcarebooker.com", "https://www.petcarebooker.com"]
    else:
        return ["http://localhost:3000", "http://localhost:3001", ...]
```

### Frontend (TypeScript/Next.js)

```typescript
// frontend/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';
```

- Reads from `NEXT_PUBLIC_API_URL` environment variable
- Falls back to production URL if not set
- Same logic used consistently across all frontend pages

### Mobile (TypeScript/Expo)

```typescript
// mobile/src/api/client.ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';
```

- Reads from `EXPO_PUBLIC_API_URL` environment variable
- Falls back to production URL if not set
- No more `__DEV__` checks - explicit env vars only

---

## 🐛 Troubleshooting

### "Failed to fetch" errors on production

**Problem:** Frontend is calling `localhost` instead of production API

**Solution:**
1. Check Vercel environment variables: `vercel env ls`
2. Ensure `NEXT_PUBLIC_API_URL` is set to `https://petcarebooker.onrender.com`
3. Redeploy: `vercel --prod --force`
4. Clear browser cache or use incognito mode

### CORS errors

**Problem:** Backend is blocking requests from frontend

**Solution:**
1. Check `ENVIRONMENT` variable on Render
2. If `production`, ensure your domain is in the allowed list
3. Restart backend service after env changes

### Mobile app can't connect to local backend

**Problem:** App shows "Network request failed"

**Solution:**
1. Find your computer's local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
2. Update `.env` in mobile app: `EXPO_PUBLIC_API_URL=http://192.168.1.XXX:8000`
3. Restart Expo dev server: `npm start`

---

## 📝 Best Practices

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Use strong secrets in production** - Generate with `openssl rand -hex 32`
3. **Test locally before deploying** - Verify changes work with local env vars
4. **Document custom env vars** - Update this guide if you add new variables
5. **Rotate secrets periodically** - Especially `SECRET_KEY` and API tokens

---

## 🎓 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

