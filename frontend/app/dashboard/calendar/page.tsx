'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calendarApi } from '@/lib/api';
import { Calendar as CalendarIcon, CheckCircle2, X, RefreshCw, Link2, Clock } from 'lucide-react';

interface CalendarStatus {
  connected: boolean;
  sync_enabled: boolean;
  calendar_id: string | null;
  last_sync: string | null;
}

export default function CalendarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<CalendarStatus | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadStatus(token);
  }, []);

  const loadStatus = async (token: string) => {
    try {
      setLoading(true);
      const data = await calendarApi.getStatus(token);
      setStatus(data);
    } catch (error: any) {
      console.error('Failed to load calendar status:', error);
      setError('Failed to load calendar status');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setError(null);
      const response = await calendarApi.getAuthorizationUrl(token);
      // Redirect to Google OAuth
      window.location.href = response.authorization_url;
    } catch (error: any) {
      console.error('Failed to get authorization URL:', error);
      setError('Failed to connect to Google Calendar. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!confirm('Are you sure you want to disconnect Google Calendar? This will stop syncing your bookings.')) {
      return;
    }

    try {
      setError(null);
      await calendarApi.disconnect(token);
      setSuccess('Google Calendar disconnected successfully');
      await loadStatus(token);
    } catch (error: any) {
      console.error('Failed to disconnect:', error);
      setError('Failed to disconnect Google Calendar');
    }
  };

  const handleSyncNow = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setSyncing(true);
      setError(null);
      await calendarApi.syncNow(token);
      setSuccess('Calendar synced successfully');
      await loadStatus(token);
    } catch (error: any) {
      console.error('Failed to sync:', error);
      setError('Failed to sync calendar');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Loading calendar settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-3">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-purple-600" />
          Google Calendar Integration
        </h1>
        <p className="text-gray-600 mt-2">
          Sync your bookings with Google Calendar to prevent double-booking and manage your schedule in one place.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <X className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {status?.connected ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Google Calendar Connected</h2>
                  <p className="text-sm text-gray-600">Your bookings are syncing with Google Calendar</p>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                Disconnect
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Link2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Calendar ID</p>
                  <p className="text-sm font-medium text-gray-900">{status.calendar_id || 'Not available'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Synced</p>
                  <p className="text-sm font-medium text-gray-900">
                    {status.last_sync
                      ? new Date(status.last_sync).toLocaleString()
                      : 'Never'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSyncNow}
                disabled={syncing}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {syncing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Sync Now
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Google Calendar</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connect your Google Calendar to automatically sync bookings. New bookings will appear in your calendar,
              and busy times will be blocked to prevent double-booking.
            </p>
            <button
              onClick={handleConnect}
              className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
            >
              <Link2 className="w-5 h-5" />
              Connect Google Calendar
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">How it works</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>New bookings automatically create events in your Google Calendar</li>
          <li>Booking updates (time changes, cancellations) sync to your calendar</li>
          <li>Busy times in your Google Calendar are blocked from new bookings</li>
          <li>All sync happens automatically - no manual work needed</li>
        </ul>
      </div>
    </div>
  );
}

