'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { shopsApi, servicesApi } from '@/lib/api';
import { 
  Star, MapPin, Clock, Phone, Mail, Share2, Bookmark, 
  MessageCircle, Calendar, CheckCircle2, Sparkles, 
  Scissors, Heart, Award, Camera
} from 'lucide-react';

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
  logo_url?: string;
  cover_image_url?: string;
}

export default function ShopPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'gallery'>('about');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    loadShop();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Shop not found</div>
      </div>
    );
  }

  // Mock data for gallery and reviews (replace with real data later)
  const galleryPhotos = [
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
  ];

  const reviews = [
    { name: 'Sarah M.', rating: 5, text: 'Amazing service! My dog looks fantastic.', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'John D.', rating: 5, text: 'Professional and friendly staff.', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Emily R.', rating: 4, text: 'Great experience, will definitely return.', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
          style={{
            backgroundImage: shop.cover_image_url 
              ? `url(${shop.cover_image_url})` 
              : 'linear-gradient(135deg, #6B46C1 0%, #EC4899 50%, #F97316 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Logo Overlay */}
        <div className="absolute bottom-0 left-6 md:left-12 transform translate-y-1/2">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-xl border-4 border-white flex items-center justify-center overflow-hidden">
            {shop.logo_url ? (
              <img src={shop.logo_url} alt={shop.business_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <Scissors className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div className={`sticky top-0 z-40 bg-white border-b border-gray-200 transition-all ${isSticky ? 'shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-6">
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
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
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
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`pb-2 font-semibold text-sm transition-colors relative ${
                  activeTab === 'gallery' 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Gallery
                {activeTab === 'gallery' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
              </button>
            </div>
            
            <button
              onClick={() => services.length > 0 && handleBookService(services[0].id)}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left Column - Main Content */}
          <div className="space-y-4">
            {/* Quick Stats Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold text-gray-900 ml-1">4.9</span>
                  </div>
                  <span className="text-sm text-gray-600">(22 reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">5 years in business</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Verified</span>
                </div>
                {shop.is_mobile && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Mobile Service</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <>
                {/* Description */}
                {shop.description && (
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                    <p className="text-gray-700 leading-relaxed">{shop.description}</p>
                  </div>
                )}

                {/* Reviews Section */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
                    <button className="text-sm text-purple-600 font-semibold hover:text-purple-700">
                      See all 22 reviews
                    </button>
                  </div>
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{review.name}</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{review.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location & Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Map */}
                  {shop.latitude && shop.longitude && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <iframe
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d11V8NM7W6RXYY&q=${shop.latitude},${shop.longitude}&zoom=15`}
                      ></iframe>
                      <div className="p-4">
                        <div className="flex items-start gap-2 mb-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{shop.address}</p>
                            <p className="text-sm text-gray-600">{shop.city}, {shop.state} {shop.zip_code}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {shop.phone && (
                            <a
                              href={`tel:${shop.phone}`}
                              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                              Call
                            </a>
                          )}
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <MapPin className="w-4 h-4" />
                            Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Business Hours */}
                  <div className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      Business Hours
                    </h3>
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
                        <div key={item.day} className="flex justify-between text-sm py-1">
                          <span className="text-gray-700">{item.day}</span>
                          <span className="font-semibold text-gray-900">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'services' && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
                {services.length === 0 ? (
                  <div className="text-center py-12">
                    <Scissors className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No services available</h3>
                    <p className="text-gray-600">Check back soon!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleBookService(service.id)}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base font-semibold text-gray-900">{service.name}</h3>
                                {service.category && (
                                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                                    {service.category}
                                  </span>
                                )}
                              </div>
                              {service.description && (
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.description}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {durationText}
                              </span>
                              <span className="font-bold text-gray-900">${service.price}</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookService(service.id);
                              }}
                              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all text-sm"
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

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryPhotos.map((photo, index) => (
                    <div 
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <img 
                        src={photo} 
                        alt={`Gallery photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book an Appointment</h3>
              
              {services.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {services.slice(0, 3).map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleBookService(service.id)}
                        className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                      >
                        <div className="font-semibold text-gray-900 text-sm mb-1">{service.name}</div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>${service.price}</span>
                          <span>{Math.floor(service.duration_minutes / 60)}h {service.duration_minutes % 60}min</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleBookService(services[0].id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg"
                  >
                    Book Now
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No services available</p>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                {shop.phone && (
                  <a
                    href={`tel:${shop.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {shop.phone}
                  </a>
                )}
                {shop.email && (
                  <a
                    href={`mailto:${shop.email}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {shop.email}
                  </a>
                )}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
