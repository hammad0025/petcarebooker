'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { shopsApi } from '@/lib/api';
import { MapPin, CheckCircle2, X, RefreshCw, ExternalLink, AlertCircle, Info } from 'lucide-react';

interface GMBStatus {
  gmb_profile_id: string | null;
  gmb_verified: boolean;
  gmb_booking_enabled: boolean;
}

export default function GMBSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<GMBStatus | null>(null);
  const [gmbProfileId, setGmbProfileId] = useState('');
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
      const shop = await shopsApi.getMyProfile(token);
      setStatus({
        gmb_profile_id: shop.gmb_profile_id || null,
        gmb_verified: shop.gmb_verified || false,
        gmb_booking_enabled: shop.gmb_booking_enabled || false,
      });
      if (shop.gmb_profile_id) {
        setGmbProfileId(shop.gmb_profile_id);
      }
    } catch (error: any) {
      console.error('Failed to load GMB status:', error);
      setError('Failed to load GMB status');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfileId = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!gmbProfileId.trim()) {
      setError('Please enter your Google Business Profile ID');
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      await shopsApi.update(token, {
        gmb_profile_id: gmbProfileId.trim(),
      });
      setSuccess('Google Business Profile ID saved successfully');
      await loadStatus(token);
    } catch (error: any) {
      console.error('Failed to save GMB profile ID:', error);
      setError(error.message || 'Failed to save profile ID');
    }
  };

  const handleToggleBooking = async (enabled: boolean) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setError(null);
      setSuccess(null);
      await shopsApi.update(token, {
        gmb_booking_enabled: enabled,
      });
      setSuccess(enabled ? 'Booking enabled on Google My Business' : 'Booking disabled on Google My Business');
      await loadStatus(token);
    } catch (error: any) {
      console.error('Failed to toggle booking:', error);
      setError(error.message || 'Failed to update booking status');
    }
  };

  const handleMarkVerified = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setError(null);
      setSuccess(null);
      await shopsApi.update(token, {
        gmb_verified: true,
      });
      setSuccess('Marked as verified');
      await loadStatus(token);
    } catch (error: any) {
      console.error('Failed to mark as verified:', error);
      setError(error.message || 'Failed to update verification status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Google My Business Setup</h1>
          <p className="text-gray-600">Connect your Google Business Profile to enable direct booking from Google Search and Maps</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <X className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Setup Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Setup Steps</h2>
          
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                status?.gmb_verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Claim or Verify Your Google Business Profile</h3>
                <p className="text-sm text-gray-600 mb-3">
                  If you don't have a Google Business Profile yet, create one at{' '}
                  <a href="https://business.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">
                    business.google.com
                  </a>
                  . If you already have one, make sure it's verified.
                </p>
                {status?.gmb_verified ? (
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile verified</span>
                  </div>
                ) : (
                  <button
                    onClick={handleMarkVerified}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Mark as verified →
                  </button>
                )}
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                status?.gmb_profile_id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Connect Your Google Business Profile</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Enter your Google Business Profile ID. You can find this in your GMB dashboard URL or settings.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={gmbProfileId}
                    onChange={(e) => setGmbProfileId(e.target.value)}
                    placeholder="Enter your GMB Profile ID"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSaveProfileId}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:via-pink-600 hover:to-teal-600 transition-all"
                  >
                    Save
                  </button>
                </div>
                {status?.gmb_profile_id && (
                  <div className="mt-2 flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Connected: {status.gmb_profile_id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                status?.gmb_booking_enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Enable Booking on Google</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Once your profile is connected and verified, you can enable the booking button on your Google Business Profile.
                  <strong className="text-gray-900"> Note: This feature requires Google Booking Partner approval.</strong>
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleBooking(!status?.gmb_booking_enabled)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      status?.gmb_booking_enabled
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    disabled={!status?.gmb_verified || !status?.gmb_profile_id}
                  >
                    {status?.gmb_booking_enabled ? 'Disable Booking' : 'Enable Booking'}
                  </button>
                  {status?.gmb_booking_enabled && (
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Booking enabled</span>
                    </div>
                  )}
                </div>
                {(!status?.gmb_verified || !status?.gmb_profile_id) && (
                  <p className="mt-2 text-sm text-gray-500">
                    Complete steps 1 and 2 first to enable booking
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• The booking button on Google may take 24-48 hours to appear after enabling</li>
                <li>• Your business must be verified on Google Business Profile</li>
                <li>• PetCareBooker must be approved as a Google Booking Partner (in progress)</li>
                <li>• Ensure your business hours match between Google and PetCareBooker</li>
                <li>• Bookings from Google will appear in your PetCareBooker dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Helpful Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://business.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <ExternalLink className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Google Business Profile</div>
                <div className="text-sm text-gray-600">Manage your business profile</div>
              </div>
            </a>
            <a
              href="/GMB_SETUP_GUIDE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <ExternalLink className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Setup Guide</div>
                <div className="text-sm text-gray-600">Detailed GMB setup instructions</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

