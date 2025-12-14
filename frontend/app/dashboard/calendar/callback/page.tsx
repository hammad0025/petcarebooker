'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { calendarApi } from '@/lib/api';
import { CheckCircle2, X, Loader2 } from 'lucide-react';

function CalendarCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Connecting Google Calendar...');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setMessage('Failed to connect Google Calendar. Please try again.');
      return;
    }

    if (!code || !state) {
      setStatus('error');
      setMessage('Invalid authorization response. Please try again.');
      return;
    }

    // Exchange code for tokens
    calendarApi
      .connect(code, state, token)
      .then(() => {
        setStatus('success');
        setMessage('Google Calendar connected successfully!');
        // Redirect to calendar settings after 2 seconds
        setTimeout(() => {
          router.push('/dashboard/calendar');
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to connect calendar:', err);
        setStatus('error');
        setMessage('Failed to connect Google Calendar. Please try again.');
      });
  }, [searchParams, router]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{message}</h2>
            <p className="text-gray-600">Please wait...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{message}</h2>
            <p className="text-gray-600">Redirecting to calendar settings...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <X className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{message}</h2>
            <button
              onClick={() => router.push('/dashboard/calendar')}
              className="mt-4 px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Calendar Settings
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function CalendarCallbackPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <CalendarCallbackContent />
    </Suspense>
  );
}

