'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyPetsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new customer start flow
    router.replace('/customer/start');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🐾</div>
        <div className="text-xl font-semibold text-purple-900">Redirecting...</div>
      </div>
    </div>
  );
}
