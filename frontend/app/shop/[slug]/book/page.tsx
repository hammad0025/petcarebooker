'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { shopsApi, servicesApi, bookingsApi } from '@/lib/api';
import HorizontalDatePicker from '@/components/HorizontalDatePicker';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';

interface Service {
  id: number;
  name: string;
  price: number;
  duration_minutes: number;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
  available: boolean;
}

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const slug = params.slug as string;
  const serviceId = searchParams.get('service');
  
  const [service, setService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [customerProfile, setCustomerProfile] = useState<{name: string; email: string; phone: string} | null>(null);
  const [customerPets, setCustomerPets] = useState<Array<{id: number; name: string; pet_type: string; breed?: string; weight?: string}>>([]);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Format phone number to (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormattedPhone(formatted);
    // Update the input value
    e.target.value = formatted;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  useEffect(() => {
    if (serviceId) {
      loadService();
    }
    loadShopInfo();
    checkLoginAndLoadData();
  }, [serviceId, slug]);

  const loadShopInfo = async () => {
    try {
      const shop = await shopsApi.getBySlug(slug);
      setShopInfo({
        business_name: shop.business_name,
        address: shop.address,
        city: shop.city,
        state: shop.state,
        phone: shop.phone,
      });
    } catch (error) {
      console.error('Failed to load shop info:', error);
    }
  };

  const checkLoginAndLoadData = async () => {
    const token = localStorage.getItem('customerToken');
    if (token) {
      setIsLoggedIn(true);
      try {
        // Load customer profile
        const profileResponse = await fetch(`${API_BASE_URL}/api/customer/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          setCustomerProfile(profile);
          setFormattedPhone(formatPhoneNumber(profile.phone || ''));
        }

        // Load customer pets
        const petsResponse = await fetch(`${API_BASE_URL}/api/customer/pets`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (petsResponse.ok) {
          const pets = await petsResponse.json();
          setCustomerPets(pets);
        }
      } catch (error) {
        console.error('Failed to load customer data:', error);
      }
    }
  };

  useEffect(() => {
    if (selectedDate && serviceId) {
      loadAvailableSlots();
    }
  }, [selectedDate, serviceId]);

  const loadService = async () => {
    try {
      const services = await servicesApi.getByShop(slug);
      const found = services.find((s: Service) => s.id === parseInt(serviceId!));
      setService(found || null);
    } catch (error) {
      console.error('Failed to load service:', error);
    }
  };

  const loadAvailableSlots = async () => {
    setLoadingSlots(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/shops/${slug}/available-slots?service_id=${serviceId}&date=${selectedDate}`
      );
      
      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || 'No availability for this date');
        setSlots([]);
        return;
      }
      
      const data = await response.json();
      setSlots(data.slots || []);
      setError('');
    } catch (err) {
      console.error('Failed to load slots:', err);
      setError('Failed to load available times');
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    // Strip phone formatting before sending (remove all non-digits)
    const phoneValue = formData.get('phone') as string;
    const cleanPhone = phoneValue.replace(/\D/g, '');

    const token = localStorage.getItem('customerToken');
    const customerId = token ? parseInt(localStorage.getItem('customerId') || '0') : null;
    
    // If logged in and selected an existing pet, use pet_id
    const selectedPet = selectedPetId ? customerPets.find(p => p.id === selectedPetId) : null;
    
    try {
      const bookingData: any = {
        service_id: parseInt(serviceId!),
        customer_name: formData.get('customerName') as string,
        customer_email: formData.get('email') as string,
        customer_phone: cleanPhone,
        pet_name: selectedPet ? selectedPet.name : (formData.get('petName') as string),
        pet_type: selectedPet ? selectedPet.pet_type : (formData.get('petType') as string),
        pet_breed: selectedPet ? (selectedPet.breed || '') : (formData.get('breed') as string),
        pet_weight: selectedPet ? (selectedPet.weight || '') : (formData.get('weight') as string),
        special_notes: formData.get('notes') as string,
        appointment_date: selectedSlot.start_time,
      };

      // If logged in, include customer_id and pet_id
      if (customerId) {
        bookingData.customer_id = customerId;
      }
      if (selectedPetId) {
        bookingData.pet_id = selectedPetId;
      }

      const bookingResponse = await bookingsApi.create(slug, bookingData);

      // Store booking data for confirmation page (fallback if API doesn't return full data)
      sessionStorage.setItem('lastBooking', JSON.stringify({
        ...bookingResponse,
        service: service ? {
          name: service.name,
          price: service.price,
          duration_minutes: service.duration_minutes,
        } : null,
        shop: shopInfo || {
          business_name: slug,
          slug: slug,
        }
      }));

      // Redirect to confirmation page
      router.push(`/booking/confirmation?id=${bookingResponse.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const filterSlotsByTime = (slots: TimeSlot[]) => {
    if (timeFilter === 'all') return slots;
    
    return slots.filter(slot => {
      const hour = new Date(slot.start_time).getHours();
      
      if (timeFilter === 'morning') {
        return hour >= 6 && hour < 12;
      } else if (timeFilter === 'afternoon') {
        return hour >= 12 && hour < 17;
      } else if (timeFilter === 'evening') {
        return hour >= 17 && hour < 22;
      }
      
      return true;
    });
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Booked!</h2>
          <p className="text-sm text-gray-600 mb-1">
            Your appointment is confirmed for {formatTime(selectedSlot!.start_time)}!
          </p>
          <p className="text-sm text-gray-600">
            Check your email for confirmation details.
          </p>
        </div>
      </div>
    );
  }

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 font-semibold text-sm"
          >
            ← Back
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold text-gray-900">{service.name}</h1>
            <p className="text-xs text-gray-600">${service.price} • {service.duration_minutes}min</p>
          </div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white">{/* Removed extra card wrapper */}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Select Date & Time
              </h3>
              
              {/* Horizontal Date Picker - Booksy Style */}
              <div className="mb-4">
                <HorizontalDatePicker
                  selectedDate={selectedDate}
                  onDateSelect={(date) => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>

              {selectedDate && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  {/* Time Filter Tabs - Booksy Style */}
                  <div className="grid grid-cols-2 md:flex gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setTimeFilter('all')}
                      className={`py-2.5 px-3 md:px-4 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                        timeFilter === 'all' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Day
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimeFilter('morning')}
                      className={`py-2.5 px-3 md:px-4 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                        timeFilter === 'morning' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Morning
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimeFilter('afternoon')}
                      className={`py-2.5 px-3 md:px-4 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                        timeFilter === 'afternoon' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Afternoon
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimeFilter('evening')}
                      className={`py-2.5 px-3 md:px-4 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                        timeFilter === 'evening' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Evening
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">Available Times</h4>
                    {loadingSlots && (
                      <div className="flex items-center gap-2 text-gray-600 text-xs">
                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-600 border-t-transparent"></div>
                        <span>Loading...</span>
                      </div>
                    )}
                  </div>
                  
                  {!loadingSlots && slots.length === 0 && (
                    <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                      <p className="text-gray-600 text-sm">
                        No available times for this date
                      </p>
                    </div>
                  )}

                  {!loadingSlots && slots.length > 0 && (() => {
                    const filteredSlots = filterSlotsByTime(slots);
                    
                    if (filteredSlots.length === 0) {
                      return (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-gray-600 text-sm">
                            No available times for this time period
                          </p>
                        </div>
                      );
                    }
                    
                    return (
                    <>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mb-3">
                        {filteredSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedSlot(slot)}
                            className={`
                              relative px-2 py-2.5 rounded-lg font-semibold text-xs transition-all
                              ${slot.available 
                                ? (selectedSlot === slot
                                    ? 'bg-red-600 text-white shadow-sm'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600')
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }
                            `}
                          >
                            {formatTime(slot.start_time)}
                            {selectedSlot === slot && (
                              <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg ring-2 ring-purple-600">
                                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      
                      {/* Mini legend */}
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-3 border-t border-purple-200">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 bg-white border-2 border-purple-200 rounded"></div>
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded"></div>
                          <span>Selected</span>
                        </div>
                      </div>
                    </>
                    );
                  })()}
                </div>
              )}
            </div>

            {selectedSlot && (
              <>
                {/* Customer Info */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                    Your Information
                    {isLoggedIn && (
                      <span className="ml-2 text-xs font-normal text-green-600">✓ Logged in</span>
                    )}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        required
                        defaultValue={customerProfile?.name || ''}
                        className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formattedPhone}
                        onChange={handlePhoneChange}
                        placeholder="(555) 123-4567"
                        maxLength={14}
                        className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        defaultValue={customerProfile?.email || ''}
                        onBlur={(e) => validateEmail(e.target.value)}
                        onChange={(e) => {
                          if (emailError) validateEmail(e.target.value);
                        }}
                        className={`w-full px-3 py-3 md:py-2 border rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900 ${
                          emailError ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {emailError && (
                        <p className="text-xs text-red-600 mt-1">{emailError}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pet Info */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">Pet Information</h3>
                  
                  {isLoggedIn && customerPets.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Select from your pets (or add new below)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {customerPets.map((pet) => (
                          <button
                            key={pet.id}
                            type="button"
                            onClick={() => {
                              setSelectedPetId(pet.id);
                              // Pre-fill form fields
                              const petNameInput = document.querySelector('input[name="petName"]') as HTMLInputElement;
                              const petTypeSelect = document.querySelector('select[name="petType"]') as HTMLSelectElement;
                              const breedInput = document.querySelector('input[name="breed"]') as HTMLInputElement;
                              const weightInput = document.querySelector('input[name="weight"]') as HTMLInputElement;
                              
                              if (petNameInput) petNameInput.value = pet.name;
                              if (petTypeSelect) petTypeSelect.value = pet.pet_type;
                              if (breedInput && pet.breed) breedInput.value = pet.breed;
                              if (weightInput && pet.weight) weightInput.value = pet.weight;
                            }}
                            className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition ${
                              selectedPetId === pet.id
                                ? 'border-purple-600 bg-purple-50 text-purple-700'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                            }`}
                          >
                            {pet.name} ({pet.pet_type})
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setSelectedPetId(null)}
                          className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition ${
                            selectedPetId === null
                              ? 'border-purple-600 bg-purple-50 text-purple-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                          }`}
                        >
                          + New Pet
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Pet Name *</label>
                      <input
                        type="text"
                        name="petName"
                        required
                        placeholder="Max"
                        className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Type *</label>
                      <select
                        name="petType"
                        required
                        className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900"
                      >
                        <option value="">Select...</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Breed</label>
                      <input
                        type="text"
                        name="breed"
                        placeholder="Golden Retriever"
                        className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Weight/Size</label>
                      <input
                        type="text"
                        name="weight"
                        placeholder="50 lbs or Large"
                        className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Special Notes</label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Any allergies, behavioral notes, etc."
                        className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base md:text-sm text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 pb-4 -mx-4 px-4 md:static md:border-0 md:pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-4 md:py-3 rounded-lg font-bold hover:bg-red-700 disabled:bg-gray-400 text-base md:text-sm min-h-[44px]"
                  >
                    {loading ? 'Confirming...' : `Confirm Booking for ${formatTime(selectedSlot.start_time)}`}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
