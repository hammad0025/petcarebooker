const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:8000' : 'https://petcarebooker.onrender.com');

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

// Auth
export const authApi = {
  register: (data: any) => fetchApi('/api/auth/register', { method: 'POST', body: data }),
  login: (email: string, password: string) => 
    fetchApi('/api/auth/login', { method: 'POST', body: { email, password } }),
};

// Shops
export const shopsApi = {
  getAll: (params?: { city?: string; state?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchApi(`/api/shops${query ? '?' + query : ''}`);
  },
  getBySlug: (slug: string) => fetchApi(`/api/shops/${slug}`),
  getMyProfile: (token: string) => fetchApi('/api/shops/me/profile', { token }),
  update: (data: any, token: string) => 
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

