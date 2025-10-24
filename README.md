# PetCareBooker.com

A Booksy-style booking platform built specifically for pet grooming businesses.

## Features

- **Calendar-First Design**: Source of truth for groomers
- **Shop Profiles**: Business pages with services and pricing
- **Guest Booking**: Frictionless booking without customer accounts
- **Pet Information**: Capture breed, size, and special notes during booking
- **SMS Notifications**: Automated reminders and confirmations
- **Request Approval**: Groomers approve/deny bookings before confirmation

## Tech Stack

- **Frontend**: Next.js 14 (React, TypeScript, Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **SMS**: Twilio
- **Calendar**: FullCalendar

## Project Structure

```
petcarebooker/
├── backend/          # FastAPI server
├── frontend/         # Next.js application
└── README.md
```

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
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

## MVP Scope

**For Groomers:**
- Create shop profile
- Add/edit services
- View calendar with bookings
- Approve/deny booking requests
- Manage appointments

**For Customers:**
- Browse groomers
- View shop profiles
- Book appointments (guest mode)
- Enter pet details
- Receive SMS confirmations

