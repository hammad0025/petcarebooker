'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { bookingsApi } from '@/lib/api';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });

interface Booking {
  id: number;
  customer_name: string;
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  appointment_date: string;
  duration_minutes: number;
  status: string;
  service: {
    name: string;
    price: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadBookings(token);
  }, []);

  const loadBookings = async (token: string) => {
    try {
      const data = await bookingsApi.getMyBookings(token);
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId: number, status: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await bookingsApi.update(bookingId, { status }, token);
      loadBookings(token);
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">PetCareBooker</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/dashboard/services')}
              className="px-4 py-2 text-gray-700 hover:text-purple-600"
            >
              Services
            </button>
            <button
              onClick={() => router.push('/dashboard/hours')}
              className="px-4 py-2 text-gray-700 hover:text-purple-600 font-semibold"
            >
              ⏰ Hours
            </button>
            <button
              onClick={() => router.push('/dashboard/settings')}
              className="px-4 py-2 text-gray-700 hover:text-purple-600"
            >
              Settings
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="px-4 py-2 text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Calendar</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg ${view === 'calendar' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              📅 Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg ${view === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              📋 List
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Share your shop link to start receiving bookings!</p>
            <button
              onClick={() => router.push('/dashboard/services')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Add Your Services
            </button>
          </div>
        ) : (
          <>
            {view === 'calendar' ? (
              <Calendar
                bookings={bookings}
                onSelectEvent={(event) => setSelectedBooking(event.resource)}
              />
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.customer_name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          🐕 {booking.pet_name} • {booking.pet_breed} {booking.pet_type}
                        </p>
                        <p className="text-gray-600 mb-2">
                          📋 {booking.service.name} • ${booking.service.price}
                        </p>
                        <p className="text-gray-900 font-medium">
                          📅 {new Date(booking.appointment_date).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                              Deny
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'completed')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedBooking(null)}>
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{selectedBooking.customer_name}</h3>
                <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Pet</p>
                  <p className="text-lg font-medium">🐕 {selectedBooking.pet_name} ({selectedBooking.pet_breed} {selectedBooking.pet_type})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="text-lg font-medium">{selectedBooking.service.name} - ${selectedBooking.service.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Appointment</p>
                  <p className="text-lg font-medium">{new Date(selectedBooking.appointment_date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'confirmed');
                        setSelectedBooking(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'cancelled');
                        setSelectedBooking(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    >
                      Deny
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedBooking.id, 'completed');
                      setSelectedBooking(null);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

