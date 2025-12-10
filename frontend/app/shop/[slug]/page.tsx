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
  const [activeTab, setActiveTab] = useState<'about' | 'services'>('about');

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
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Shop not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vagaro-Style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-start gap-4">
            {/* Business Logo/Image */}
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-5xl shrink-0 shadow-md">
              🐕
            </div>
            
            {/* Business Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{shop.business_name}</h1>
              <p className="text-sm text-gray-600 mb-3">{shop.city}, {shop.state}</p>
              
              <button
                onClick={() => setActiveTab('services')}
                className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition-colors text-sm"
              >
                Book Now
              </button>
            </div>

            {/* Share Button */}
            <button className="text-gray-600 hover:text-gray-900 flex items-center gap-2 text-xs font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>

          {/* Tabs - Vagaro Style */}
          <div className="flex gap-6 mt-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-2 font-semibold text-sm transition-colors relative ${
                activeTab === 'about' 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              About
              {activeTab === 'about' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-2 font-semibold text-sm transition-colors relative ${
                activeTab === 'services' 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Services
              {activeTab === 'services' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {activeTab === 'about' && (
          <div className="space-y-4">
            {/* Reviews Section - Vagaro Style */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-1">4.9</div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <Link href="#" className="text-sm text-blue-600 hover:underline">22 Reviews</Link>
                </div>

                <div className="flex-1 space-y-2">
                  {[
                    { label: 'Overall', rating: 4.9 },
                    { label: 'Punctuality', rating: 5.0 },
                    { label: 'Value', rating: 4.8 },
                    { label: 'Service', rating: 5.0 }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className="text-sm text-gray-700 w-24 text-right">{item.label}</span>
                      <div className="flex-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <button className="w-full border border-gray-300 px-6 py-2 rounded text-sm font-semibold hover:bg-gray-50 transition-colors">
                    📌 Bookmark
                  </button>
                  <button className="w-full border border-gray-300 px-6 py-2 rounded text-sm font-semibold hover:bg-gray-50 transition-colors">
                    ✍️ Write a review
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            {shop.description && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{shop.description}</p>
              </div>
            )}

            {/* Map & Business Hours - Vagaro Style */}
            <div className="grid md:grid-cols-[1fr_350px] gap-4">
              {/* Map */}
              {shop.latitude && shop.longitude && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <iframe
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d11V8NM7W6RXYY&q=${shop.latitude},${shop.longitude}&zoom=15`}
                  ></iframe>
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{shop.address}</p>
                    <p className="text-sm text-gray-600 mb-3">{shop.city}, {shop.state} {shop.zip_code}</p>
                    <div className="flex gap-3">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gray-100 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-200 transition-colors"
                      >
                        💬 Message
                      </a>
                      {shop.phone && (
                        <a
                          href={`tel:${shop.phone}`}
                          className="flex-1 text-center bg-gray-100 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-200 transition-colors"
                        >
                          📞 Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Business Hours */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-bold text-gray-900 mb-3">Business Hours</h3>
                <div className="space-y-2">
                  {[
                    { day: 'Sunday', hours: '9:00 AM - 5:30 PM' },
                    { day: 'Monday', hours: '8:30 AM - 5:30 PM' },
                    { day: 'Tuesday', hours: '8:20 AM - 5:30 PM' },
                    { day: 'Wednesday', hours: '8:20 AM - 5:30 PM' },
                    { day: 'Thursday', hours: '8:20 AM - 5:30 PM' },
                    { day: 'Friday', hours: '8:20 AM - 5:30 PM' },
                    { day: 'Saturday', hours: '8:20 AM - 5:30 PM' }
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.day}</span>
                      <span className="font-semibold text-gray-900">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Services</h2>

            {services.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">✂️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-600">Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {services.map((service) => {
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
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-bold text-gray-900">{service.name}</h3>
                            {service.category && (
                              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">
                                {service.category}
                              </span>
                            )}
                          </div>
                          
                          {service.description && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{service.description}</p>
                          )}

                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">⏱ {durationText}</span>
                            <span className="font-bold text-gray-900">${service.price}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleBookService(service.id)}
                          className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
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
        )}
      </div>
    </div>
  );
}
