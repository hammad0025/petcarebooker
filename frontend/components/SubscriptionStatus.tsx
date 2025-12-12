'use client';

import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Sparkles, ArrowUp } from 'lucide-react';

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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const isActive = subscription?.subscription_status === 'active';
  const isCancelled = subscription?.subscription_status === 'cancelled';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-600" />
          Subscription Status
        </h2>
        {isActive && (
          <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Active
          </span>
        )}
        {isCancelled && (
          <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            Cancelled
          </span>
        )}
        {!isActive && !isCancelled && (
          <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Free
          </span>
        )}
      </div>

      {isActive ? (
        <div className="space-y-1.5 text-sm">
          <p className="text-gray-700">
            <span className="font-medium">Plan:</span> {subscription?.subscription_tier || 'basic'}
          </p>
          {subscription?.subscription_renewal_date && (
            <p className="text-gray-700">
              <span className="font-medium">Renews:</span>{' '}
              {new Date(subscription.subscription_renewal_date).toLocaleDateString()}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            You're currently on the <span className="font-semibold">free</span> plan.
          </p>

          <button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ArrowUp className="w-4 h-4" />
            Upgrade to Basic - $24.99/month
          </button>

          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-sm">
            <p className="font-semibold text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              With Basic Plan:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                Unlimited bookings
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                Priority customer support
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                Online payment processing
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}



