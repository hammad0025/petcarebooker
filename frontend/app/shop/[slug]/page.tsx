'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { shopsApi, servicesApi } from '@/lib/api';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
}

interface Shop {
  id: number;
  business_name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

export default function ShopPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShop();
  }, [slug]);

  const loadShop = async () => {
    try {
      const [shopData, servicesData] = await Promise.all([
        shopsApi.getBySlug(slug),
        servicesApi.getByShop(slug)
      ]);
      setShop(shopData);
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = (serviceId: number) => {
    router.push(`/shop/${slug}/book?service=${serviceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Shop not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <a href="/browse" className="text-purple-600 hover:text-purple-700">
            ← Back to Browse
          </a>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl">
              🐕
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{shop.business_name}</h1>
              <p className="text-lg opacity-90">
                {shop.address && `${shop.address}, `}
                {shop.city}, {shop.state}
              </p>
              {shop.phone && <p className="mt-2">📞 {shop.phone}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {shop.description && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-gray-700 text-lg">{shop.description}</p>
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>

        {services.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">✂️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600">Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    {service.category && (
                      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {service.category}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600">${service.price}</div>
                    <div className="text-gray-600">{service.duration_minutes} min</div>
                  </div>
                </div>
                {service.description && (
                  <p className="text-gray-600 mb-4">{service.description}</p>
                )}
                <button
                  onClick={() => handleBookService(service.id)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

