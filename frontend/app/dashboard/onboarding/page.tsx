'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { shopsApi, servicesApi, calendarApi } from '@/lib/api';
import { CheckCircle2, ArrowRight, ArrowLeft, Building2, Scissors, Clock, Calendar, Sparkles } from 'lucide-react';

interface ShopProfile {
  business_name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<ShopProfile | null>(null);
  const [calendarConnected, setCalendarConnected] = useState(false);
  
  const totalSteps = 5;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadShopData(token);
    checkCalendarStatus(token);
  }, []);

  const loadShopData = async (token: string) => {
    try {
      const data = await shopsApi.getMyProfile(token);
      setShop(data);
    } catch (error) {
      console.error('Failed to load shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkCalendarStatus = async (token: string) => {
    try {
      const status = await calendarApi.getStatus(token);
      setCalendarConnected(status.connected);
    } catch (error) {
      // Calendar not connected, that's okay
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      router.push('/dashboard');
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleComplete = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const steps = [
    {
      number: 1,
      title: 'Business Information',
      icon: Building2,
      description: 'Review and complete your business profile',
      completed: shop?.business_name && shop?.address && shop?.phone,
    },
    {
      number: 2,
      title: 'Add Your First Service',
      icon: Scissors,
      description: 'Create at least one service to start accepting bookings',
      completed: false, // Would need to check services count
    },
    {
      number: 3,
      title: 'Set Business Hours',
      icon: Clock,
      description: 'Define when customers can book appointments',
      completed: false, // Would need to check business hours
    },
    {
      number: 4,
      title: 'Connect Google Calendar',
      icon: Calendar,
      description: 'Sync your bookings with Google Calendar (optional)',
      completed: calendarConnected,
      optional: true,
    },
    {
      number: 5,
      title: 'Get Your First Booking',
      icon: Sparkles,
      description: 'Share your shop link and start accepting bookings',
      completed: false,
    },
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = step.completed || currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <p className={`text-xs mt-2 text-center ${isActive ? 'text-purple-600 font-semibold' : 'text-gray-600'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              {currentStepData && (() => {
                const Icon = currentStepData.icon;
                return <Icon className="w-8 h-8 text-purple-600" />;
              })()}
              <h1 className="text-2xl font-bold text-gray-900">
                {currentStepData?.title}
              </h1>
            </div>
            <p className="text-gray-600">{currentStepData?.description}</p>
          </div>

          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <p className="text-gray-700 mb-4">
                Let's make sure your business information is complete. This helps customers find and trust your business.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={shop?.business_name || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={shop?.city || ''}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={shop?.state || ''}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => router.push('/dashboard/profile')}
                  className="px-6 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleNext}
                  className="ml-auto px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Add Service */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <p className="text-gray-700 mb-4">
                Create your first service to start accepting bookings. You can add more services later.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Start with your most popular service. You can add more services anytime from your dashboard.
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSkip}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Skip for Now
                </button>
                <button
                  onClick={() => router.push('/dashboard/services')}
                  className="ml-auto px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Add Service
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Business Hours */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <p className="text-gray-700 mb-4">
                Set your business hours so customers know when they can book appointments.
              </p>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSkip}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Skip for Now
                </button>
                <button
                  onClick={() => router.push('/dashboard/hours')}
                  className="ml-auto px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Set Hours
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Google Calendar */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <p className="text-gray-700 mb-4">
                Connect your Google Calendar to automatically sync bookings and prevent double-booking.
              </p>
              {calendarConnected ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800 font-medium">Google Calendar is connected!</p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    This step is optional. You can connect your calendar later from Settings.
                  </p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSkip}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Skip
                </button>
                {!calendarConnected && (
                  <button
                    onClick={() => router.push('/dashboard/calendar')}
                    className="ml-auto px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    Connect Calendar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {calendarConnected && (
                  <button
                    onClick={handleNext}
                    className="ml-auto px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Get First Booking */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
                <p className="text-gray-600 mb-6">
                  Your shop is ready to accept bookings. Share your shop link with customers to get started.
                </p>
                {shop && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Your shop URL:</p>
                    <p className="font-mono text-purple-600 text-lg">
                      petcarebooker.com/shop/{shop.business_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    </p>
                  </div>
                )}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={handleComplete}
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    Start Accepting Bookings
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

