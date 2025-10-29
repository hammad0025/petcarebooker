'use client';

import { useState, useEffect } from 'react';

interface SubscriptionData {
  subscription_tier: string;
  subscription_status: string;
  subscription_start_date: string | null;
  subscription_renewal_date: string | null;
  subscription_cancelled_at: string | null;
}

export default function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptionStatus();
  }, []);

  const loadSubscriptionStatus = async () => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';

    try {
      const response = await fetch(`${API_BASE_URL}/api/subscription/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Failed to load subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    const token = localStorage.getItem('token');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';

    try {
      const response = await fetch(`${API_BASE_URL}/api/subscription/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Failed to start checkout:', error);
      alert('Failed to start checkout');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const isActive = subscription?.subscription_status === 'active';
  const isCancelled = subscription?.subscription_status === 'cancelled';

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">💰 Subscription Status</h2>
        {isActive && (
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
            Active
          </span>
        )}
        {isCancelled && (
          <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
            Cancelled
          </span>
        )}
        {!isActive && !isCancelled && (
          <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">
            Free
          </span>
        )}
      </div>

      {isActive ? (
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Plan:</strong> {subscription?.subscription_tier || 'basic'}
          </p>
          {subscription?.subscription_renewal_date && (
            <p className="text-gray-700">
              <strong>Renews:</strong>{' '}
              {new Date(subscription.subscription_renewal_date).toLocaleDateString()}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700 font-semibold mb-4">
            You're currently on the <strong>free</strong> plan.
          </p>

          <button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
          >
            🚀 Upgrade to Basic - $24.99/month
          </button>

          <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
            <p className="font-bold text-gray-900">✨ With Basic Plan:</p>
            <ul className="space-y-1 text-gray-700">
              <li>✓ Unlimited bookings</li>
              <li>✓ Priority customer support</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Online payment processing</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

