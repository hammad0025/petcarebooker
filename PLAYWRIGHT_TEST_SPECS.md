# 🎭 Playwright Test Specifications for PetCareBooker

## 📋 **Application Details**

### 1. Frontend Framework
**Answer**: **Next.js 16.0.7** with **React 19.2.0**
- TypeScript
- App Router (not Pages Router)
- Client-side components (`'use client'` directive)
- Server-side rendering where applicable

**Key Files**:
- `frontend/app/` - All pages and routes
- `frontend/lib/api.ts` - API client wrapper
- `frontend/components/` - Reusable components

---

### 2. API Architecture
**Answer**: **REST APIs** - All flows call backend APIs

**Backend**: FastAPI (Python) at `https://petcarebooker.onrender.com`

**API Endpoints Used**:
- **Auth**: `/api/auth/register`, `/api/auth/login` (groomers)
- **Customer Auth**: `/api/customer/register`, `/api/customer/login`
- **Shops**: `/api/shops`, `/api/shops/{slug}`, `/api/shops/{slug}/services`
- **Bookings**: `/api/shops/{slug}/bookings` (POST), `/api/shops/{slug}/available-slots`
- **Services**: `/api/shops/me/services` (POST for groomers)
- **Pets**: `/api/customer/pets` (POST, GET)
- **Business Hours**: `/api/shops/me/hours` (PATCH)

**API Client**: `frontend/lib/api.ts` - Wrapper functions for all API calls

**Authentication**: JWT tokens stored in `localStorage`:
- `customerToken` - For customers
- `shopToken` - For groomers (stored as token from `/api/auth/login`)

---

### 3. Payment Provider
**Answer**: **Stripe** (but currently **DISABLED/COMMENTED OUT** in code)

**Status**: 
- ✅ Stripe SDK installed (`stripe==11.6.0`)
- ✅ Stripe service code exists (`backend/stripe_service.py`)
- ❌ Payment endpoints are **commented out** in `backend/main.py`
- ❌ No payment UI in frontend yet

**What's Available**:
- Subscription checkout for groomers (commented out)
- Webhook handling (commented out)
- Payment tracking fields in database (ready)

**For Testing**:
- **Option A**: Test without payments (current state) - bookings create without payment
- **Option B**: Uncomment Stripe code and use Stripe test mode
- **Option C**: Mock/stub Stripe API calls

**Recommendation**: **Option A** for now (test booking flow without payment), or **Option C** (mock Stripe) if you want to test payment UI later.

---

### 4. Test Data Strategy
**Answer**: **Real test environment** with seeded data

**Current Setup**:
- ✅ Production database (PostgreSQL on Render)
- ✅ Test data seeding script exists (`backend/seed_test_data.py`)
- ✅ Test accounts can be created via API

**Test Accounts Available** (from seed script):
- **Groomer 1**: 
  - Email: `sarah@testgroomer1.com`
  - Password: `TestPassword123!`
  - Business: "Paws & Claws Grooming" (Miami, FL)
- **Groomer 2**: 
  - Email: `mike@testgroomer2.com`
  - Password: `TestPassword123!`
  - Business: "Happy Tails Mobile Grooming" (Miami, FL)
- **Groomer 3**: 
  - Email: `lisa@testgroomer3.com`
  - Password: `TestPassword123!`
  - Business: "Luxury Pet Spa Tampa" (Tampa, FL)

**Recommendation**: 
- **Use real test environment** (production database)
- **Create fresh test accounts** in `@beforeEach` or use existing seeded accounts
- **Clean up test data** in `@afterEach` (optional, or use unique emails)

---

### 5. Test Account Strategy
**Answer**: **Create from scratch** (recommended) OR use seeded accounts

**Option 1: Create Fresh Accounts** (Recommended)
- Pros: Clean state, no conflicts, isolated tests
- Cons: Slightly slower (account creation API call)
- Implementation: Call `/api/customer/register` and `/api/auth/register` in test setup

**Option 2: Use Seeded Accounts**
- Pros: Faster, consistent data
- Cons: May have existing bookings/data, potential conflicts
- Implementation: Use credentials from `seed_test_data.py`

**Recommendation**: **Option 1** - Create fresh accounts with unique emails (e.g., `test-${Date.now()}@example.com`)

---

## 🎯 **Recommended Test Approach**

### Test Environment
- **Type**: Real test environment (production database)
- **Base URL**: `https://www.petcarebooker.com`
- **API URL**: `https://petcarebooker.onrender.com`
- **Data**: Create fresh accounts per test suite

### Mocking Strategy
- **API Calls**: ❌ Don't mock (use real APIs)
- **Stripe**: ✅ Mock/stub (since it's disabled anyway)
- **Email/SMS**: ✅ Can mock (optional, since notifications are async)

### Test Account Creation
```typescript
// Recommended approach
const uniqueEmail = `test-${Date.now()}-${Math.random()}@example.com`;
const testPassword = 'TestPassword123!';

// Create customer account
await page.request.post('https://petcarebooker.onrender.com/api/customer/register', {
  data: {
    name: 'Test Customer',
    email: uniqueEmail,
    phone: '5551234567',
    password: testPassword
  }
});
```

---

## 📝 **Key Test Flows to Cover**

### 1. Customer Registration & Pet Creation
- Register new customer
- Add pet (name, type, size)
- Verify pet appears in dashboard

### 2. Groomer Registration & Service Setup
- Register new groomer
- Add service (name, price, duration)
- Set business hours
- Verify service appears on profile

### 3. Booking Flow (Logged In Customer)
- Login as customer
- Browse groomers
- Select groomer
- Select service
- Pick date/time
- Select pet (from saved pets)
- Confirm booking
- Verify booking appears in dashboard

### 4. Booking Flow (Guest)
- Browse groomers (no login)
- Select groomer
- Select service
- Pick date/time
- Enter customer info manually
- Enter pet info manually
- Confirm booking
- Verify booking created

### 5. Groomer Dashboard
- Login as groomer
- View bookings
- Approve/cancel bookings
- View services
- Edit business hours

---

## 🔧 **Technical Details**

### Authentication
- **Method**: JWT tokens in `localStorage`
- **Storage Keys**: 
  - `customerToken` (customers)
  - `customerId`, `customerName` (customer metadata)
  - Token from `/api/auth/login` (groomers - stored in API response)

### API Calls
- **Base URL**: `https://petcarebooker.onrender.com`
- **Headers**: `Content-Type: application/json`
- **Auth Header**: `Authorization: Bearer {token}` (for protected endpoints)

### Key Routes
- `/` - Homepage
- `/customer/register` - Customer registration
- `/customer/login` - Customer login
- `/customer/dashboard` - Customer dashboard
- `/customer/pets/add` - Add pet
- `/register` - Groomer registration
- `/login` - Groomer login
- `/dashboard` - Groomer dashboard
- `/dashboard/services` - Manage services
- `/dashboard/hours` - Manage business hours
- `/browse` - Browse groomers
- `/shop/{slug}` - Groomer profile
- `/shop/{slug}/book?service={id}` - Booking page

---

## 🎬 **Playwright Setup Recommendations**

### Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://www.petcarebooker.com',
    // Capture screenshots on failure
    screenshot: 'only-on-failure',
    // Record video on failure
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

### Test Data Helpers
```typescript
// helpers/test-data.ts
export function generateTestEmail(): string {
  return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
}

export const TEST_PASSWORD = 'TestPassword123!';
```

### API Helpers
```typescript
// helpers/api.ts
export async function createTestCustomer(page: Page) {
  const email = generateTestEmail();
  const response = await page.request.post(
    'https://petcarebooker.onrender.com/api/customer/register',
    { data: { name: 'Test Customer', email, phone: '5551234567', password: TEST_PASSWORD } }
  );
  return { email, password: TEST_PASSWORD, token: (await response.json()).access_token };
}
```

---

## ✅ **Summary**

| Question | Answer |
|----------|--------|
| **Frontend Framework** | Next.js 16.0.7 (React 19.2.0) |
| **API Architecture** | REST APIs (FastAPI backend) |
| **Payment Provider** | Stripe (currently disabled) |
| **Test Data** | Real test environment with seeded data |
| **Test Accounts** | Create from scratch (recommended) |

**Recommended Approach**: 
- ✅ Use real test environment
- ✅ Create fresh accounts per test
- ✅ Mock Stripe (since it's disabled)
- ✅ Don't mock other APIs (use real backend)

---

**Ready for Playwright test creation!** 🚀

