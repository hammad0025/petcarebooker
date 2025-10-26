# Deploy PetCareBooker to Render

## 🚀 Quick Deploy Guide

### Prerequisites
- GitHub account (push your code to GitHub)
- Render account (free tier available)

---

## Backend Deployment

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `petcarebooker-db`
   - **Database**: `petcarebooker`
   - **User**: `petcarebooker`
   - **Region**: Choose closest to you
   - **Plan**: Free (or paid for production)
4. Click **"Create Database"**
5. **Save the Internal Database URL** (starts with `postgres://`)

### Step 3: Deploy Backend Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `petcarebooker-api`
   - **Region**: Same as your database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: 
     ```
     pip install --upgrade pip && pip install -r requirements.txt
     ```
   - **Start Command**: 
     ```
     uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan**: Free (or paid for production)

4. **Environment Variables** - Add these:
   ```
   DATABASE_URL = [paste your PostgreSQL Internal URL from Step 2]
   SECRET_KEY = [generate random string: openssl rand -hex 32]
   TWILIO_ACCOUNT_SID = [your Twilio SID - optional]
   TWILIO_AUTH_TOKEN = [your Twilio token - optional]
   TWILIO_PHONE_NUMBER = [your Twilio number - optional]
   ```

5. Click **"Create Web Service"**

### Step 4: Wait for Build

- First build takes 3-5 minutes
- Watch the logs for any errors
- Once deployed, you'll get a URL like: `https://petcarebooker-api.onrender.com`

### Step 5: Test Your API

Visit: `https://your-app-name.onrender.com/docs`

You should see the FastAPI interactive docs!

---

## Frontend Deployment (Vercel - Recommended)

### Step 1: Deploy to Vercel

```bash
cd frontend
npm install -g vercel
vercel
```

Follow the prompts:
- **Project name**: `petcarebooker`
- **Directory**: `./` (current)
- **Build command**: `npm run build` (default)
- **Output directory**: `.next` (default)

### Step 2: Add Environment Variable

On Vercel dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Add:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com
   ```
3. Redeploy

---

## Mobile App Deployment (Expo EAS)

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
eas login
```

### Step 2: Configure Provider App

```bash
cd mobile
eas build:configure
```

Edit `app.json` and update:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://your-backend-url.onrender.com"
    }
  }
}
```

### Step 3: Build & Submit

```bash
# Build for iOS
eas build --platform ios

# Build for Android  
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Step 4: Repeat for Consumer App

```bash
cd ../mobile-consumer
# Repeat steps above
```

---

## Troubleshooting

### Build fails with "Read-only file system"
✅ **Fixed!** The `runtime.txt` specifies Python 3.11.9 which has pre-built wheels.

### Database connection error
- Check that `DATABASE_URL` is set correctly in Render
- Verify the database is in the same region as your web service
- Make sure you're using the **Internal Database URL**, not the external one

### CORS errors in frontend
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel
- Check that your frontend URL is added to CORS origins in `backend/main.py`

### 502 Bad Gateway
- Check Render logs for errors
- Ensure your app starts on `0.0.0.0:$PORT` (it does!)
- Verify all required environment variables are set

---

## Free Tier Limitations

**Render Free Tier:**
- ⚠️ Web services spin down after 15 minutes of inactivity
- First request after idle takes 30-60 seconds (cold start)
- Database has 1GB storage limit
- Automatic deploys from GitHub

**Upgrade to Paid ($7/month):**
- No sleep/cold starts
- Better performance
- More resources

---

## Post-Deployment Checklist

- [ ] Backend API accessible at `/docs`
- [ ] Database connected (test by registering a shop)
- [ ] Frontend can communicate with backend
- [ ] SMS notifications working (if Twilio configured)
- [ ] Mobile apps can connect to API
- [ ] Custom domain configured (optional)

---

## Custom Domain (Optional)

### Backend (Render)
1. Go to your web service → **Settings** → **Custom Domain**
2. Add: `api.petcarebooker.com`
3. Update DNS records as instructed

### Frontend (Vercel)
1. Project → **Settings** → **Domains**
2. Add: `petcarebooker.com` and `www.petcarebooker.com`
3. Update DNS records as instructed

---

## Monitoring & Logs

### Render
- View logs: Dashboard → Your Service → **Logs**
- Metrics: Dashboard → Your Service → **Metrics**

### Vercel
- View logs: Project → **Deployments** → Select deployment → **View Function Logs**
- Analytics: Project → **Analytics**

---

## Need Help?

- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- Expo docs: https://docs.expo.dev/

---

Your backend should now be live! 🎉

Test it: `https://your-app-name.onrender.com/api/health`

