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
  const [activeTab, setActiveTab] = useState<'about' | 'services'>('services');

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

  const scrollToServices = () => {
    setActiveTab('services');
    const servicesElement = document.getElementById('services-section');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="w-32 h-32 bg-black rounded-xl flex items-center justify-center text-6xl shrink-0">
                🐕
              </div>
              {/* Business Info */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-1">{shop.business_name}</h1>
                <p className="text-lg text-gray-600">
                  {shop.city}, {shop.state}
                </p>
              </div>
            </div>
            {/* Book Now CTA - Vagaro Style */}
            <button
              onClick={scrollToServices}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-lg font-bold text-xl hover:shadow-xl transition-all hover:from-red-600 hover:to-red-700 shrink-0"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Tabs Navigation - Vagaro Style */}
        <div className="container mx-auto px-4">
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-4 font-semibold text-lg transition-colors relative ${
                activeTab === 'about' 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              About
              {activeTab === 'about' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-4 font-semibold text-lg transition-colors relative ${
                activeTab === 'services' 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Services
              {activeTab === 'services' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* About Tab */}
        {activeTab === 'about' && (
          <>
            {shop.description && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Description</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{shop.description}</p>
              </div>
            )}

            {/* Location & Map Section */}
            {(shop.latitude && shop.longitude) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📍</span> Location
              {shop.is_mobile && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  🚐 Mobile Groomer
                </span>
              )}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Address */}
              <div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <div className="space-y-3">
                    {shop.address && (
                      <p className="text-gray-900 text-lg font-semibold flex items-start gap-2">
                        <span>📍</span>
                        <span>{shop.address}</span>
                      </p>
                    )}
                    <p className="text-gray-700 flex items-center gap-2">
                      <span>🏙️</span>
                      <span>{shop.city}, {shop.state} {shop.zip_code}</span>
                    </p>
                    {shop.phone && (
                      <p className="text-gray-700 flex items-center gap-2">
                        <span>📞</span>
                        <a href={`tel:${shop.phone}`} className="hover:text-purple-600 transition">
                          {shop.phone}
                        </a>
                      </p>
                    )}
                    {shop.email && (
                      <p className="text-gray-700 flex items-center gap-2">
                        <span>✉️</span>
                        <a href={`mailto:${shop.email}`} className="hover:text-purple-600 transition">
                          {shop.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Directions Button */}
                {(shop.latitude && shop.longitude) && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all hover:scale-105"
                  >
                    <span>🗺️</span> Get Directions
                  </a>
                )}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                {shop.latitude && shop.longitude ? (
                  <iframe
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d11V8NM7W6RXYY&q=${shop.latitude},${shop.longitude}&zoom=15`}
                  >
                  </iframe>
                ) : (
                  <div className="h-full bg-gray-100 flex items-center justify-center text-gray-500">
                    Map unavailable
                  </div>
                )}
              </div>
            </div>

            {/* Service Area (for mobile groomers) */}
            {shop.is_mobile && shop.service_area && (
              <div className="mt-6 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span>🚐</span> Service Area
                </h3>
                <p className="text-blue-700">
                  This mobile groomer services the following areas. Contact them to confirm availability in your location.
                </p>
                {/* Service area details would be parsed from JSON and displayed here */}
              </div>
            )}
          </div>
            )}
          </>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div id="services-section" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Services</h2>

          {services.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✂️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No services yet</h3>
              <p className="text-gray-600">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 hover:border-purple-300 group"
                  >
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {service.name}
                        </h3>
                        {service.category && (
                          <span className="inline-flex items-center bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-bold shrink-0">
                            {service.category}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-gray-900">Starting at ${service.price}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{durationText}</span>
                      </div>
                      
                      {service.description && (
                        <div className="mb-4">
                          <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
                        </div>
                      )}

                      <div className="mb-5">
                        <p className="text-sm font-semibold text-gray-700 mb-2">The following will occur:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Professional grooming service</li>
                          <li>• Quality products used</li>
                          <li>• Experienced groomer</li>
                          <li>• {durationText} appointment</li>
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookService(service.id)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all hover:from-red-600 hover:to-red-700"
                    >
                      Request
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}



