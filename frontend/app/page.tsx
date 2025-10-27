import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with subtle gradient */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold cursor-pointer hover:opacity-90 flex items-center gap-2">
              🐾 PetCareBooker
            </h1>
          </Link>
          <div className="flex items-center gap-4">
          <Link 
            href="/browse" 
            className="text-white hover:text-gray-100 font-semibold transition-all hover:scale-105"
          >
            Find Groomers
          </Link>
          <Link 
            href="/blog" 
            className="text-white hover:text-gray-100 font-semibold transition-all hover:scale-105"
          >
            Blog
          </Link>
          <Link 
            href="/customer/login" 
            className="text-white hover:text-gray-100 font-semibold transition-all hover:scale-105"
          >
            Sign In
          </Link>
          <Link 
            href="/login" 
            className="bg-white text-purple-600 px-5 py-2.5 rounded-full font-bold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
          >
            For Businesses ✨
          </Link>
        </div>
        </div>
      </nav>

      {/* Hero with video background - Vagaro/Booksy style */}
      <div className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {/* Video/Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          {/* Animated paw prints floating */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 text-9xl opacity-20 animate-pulse">🐾</div>
            <div className="absolute top-1/3 right-1/4 text-8xl opacity-15 animate-pulse delay-100">🐕</div>
            <div className="absolute bottom-1/4 left-1/3 text-9xl opacity-20 animate-pulse delay-200">🐈</div>
            <div className="absolute bottom-1/3 right-1/3 text-7xl opacity-15 animate-pulse delay-300">🐾</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-9xl opacity-10 animate-pulse delay-75">✂️</div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-600/70 to-pink-600/80"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Book Pet Grooming<br />
            <span className="text-yellow-300">in Seconds</span> ⚡
          </h1>
          
          <p className="text-2xl text-white/95 mb-2 max-w-3xl mx-auto font-medium drop-shadow-lg">
            Find trusted groomers near you • Book instantly • Keep your pet looking pawsome! 🌟
          </p>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            No phone calls. No waiting. Just happy pets and peace of mind.
          </p>

          {/* Large Search Bar - Booksy/Vagaro style */}
          <div className="w-full max-w-3xl mb-8">
            <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="🔍 Enter your city or zip code..."
                  className="w-full px-6 py-5 text-xl rounded-xl focus:outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
              <Link 
                href="/browse"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-5 rounded-xl font-bold hover:from-purple-700 hover:to-pink-600 transition-all whitespace-nowrap text-xl shadow-lg hover:scale-105"
              >
                Find Groomers →
              </Link>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/90 mb-8">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🐾</div>
              <div>
                <div className="text-2xl font-bold">1,200+</div>
                <div className="text-sm">Happy Pets</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-3xl">⭐</div>
              <div>
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm">Verified Groomers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-3xl">📱</div>
              <div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm">Average Rating</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/my-pets"
              className="bg-white text-purple-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-50 transition-all hover:scale-110 shadow-2xl"
            >
              🐾 Start with Your Pet
            </Link>
            <Link 
              href="/browse"
              className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-10 py-4 rounded-full text-xl font-bold hover:bg-white/20 transition-all hover:scale-110"
            >
              Browse All Groomers
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <div className="text-2xl">↓</div>
        </div>
      </div>

      {/* Feature Cards - moved outside hero */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
            How It Works ✨
          </h2>
          <p className="text-center text-gray-700 text-xl mb-12 max-w-2xl mx-auto">
            Three simple steps to a happy, pampered pet
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 border-2 border-purple-100 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                🗺️
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Find Local Groomers</h3>
              <p className="text-gray-600 text-lg">
                Browse trusted pet groomers in your area. See services, prices, and real-time availability.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 border-2 border-pink-100 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                ⚡
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Book Instantly</h3>
              <p className="text-gray-600 text-lg">
                Pick an available time slot. Add your pet's info. Confirmed in 60 seconds flat!
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border-2 border-orange-100 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                📱
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">SMS Updates</h3>
              <p className="text-gray-600 text-lg">
                Get instant confirmation texts and friendly reminders. Never miss an appointment!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Metrics */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">1,200+</div>
              <div className="text-white/90 font-medium">Happy Pets</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">100+</div>
              <div className="text-white/90 font-medium">Verified Groomers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">4.9★</div>
              <div className="text-white/90 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white mb-2">24/7</div>
              <div className="text-white/90 font-medium">Online Booking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-gray-900">
            What Pet Parents Say 💜
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Real reviews from real pet parents who trust us with their furry family members
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🐕</div>
                <div>
                  <div className="font-bold text-gray-900">Sarah M.</div>
                  <div className="text-yellow-500">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Found a groomer in 2 minutes! Charlie looks amazing and the booking was so easy. No more phone tag!"
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🐈</div>
                <div>
                  <div className="font-bold text-gray-900">Mike T.</div>
                  <div className="text-yellow-500">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Love the SMS reminders! Never miss an appointment. Mittens is always looking fresh. Highly recommend!"
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🐕</div>
                <div>
                  <div className="font-bold text-gray-900">Jessica L.</div>
                  <div className="text-yellow-500">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Best decision ever! Saw real-time availability and booked instantly. Max's groomer is fantastic!"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-gray-900">
            Why Pet Parents Love Us 💙
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Everything you need for stress-free pet grooming
          </p>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">🐕 No Account Needed</h3>
              <p className="text-gray-600 text-lg">
                Book instantly without signing up. Just enter your pet's info and pick a time. Simple as that!
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">⭐ Trusted Groomers</h3>
              <p className="text-gray-600 text-lg">
                All groomers are verified professionals who love pets as much as you do. Your furry friend is in good hands!
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">🕐 Real-Time Availability</h3>
              <p className="text-gray-600 text-lg">
                See exactly when groomers are free. No phone tag, no waiting for callbacks. Book the perfect time slot now!
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">💰 Clear Pricing</h3>
              <p className="text-gray-600 text-lg">
                See prices upfront. No hidden fees, no surprises. Know exactly what you're paying before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-5xl font-extrabold mb-6 text-white">Ready to pamper your pet? 🎉</h3>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of happy pet parents who trust PetCareBooker for stress-free grooming.
          </p>
          <Link 
            href="/browse"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-50 transition-all hover:scale-110 shadow-2xl"
          >
            🐾 Book Your First Appointment
          </Link>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🐾 PetCareBooker</h3>
              <p className="text-gray-400">
                Making pet grooming simple, fast, and stress-free.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">For Pet Parents</h4>
              <ul className="space-y-2">
                <li><Link href="/browse" className="text-gray-400 hover:text-white transition">Find Groomers</Link></li>
                <li><Link href="/customer/register" className="text-gray-400 hover:text-white transition">Sign Up</Link></li>
                <li><Link href="/my-pets" className="text-gray-400 hover:text-white transition">My Pets</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog & Guides</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">For Businesses</h4>
              <ul className="space-y-2">
                <li><Link href="/register" className="text-gray-400 hover:text-white transition">List Your Business</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition">Groomer Login</Link></li>
                <li><Link href="/for-businesses" className="text-gray-400 hover:text-white transition">Why Join?</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Cities</h4>
              <ul className="space-y-2">
                <li><Link href="/cities/new-york-city" className="text-gray-400 hover:text-white transition">New York City</Link></li>
                <li><Link href="/cities/los-angeles" className="text-gray-400 hover:text-white transition">Los Angeles</Link></li>
                <li><Link href="/cities/miami" className="text-gray-400 hover:text-white transition">Miami</Link></li>
                <li><Link href="/cities/west-palm-beach" className="text-gray-400 hover:text-white transition">West Palm Beach</Link></li>
                <li><Link href="/cities/tampa" className="text-gray-400 hover:text-white transition">Tampa</Link></li>
                <li><Link href="/cities/orlando" className="text-gray-400 hover:text-white transition">Orlando</Link></li>
                <li><Link href="/cities/fort-lauderdale" className="text-gray-400 hover:text-white transition">Fort Lauderdale</Link></li>
                <li><Link href="/browse" className="text-gray-400 hover:text-white transition">View All →</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 PetCareBooker. Making tails wag since today! 🐾
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

