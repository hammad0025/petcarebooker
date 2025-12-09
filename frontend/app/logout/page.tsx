'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all localStorage
    localStorage.clear();
    
    // Redirect to home after 1 second
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
        <div className="text-6xl mb-4">👋</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Logged Out</h1>
        <p className="text-gray-600 mb-4">Your session has been cleared</p>
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">Redirecting to homepage...</p>
      </div>
    </div>
  );
}

