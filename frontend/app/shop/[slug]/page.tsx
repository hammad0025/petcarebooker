'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
  zip_code: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  is_mobile?: boolean;
  service_area?: string;
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Shop not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header - Booksy/Vagaro Style */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/browse" className="text-gray-600 hover:text-gray-900 font-semibold">
            ← Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shrink-0">
              🐕
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{shop.business_name}</h1>
              <p className="text-xs text-gray-600">{shop.city}, {shop.state}</p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout - Booksy Style */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-0">
          {/* Left Sidebar - Info */}
          <div className="bg-gray-50 border-r border-gray-200 p-6 space-y-6">
            {/* Business Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-4xl mx-auto mb-3">
                🐕
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-1">{shop.business_name}</h2>
              <p className="text-sm text-center text-gray-600 mb-3">{shop.city}, {shop.state}</p>
              
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm font-semibold text-gray-700">4.9 (127)</span>
              </div>

              <button 
                onClick={() => window.scrollTo({ top: document.getElementById('services')?.offsetTop, behavior: 'smooth' })}
                className="w-full bg-red-600 text-white py-2.5 rounded-lg font-bold hover:bg-red-700 transition-colors text-sm"
              >
                View Services
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-3">
              <h3 className="font-bold text-gray-900 mb-3">Contact Info</h3>
              
              {shop.address && (
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-gray-400">📍</span>
                  <div>
                    <p className="text-gray-900 font-medium">{shop.address}</p>
                    <p className="text-gray-600">{shop.city}, {shop.state} {shop.zip_code}</p>
                  </div>
                </div>
              )}

              {shop.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">📞</span>
                  <a href={`tel:${shop.phone}`} className="text-blue-600 hover:underline font-medium">
                    {shop.phone}
                  </a>
                </div>
              )}

              {shop.email && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">✉️</span>
                  <a href={`mailto:${shop.email}`} className="text-blue-600 hover:underline font-medium text-xs">
                    {shop.email}
                  </a>
                </div>
              )}

              {shop.latitude && shop.longitude && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gray-100 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm mt-3"
                >
                  Get Directions →
                </a>
              )}
            </div>

            {/* About */}
            {shop.description && (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">About</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{shop.description}</p>
              </div>
            )}

            {/* Hours - Placeholder */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tuesday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wednesday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thursday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Friday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold text-red-600">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Services */}
          <div id="services" className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Services</h2>
              <p className="text-gray-600">Select a service to book your appointment</p>
            </div>

            {services.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <div className="text-6xl mb-4">✂️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-600">Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => {
                  // Format duration
                  const hours = Math.floor(service.duration_minutes / 60);
                  const mins = service.duration_minutes % 60;
                  let durationText = '';
                  if (hours > 0 && mins > 0) {
                    durationText = `${hours}h ${mins}min`;
                  } else if (hours > 0) {
                    durationText = `${hours}h`;
                  } else {
                    durationText = `${mins}min`;
                  }

                  return (
                    <div 
                      key={service.id} 
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow hover:border-purple-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              {service.name}
                            </h3>
                            {service.category && (
                              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">
                                {service.category}
                              </span>
                            )}
                          </div>
                          
                          {service.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                          )}

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{durationText}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xl font-bold text-gray-900">${service.price}</span>
                              <span className="text-gray-500">starting at</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleBookService(service.id)}
                          className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
