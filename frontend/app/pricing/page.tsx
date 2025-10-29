import Link from 'next/link';

export const metadata = {
  title: 'Pricing - PetCareBooker',
  description: 'Affordable pricing for pet grooming businesses. Start free, upgrade anytime.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold cursor-pointer hover:opacity-90 flex items-center gap-2">
              🐾 PetCareBooker
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/register" 
              className="bg-white text-purple-600 px-5 py-2.5 rounded-full font-bold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-2xl text-gray-700 max-w-2xl mx-auto mb-12">
          The ONLY pet-centric grooming platform. $24.99/month. Start free for 30 days. No credit card required.
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Free Trial */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
            <div className="text-6xl mb-4">🆓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Trial</h3>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-600 text-lg">/month</span>
            </div>
            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
              30 Days Free
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Unlimited bookings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Customer management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Calendar & scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>SMS notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 text-xl">✗</span>
                <span className="text-gray-400">Ends after 30 days</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-center hover:shadow-lg transition-all"
            >
              Start Free Trial →
            </Link>
          </div>

          {/* Basic - Most Popular */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 border-4 border-purple-400 relative transform scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              MOST POPULAR
            </div>
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$24.99</span>
              <span className="text-gray-600 text-lg">/month</span>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Pet-centric platform • 17% cheaper than Booksy
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span><strong>Everything in Free</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Unlimited bookings forever</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Payment processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Customer analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>24/7 Support</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-center hover:shadow-2xl transition-all hover:scale-105"
            >
              Start Now →
            </Link>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$49.99</span>
              <span className="text-gray-600 text-lg">/month</span>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Multi-location businesses
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span><strong>Everything in Basic</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Marketing tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Multi-location support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <Link
              href="/register?plan=premium"
              className="block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-center hover:shadow-lg transition-all"
            >
              Upgrade →
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-extrabold text-center mb-8">How We Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 text-gray-900 font-bold">Feature</th>
                  <th className="text-center py-4 text-gray-900 font-bold">Booksy</th>
                  <th className="text-center py-4 text-purple-600 font-bold">PetCareBooker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 font-semibold">Monthly Cost</td>
                  <td className="text-center py-4 text-gray-600">$29.99</td>
                  <td className="text-center py-4 text-purple-600 font-bold">$24.99</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold">Free Trial</td>
                  <td className="text-center py-4 text-gray-600">No</td>
                  <td className="text-center py-4 text-green-600 font-bold">✓ 30 days</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold">Unlimited Bookings</td>
                  <td className="text-center py-4 text-gray-600">✓</td>
                  <td className="text-center py-4 text-green-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold">Payment Processing</td>
                  <td className="text-center py-4 text-gray-600">✓</td>
                  <td className="text-center py-4 text-green-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold">Customer Service</td>
                  <td className="text-center py-4 text-gray-600">Limited</td>
                  <td className="text-center py-4 text-green-600 font-bold">24/7 Support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-extrabold mb-4">Ready to get started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of groomers who switched from Booksy and saved money.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-50 transition-all hover:scale-110 shadow-2xl"
          >
            Start Free Trial →
          </Link>
        </div>
      </div>
    </div>
  );
}

