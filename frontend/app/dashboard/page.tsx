'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { bookingsApi } from '@/lib/api';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import { Calendar as CalendarIcon, List, Clock, Settings, LogOut, FileText, Dog, X, CheckCircle2 } from 'lucide-react';

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
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">PetCareBooker</h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/dashboard/services')}
              className="px-3 py-1.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              Services
            </button>
            <button
              onClick={() => router.push('/dashboard/hours')}
              className="px-3 py-1.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Clock className="w-4 h-4" />
              Hours
            </button>
            <button
              onClick={() => router.push('/dashboard/profile')}
              className="px-3 py-1.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4">
        {/* Subscription Status */}
        <div className="mb-4">
          <SubscriptionStatus />
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Calendar</h2>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-all ${
                view === 'calendar' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-all ${
                view === 'list' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-sm text-gray-600 mb-4">Share your shop link to start receiving bookings!</p>
            <button
              onClick={() => router.push('/dashboard/services')}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-md transition-all"
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
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.customer_name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-1.5">
                            <Dog className="w-4 h-4" />
                            {booking.pet_name} • {booking.pet_breed} {booking.pet_type}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4" />
                            {booking.service.name} • ${booking.service.price}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.appointment_date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                            >
                              Deny
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'completed')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
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
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedBooking.customer_name}</h3>
                <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pet</p>
                  <p className="text-base font-medium flex items-center gap-1.5">
                    <Dog className="w-4 h-4" />
                    {selectedBooking.pet_name} ({selectedBooking.pet_breed} {selectedBooking.pet_type})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Service</p>
                  <p className="text-base font-medium flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    {selectedBooking.service.name} - ${selectedBooking.service.price}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Appointment</p>
                  <p className="text-base font-medium flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(selectedBooking.appointment_date).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'confirmed');
                        setSelectedBooking(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'cancelled');
                        setSelectedBooking(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
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
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
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

