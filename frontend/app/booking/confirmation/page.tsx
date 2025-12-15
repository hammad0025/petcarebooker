'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Calendar, MapPin, Phone, Mail, Dog, Clock } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';

interface BookingDetails {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pet_name: string;
  pet_type: string;
  pet_breed?: string;
  appointment_date: string;
  status: string;
  service: {
    name: string;
    price: number;
    duration_minutes: number;
  };
  shop: {
    business_name: string;
    slug: string;
    address?: string;
    city?: string;
    state?: string;
    phone?: string;
  };
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('id');
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookingId) {
      loadBooking();
    } else {
      // If no booking ID, check if we have booking data in sessionStorage
      const bookingData = sessionStorage.getItem('lastBooking');
      if (bookingData) {
        setBooking(JSON.parse(bookingData));
        setLoading(false);
        sessionStorage.removeItem('lastBooking');
      } else {
        setError('No booking found');
        setLoading(false);
      }
    }
  }, [bookingId]);

  const loadBooking = async () => {
    try {
      const token = localStorage.getItem('customerToken');
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        headers: token ? {
          'Authorization': `Bearer ${token}`,
        } : {},
      });

      if (!response.ok) {
        throw new Error('Failed to load booking details');
      }

      const data = await response.json();
      setBooking(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load booking');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const isLoggedIn = !!localStorage.getItem('customerToken');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to load booking details'}</p>
          <Link
            href="/browse"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
          >
            Browse Groomers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700">
            🐾 PetCareBooker
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Booking Confirmed! 🎉</h1>
          <p className="text-xl text-gray-600">
            Your appointment has been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
          
          <div className="space-y-6">
            {/* Service Info */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Dog className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.service.name}</h3>
                <p className="text-gray-600">${booking.service.price} • {booking.service.duration_minutes} minutes</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Date & Time</h3>
                <p className="text-gray-600">{formatDate(booking.appointment_date)}</p>
                <p className="text-gray-600 font-semibold">{formatTime(booking.appointment_date)}</p>
              </div>
            </div>

            {/* Pet Info */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Dog className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Pet</h3>
                <p className="text-gray-600 capitalize">{booking.pet_name} • {booking.pet_type}</p>
                {booking.pet_breed && (
                  <p className="text-gray-500 text-sm">{booking.pet_breed}</p>
                )}
              </div>
            </div>

            {/* Groomer Info */}
            {booking.shop && (
              <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.shop.business_name}</h3>
                  {booking.shop.address && (
                    <p className="text-gray-600">{booking.shop.address}</p>
                  )}
                  {(booking.shop.city || booking.shop.state) && (
                    <p className="text-gray-600">
                      {booking.shop.city}{booking.shop.city && booking.shop.state ? ', ' : ''}{booking.shop.state}
                    </p>
                  )}
                  {booking.shop.phone && (
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4" />
                      {booking.shop.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Customer Contact */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Contact Information</h3>
                <p className="text-gray-600">{booking.customer_name}</p>
                <p className="text-gray-600">{booking.customer_email}</p>
                <p className="text-gray-600">{booking.customer_phone}</p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          {isLoggedIn ? (
            <Link
              href="/customer/dashboard"
              className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold text-center hover:bg-purple-700 transition shadow-lg"
            >
              View My Bookings
            </Link>
          ) : (
            <Link
              href="/customer/register"
              className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold text-center hover:bg-purple-700 transition shadow-lg"
            >
              Create Account to Track Bookings
            </Link>
          )}
          <Link
            href="/browse"
            className="bg-white text-purple-600 px-6 py-4 rounded-xl font-bold text-center border-2 border-purple-600 hover:bg-purple-50 transition shadow-lg"
          >
            Book Another Appointment
          </Link>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">What's Next?</h3>
              <p className="text-blue-800 text-sm">
                You'll receive a confirmation email shortly. If you need to modify or cancel your appointment, 
                {isLoggedIn ? ' visit your dashboard' : ' contact the groomer directly'}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

