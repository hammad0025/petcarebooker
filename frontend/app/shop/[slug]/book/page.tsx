'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { shopsApi, servicesApi, bookingsApi } from '@/lib/api';
import VisualCalendar from '@/components/VisualCalendar';

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

  useEffect(() => {
    if (serviceId) {
      loadService();
    }
  }, [serviceId]);

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

    try {
      await bookingsApi.create(slug, {
        service_id: parseInt(serviceId!),
        customer_name: formData.get('customerName'),
        customer_email: formData.get('email'),
        customer_phone: formData.get('phone'),
        pet_name: formData.get('petName'),
        pet_type: formData.get('petType'),
        pet_breed: formData.get('breed'),
        pet_weight: formData.get('weight'),
        special_notes: formData.get('notes'),
        appointment_date: selectedSlot.start_time,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push(`/shop/${slug}`);
      }, 2000);
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
        <div className="bg-white rounded-xl shadow-lg p-12 max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booked!</h2>
          <p className="text-gray-600 mb-2">
            Your appointment is confirmed for {formatTime(selectedSlot!.start_time)}!
          </p>
          <p className="text-gray-600">
            Check your email for confirmation details.
          </p>
        </div>
      </div>
    );
  }

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Book Your Appointment 🎉</h1>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8 border-2 border-purple-200">
            <h3 className="font-bold text-gray-900 text-xl">{service.name}</h3>
            <p className="text-gray-700 text-lg">${service.price} • {service.duration_minutes} minutes</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date and Time Selection */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>📅</span> Choose Date & Time
              </h3>
              
              {/* Visual Calendar - Booksy Style */}
              <div className="mb-8">
                <VisualCalendar
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
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Available Times
                    </h4>
                    {loadingSlots && (
                      <div className="flex items-center gap-2 text-purple-600 text-sm">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                        <span>Loading...</span>
                      </div>
                    )}
                  </div>
                  
                  {!loadingSlots && slots.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl">
                      <div className="text-5xl mb-3">🗓️</div>
                      <p className="text-gray-600 font-medium">
                        No available times for this date
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Please choose another date from the calendar
                      </p>
                    </div>
                  )}

                  {!loadingSlots && slots.length > 0 && (
                    <>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4">
                        {slots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedSlot(slot)}
                            className={`
                              relative px-3 py-4 rounded-xl font-bold text-sm transition-all
                              ${slot.available 
                                ? (selectedSlot === slot
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white ring-4 ring-purple-200 scale-105 shadow-lg'
                                    : 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-400 hover:bg-white hover:scale-105 hover:shadow-md')
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
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
                  )}
                </div>
              )}
            </div>

            {selectedSlot && (
              <>
                {/* Customer Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Pet Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pet Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Pet Name *</label>
                      <input
                        type="text"
                        name="petName"
                        required
                        placeholder="Max"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Type *</label>
                      <select
                        name="petType"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      >
                        <option value="">Select...</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Breed</label>
                      <input
                        type="text"
                        name="breed"
                        placeholder="Golden Retriever"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">Weight/Size</label>
                      <input
                        type="text"
                        name="weight"
                        placeholder="50 lbs or Large"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-1">Special Notes</label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Any allergies, behavioral notes, etc."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 text-lg"
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
