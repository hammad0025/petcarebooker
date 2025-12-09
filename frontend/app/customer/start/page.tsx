'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StartPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('customerToken');
    if (token) {
      setIsLoggedIn(true);
      // Already logged in, go straight to add pet
      setTimeout(() => {
        router.push('/customer/pets/add');
      }, 500);
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking || isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐾</div>
          <div className="text-xl font-semibold text-purple-900">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-5xl font-bold text-purple-900 mb-4">
            Let's Get Started!
          </h1>
          <p className="text-gray-700 text-xl">
            Choose how you'd like to continue
          </p>
        </div>

        <div className="space-y-4">
          {/* Option 1: Create Account - RECOMMENDED */}
          <div 
            onClick={() => router.push('/customer/register?returnTo=/customer/pets/add')}
            className="bg-white border-4 border-purple-400 rounded-3xl p-8 hover:border-purple-600 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Recommended Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              ⭐ RECOMMENDED
            </div>

            <div className="flex items-start gap-6">
              <div className="text-6xl group-hover:scale-110 transition-transform">👤</div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold text-purple-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Create a Free Account
                </h3>
                <ul className="text-gray-700 space-y-2 mb-6 text-lg">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    Save your pets for faster future bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    Track your appointment history
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    Manage multiple pets easily
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    Get appointment reminders via email
                  </li>
                </ul>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                  Create Account & Add Pet →
                </button>
              </div>
            </div>
          </div>

          {/* Option 2: Continue as Guest */}
          <div 
            onClick={() => router.push('/browse')}
            className="bg-white border-2 border-gray-300 rounded-3xl p-8 hover:border-gray-500 hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl group-hover:scale-110 transition-transform">⚡</div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  Continue as Guest
                </h3>
                <ul className="text-gray-700 space-y-2 mb-6 text-lg">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    Book quickly without creating an account
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    Enter pet details during booking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    No registration required
                  </li>
                </ul>
                <button className="px-8 py-4 bg-gray-700 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105">
                  Browse Groomers Now →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Already have account */}
        <div className="text-center mt-8">
          <div className="bg-white/80 rounded-2xl p-6 inline-block">
            <span className="text-gray-700 text-lg">Already have an account? </span>
            <button 
              onClick={() => router.push('/customer/login?returnTo=/customer/pets/add')}
              className="text-purple-600 font-bold text-lg hover:text-purple-700 hover:underline transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

