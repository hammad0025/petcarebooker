'use client';

import { useState, useEffect, useRef } from 'react';

const COMMON_SERVICES = [
  'Dog Grooming',
  'Cat Grooming',
  'Dog Bath',
  'Cat Bath',
  'Nail Trim',
  'Teeth Cleaning',
  'Ear Cleaning',
  'De-Shedding Treatment',
  'Flea & Tick Treatment',
  'Mobile Pet Grooming',
  'Puppy Grooming',
  'Senior Pet Grooming',
  'Full Grooming Package',
  'Express Grooming',
  'Breed-Specific Grooming',
];

interface ServiceAutocompleteProps {
  value?: string;
  onChange?: (service: string) => void;
  placeholder?: string;
}

export default function ServiceAutocomplete({ 
  value = '', 
  onChange,
  placeholder = 'What service do you need?' 
}: ServiceAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
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

  const filteredServices = COMMON_SERVICES.filter(service =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (service: string) => {
    setSelectedService(service);
    setSearchTerm(service);
    setIsOpen(false);
    onChange?.(service);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-gray-900"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && filteredServices.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
          {filteredServices.map((service) => (
            <button
              key={service}
              onClick={() => handleSelect(service)}
              className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors text-sm text-gray-900 border-b border-gray-100 last:border-0"
            >
              <span className="font-medium">{service}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

