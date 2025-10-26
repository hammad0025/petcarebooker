# 🚀 PetCareBooker - Full Production Deployment Guide

This guide will walk you through deploying ALL components of PetCareBooker to production, including App Store and Google Play Store submission.

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Required Accounts & Credentials:
- [ ] **GitHub account** (for code hosting)
- [ ] **Railway.app account** (backend hosting) - FREE to start
- [ ] **Vercel account** (web hosting) - FREE
- [ ] **Expo account** (mobile builds) - FREE
- [ ] **Apple Developer Account** ($99/year) - for iOS App Store
- [ ] **Google Play Console** ($25 one-time) - for Android Play Store
- [ ] **Twilio account** (SMS notifications) - Pay as you go
- [ ] **Domain name** (optional but recommended) - ~$12/year

### Required Tools:
```bash
# Install these on your machine
npm install -g eas-cli
npm install -g vercel
```

---

## 🎯 DEPLOYMENT STEPS

---

## 1️⃣ BACKEND DEPLOYMENT (Railway)

### Step 1: Prepare Database
1. Go to [railway.app](https://railway.app)
2. Create new project → "Provision PostgreSQL"
3. Copy the `DATABASE_URL` from the PostgreSQL service

### Step 2: Deploy Backend
1. In Railway, click "New" → "GitHub Repo"
2. Select your `petcarebooker` repository
3. Set **Root Directory**: `backend`
4. Add these environment variables:
   ```
   DATABASE_URL=<from PostgreSQL service>
   JWT_SECRET=<generate with: openssl rand -hex 32>
   TWILIO_ACCOUNT_SID=<from twilio.com>
   TWILIO_AUTH_TOKEN=<from twilio.com>
   TWILIO_PHONE_NUMBER=<from twilio.com>
   ENVIRONMENT=production
   FRONTEND_URL=https://petcarebooker.com
   ```
5. Click "Deploy"
6. Copy your backend URL (e.g., `https://petcarebooker-backend.railway.app`)

### Step 3: Test Backend
```bash
curl https://your-backend-url.railway.app/api/health
# Should return: {"status":"ok"}
```

✅ **Backend is live!**

---

## 2️⃣ WEB APP DEPLOYMENT (Vercel)

### Step 1: Update Environment
1. Edit `frontend/.env.production`:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

### Step 2: Deploy to Vercel
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

OR use Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. "New Project" → Import your GitHub repo
3. Set **Root Directory**: `frontend`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
5. Deploy!

### Step 3: Add Custom Domain (Optional)
1. Buy domain at Namecheap/GoDaddy
2. In Vercel → Project Settings → Domains
3. Add `petcarebooker.com`
4. Update DNS records as instructed

✅ **Web app is live!**

---

## 3️⃣ MOBILE APPS DEPLOYMENT (App Store + Play Store)

### Prerequisites

#### For iOS (App Store):
1. **Apple Developer Account** ($99/year)
   - Sign up at [developer.apple.com](https://developer.apple.com)
2. **Create App in App Store Connect**:
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - "My Apps" → "+" → "New App"
   - **Business App**: Name = "PetCareBooker Business", Bundle ID = `com.petcarebooker.business`
   - **Consumer App**: Name = "PetCareBooker", Bundle ID = `com.petcarebooker.app`
   - Copy the "App Store Connect App ID" (numbers like 1234567890)

#### For Android (Play Store):
1. **Google Play Console** ($25 one-time)
   - Sign up at [play.google.com/console](https://play.google.com/console)
2. **Create App in Play Console**:
   - "Create app"
   - **Business App**: Name = "PetCareBooker Business"
   - **Consumer App**: Name = "PetCareBooker"
3. **Create Service Account** (for automated submission):
   - Go to "Setup" → "API access"
   - Link Google Cloud project
   - Create service account
   - Download JSON key file → Save as `google-play-service-account.json`

---

### 🏢 BUSINESS MOBILE APP

#### Step 1: Setup EAS
```bash
cd mobile
npm install -g eas-cli
eas login
eas init --id YOUR_EAS_PROJECT_ID
```

#### Step 2: Update Configuration
Edit `mobile/app.json`:
- Update `expo.extra.apiUrl` to your Railway backend URL
- Update `expo.extra.eas.projectId` with your EAS project ID
- Update `expo.owner` with your Expo username

Edit `mobile/eas.json`:
- Update `submit.production.ios.appleId` with your Apple ID
- Update `submit.production.ios.ascAppId` with App Store Connect App ID
- Update `submit.production.ios.appleTeamId` with your Apple Team ID
- Place `google-play-service-account.json` in the `mobile/` folder

#### Step 3: Create App Icons & Splash Screen
You need:
- `assets/icon.png` (1024x1024)
- `assets/splash.png` (1284x2778 for iPhone, will be resized)
- `assets/adaptive-icon.png` (1024x1024 for Android)
- `assets/favicon.png` (48x48)

Use [Figma](https://figma.com) or hire on Fiverr ($5-20).

#### Step 4: Build for iOS
```bash
cd mobile
eas build --platform ios --profile production
```
This takes ~15-20 minutes. You'll get a `.ipa` file.

#### Step 5: Build for Android
```bash
eas build --platform android --profile production
```
This takes ~15-20 minutes. You'll get a `.aab` file.

#### Step 6: Submit to App Stores

**iOS:**
```bash
eas submit --platform ios --latest
```
OR manually:
1. Download the `.ipa` from EAS
2. Open Xcode → Window → Transporter
3. Upload the `.ipa` file
4. Go to App Store Connect → "TestFlight" or "Submit for Review"

**Android:**
```bash
eas submit --platform android --latest
```
OR manually:
1. Download the `.aab` from EAS
2. Go to Play Console → Your App → "Production" → "Create new release"
3. Upload the `.aab` file
4. Complete store listing (screenshots, description, etc.)
5. Submit for review

---

### 👥 CONSUMER MOBILE APP

Repeat the same steps for `mobile-consumer`:

```bash
cd mobile-consumer
eas init --id YOUR_CONSUMER_EAS_PROJECT_ID
# Update app.json and eas.json
# Add icons and splash screens
eas build --platform ios --profile production
eas build --platform android --profile production
eas submit --platform ios --latest
eas submit --platform android --latest
```

---

## 📱 APP STORE REQUIREMENTS

### App Store Connect (iOS):
- **App Name**: PetCareBooker / PetCareBooker Business
- **Subtitle**: Book Pet Grooming in Seconds
- **Description**: (Write compelling copy about your app)
- **Keywords**: pet grooming, dog grooming, cat grooming, pet care, booking
- **Screenshots**: 
  - 6.5" iPhone (1284 x 2778) - 3-10 screenshots
  - 12.9" iPad (2048 x 2732) - Optional but recommended
- **App Preview Video**: Optional but increases conversions
- **Privacy Policy URL**: Required - host at `https://petcarebooker.com/privacy`
- **Support URL**: `https://petcarebooker.com/support`
- **Marketing URL**: `https://petcarebooker.com`
- **Age Rating**: 4+
- **Category**: Business / Lifestyle

### Google Play Console (Android):
- **App Name**: PetCareBooker / PetCareBooker Business
- **Short Description**: (80 chars) Book pet grooming appointments instantly
- **Full Description**: (4000 chars) Write compelling copy
- **Screenshots**:
  - Phone: 1080 x 1920 - Min 2, Max 8
  - 7" Tablet: 1200 x 1920 - Optional
  - 10" Tablet: 1920 x 1200 - Optional
- **Feature Graphic**: 1024 x 500 (Required)
- **App Icon**: 512 x 512 (Required)
- **Privacy Policy URL**: Required
- **Content Rating**: Fill out questionnaire (ESRB: Everyone)
- **Target Audience**: Select appropriate age groups

---

## 🎨 CREATING APP STORE ASSETS

### Quick Option (Recommended for MVP):
Use these tools to generate assets quickly:
- **Icons**: [appicon.co](https://appicon.co) - Upload 1024x1024 PNG
- **Screenshots**: Take from simulator/emulator
- **Feature Graphic**: [Canva](https://canva.com) - Free templates

### Professional Option:
Hire on Fiverr:
- App icon design: $10-50
- Screenshot design: $20-100
- Full app store optimization (ASO): $100-500

---

## ⏱️ DEPLOYMENT TIMELINE

### Week 1: Setup & Deployment
- **Day 1**: Deploy backend (Railway) + Web (Vercel)
- **Day 2-3**: Create app icons, splash screens, screenshots
- **Day 4**: Build mobile apps with EAS
- **Day 5**: Test builds on physical devices
- **Day 6-7**: Submit to App Store + Play Store

### Week 2: App Review
- **iOS**: Typically 24-48 hours (can be 1-7 days)
- **Android**: Typically 1-3 days (can be up to 7 days)
- **Common rejections**: Missing privacy policy, crashes, unclear functionality

### Week 3: Launch!
- Apps go live 🎉
- Monitor for crashes/bugs
- Respond to user reviews

---

## 🔧 POST-DEPLOYMENT

### Monitoring & Analytics
1. **Sentry** (error tracking) - [sentry.io](https://sentry.io)
   ```bash
   npm install @sentry/react-native
   ```
2. **PostHog** (analytics) - [posthog.com](https://posthog.com)
3. **App Store Analytics** - Built into App Store Connect
4. **Play Console Analytics** - Built into Play Console

### Updating Apps
When you make changes:
```bash
# Increment version in app.json
# Then rebuild and resubmit
eas build --platform all --profile production
eas submit --platform all --latest
```

### Database Backups
Railway automatically backs up PostgreSQL.
To manually backup:
```bash
# In Railway PostgreSQL service, click "Data" → "Backups"
```

---

## 💰 TOTAL COSTS

### One-Time:
- Apple Developer: $99/year
- Google Play: $25 one-time
- Domain: $12/year
- **Total: $136 first year, $111/year after**

### Monthly:
- Railway (Backend): $5-20/month
- Vercel (Web): FREE
- EAS Builds: FREE (limited builds, then $29/month for unlimited)
- Twilio (SMS): ~$0.01 per SMS (variable)
- **Total: ~$5-50/month depending on usage**

---

## 🚨 COMMON ISSUES & SOLUTIONS

### iOS Build Fails:
- **Issue**: "Bundle identifier already in use"
- **Fix**: Change `bundleIdentifier` in `app.json`

### Android Build Fails:
- **Issue**: "Package name already in use"
- **Fix**: Change `package` in `app.json`

### App Rejected by Apple:
- **Issue**: "Missing privacy policy"
- **Fix**: Create privacy policy page, add URL to app.json

### Backend Not Connecting:
- **Issue**: CORS errors
- **Fix**: Check `allow_origins` in `backend/main.py` includes production URLs

---

## 📞 NEED HELP?

- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **App Store Review Guidelines**: [developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines)
- **Play Store Policies**: [play.google.com/about/developer-content-policy](https://play.google.com/about/developer-content-policy)

---

## ✅ DEPLOYMENT CHECKLIST

Print this out and check off as you go:

### Backend:
- [ ] PostgreSQL database created on Railway
- [ ] Backend deployed to Railway
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Test endpoints working
- [ ] Twilio SMS working

### Web:
- [ ] Frontend deployed to Vercel
- [ ] API URL updated
- [ ] Custom domain configured (optional)
- [ ] SSL working (https)

### Mobile - Business App:
- [ ] EAS project created
- [ ] App icons created (1024x1024)
- [ ] Splash screen created
- [ ] iOS build completed
- [ ] Android build completed
- [ ] Apple Developer account active
- [ ] Google Play Console account active
- [ ] App Store Connect app created
- [ ] Play Console app created
- [ ] Privacy policy created
- [ ] Screenshots taken (iOS: 6.5" iPhone, Android: 1080x1920)
- [ ] App descriptions written
- [ ] Submitted to iOS App Store
- [ ] Submitted to Google Play Store
- [ ] iOS app approved ✅
- [ ] Android app approved ✅

### Mobile - Consumer App:
- [ ] EAS project created
- [ ] App icons created
- [ ] Splash screen created
- [ ] iOS build completed
- [ ] Android build completed
- [ ] App Store Connect app created
- [ ] Play Console app created
- [ ] Privacy policy created
- [ ] Screenshots taken
- [ ] App descriptions written
- [ ] Submitted to iOS App Store
- [ ] Submitted to Google Play Store
- [ ] iOS app approved ✅
- [ ] Android app approved ✅

### Post-Launch:
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (PostHog/Mixpanel)
- [ ] Monitor user reviews
- [ ] Respond to support requests
- [ ] Plan first update

---

**🎉 CONGRATULATIONS! Your app is live on the App Store and Play Store!**

Now go get those groomers signed up! 🐾

