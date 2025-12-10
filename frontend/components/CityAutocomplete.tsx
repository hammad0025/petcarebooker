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
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="City or ZIP code"
          className="w-full px-4 py-3 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-gray-900"
          autoComplete="off"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      {isOpen && searchTerm && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="font-medium text-gray-900 text-sm">{city.name}, {city.state}</div>
            </button>
          ))}
        </div>
      )}

    </div>
  );
}

