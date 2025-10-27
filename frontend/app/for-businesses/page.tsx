import Link from 'next/link';

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
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Online Calendar Management</h3>
              <p className="text-gray-600 text-lg">
                Set your availability once. Clients book instantly. No more back-and-forth phone calls or double bookings.
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
                No monthly fees. No hidden costs. Only pay a small commission when you get booked. That's it!
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 PetCareBooker. Making tails wag since today! 🐾
          </p>
        </div>
      </footer>
    </div>
  );
}

