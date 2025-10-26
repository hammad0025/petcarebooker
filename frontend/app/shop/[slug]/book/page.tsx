'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { shopsApi, servicesApi, bookingsApi } from '@/lib/api';

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
        `http://localhost:8000/api/shops/${slug}/available-slots?service_id=${serviceId}&date=${selectedDate}`
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <div className="bg-purple-50 rounded-lg p-4 mb-8">
            <h3 className="font-bold text-gray-900">{service.name}</h3>
            <p className="text-gray-600">${service.price} • {service.duration_minutes} minutes</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time Selection */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Choose Date & Time</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedSlot(null);
                  }}
                  min={minDate}
                  max={maxDate}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900 text-lg"
                />
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Available Times {loadingSlots && '(Loading...)'}
                  </label>
                  
                  {!loadingSlots && slots.length === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      No available slots for this date. Please choose another date.
                    </div>
                  )}

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {slots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => slot.available && setSelectedSlot(slot)}
                        className={`
                          px-4 py-3 rounded-lg font-semibold text-sm transition-all
                          ${slot.available 
                            ? (selectedSlot === slot
                                ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                                : 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100'
                              )
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          }
                        `}
                      >
                        {formatTime(slot.start_time)}
                      </button>
                    ))}
                  </div>
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
