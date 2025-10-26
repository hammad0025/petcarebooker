// Use localhost for web, network IP for native mobile
const API_BASE_URL = __DEV__ 
  ? (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? 'http://localhost:8000'  // Web browser
      : 'http://10.0.0.181:8000')  // Native mobile
  : 'https://api.petcarebooker.com';

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

export const customerApi = {
  register: (data: any) => 
    fetchApi('/api/customer/register', { method: 'POST', body: data }),
  login: (email: string, password: string) => 
    fetchApi('/api/customer/login', { method: 'POST', body: { email, password } }),
};

export const shopsApi = {
  getAll: () => fetchApi('/api/shops'),
  getBySlug: (slug: string) => fetchApi(`/api/shops/${slug}`),
};

export const servicesApi = {
  getByShop: (slug: string) => fetchApi(`/api/shops/${slug}/services`),
};

export const bookingsApi = {
  create: (slug: string, data: any) => 
    fetchApi(`/api/shops/${slug}/bookings`, { method: 'POST', body: data }),
};

export const petsApi = {
  getMyPets: (token: string) => fetchApi('/api/customer/pets', { token }),
  createPet: (data: any, token: string) => 
    fetchApi('/api/customer/pets', { method: 'POST', body: data, token }),
};

