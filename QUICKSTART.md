# PetCareBooker - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

---

## Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (optional, will use SQLite by default)
cp .env.example .env

# Run the server
python main.py
```

Backend will run on: **http://localhost:8000**

API docs available at: **http://localhost:8000/docs**

---

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Run on iOS (requires Mac + Xcode)
npm run ios

# Run on Android (requires Android Studio)
npm run android

# Run on web (for testing)
npm run web
```

---

## Features Built

### ✅ For Groomers:
- Register/Login
- Create shop profile with custom URL (e.g., petcarebooker.com/shop/paws-and-claws)
- Add services (name, price, duration, category)
- **Calendar View** - See all bookings in a visual calendar
- **List View** - Traditional list of bookings
- Approve/Deny booking requests
- Mark bookings as complete
- SMS notifications (configure Twilio)

### ✅ For Customers:
- Browse groomers by location
- View shop profiles and services
- **Guest booking** - No account required!
- Enter pet information (name, breed, weight, notes)
- Pick date/time for appointment
- SMS confirmations

### ✅ Mobile App (iOS & Android):
- Groomer login
- View all bookings
- Approve/deny requests on the go
- Mark complete
- Real-time updates

---

## Test It Out

1. **Start backend**: `cd backend && python main.py`
2. **Start frontend**: `cd frontend && npm run dev`
3. Go to http://localhost:3000
4. Click "Get Started" to register a grooming shop
5. Add some services
6. Share your shop link: http://localhost:3000/shop/YOUR-SLUG
7. Book an appointment (use guest booking)
8. Approve it from dashboard!

---

## SMS Notifications (Optional)

To enable SMS notifications:

1. Sign up for [Twilio](https://www.twilio.com)
2. Get your Account SID, Auth Token, and Phone Number
3. Add to `backend/.env`:
```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```
4. Restart backend

---

## Production Deployment

### Backend
- Deploy to Heroku, Railway, or AWS
- Set up PostgreSQL database
- Configure environment variables

### Frontend
- Deploy to Vercel (recommended) or Netlify
- Set NEXT_PUBLIC_API_URL to your backend URL

### Mobile
- Build with Expo EAS Build
- Submit to App Store / Google Play

---

## Tech Stack

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL/SQLite
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Mobile**: React Native + Expo
- **Calendar**: React Big Calendar
- **SMS**: Twilio
- **Auth**: JWT tokens

---

## Architecture

```
petcarebooker/
├── backend/          # FastAPI REST API
│   ├── main.py       # API routes
│   ├── models.py     # Database models
│   ├── schemas.py    # Pydantic schemas
│   ├── auth.py       # JWT authentication
│   ├── notifications.py  # SMS with Twilio
│   └── database.py   # SQLAlchemy setup
│
├── frontend/         # Next.js web app
│   ├── app/          # Pages
│   ├── components/   # React components
│   └── lib/          # API client
│
└── mobile/           # React Native app
    ├── App.tsx       # Main app component
    └── src/api/      # API client
```

---

## What's Next?

Future features to add:
- Online payments (Stripe)
- Customer accounts & booking history
- Reviews & ratings
- Before/after photo upload
- Multi-staff scheduling
- Recurring appointments
- Email notifications
- Analytics dashboard

---

## Support

Questions? Found a bug? 
- Check the code comments
- Review the API docs at /api/docs
- The codebase is clean and well-structured!

---

Built with ❤️ for pet groomers

