# ⚡ QUICK DEPLOYMENT - TL;DR Version

For when you just want to ship ASAP.

---

## 🚀 30-Minute MVP Deploy

### 1. Backend (5 min)
```bash
# Go to railway.app
# New Project → Deploy from GitHub → Select repo
# Add PostgreSQL
# Set env vars (copy from .env.example)
# Deploy!
```

### 2. Web (5 min)
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
# Done! You get a URL like petcarebooker.vercel.app
```

### 3. Mobile Apps (20 min)
```bash
# Install EAS CLI
npm install -g eas-cli

# Business App
cd mobile
eas login
eas build:configure
eas build --platform android --profile preview
# Wait 15 min → Download APK → Share with groomers

# Consumer App
cd ../mobile-consumer
eas build:configure
eas build --platform android --profile preview
# Wait 15 min → Download APK → Share with customers
```

**DONE! You now have:**
- ✅ Live backend API
- ✅ Live web app
- ✅ Android APKs you can share immediately

---

## 📱 Full App Store Deployment (1-2 weeks)

### Prerequisites:
- Apple Developer account ($99/year)
- Google Play Console account ($25 one-time)
- App icons (1024x1024) - Use [appicon.co](https://appicon.co)
- Screenshots - Take from running apps

### iOS:
```bash
cd mobile
eas build --platform ios --profile production
eas submit --platform ios --latest
# Repeat for mobile-consumer
```

### Android:
```bash
cd mobile
eas build --platform android --profile production
eas submit --platform android --latest
# Repeat for mobile-consumer
```

---

## 🎯 Priority Order

**MVP (Do First):**
1. Deploy backend to Railway
2. Deploy web to Vercel
3. Build Android APKs
4. Test with 5-10 groomers

**Full Launch (Do Later):**
1. Create app store assets
2. Submit to App Store + Play Store
3. Wait for approval
4. Launch! 🎉

---

## 💰 Cost Breakdown

**MVP Testing (Free!):**
- Railway: FREE (500 hrs/month)
- Vercel: FREE
- EAS Builds: FREE (limited builds)
- **Total: $0**

**Production:**
- Railway: $5/month
- Vercel: FREE
- EAS: $29/month (optional, for unlimited builds)
- Apple: $99/year
- Google: $25 one-time
- **Total: ~$160 first year**

---

## 🆘 Emergency Contacts

- **Expo Support**: [expo.dev/support](https://expo.dev/support)
- **Railway Support**: [railway.app/help](https://railway.app/help)
- **Apple Review Status**: [developer.apple.com/contact](https://developer.apple.com/contact)

---

See `DEPLOYMENT_GUIDE.md` for full detailed instructions.

