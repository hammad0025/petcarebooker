'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { shopsApi } from '@/lib/api';
import Footer from '@/components/Footer';

interface Shop {
  id: number;
  business_name: string;
  slug: string;
  description: string;
  city: string;
  state: string;
  logo_url?: string;
}

interface City {
  name: string;
  state: string;
  slug: string;
}

const POPULAR_CITIES: City[] = [
  { name: 'West Palm Beach', state: 'FL', slug: 'west-palm-beach' },
  { name: 'Miami', state: 'FL', slug: 'miami' },
  { name: 'Tampa', state: 'FL', slug: 'tampa' },
  { name: 'Orlando', state: 'FL', slug: 'orlando' },
  { name: 'Fort Lauderdale', state: 'FL', slug: 'fort-lauderdale' },
  { name: 'New York City', state: 'NY', slug: 'new-york-city' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles' },
  { name: 'Chicago', state: 'IL', slug: 'chicago' },
  { name: 'Houston', state: 'TX', slug: 'houston' },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix' },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia' },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio' },
  { name: 'San Diego', state: 'CA', slug: 'san-diego' },
  { name: 'Dallas', state: 'TX', slug: 'dallas' },
  { name: 'San Jose', state: 'CA', slug: 'san-jose' },
];

const SERVICE_TYPES = [
  'All Services',
  'Dog Grooming',
  'Cat Grooming',
  'Mobile Grooming',
  'Spa Services',
  'Nail Trimming',
  'Bath & Brush',
];

export default function BrowsePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [citySearch, setCitySearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedService, setSelectedService] = useState('All Services');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cityWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadShops();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityWrapperRef.current && !cityWrapperRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const filteredCities = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    city.state.toLowerCase().includes(citySearch.toLowerCase()) ||
    `${city.name}, ${city.state}`.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCitySearch(`${city.name}, ${city.state}`);
    setIsCityDropdownOpen(false);
  };

  const filteredShops = shops.filter(shop => {
    // Filter by city if selected
    const cityMatch = !selectedCity || 
      (shop.city?.toLowerCase() === selectedCity.name.toLowerCase() && 
       shop.state?.toLowerCase() === selectedCity.state.toLowerCase());
    
    // Service filter would need backend support, for now just return all
    const serviceMatch = selectedService === 'All Services';
    
    return cityMatch && serviceMatch;
  });

  // Popular cities for SEO - static content Google can see
  const popularCities = [
    { name: 'Miami', slug: 'miami', state: 'FL' },
    { name: 'Tampa', slug: 'tampa', state: 'FL' },
    { name: 'Orlando', slug: 'orlando', state: 'FL' },
    { name: 'Fort Lauderdale', slug: 'fort-lauderdale', state: 'FL' },
    { name: 'New York City', slug: 'new-york-city', state: 'NY' },
    { name: 'Los Angeles', slug: 'los-angeles', state: 'CA' },
    { name: 'Chicago', slug: 'chicago', state: 'IL' },
    { name: 'West Palm Beach', slug: 'west-palm-beach', state: 'FL' },
  ];

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
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">Find Pet Groomers Near You 🐕✨</h1>
          <p className="text-2xl text-gray-700 mb-6">Browse trusted pet groomers in your area. Compare prices, read reviews, and book instantly with verified professionals.</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Search for <strong>pet grooming near me</strong>, <strong>dog groomers near me</strong>, or <strong>cat grooming</strong> services. Find <strong>mobile pet grooming</strong> that comes to your home or traditional grooming salons. All groomers are verified professionals with real-time availability.
          </p>
        </div>

        {/* Search Section - Moved above cities for better UX */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-2 border-purple-200">
            {/* City Autocomplete */}
            <div className="flex-1 min-w-0 relative" ref={cityWrapperRef}>
              <input
                type="text"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setSelectedCity(null);
                  setIsCityDropdownOpen(true);
                }}
                onFocus={() => setIsCityDropdownOpen(true)}
                placeholder="📍 Enter your city..."
                className="w-full px-6 py-4 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-500 border border-gray-200"
                autoComplete="off"
              />
              
              {/* City Dropdown */}
              {isCityDropdownOpen && citySearch && filteredCities.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-purple-300 max-h-96 overflow-y-auto">
                  {filteredCities.map((city, index) => (
                    <button
                      key={index}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-6 py-4 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="text-2xl">📍</div>
                      <div>
                        <div className="font-semibold text-gray-900">{city.name}</div>
                        <div className="text-sm text-gray-600">{city.state}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Type Dropdown */}
            <select 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-6 py-4 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700 border border-gray-200 min-w-0 sm:w-64"
            >
              {SERVICE_TYPES.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>

            {/* Search Button */}
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg hover:scale-105 text-lg whitespace-nowrap">
              Search 🔍
            </button>
          </div>
          
          {/* Active Filters Display */}
          {selectedCity && (
            <div className="mt-4 flex gap-2 flex-wrap">
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                📍 {selectedCity.name}, {selectedCity.state}
                <button 
                  onClick={() => {
                    setSelectedCity(null);
                    setCitySearch('');
                  }}
                  className="hover:bg-purple-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Popular Cities Section - Static content for SEO */}
        <section className="mb-12 bg-white rounded-3xl shadow-xl p-8 border-2 border-purple-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Browse Pet Groomers by City</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Find verified pet groomers in major cities across the US. Click any city to see groomers, compare prices, and book instantly.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularCities.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all border-2 border-purple-100 hover:border-purple-300"
              >
                <div className="text-3xl mb-2">📍</div>
                <div className="font-bold text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-600">{city.state}</div>
                <div className="text-xs text-purple-600 mt-2 font-semibold">View Groomers →</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Dynamic Shops Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Pet Groomers</h2>
          {loading ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-bounce">🐾</div>
              <div className="text-2xl text-gray-600 font-semibold">Loading groomers...</div>
            </div>
          ) : filteredShops.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto border-2 border-purple-100">
              <div className="text-7xl mb-6">🐶</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No groomers found</h3>
              <p className="text-gray-600 text-xl mb-6">Try adjusting your search or browse by city above!</p>
              <Link 
                href="/"
                className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-700 transition"
              >
                Return to Homepage
              </Link>
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
        </section>

        {/* SEO Content Section - Static content for Google */}
        <section className="mt-16 bg-white rounded-3xl shadow-xl p-8 border-2 border-purple-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How to Find Pet Groomers Near You</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Search by Location</h3>
              <p className="text-gray-600">Use our search bar to find <strong>pet grooming near me</strong> or browse by city. We have verified groomers in 100+ cities nationwide.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compare Reviews</h3>
              <p className="text-gray-600">Read verified reviews from real pet parents. All groomers on PetCareBooker are verified professionals with proper licenses.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book Instantly</h3>
              <p className="text-gray-600">See real-time availability and book appointments instantly. No phone calls needed - book <strong>pet grooming online</strong> in seconds.</p>
            </div>
          </div>
        </section>

        {/* Service Types Section - More SEO content */}
        <section className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Pet Grooming Services Available</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-3xl">🐕</span> Dog Grooming
              </h3>
              <p className="text-gray-600">Professional <strong>dog grooming</strong> services including bath, haircut, nail trimming, ear cleaning, and more. Find <strong>dog groomers near me</strong> with instant booking.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-3xl">🐈</span> Cat Grooming
              </h3>
              <p className="text-gray-600">Expert <strong>cat grooming</strong> with gentle handling for anxious felines. Specialized services for long-haired breeds. Find <strong>cat grooming near me</strong>.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-3xl">🚐</span> Mobile Pet Grooming
              </h3>
              <p className="text-gray-600"><strong>Mobile pet grooming</strong> services that come to your home. Perfect for anxious pets, busy schedules, or multi-pet households. Book <strong>mobile grooming</strong> online.</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-3xl">✨</span> Luxury Spa Services
              </h3>
              <p className="text-gray-600">Premium pet spa treatments including de-shedding, teeth brushing, paw pad conditioning, and aromatherapy. Pamper your pet with luxury grooming.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
