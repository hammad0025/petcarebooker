# Google Booking Partner Application - PetCareBooker

## Business Overview

**Company Name**: PetCareBooker  
**Website**: https://www.petcarebooker.com  
**Contact Email**: support@petcarebooker.com  
**Business Type**: B2B SaaS Platform for Pet Grooming Services  
**Industry**: Pet Care / Service Booking Platform

### Mission

PetCareBooker connects pet parents with trusted, verified pet groomers nationwide. We provide an instant booking platform that enables groomers to manage appointments, services, and customer relationships while giving pet owners a seamless way to find and book grooming services online.

### Target Market

- **Primary**: Independent pet groomers (solo operators and small businesses)
- **Secondary**: Mobile pet groomers
- **Geographic**: United States (currently active in 20+ major cities)

### Business Model

- **Subscription Tiers**: Free (5 bookings/month), Basic ($24.99/month), Premium ($49.99/month)
- **Transaction Commission**: 3% on completed bookings
- **Revenue Streams**: Monthly subscriptions, transaction fees, premium features

## Technical Architecture

### Platform Stack

- **Frontend**: Next.js 16 (React), TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python), PostgreSQL
- **Hosting**: Vercel (frontend), Render.com (backend)
- **Payment Processing**: Stripe
- **Email**: Resend API
- **SMS**: Twilio
- **Calendar Integration**: Google Calendar API

### Booking System Architecture

```
┌─────────────────┐
│  Google Search  │
│   / Maps        │
└────────┬────────┘
         │
         │ User clicks "Book"
         ▼
┌─────────────────┐
│  Google Booking │
│      API        │
└────────┬────────┘
         │
         │ Availability Query
         │ Booking Creation
         │ Status Updates
         ▼
┌─────────────────┐
│ PetCareBooker   │
│  Booking API    │
│  (FastAPI)      │
└────────┬────────┘
         │
         │ Store Booking
         │ Send Notifications
         │ Sync Calendar
         ▼
┌─────────────────┐
│   PostgreSQL    │
│    Database     │
└─────────────────┘
```

### API Endpoints

#### Availability Query
- **Endpoint**: `GET /api/google/booking/availability`
- **Parameters**: `shop_id`, `service_id` (optional), `start_date`, `end_date`
- **Response**: List of available time slots with service details, pricing, and duration
- **Real-time**: Yes, queries current bookings and business hours

#### Booking Creation
- **Endpoint**: `POST /api/google/booking/create`
- **Request Body**: Customer info, service selection, time slot, pet details
- **Response**: Booking confirmation with booking ID
- **Notifications**: Automatic email and SMS to customer and groomer

#### Booking Updates
- **Endpoint**: `PATCH /api/google/booking/{booking_id}`
- **Supports**: Status changes, time rescheduling, notes updates
- **Real-time Sync**: Updates reflected immediately

#### Booking Cancellation
- **Endpoint**: `DELETE /api/google/booking/{booking_id}`
- **Notifications**: Automatic cancellation emails/SMS
- **Calendar Sync**: Removes from Google Calendar if connected

#### Service Catalog
- **Endpoint**: `GET /api/google/booking/services`
- **Parameters**: `shop_id`
- **Response**: Complete service catalog with pricing, duration, descriptions

#### Webhook Handler
- **Endpoint**: `POST /api/google/booking/webhook`
- **Events**: `booking.created`, `booking.updated`, `booking.cancelled`
- **Security**: Validates webhook signatures from Google

### Data Flow

1. **Customer searches** for pet groomer on Google
2. **Google queries** PetCareBooker API for availability
3. **Customer selects** service and time slot
4. **Google sends** booking request to PetCareBooker
5. **PetCareBooker creates** booking in database
6. **Notifications sent** to customer and groomer
7. **Calendar event** created (if groomer has Google Calendar connected)
8. **Confirmation** sent back to Google

### Security & Privacy

- **Authentication**: JWT tokens for API access
- **HTTPS**: All endpoints served over HTTPS
- **Data Encryption**: Sensitive data encrypted at rest
- **GDPR Compliance**: Customer data handling compliant with privacy regulations
- **Webhook Security**: Signature validation for all webhook requests

## Booking Flow Diagrams

### Standard Booking Flow

```
Customer → Google Search → Selects Business → Clicks "Book"
    ↓
Google queries availability from PetCareBooker
    ↓
Customer selects service & time
    ↓
Google creates booking via PetCareBooker API
    ↓
PetCareBooker:
  - Creates booking record
  - Sends confirmation emails/SMS
  - Creates calendar event (if enabled)
  - Updates availability
    ↓
Confirmation sent to customer via Google
```

### Availability Query Flow

```
Google → GET /api/google/booking/availability
    ↓
PetCareBooker:
  - Loads shop business hours
  - Checks existing bookings
  - Calculates available slots
  - Applies buffer times
    ↓
Returns available time slots
    ↓
Google displays options to customer
```

## API Documentation

### Base URL
`https://petcarebooker.onrender.com`

### Authentication
Currently, Google Booking API endpoints are designed to work with Google's authentication system. Future implementation will include API key authentication for partner access.

### Rate Limiting
- **Availability Queries**: 100 requests/minute per shop
- **Booking Creation**: 10 requests/minute per shop
- **Updates/Cancellations**: 20 requests/minute per shop

### Response Times
- **Availability Query**: < 500ms average
- **Booking Creation**: < 1s average
- **Updates**: < 300ms average

### Error Handling
All endpoints return standard HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `404`: Resource Not Found
- `409`: Conflict (slot no longer available)
- `500`: Internal Server Error

Error responses include:
```json
{
  "detail": "Error message description"
}
```

## Service Catalog Structure

Each service includes:
- **ID**: Unique service identifier
- **Name**: Service name (e.g., "Full Grooming", "Nail Trim")
- **Description**: Detailed service description
- **Price**: USD price
- **Duration**: Duration in minutes
- **Currency**: Always "USD"

## Availability Calculation

Availability is calculated in real-time based on:
1. **Business Hours**: Configured by groomer (day-by-day, time ranges)
2. **Existing Bookings**: All confirmed/pending bookings
3. **Buffer Time**: Configurable buffer between appointments (default: 15 minutes)
4. **Service Duration**: Each service has a specific duration
5. **Advance Booking Window**: Configurable (default: 30 days)

## Booking Confirmation Process

1. **Immediate Response**: Booking ID returned to Google
2. **Email Notification**: Sent to customer within 5 seconds
3. **SMS Notification**: Sent to customer within 10 seconds
4. **Groomer Notification**: Email/SMS sent to groomer
5. **Calendar Sync**: Event created in groomer's Google Calendar (if connected)
6. **Status**: Booking marked as "Pending" or "Confirmed" (based on auto-approve setting)

## Testing Environment

- **Staging URL**: `https://staging.petcarebooker.com` (when available)
- **Test Accounts**: Available for Google testing
- **Test Business Profiles**: Pre-configured test GMB profiles

## Compliance & Standards

### Google Requirements Met

- ✅ Real-time availability queries
- ✅ Booking confirmation within 5 seconds
- ✅ Accurate service catalog
- ✅ Booking cancellation support
- ✅ Status update capabilities
- ✅ Webhook event handling
- ✅ HTTPS endpoints
- ✅ Error handling
- ✅ Data privacy compliance

### Business Requirements

- ✅ Verified business profiles only
- ✅ Accurate business hours
- ✅ Service pricing transparency
- ✅ Customer data protection
- ✅ Booking cancellation policies
- ✅ Notification system

## Terms of Service & Privacy Policy

- **Terms of Service**: https://www.petcarebooker.com/terms
- **Privacy Policy**: https://www.petcarebooker.com/privacy
- **GDPR Compliance**: Yes
- **Data Retention**: Customer data retained per privacy policy
- **Data Sharing**: No data shared with third parties except as required for service delivery

## Support & Contact

- **Technical Support**: support@petcarebooker.com
- **API Documentation**: https://www.petcarebooker.com/api/docs
- **Status Page**: https://status.petcarebooker.com (when available)
- **Response Time**: < 24 hours for support requests

## Future Enhancements

- Multi-language support
- Advanced scheduling rules
- Recurring appointment support
- Group booking capabilities
- Integration with additional calendar systems

## Application Status

**Current Status**: Ready for Partner Application Submission

**Completed**:
- ✅ Schema.org ReservationAction markup
- ✅ Google Booking API endpoints
- ✅ Real-time availability queries
- ✅ Booking creation/updates/cancellations
- ✅ Webhook handling
- ✅ Service catalog API
- ✅ Notification system
- ✅ Calendar integration

**Pending**:
- ⏳ Google Partner approval
- ⏳ Production testing with Google
- ⏳ GMB profile integration testing

## Next Steps

1. Submit application to Google Booking Partners program
2. Complete Google's technical review
3. Complete business verification
4. Begin testing with approved test accounts
5. Roll out to production groomers

---

**Prepared by**: PetCareBooker Development Team  
**Date**: January 2025  
**Version**: 1.0

