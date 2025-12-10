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
  // Top 200 US cities by population
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
  { name: 'Austin', state: 'TX', slug: 'austin' },
  { name: 'Jacksonville', state: 'FL', slug: 'jacksonville' },
  { name: 'Fort Worth', state: 'TX', slug: 'fort-worth' },
  { name: 'Columbus', state: 'OH', slug: 'columbus' },
  { name: 'Charlotte', state: 'NC', slug: 'charlotte' },
  { name: 'San Francisco', state: 'CA', slug: 'san-francisco' },
  { name: 'Indianapolis', state: 'IN', slug: 'indianapolis' },
  { name: 'Seattle', state: 'WA', slug: 'seattle' },
  { name: 'Denver', state: 'CO', slug: 'denver' },
  { name: 'Washington', state: 'DC', slug: 'washington' },
  { name: 'Boston', state: 'MA', slug: 'boston' },
  { name: 'El Paso', state: 'TX', slug: 'el-paso' },
  { name: 'Nashville', state: 'TN', slug: 'nashville' },
  { name: 'Detroit', state: 'MI', slug: 'detroit' },
  { name: 'Oklahoma City', state: 'OK', slug: 'oklahoma-city' },
  { name: 'Portland', state: 'OR', slug: 'portland' },
  { name: 'Las Vegas', state: 'NV', slug: 'las-vegas' },
  { name: 'Memphis', state: 'TN', slug: 'memphis' },
  { name: 'Louisville', state: 'KY', slug: 'louisville' },
  { name: 'Baltimore', state: 'MD', slug: 'baltimore' },
  { name: 'Milwaukee', state: 'WI', slug: 'milwaukee' },
  { name: 'Albuquerque', state: 'NM', slug: 'albuquerque' },
  { name: 'Tucson', state: 'AZ', slug: 'tucson' },
  { name: 'Fresno', state: 'CA', slug: 'fresno' },
  { name: 'Mesa', state: 'AZ', slug: 'mesa' },
  { name: 'Sacramento', state: 'CA', slug: 'sacramento' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta' },
  { name: 'Kansas City', state: 'MO', slug: 'kansas-city' },
  { name: 'Colorado Springs', state: 'CO', slug: 'colorado-springs' },
  { name: 'Raleigh', state: 'NC', slug: 'raleigh' },
  { name: 'Miami', state: 'FL', slug: 'miami' },
  { name: 'Long Beach', state: 'CA', slug: 'long-beach' },
  { name: 'Virginia Beach', state: 'VA', slug: 'virginia-beach' },
  { name: 'Omaha', state: 'NE', slug: 'omaha' },
  { name: 'Oakland', state: 'CA', slug: 'oakland' },
  { name: 'Minneapolis', state: 'MN', slug: 'minneapolis' },
  { name: 'Tulsa', state: 'OK', slug: 'tulsa' },
  { name: 'Arlington', state: 'TX', slug: 'arlington' },
  { name: 'Tampa', state: 'FL', slug: 'tampa' },
  { name: 'New Orleans', state: 'LA', slug: 'new-orleans' },
  { name: 'Wichita', state: 'KS', slug: 'wichita' },
  { name: 'Cleveland', state: 'OH', slug: 'cleveland' },
  { name: 'Bakersfield', state: 'CA', slug: 'bakersfield' },
  { name: 'Aurora', state: 'CO', slug: 'aurora' },
  { name: 'Anaheim', state: 'CA', slug: 'anaheim' },
  { name: 'Honolulu', state: 'HI', slug: 'honolulu' },
  { name: 'Santa Ana', state: 'CA', slug: 'santa-ana' },
  { name: 'Riverside', state: 'CA', slug: 'riverside' },
  { name: 'Corpus Christi', state: 'TX', slug: 'corpus-christi' },
  { name: 'Lexington', state: 'KY', slug: 'lexington' },
  { name: 'Henderson', state: 'NV', slug: 'henderson' },
  { name: 'Stockton', state: 'CA', slug: 'stockton' },
  { name: 'Saint Paul', state: 'MN', slug: 'saint-paul' },
  { name: 'Cincinnati', state: 'OH', slug: 'cincinnati' },
  { name: 'St. Louis', state: 'MO', slug: 'st-louis' },
  { name: 'Pittsburgh', state: 'PA', slug: 'pittsburgh' },
  { name: 'Greensboro', state: 'NC', slug: 'greensboro' },
  { name: 'Anchorage', state: 'AK', slug: 'anchorage' },
  { name: 'Plano', state: 'TX', slug: 'plano' },
  { name: 'Lincoln', state: 'NE', slug: 'lincoln' },
  { name: 'Orlando', state: 'FL', slug: 'orlando' },
  { name: 'Irvine', state: 'CA', slug: 'irvine' },
  { name: 'Newark', state: 'NJ', slug: 'newark' },
  { name: 'Durham', state: 'NC', slug: 'durham' },
  { name: 'Chula Vista', state: 'CA', slug: 'chula-vista' },
  { name: 'Toledo', state: 'OH', slug: 'toledo' },
  { name: 'Fort Wayne', state: 'IN', slug: 'fort-wayne' },
  { name: 'St. Petersburg', state: 'FL', slug: 'st-petersburg' },
  { name: 'Laredo', state: 'TX', slug: 'laredo' },
  { name: 'Jersey City', state: 'NJ', slug: 'jersey-city' },
  { name: 'Chandler', state: 'AZ', slug: 'chandler' },
  { name: 'Madison', state: 'WI', slug: 'madison' },
  { name: 'Lubbock', state: 'TX', slug: 'lubbock' },
  { name: 'Scottsdale', state: 'AZ', slug: 'scottsdale' },
  { name: 'Reno', state: 'NV', slug: 'reno' },
  { name: 'Buffalo', state: 'NY', slug: 'buffalo' },
  { name: 'Gilbert', state: 'AZ', slug: 'gilbert' },
  { name: 'Glendale', state: 'AZ', slug: 'glendale' },
  { name: 'North Las Vegas', state: 'NV', slug: 'north-las-vegas' },
  { name: 'Winston-Salem', state: 'NC', slug: 'winston-salem' },
  { name: 'Chesapeake', state: 'VA', slug: 'chesapeake' },
  { name: 'Norfolk', state: 'VA', slug: 'norfolk' },
  { name: 'Fremont', state: 'CA', slug: 'fremont' },
  { name: 'Garland', state: 'TX', slug: 'garland' },
  { name: 'Irving', state: 'TX', slug: 'irving' },
  { name: 'Hialeah', state: 'FL', slug: 'hialeah' },
  { name: 'Richmond', state: 'VA', slug: 'richmond' },
  { name: 'Boise', state: 'ID', slug: 'boise' },
  { name: 'Spokane', state: 'WA', slug: 'spokane' },
  { name: 'Baton Rouge', state: 'LA', slug: 'baton-rouge' },
  { name: 'Tacoma', state: 'WA', slug: 'tacoma' },
  { name: 'San Bernardino', state: 'CA', slug: 'san-bernardino' },
  { name: 'Modesto', state: 'CA', slug: 'modesto' },
  { name: 'Fontana', state: 'CA', slug: 'fontana' },
  { name: 'Des Moines', state: 'IA', slug: 'des-moines' },
  { name: 'Moreno Valley', state: 'CA', slug: 'moreno-valley' },
  { name: 'Santa Clarita', state: 'CA', slug: 'santa-clarita' },
  { name: 'Fayetteville', state: 'NC', slug: 'fayetteville' },
  { name: 'Birmingham', state: 'AL', slug: 'birmingham' },
  { name: 'Oxnard', state: 'CA', slug: 'oxnard' },
  { name: 'Rochester', state: 'NY', slug: 'rochester' },
  { name: 'Port St. Lucie', state: 'FL', slug: 'port-st-lucie' },
  { name: 'Grand Rapids', state: 'MI', slug: 'grand-rapids' },
  { name: 'Huntsville', state: 'AL', slug: 'huntsville' },
  { name: 'Salt Lake City', state: 'UT', slug: 'salt-lake-city' },
  { name: 'Frisco', state: 'TX', slug: 'frisco' },
  { name: 'Yonkers', state: 'NY', slug: 'yonkers' },
  { name: 'Amarillo', state: 'TX', slug: 'amarillo' },
  { name: 'Glendale', state: 'CA', slug: 'glendale-ca' },
  { name: 'Huntington Beach', state: 'CA', slug: 'huntington-beach' },
  { name: 'McKinney', state: 'TX', slug: 'mckinney' },
  { name: 'Montgomery', state: 'AL', slug: 'montgomery' },
  { name: 'Augusta', state: 'GA', slug: 'augusta' },
  { name: 'Aurora', state: 'IL', slug: 'aurora-il' },
  { name: 'Akron', state: 'OH', slug: 'akron' },
  { name: 'Little Rock', state: 'AR', slug: 'little-rock' },
  { name: 'Tempe', state: 'AZ', slug: 'tempe' },
  { name: 'Columbus', state: 'GA', slug: 'columbus-ga' },
  { name: 'Overland Park', state: 'KS', slug: 'overland-park' },
  { name: 'Grand Prairie', state: 'TX', slug: 'grand-prairie' },
  { name: 'Tallahassee', state: 'FL', slug: 'tallahassee' },
  { name: 'Cape Coral', state: 'FL', slug: 'cape-coral' },
  { name: 'Mobile', state: 'AL', slug: 'mobile' },
  { name: 'Knoxville', state: 'TN', slug: 'knoxville' },
  { name: 'Shreveport', state: 'LA', slug: 'shreveport' },
  { name: 'Worcester', state: 'MA', slug: 'worcester' },
  { name: 'Ontario', state: 'CA', slug: 'ontario' },
  { name: 'Vancouver', state: 'WA', slug: 'vancouver' },
  { name: 'Sioux Falls', state: 'SD', slug: 'sioux-falls' },
  { name: 'Chattanooga', state: 'TN', slug: 'chattanooga' },
  { name: 'Brownsville', state: 'TX', slug: 'brownsville' },
  { name: 'Fort Lauderdale', state: 'FL', slug: 'fort-lauderdale' },
  { name: 'Providence', state: 'RI', slug: 'providence' },
  { name: 'Newport News', state: 'VA', slug: 'newport-news' },
  { name: 'Rancho Cucamonga', state: 'CA', slug: 'rancho-cucamonga' },
  { name: 'Santa Rosa', state: 'CA', slug: 'santa-rosa' },
  { name: 'Peoria', state: 'AZ', slug: 'peoria' },
  { name: 'Oceanside', state: 'CA', slug: 'oceanside' },
  { name: 'Elk Grove', state: 'CA', slug: 'elk-grove' },
  { name: 'Salem', state: 'OR', slug: 'salem' },
  { name: 'Pembroke Pines', state: 'FL', slug: 'pembroke-pines' },
  { name: 'Eugene', state: 'OR', slug: 'eugene' },
  { name: 'Garden Grove', state: 'CA', slug: 'garden-grove' },
  { name: 'Cary', state: 'NC', slug: 'cary' },
  { name: 'Fort Collins', state: 'CO', slug: 'fort-collins' },
  { name: 'Corona', state: 'CA', slug: 'corona' },
  { name: 'Springfield', state: 'MO', slug: 'springfield' },
  { name: 'Jackson', state: 'MS', slug: 'jackson' },
  { name: 'Alexandria', state: 'VA', slug: 'alexandria' },
  { name: 'Hayward', state: 'CA', slug: 'hayward' },
  { name: 'Clarksville', state: 'TN', slug: 'clarksville' },
  { name: 'Lakewood', state: 'CO', slug: 'lakewood' },
  { name: 'Lancaster', state: 'CA', slug: 'lancaster' },
  { name: 'Salinas', state: 'CA', slug: 'salinas' },
  { name: 'Palmdale', state: 'CA', slug: 'palmdale' },
  { name: 'Hollywood', state: 'FL', slug: 'hollywood' },
  { name: 'Sunnyvale', state: 'CA', slug: 'sunnyvale' },
  { name: 'Macon', state: 'GA', slug: 'macon' },
  { name: 'Kansas City', state: 'KS', slug: 'kansas-city-ks' },
  { name: 'Joliet', state: 'IL', slug: 'joliet' },
  { name: 'Paterson', state: 'NJ', slug: 'paterson' },
  { name: 'Naperville', state: 'IL', slug: 'naperville' },
  { name: 'Torrance', state: 'CA', slug: 'torrance' },
  { name: 'Savannah', state: 'GA', slug: 'savannah' },
  { name: 'Bridgeport', state: 'CT', slug: 'bridgeport' },
  { name: 'Mesquite', state: 'TX', slug: 'mesquite' },
  { name: 'Rockford', state: 'IL', slug: 'rockford' },
  { name: 'Killeen', state: 'TX', slug: 'killeen' },
  { name: 'Pomona', state: 'CA', slug: 'pomona' },
  { name: 'Pasadena', state: 'TX', slug: 'pasadena' },
  { name: 'Escondido', state: 'CA', slug: 'escondido' },
  { name: 'Bellevue', state: 'WA', slug: 'bellevue' },
  { name: 'Murfreesboro', state: 'TN', slug: 'murfreesboro' },
  { name: 'West Palm Beach', state: 'FL', slug: 'west-palm-beach' },
  { name: 'Midland', state: 'TX', slug: 'midland' },
  { name: 'Westchester', state: 'NY', slug: 'westchester' },
  { name: 'Westlake', state: 'OH', slug: 'westlake' },
  { name: 'West Valley City', state: 'UT', slug: 'west-valley-city' },
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

        {/* Results Section - Show first when city is selected */}
        {selectedCity ? (
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Pet Groomers in {selectedCity.name}, {selectedCity.state}
              </h2>
              <p className="text-gray-600 text-lg">
                {filteredShops.length} {filteredShops.length === 1 ? 'groomer' : 'groomers'} available
              </p>
            </div>
            {loading ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-bounce">🐾</div>
                <div className="text-2xl text-gray-600 font-semibold">Loading groomers...</div>
              </div>
            ) : filteredShops.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto border-2 border-purple-100">
                <div className="text-7xl mb-6">🐶</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">No groomers found in {selectedCity.name}</h3>
                <p className="text-gray-600 text-xl mb-6">Try selecting a different city or browse all groomers below!</p>
                <button 
                  onClick={() => {
                    setSelectedCity(null);
                    setCitySearch('');
                  }}
                  className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Clear Filter & Browse All
                </button>
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
        ) : null}

        {/* Popular Cities Section - Only show when no city is selected */}
        {!selectedCity && (
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
        )}

        {/* Default All Groomers Section - Only show when no city is selected */}
        {!selectedCity && (
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
        )}

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
