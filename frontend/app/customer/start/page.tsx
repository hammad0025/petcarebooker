'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Zap, CheckCircle2, ArrowRight, Heart } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent mx-auto mb-3"></div>
          <div className="text-base font-medium text-gray-900">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Let's Get Started
          </h1>
          <p className="text-sm text-gray-600">
            Choose how you'd like to continue
          </p>
        </div>

        <div className="space-y-3">
          {/* Option 1: Create Account - RECOMMENDED */}
          <div 
            onClick={() => router.push('/customer/register?returnTo=/customer/pets/add')}
            className="bg-white border-2 border-purple-300 rounded-lg p-5 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group relative"
          >
            {/* Recommended Badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
              RECOMMENDED
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Create a Free Account
                </h3>
                <ul className="text-sm text-gray-700 space-y-1.5 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Save your pets for faster future bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Track your appointment history
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Manage multiple pets easily
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Get appointment reminders via email
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2">
                  Create Account & Add Pet
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Option 2: Continue as Guest */}
          <div 
            onClick={() => router.push('/browse')}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <Zap className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Continue as Guest
                </h3>
                <ul className="text-sm text-gray-700 space-y-1.5 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Book quickly without creating an account
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Enter pet details during booking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    No registration required
                  </li>
                </ul>
                <button className="w-full bg-gray-700 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                  Browse Groomers Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Already have account */}
        <div className="text-center mt-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 inline-block">
            <span className="text-sm text-gray-700">Already have an account? </span>
            <button 
              onClick={() => router.push('/customer/login?returnTo=/customer/pets/add')}
              className="text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

