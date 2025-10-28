# 🐾 PetCareBooker.com

A modern booking platform for pet grooming businesses. Built with FastAPI, Next.js, and deployed on Render & Vercel.

**Live Site:** https://www.petcarebooker.com  
**API Docs:** https://petcarebooker.onrender.com/docs

## ✨ Features

- **Modern Booking Flow**: Visual calendar, Booksy-style service cards, instant booking
- **Pet-Centric Design**: Track pets, grooming frequency, and favorite groomers
- **Mobile Groomer Support**: Service areas, mobile-specific features
- **SEO Optimized**: 8 city landing pages, 10 blog posts, sitemap.xml
- **Google Maps Integration**: Embedded maps on groomer profiles
- **Zero Commission**: Better for groomers than Booksy (20% fee)

## 🚀 Quick Start

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
petcarebooker/
├── backend/              # FastAPI Python backend
│   ├── models.py        # SQLAlchemy models
│   ├── main.py          # API endpoints
│   ├── database.py      # DB connection
│   └── requirements.txt # Python deps
├── frontend/             # Next.js frontend
│   ├── app/             # Pages & routes
│   ├── components/       # React components
│   ├── lib/             # API client
│   └── package.json     # Node deps
├── mobile/              # Groomer mobile app (Expo)
├── mobile-consumer/     # Customer app (Expo)
└── README.md            # This file
```

## 🛠️ Tech Stack

**Backend:**
- FastAPI (Python web framework)
- PostgreSQL (Production database)
- SQLite (Local development)
- Twilio (SMS notifications)

**Frontend:**
- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS
- Vercel deployment

**Mobile:**
- React Native (Expo)
- TypeScript

## 📚 Documentation

- **ENV_SETUP.md** - Environment variable configuration
- **GOOGLE_SEARCH_CONSOLE_GUIDE.md** - SEO setup guide
- **SEO_CONTENT_GUIDE.md** - Content marketing strategy

## 🗺️ Database Migration

To add map fields to shops table (already done on production):

```sql
ALTER TABLE shops ADD COLUMN latitude FLOAT;
ALTER TABLE shops ADD COLUMN longitude FLOAT;
ALTER TABLE shops ADD COLUMN is_mobile BOOLEAN DEFAULT FALSE;
ALTER TABLE shops ADD COLUMN service_area TEXT;
```

## 🎯 Roadmap

- [x] Core booking flow
- [x] Pet management
- [x] City landing pages
- [x] Blog system
- [x] Google Maps
- [x] Mobile groomer support
- [ ] Payments integration (Stripe)
- [ ] Review system
- [ ] Mobile apps
- [ ] 50+ cities

## 📝 License

MIT

---

Built with ❤️ for pets and their groomers
