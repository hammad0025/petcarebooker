'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicesApi, shopsApi } from '@/lib/api';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  is_active: boolean;
}

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    loadServices(token);
  }, []);

  const loadServices = async (token: string) => {
    try {
      const shop = await shopsApi.getMyProfile(token);
      const servicesData = await servicesApi.getByShop(shop.slug);
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData(e.currentTarget);
    const serviceData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price') as string),
      duration_minutes: parseInt(formData.get('duration') as string),
      category: formData.get('category'),
    };

    try {
      if (editingService) {
        await servicesApi.update(editingService.id, serviceData, token);
      } else {
        await servicesApi.create(serviceData, token);
      }
      
      loadServices(token);
      setShowForm(false);
      setEditingService(null);
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleDelete = async (serviceId: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await servicesApi.delete(serviceId, token);
      loadServices(token);
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">PetCareBooker</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-600 hover:text-purple-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Services</h2>
          <button
            onClick={() => {
              setEditingService(null);
              setShowForm(true);
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            + Add Service
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {editingService ? 'Edit Service' : 'New Service'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingService?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  placeholder="e.g., Small Dog Full Groom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingService?.description}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  placeholder="Describe what's included..."
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    required
                    step="0.01"
                    defaultValue={editingService?.price}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    name="duration"
                    required
                    defaultValue={editingService?.duration_minutes}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingService?.category}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                    placeholder="e.g., Small Dog"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        )}

        {services.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">✂️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-6">Add your first service to start accepting bookings</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    {service.category && (
                      <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm mt-1">
                        {service.category}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">${service.price}</div>
                    <div className="text-gray-600 text-sm">{service.duration_minutes} min</div>
                  </div>
                </div>
                {service.description && (
                  <p className="text-gray-600 mb-4">{service.description}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

