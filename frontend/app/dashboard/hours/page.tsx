'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { shopsApi } from '@/lib/api';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'http://localhost:8000' 
  : 'https://petcarebooker.onrender.com';

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
    try {
      await fetch(`${API_BASE_URL}/api/shops/me/hours`, {
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
      
      alert('Business hours saved successfully!');
    } catch (error) {
      console.error('Failed to save hours:', error);
      alert('Failed to save business hours');
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
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Hours</h2>
          <p className="text-gray-600 mb-8">Set your availability for customer bookings</p>

          {/* Booking Settings */}
          <div className="mb-8 p-6 bg-purple-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Settings</h3>
            
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
          <div className="space-y-4">
            {DAYS.map(day => (
              <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Hours'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

