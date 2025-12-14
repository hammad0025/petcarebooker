'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { referralsApi } from '@/lib/api';
import { Users, Copy, CheckCircle2, Gift, Share2 } from 'lucide-react';

interface ReferralData {
  referral_code: string;
  referral_link: string;
  referrals_count: number;
  referral_credits: number;
}

interface Referral {
  id: number;
  business_name: string;
  owner_email: string;
  created_at: string;
}

export default function ReferralsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReferralData | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadData(token);
  }, []);

  const loadData = async (token: string) => {
    try {
      setLoading(true);
      const [referralData, referralsList] = await Promise.all([
        referralsApi.getReferralCode(token),
        referralsApi.getReferrals(token)
      ]);
      setData(referralData);
      setReferrals(referralsList.referrals || []);
    } catch (error: any) {
      console.error('Failed to load referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (data?.referral_link) {
      navigator.clipboard.writeText(data.referral_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (data?.referral_link && navigator.share) {
      navigator.share({
        title: 'Join PetCareBooker',
        text: 'Join PetCareBooker and get your first month free!',
        url: data.referral_link,
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Loading referral data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-3">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-600" />
          Referral Program
        </h1>
        <p className="text-gray-600 mt-2">
          Refer other groomers and earn credits. Refer 3 shops, get 1 month free!
        </p>
      </div>

      {data && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{data.referrals_count}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credits Earned</p>
                  <p className="text-2xl font-bold text-gray-900">{data.referral_credits}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Free Months</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.floor(data.referral_credits / 3)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Code Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Code</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-lg">
                {data.referral_code}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
              {navigator.share && (
                <button
                  onClick={handleShare}
                  className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Share this link: <span className="font-mono text-purple-600">{data.referral_link}</span>
            </p>
          </div>

          {/* Referred Shops List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Referred Shops</h2>
            {referrals.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No referrals yet. Share your code to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {referrals.map((referral) => (
                  <div
                    key={referral.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{referral.business_name}</p>
                      <p className="text-sm text-gray-600">{referral.owner_email}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(referral.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">How it works</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Share your referral link with other groomers</li>
              <li>When they sign up using your link, you earn 1 credit</li>
              <li>Earn 3 credits = 1 month free subscription</li>
              <li>Credits never expire and can be used anytime</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

