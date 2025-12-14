// Clean API URL configuration - defaults to production if env var not set
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';

interface ApiOptions {
  method?: string;
  body?: any;
  token?: string;
}

async function fetchApi(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || 'An error occurred');
    }

    return response.json();
  } catch (error: any) {
    console.error('API fetch error:', error);
    throw new Error(`Failed to fetch: ${error.message || 'Network error'}`);
  }
}

// Auth
export const authApi = {
  register: (data: any) => fetchApi('/api/auth/register', { method: 'POST', body: data }),
  login: (email: string, password: string) => 
    fetchApi('/api/auth/login', { method: 'POST', body: { email, password } }),
};

// Customer Auth
export const customerAuthApi = {
  register: (data: any) => fetchApi('/api/customer/register', { method: 'POST', body: data }),
  login: (email: string, password: string) => 
    fetchApi('/api/customer/login', { method: 'POST', body: { email, password } }),
  forgotPassword: (email: string) => 
    fetchApi('/api/customer/forgot-password', { method: 'POST', body: { email } }),
  resetPassword: (token: string, newPassword: string) => 
    fetchApi('/api/customer/reset-password', { method: 'POST', body: { token, new_password: newPassword } }),
};

// Shops
export const shopsApi = {
  getAll: (params?: { city?: string; state?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi(`/api/shops${query ? '?' + query : ''}`);
  },
  getBySlug: (slug: string) => fetchApi(`/api/shops/${slug}`),
  getMyProfile: (token: string) => fetchApi('/api/shops/me/profile', { token }),
  update: (token: string, data: any) => 
    fetchApi('/api/shops/me', { method: 'PATCH', body: data, token }),
};

// Services
export const servicesApi = {
  create: (data: any, token: string) => 
    fetchApi('/api/shops/me/services', { method: 'POST', body: data, token }),
  getByShop: (slug: string) => fetchApi(`/api/shops/${slug}/services`),
  update: (serviceId: number, data: any, token: string) => 
    fetchApi(`/api/services/${serviceId}`, { method: 'PATCH', body: data, token }),
  delete: (serviceId: number, token: string) => 
    fetchApi(`/api/services/${serviceId}`, { method: 'DELETE', token }),
};

// Bookings
export const bookingsApi = {
  create: (slug: string, data: any) => 
    fetchApi(`/api/shops/${slug}/bookings`, { method: 'POST', body: data }),
  getMyBookings: (token: string, params?: any) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/api/shops/me/bookings${query ? '?' + query : ''}`, { token });
  },
  update: (bookingId: number, data: any, token: string) => 
    fetchApi(`/api/bookings/${bookingId}`, { method: 'PATCH', body: data, token }),
};

// Calendar
export const calendarApi = {
  getAuthorizationUrl: (token: string) => 
    fetchApi('/api/shops/me/calendar/authorize', { token }),
  connect: (code: string, state: string, token: string) => 
    fetchApi('/api/shops/me/calendar/connect', { method: 'POST', body: { code, state }, token }),
  getStatus: (token: string) => 
    fetchApi('/api/shops/me/calendar/status', { token }),
  disconnect: (token: string) => 
    fetchApi('/api/shops/me/calendar/disconnect', { method: 'POST', token }),
  syncNow: (token: string) => 
    fetchApi('/api/shops/me/calendar/sync-now', { method: 'POST', token }),
};

// Referrals
export const referralsApi = {
  getReferralCode: (token: string) => 
    fetchApi('/api/shops/me/referral-code', { token }),
  getReferrals: (token: string) => 
    fetchApi('/api/shops/me/referrals', { token }),
};



