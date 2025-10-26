'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { shopsApi } from '@/lib/api';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="bg-white border-b-2 border-purple-200 shadow-md">
        <div className="container mx-auto px-4 py-5">
          <Link href="/" className="text-3xl font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-2">
            🐾 PetCareBooker
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">Find Your Perfect Groomer 🐕✨</h1>
          <p className="text-2xl text-gray-600">Browse trusted pet groomers in your area</p>
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
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 block border-2 border-purple-100 hover:border-purple-300 hover:scale-105 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    {shop.logo_url ? (
                      <img src={shop.logo_url} alt={shop.business_name} className="w-full h-full rounded-full" />
                    ) : (
                      '🐕'
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{shop.business_name}</h3>
                    <p className="text-purple-600 font-semibold">📍 {shop.city}, {shop.state}</p>
                  </div>
                </div>
                {shop.description && (
                  <p className="text-gray-600 line-clamp-2 mb-4 text-lg">{shop.description}</p>
                )}
                <div className="text-purple-600 font-bold text-lg flex items-center gap-2 group-hover:gap-4 transition-all">
                  View Profile <span className="text-xl">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
