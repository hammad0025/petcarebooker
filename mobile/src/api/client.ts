// Clean API URL configuration using environment variable
// @ts-ignore - Expo env vars
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';

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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'An error occurred');
  }

  return response.json();
}

export const authApi = {
  login: (email: string, password: string) => 
    fetchApi('/api/auth/login', { method: 'POST', body: { email, password } }),
};

export const shopsApi = {
  getMyProfile: (token: string) => fetchApi('/api/shops/me/profile', { token }),
  updateBusinessHours: (data: any, token: string) => 
    fetchApi('/api/shops/me/hours', { method: 'PUT', body: data, token }),
};

export const servicesApi = {
  getByShop: (slug: string) => fetchApi(`/api/shops/${slug}/services`),
  create: (data: any, token: string) => 
    fetchApi('/api/shops/me/services', { method: 'POST', body: data, token }),
  delete: (serviceId: number, token: string) => 
    fetchApi(`/api/services/${serviceId}`, { method: 'DELETE', token }),
};

export const bookingsApi = {
  getMyBookings: (token: string, params?: any) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/api/shops/me/bookings${query ? '?' + query : ''}`, { token });
  },
  update: (bookingId: number, data: any, token: string) => 
    fetchApi(`/api/bookings/${bookingId}`, { method: 'PATCH', body: data, token }),
};

