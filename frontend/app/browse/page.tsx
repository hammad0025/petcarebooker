'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { shopsApi } from '@/lib/api';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

// Note: Client components can't export metadata directly
// We'll set it via useEffect

interface Shop {
  id: number;
  business_name: string;
  slug: string;
  description: string;
  city: string;
  state: string;
  logo_url?: string;
}

export default function BrowsePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Set metadata for client component
    document.title = 'Find Pet Groomers Near You | PetCareBooker';
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Browse and book trusted pet groomers in your area. Compare prices, read reviews, and book instantly with verified professionals.');
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.petcarebooker.com/browse');
    
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const data = await shopsApi.getAll();
      setShops(data);
    } catch (error) {
      console.error('Failed to load shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredShops = shops.filter(shop =>
    shop.business_name.toLowerCase().includes(search.toLowerCase()) ||
    shop.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-3xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            🐾 PetCareBooker
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">Find Your Perfect Groomer 🐕✨</h1>
          <p className="text-2xl text-gray-700">Browse trusted pet groomers in your area</p>
        </div>

        <div className="mb-12 max-w-3xl mx-auto">
          <div className="relative">
            <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-3xl">🔍</span>
            <input
              type="text"
              placeholder="Search by business name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 border-2 border-purple-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-lg text-gray-900 shadow-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">🐾</div>
            <div className="text-2xl text-gray-600 font-semibold">Loading groomers...</div>
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto border-2 border-purple-100">
            <div className="text-7xl mb-6">🐶</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">No groomers found</h3>
            <p className="text-gray-600 text-xl">Try adjusting your search or check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShops.map((shop) => (
              <Link
                key={shop.id}
                href={`/shop/${shop.slug}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all block border border-gray-200 hover:border-purple-300 hover:-translate-y-1 group overflow-hidden"
              >
                {/* Shop Image/Logo Area */}
                <div className="relative h-48 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center">
                  {shop.logo_url ? (
                    <img src={shop.logo_url} alt={`${shop.business_name} - Pet Groomer in ${shop.city}, ${shop.state}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-8xl">🐕</div>
                  )}
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg flex items-center gap-1">
                    <span className="text-yellow-500 font-bold">★</span>
                    <span className="font-bold text-gray-900">4.9</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    {shop.business_name}
                  </h3>
                  <p className="text-gray-600 font-medium mb-3 flex items-center gap-1">
                    <span>📍</span> {shop.city}, {shop.state}
                  </p>
                  
                  {shop.description && (
                    <p className="text-gray-600 line-clamp-2 mb-4">{shop.description}</p>
                  )}

                  {/* Price Range */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500">Starting at</div>
                      <div className="text-xl font-bold text-gray-900">$45</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Next available</div>
                      <div className="text-sm font-bold text-purple-600">Today 2:00 PM</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-full font-bold text-center group-hover:from-purple-700 group-hover:to-pink-600 transition-all">
                    Book Now →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
