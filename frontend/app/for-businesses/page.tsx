import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'For Groomers - Grow Your Pet Grooming Business | PetCareBooker',
  description: 'Join PetCareBooker and get more bookings. Free to start, no monthly fees. Manage your schedule, accept online bookings, and grow your grooming business.',
  keywords: 'pet grooming business, groomer software, online booking for groomers, pet salon management',
  alternates: {
    canonical: 'https://www.petcarebooker.com/for-businesses',
  },
};

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer hover:opacity-90">
              🐾 PetCareBooker
            </h1>
          </Link>
          <div className="flex gap-4">
            <Link 
              href="/login"
              className="px-6 py-3 rounded-full font-bold border-2 border-white hover:bg-white hover:text-purple-600 transition"
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="px-6 py-3 rounded-full font-bold bg-white text-purple-600 hover:bg-gray-100 transition"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Grow Your Pet Grooming Business ✨
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join 100+ verified groomers using PetCareBooker to fill their calendars, 
            reduce no-shows, and delight pet parents.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-12 py-5 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-600 transition-all hover:scale-110 shadow-2xl"
          >
            Start Your Free Trial 🚀
          </Link>
          <p className="text-gray-600 mt-4">
            No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Business FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            Groomer FAQ 💬
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                How long does onboarding take?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                Most groomers go live in under 10 minutes. Import your services, pick your availability, upload a few photos, and you're ready to accept bookings instantly.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                Do you charge any monthly or setup fees?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                Nope. It&apos;s 100% free to list your business. We only earn when you do: 8% success fee on appointments booked through PetCareBooker.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                How do payouts work?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                After each completed appointment, funds are automatically deposited to your connected bank account within 2 business days. Track everything inside your payout dashboard.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                Can I talk to someone before signing up?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                Absolutely! Email <a href="mailto:hello@petcarebooker.com" className="text-purple-600 font-semibold">hello@petcarebooker.com</a> to book a quick walkthrough or ask any questions.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Product Tour */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                Peek Inside the Dashboard 👀
              </h2>
              <p className="text-gray-600 text-xl mb-6">
                We built PetCareBooker with busy groomers in mind. Everything you need—calendar, clients,
                payments, reminders—is a tap away. No tech headaches.
              </p>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li>✅ Google Calendar sync - Never double-book again</li>
                <li>✅ Drag-and-drop calendar with blocked time support</li>
                <li>✅ Client CRM with pet notes, allergy alerts, and visit history</li>
                <li>✅ Automated SMS + email reminders to crush no-shows</li>
                <li>✅ Referral program - Earn free months by referring other groomers</li>
                <li>✅ Simple pricing - $24.99/month or start free (5 bookings/month)</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
                  Create Free Account
                </Link>
                <a href="mailto:hello@petcarebooker.com" className="font-semibold text-purple-600 hover:underline">
                  Book a 15-min demo →
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 p-6">
                <p className="text-sm font-semibold text-purple-600 mb-2">Calendar View</p>
                <div className="h-56 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-gray-600 font-semibold">
                  Calendar & booking grid preview
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 p-6">
                <p className="text-sm font-semibold text-pink-500 mb-2">Client Profiles</p>
                <div className="h-40 bg-gradient-to-br from-pink-100 to-orange-100 rounded-2xl flex items-center justify-center text-gray-600 font-semibold">
                  Pet + owner CRM preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100">
              <p className="text-5xl font-extrabold text-purple-600 mb-2">+120%</p>
              <p className="text-gray-600 text-lg">Average increase in booked appointments after 60 days</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 shadow-lg border border-pink-100">
              <p className="text-5xl font-extrabold text-pink-500 mb-2">4.9 / 5</p>
              <p className="text-gray-600 text-lg">Average rating pet parents give groomers on PetCareBooker</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-lg border border-orange-100">
              <p className="text-5xl font-extrabold text-orange-500 mb-2">5 min</p>
              <p className="text-gray-600 text-lg">Time it takes to launch your profile and accept your first booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-4">
            Why Groomers Love Us 💜
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Everything you need to manage bookings, grow your business, and keep clients happy
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Google Calendar Sync</h3>
              <p className="text-gray-600 text-lg">
                Connect your Google Calendar to automatically sync bookings. Prevent double-booking and manage everything in one place.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Automated SMS Reminders</h3>
              <p className="text-gray-600 text-lg">
                Reduce no-shows by 80%. Automatic confirmation and reminder texts keep clients informed.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Build Your Reputation</h3>
              <p className="text-gray-600 text-lg">
                Collect 5-star reviews automatically. Get discovered by thousands of pet parents searching nearby.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Simple Pricing</h3>
              <p className="text-gray-600 text-lg">
                Start free with 5 bookings/month. Upgrade to Basic ($24.99/month) for unlimited bookings and all features. No hidden fees.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Business Insights</h3>
              <p className="text-gray-600 text-lg">
                Track bookings, revenue, and client retention. See what's working and optimize your schedule.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Easy to Use</h3>
              <p className="text-gray-600 text-lg">
                No tech skills needed. Set up in minutes. Manage everything from your phone or computer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & payouts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-3xl p-10 shadow-2xl">
              <p className="text-sm uppercase tracking-widest mb-2">Pricing</p>
              <h3 className="text-4xl font-extrabold mb-4">Start Free. Upgrade Anytime.</h3>
              <ul className="space-y-3 text-lg">
                <li>• Free tier: 5 bookings/month - perfect for testing</li>
                <li>• Basic plan: $24.99/month - unlimited bookings</li>
                <li>• Google Calendar sync included on all plans</li>
                <li>• Refer 3 groomers, get 1 month free</li>
                <li>• Cancel anytime — no contracts, no setup fees</li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
              <p className="text-sm font-semibold text-gray-500 mb-2">Payouts & support</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Get paid fast, stay in control</h3>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li>• Funds are deposited to your bank 2 business days after each appointment</li>
                <li>• Detailed payout dashboard with downloadable CSVs</li>
                <li>• Dispute assistance + chargeback protection included</li>
                <li>• Dedicated slack/email support for partner groomers</li>
              </ul>
              <p className="text-gray-500 text-sm mt-6">
                Need custom pricing for multi-location salons? <a href="mailto:hello@petcarebooker.com" className="text-purple-600 font-semibold">Contact us</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-16">
            Get Started in 3 Easy Steps 🎯
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Create Your Profile</h3>
                <p className="text-gray-600 text-lg">
                  Add your business name, location, services, and prices. Upload photos of your space and happy pets you've groomed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Set Your Availability</h3>
                <p className="text-gray-600 text-lg">
                  Choose your working hours and how long each service takes. Block out personal time whenever you need.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Start Accepting Bookings</h3>
                <p className="text-gray-600 text-lg">
                  Go live! Pet parents can instantly book you. Get SMS notifications for new appointments. Manage everything from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-4">
            Hear From Other Groomers 🗣️
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Real stories from groomers who've grown their business with PetCareBooker
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-2xl text-white mr-4">
                  JS
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Jessica's Pet Spa</div>
                  <div className="text-yellow-500 text-xl">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "Bookings increased 40% in the first month! No more missed calls or double bookings. 
                My clients love the convenience and I love the simplicity."
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-2xl text-white mr-4">
                  PG
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Paws & Groom</div>
                  <div className="text-yellow-500 text-xl">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "Setup took 10 minutes. Now I'm fully booked 3 weeks in advance. 
                The automated reminders cut my no-shows by 75%. Game changer!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Ready to Grow Your Business? 🚀
          </h2>
          <p className="text-2xl text-white/95 mb-10 max-w-2xl mx-auto">
            Join hundreds of groomers already using PetCareBooker to fill their schedules and delight clients.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all hover:scale-110 shadow-2xl"
          >
            Get Started Free Today
          </Link>
          <p className="text-white/90 mt-6 text-lg">
            Questions? <Link href="/contact" className="underline font-bold">Contact us</Link> anytime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

