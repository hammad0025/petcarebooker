import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white cursor-pointer hover:opacity-90 flex items-center gap-2">
            🐾 PetCareBooker
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/browse" 
            className="text-white hover:text-gray-100 font-semibold transition-all hover:scale-105"
          >
            🔍 Find Groomers
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
      </nav>

      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8 text-6xl animate-bounce">🐕 🐈</div>
        <h1 className="text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
          Book Pet Grooming<br />in Seconds ⚡
        </h1>
        <p className="text-2xl text-white/95 mb-12 max-w-2xl mx-auto font-medium">
          Find trusted groomers near you. Book appointments instantly. 
          Keep your furry friend looking pawsome! 🌟
        </p>

        <div className="flex gap-4 justify-center mb-20">
          <Link 
            href="/my-pets"
            className="bg-white text-purple-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-50 transition-all hover:scale-110 shadow-2xl"
          >
            🐾 Start with Your Pet
          </Link>
          <Link 
            href="/browse"
            className="bg-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-purple-700 transition-all hover:scale-110 shadow-2xl"
          >
            Browse All Groomers
          </Link>
        </div>
        
        <p className="text-white/90 text-base font-medium">
          Are you a groomer?{' '}
          <Link href="/register" className="underline hover:text-white font-bold">
            List your business here 🚀
          </Link>
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 text-white border-2 border-white/30 hover:scale-105 transition-all">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold mb-3">Find Local Groomers</h3>
            <p className="text-white/90 text-lg">
              Browse trusted pet groomers in your area. See services, prices, and real-time availability.
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 text-white border-2 border-white/30 hover:scale-105 transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Book Instantly</h3>
            <p className="text-white/90 text-lg">
              Pick an available time slot. Add your pet's info. Confirmed in 60 seconds flat!
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 text-white border-2 border-white/30 hover:scale-105 transition-all">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-3">SMS Updates</h3>
            <p className="text-white/90 text-lg">
              Get instant confirmation texts and friendly reminders. Never miss an appointment!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-gray-900">
            Why Pet Parents Love Us 💙
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Thousands of happy pets and their humans trust PetCareBooker
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

      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-900">Ready to pamper your pet? 🎉</h3>
          <Link 
            href="/browse"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-12 py-5 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-600 transition-all hover:scale-110 shadow-2xl"
          >
            🐾 Book Your First Appointment
          </Link>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 PetCareBooker. Making tails wag since today! 🐾
          </p>
        </div>
      </footer>
    </div>
  );
}

