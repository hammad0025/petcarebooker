'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { shopsApi } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';

interface DayHours {
  open: string;
  close: string;
  is_closed: boolean;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
};

export default function BusinessHoursPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hours, setHours] = useState<Record<string, DayHours>>({
    monday: { open: '09:00', close: '17:00', is_closed: false },
    tuesday: { open: '09:00', close: '17:00', is_closed: false },
    wednesday: { open: '09:00', close: '17:00', is_closed: false },
    thursday: { open: '09:00', close: '17:00', is_closed: false },
    friday: { open: '09:00', close: '17:00', is_closed: false },
    saturday: { open: '10:00', close: '15:00', is_closed: false },
    sunday: { open: '10:00', close: '15:00', is_closed: true }
  });
  const [autoApprove, setAutoApprove] = useState(true);
  const [bufferMinutes, setBufferMinutes] = useState(15);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    loadShopData(token);
  }, []);

  const loadShopData = async (token: string) => {
    try {
      const shop = await shopsApi.getMyProfile(token);
      
      if (shop.business_hours) {
        try {
          const parsedHours = JSON.parse(shop.business_hours);
          setHours(parsedHours);
        } catch (e) {
          console.error('Failed to parse business hours');
        }
      }
      
      // Note: These fields might not be in the response yet, handle gracefully
      if (shop.auto_approve_bookings !== undefined) {
        setAutoApprove(shop.auto_approve_bookings);
      }
      if (shop.booking_buffer_minutes !== undefined) {
        setBufferMinutes(shop.booking_buffer_minutes);
      }
    } catch (error) {
      console.error('Failed to load shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(`${API_BASE_URL}/api/shops/me/hours`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...hours,
          auto_approve_bookings: autoApprove,
          booking_buffer_minutes: bufferMinutes
        })
      });
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({ detail: 'Failed to save business hours' }));
        throw new Error(data.detail || 'Failed to save business hours');
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Failed to save hours:', err);
      setError(err.message || 'Failed to save business hours');
    } finally {
      setSaving(false);
    }
  };

  const updateDayHours = (day: string, field: keyof DayHours, value: string | boolean) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading business hours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">PetCareBooker</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-600 hover:text-purple-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Business Hours</h2>
          <p className="text-gray-600 mb-4">Set your availability for customer bookings</p>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              Business hours saved successfully!
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Booking Settings */}
          <div className="mb-4 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoApprove"
                  checked={autoApprove}
                  onChange={(e) => setAutoApprove(e.target.checked)}
                  className="w-5 h-5 text-purple-600"
                />
                <label htmlFor="autoApprove" className="ml-3 text-gray-900 font-semibold">
                  Auto-approve bookings (Recommended for Booksy-style instant booking)
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Buffer time between appointments (minutes)
                </label>
                <input
                  type="number"
                  value={bufferMinutes}
                  onChange={(e) => setBufferMinutes(parseInt(e.target.value) || 0)}
                  min="0"
                  max="60"
                  step="5"
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
                <p className="text-sm text-gray-600 mt-1">Time between appointments for cleanup/prep</p>
              </div>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="space-y-3">
            {DAYS.map(day => (
              <div key={day} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-32">
                  <label className="font-bold text-gray-900">{DAY_LABELS[day]}</label>
                </div>

                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={!hours[day].is_closed}
                    onChange={(e) => updateDayHours(day, 'is_closed', !e.target.checked)}
                    className="w-5 h-5 text-purple-600"
                  />
                  
                  {!hours[day].is_closed ? (
                    <>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Open</label>
                        <input
                          type="time"
                          value={hours[day].open}
                          onChange={(e) => updateDayHours(day, 'open', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                        />
                      </div>
                      <span className="text-gray-600">to</span>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Close</label>
                        <input
                          type="time"
                          value={hours[day].close}
                          onChange={(e) => updateDayHours(day, 'close', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                        />
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">Closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 text-white py-2.5 rounded-lg font-semibold hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Hours'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



