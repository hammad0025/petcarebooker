'use client';

import { useState, useRef, useEffect } from 'react';

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

export default function CityAutocomplete() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${city.name}, ${city.state}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city: City) => {
    setSelectedCity(city);
    setSearchTerm(`${city.name}, ${city.state}`);
    setIsOpen(false);
  };

  const displayValue = selectedCity 
    ? `${selectedCity.name}, ${selectedCity.state}` 
    : searchTerm;

  return (
    <div className="relative w-full min-w-0" ref={wrapperRef}>
      <input
        type="text"
        value={displayValue}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="📍 Location"
        className="w-full min-w-0 px-4 sm:px-6 py-3 sm:py-5 text-base sm:text-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 pr-10 sm:pr-12"
        autoComplete="off"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
        🔍
      </div>

      {isOpen && searchTerm && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSelect(city)}
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
  );
}

