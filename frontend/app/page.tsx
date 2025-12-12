import Link from 'next/link';
import CityAutocomplete from '@/components/CityAutocomplete';
import ServiceAutocomplete from '@/components/ServiceAutocomplete';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Heart, Star, Smartphone, MapPin, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pet Grooming Near Me | Book Dog & Cat Grooming Online | PetCareBooker',
  description: 'Find pet grooming near me instantly. Book dog grooming and cat grooming online with verified groomers. Mobile pet grooming available. Compare prices, read reviews, schedule appointments in seconds. Serving 100+ cities nationwide.',
  keywords: 'pet grooming near me, dog groomer near me, cat grooming near me, mobile pet grooming, book pet groomer online, dog grooming, cat grooming, pet grooming booking, online pet grooming booking, find pet groomer near me',
  openGraph: {
    title: 'PetCareBooker | Book Pet Grooming in Seconds',
    description: 'Find trusted pet groomers near you. Book instantly with real-time availability. 4.9★ average rating from 1,200+ happy pet parents.',
    url: 'https://www.petcarebooker.com',
    siteName: 'PetCareBooker',
    type: 'website',
    images: [
      {
        url: 'https://www.petcarebooker.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'PetCareBooker - Book Pet Grooming Near You',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.petcarebooker.com',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full max-w-full">
      {/* Navbar with subtle gradient */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-4 md:py-6 shadow-lg overflow-x-hidden w-full">
        <div className="container mx-auto px-4 flex justify-between items-center gap-2 max-w-full">
          <Link href="/" className="min-w-0 flex-shrink">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold cursor-pointer hover:opacity-90 flex items-center gap-2">
              🐾 PetCareBooker
            </h1>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/browse" 
              className="text-sm lg:text-base text-white hover:text-gray-100 font-semibold transition-all whitespace-nowrap"
            >
              Find Groomers
            </Link>
            <Link 
              href="/blog" 
              className="text-sm lg:text-base text-white hover:text-gray-100 font-semibold transition-all whitespace-nowrap"
            >
              Blog
            </Link>
            <Link 
              href="/guides" 
              className="text-sm lg:text-base text-white hover:text-gray-100 font-semibold transition-all whitespace-nowrap"
            >
              Guides
            </Link>
            <Link 
              href="/customer/login" 
              className="text-sm lg:text-base text-white hover:text-gray-100 font-semibold transition-all whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="text-sm lg:text-base bg-white text-purple-600 px-4 lg:px-5 py-2 rounded-full font-bold hover:bg-gray-50 transition-all shadow-lg whitespace-nowrap"
            >
              For Businesses ✨
            </Link>
          </div>
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </nav>

      {/* Hero with video background - Vagaro/Booksy style */}
      <div className="relative h-[65vh] min-h-[400px] md:h-[70vh] md:min-h-[500px] overflow-hidden">
        {/* Video/Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-teal-500">
          {/* Animated paw prints floating */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 text-9xl opacity-20 animate-pulse">🐾</div>
            <div className="absolute top-1/3 right-1/4 text-8xl opacity-15 animate-pulse delay-100">🐕</div>
            <div className="absolute bottom-1/4 left-1/3 text-9xl opacity-20 animate-pulse delay-200">🐈</div>
            <div className="absolute bottom-1/3 right-1/3 text-7xl opacity-15 animate-pulse delay-300">🐾</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-9xl opacity-10 animate-pulse delay-75">✂️</div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 max-w-full"></div>
            <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 max-w-full"></div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-600/70 to-pink-600/80"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2 tracking-tight drop-shadow-2xl px-2">
            Pet Grooming Near Me<br />
            <span className="text-yellow-300">Book Instantly Online</span>
          </h1>
          
          <p className="text-sm sm:text-base text-white/95 mb-2 max-w-2xl mx-auto font-medium drop-shadow-lg px-4">
            Find trusted pet groomers near you • Book instantly online • No phone calls needed
          </p>

          {/* Compact Professional Search Bar */}
          <div className="w-full max-w-2xl mb-4 px-4">
            <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex-1 min-w-0">
                <CityAutocomplete />
              </div>
              <div className="flex-1 min-w-0">
                <ServiceAutocomplete placeholder="Service (e.g., Dog Grooming)" />
              </div>
              <Link 
                href="/browse"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all whitespace-nowrap text-sm text-center shadow-lg"
              >
                Search
              </Link>
            </div>
          </div>

          {/* Popular Cities Quick Links */}
          <div className="mb-4 w-full px-2 sm:px-0">
            <p className="text-white/90 text-sm mb-2 font-semibold">Popular Cities:</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto w-full">
              <Link href="/cities/miami" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Miami</Link>
              <Link href="/cities/new-york-city" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">NYC</Link>
              <Link href="/cities/tampa" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Tampa</Link>
              <Link href="/cities/orlando" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Orlando</Link>
              <Link href="/cities/pensacola" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Pensacola</Link>
              <Link href="/cities/fort-lauderdale" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Fort Lauderdale</Link>
              <Link href="/cities/brooklyn" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Brooklyn</Link>
              <Link href="/cities/west-palm-beach" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">West Palm Beach</Link>
              <Link href="/cities/jacksonville" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Jacksonville</Link>
              <Link href="/cities/buffalo" className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all text-xs font-medium">Buffalo</Link>
              <Link href="/browse" className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full hover:bg-white/30 transition-all text-xs font-bold border border-white/30">View All Cities →</Link>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-white/90 mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <div>
                <div className="text-lg font-semibold">1,200+</div>
                <div className="text-xs">Happy Pets</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <div>
                <div className="text-lg font-semibold">100+</div>
                <div className="text-xs">Verified Groomers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <div>
                <div className="text-lg font-semibold">4.9★</div>
                <div className="text-xs">Average Rating</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
            <Link 
              href="/customer/start"
              className="w-full sm:w-auto bg-white text-purple-600 px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-xl text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start with Your Pet
            </Link>
            <Link 
              href="/browse"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-6 py-3 rounded-full text-sm sm:text-base font-bold hover:bg-white/20 transition-all hover:scale-105 text-center"
            >
              Browse All Groomers
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <div className="text-xl">↓</div>
        </div>
      </div>

      {/* SEO-Optimized Section: Pet Grooming Near Me */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-teal-500 py-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-2 tracking-tight drop-shadow-2xl">
            Find Pet Grooming Near Me - Dog Grooming & Cat Grooming Online
          </h2>
          <p className="text-base text-white/95 text-center mb-4 max-w-3xl mx-auto drop-shadow-lg">
            Looking for <strong>pet grooming near me</strong>? PetCareBooker helps you find and book <strong>dog grooming</strong> and <strong>cat grooming</strong> services instantly. Whether you need <strong>mobile pet grooming</strong> that comes to your home or a traditional grooming salon, we connect you with verified professional groomers in your area. Book <strong>pet grooming online</strong> in seconds - no phone calls required.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/20 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-1">Dog Grooming</h3>
              <p className="text-base text-white/90">Professional dog groomers. Book instantly online.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/20 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-1">Cat Grooming</h3>
              <p className="text-base text-white/90">Expert cat groomers with gentle handling.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/20 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-1">Mobile Grooming</h3>
              <p className="text-base text-white/90">Mobile groomers that come to your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards - moved outside hero */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-2 tracking-tight">
            How It Works
          </h2>
          <p className="text-center text-gray-600 text-base mb-8 max-w-2xl mx-auto">
            Three simple steps to a happy, pampered pet
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Find Local Groomers</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Browse trusted pet groomers in your area. See services, prices, and real-time availability.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Book Instantly</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Pick an available time slot. Add your pet's info. Confirmed in 60 seconds flat!
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">SMS Updates</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Get instant confirmation texts and friendly reminders. Never miss an appointment!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Metrics */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-1">1,200+</div>
              <div className="text-white/90 text-base">Happy Pets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-1">100+</div>
              <div className="text-white/90 text-base">Verified Groomers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-1">4.9★</div>
              <div className="text-white/90 text-base">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-1">24/7</div>
              <div className="text-white/90 text-base">Online Booking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 text-gray-900 tracking-tight">
            What Pet Parents Say
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Real reviews from real pet parents who trust us with their furry family members
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🐕</div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Sarah M.</div>
                  <div className="text-yellow-500">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 italic text-base leading-relaxed">
                "Found a groomer in 2 minutes! Charlie looks amazing and the booking was so easy. No more phone tag!"
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🐈</div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Mike T.</div>
                  <div className="text-yellow-500">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 italic text-base leading-relaxed">
                "Love the SMS reminders! Never miss an appointment. Mittens is always looking fresh. Highly recommend!"
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🐕</div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Jessica L.</div>
                  <div className="text-yellow-500">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 italic text-base leading-relaxed">
                "Best decision ever! Saw real-time availability and booked instantly. Max's groomer is fantastic!"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-gray-900">
            Why Pet Parents Love Us 💙
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Everything you need for stress-free pet grooming
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">🐕 No Account Needed</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Book instantly without signing up. Just enter your pet's info and pick a time. Simple as that!
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">⭐ Trusted Groomers</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                All groomers are verified professionals who love pets as much as you do. Your furry friend is in good hands!
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">🕐 Real-Time Availability</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                See exactly when groomers are free. No phone tag, no waiting for callbacks. Book the perfect time slot now!
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">💰 Clear Pricing</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                See prices upfront. No hidden fees, no surprises. Know exactly what you're paying before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section with Schema Markup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-4">
            Frequently Asked Questions 💬
          </h2>
          <p className="text-center text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
            Everything you need to know about booking pet grooming with PetCareBooker
          </p>

          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                How much does dog grooming cost?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                <strong>Dog grooming costs</strong> vary by location, pet size, breed, and services. On average, expect $50-$150 for a full grooming session including bath, haircut, nail trim, and ear cleaning. Small dogs (under 20 lbs) typically cost $50-$80, medium dogs (20-50 lbs) cost $70-$110, and large dogs (50+ lbs) cost $90-$150. Mobile pet grooming services may cost 10-20% more ($15-$25 additional). Prices are higher in major metro areas like NYC, LA, and Miami. <Link href="/blog/how-much-does-dog-grooming-cost" className="text-purple-600 font-semibold hover:underline">Read our complete dog grooming cost guide</Link> for detailed pricing by city and breed.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                How often should you groom your dog?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                Most dogs need professional grooming every <strong>6-8 weeks</strong>, but this varies by breed and coat type. Breeds with continuously growing hair (Poodles, Shih Tzus, Yorkshire Terriers) may need grooming every 4-6 weeks. Short-haired breeds (Labradors, Beagles) can go 8-12 weeks between grooms. Dogs that swim frequently or have thick double coats may need more frequent grooming. Regular brushing at home between professional grooms helps maintain coat health. <Link href="/blog/how-often-groom-dog" className="text-purple-600 font-semibold hover:underline">Learn more about dog grooming frequency by breed</Link>.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Do I need to create an account to book?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                No! You can book instantly without creating an account. Just browse groomers, pick a time, add your pet's information, and confirm. We'll send you SMS updates about your appointment. Creating an account is optional but helpful if you want to manage multiple pets or track appointment history.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Are all groomers verified and licensed?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                Yes! All groomers on PetCareBooker are verified professionals with proper business licenses and insurance. We carefully vet each groomer to ensure they meet our standards for safety, cleanliness, and pet care expertise. You can read verified reviews from real pet parents before booking.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Can I book same-day grooming appointments?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                Many groomers offer same-day appointments based on availability! Our real-time booking system shows you exactly when each groomer has open slots. During busy seasons (holidays, summer), we recommend booking 2-3 days in advance. Mobile groomers especially tend to book quickly.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                What's included in a standard grooming appointment?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                A standard grooming session typically includes: bath with premium shampoo, blow dry and brush out, haircut or trim (breed-specific or your preference), nail trimming and filing, ear cleaning, and sanitary trim. Some groomers also include teeth brushing, paw pad moisturizing, and a cologne spritz at no extra charge.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Do you offer mobile grooming services?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                Yes! Many groomers on our platform offer mobile grooming that comes to your home. Mobile grooming is perfect for anxious pets, busy schedules, or multi-pet households. Mobile groomers arrive in fully-equipped vans with everything needed. Use our filter to find "Mobile Grooming" services in your area.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                What if my pet has special needs or is anxious?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                Many of our groomers specialize in anxious, senior, or special-needs pets! When booking, look for groomers with "Senior Pet Care," "Anxiety-Friendly," or "Special Needs" badges. You can also message groomers before booking to discuss your pet's specific requirements. Mobile grooming can be especially helpful for anxious pets as it's a calmer, one-on-one environment.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                How far in advance should I book?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                For routine grooming, booking 3-7 days in advance is ideal. During peak times (holidays, summer, weekends), we recommend 1-2 weeks ahead. However, many groomers have same-day or next-day availability! Our real-time calendar shows you exactly what's available so you can book what works best for your schedule.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                What is included in dog grooming?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                A standard <strong>dog grooming</strong> session typically includes: bath with premium shampoo, blow dry and brush out, haircut or trim (breed-specific or your preference), nail trimming and filing, ear cleaning, and sanitary trim. Some groomers also include teeth brushing, paw pad moisturizing, and a cologne spritz at no extra charge. Additional services like de-shedding treatments, flea/tick baths, or specialty cuts may cost extra. Always confirm what's included when booking.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                How long does dog grooming take?
              </summary>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                Most <strong>dog grooming</strong> appointments take <strong>2-4 hours</strong>, depending on your dog's size, coat condition, and the services requested. Small dogs typically take 1.5-2.5 hours, medium dogs 2-3 hours, and large dogs 3-4 hours. Dogs with matted coats or requiring extensive de-shedding may take longer. Mobile grooming appointments are usually faster (1-2 hours) since your pet gets one-on-one attention without waiting. Your groomer will give you an estimated completion time when you drop off your pet.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Schema.org LocalBusiness structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://www.petcarebooker.com',
            name: 'PetCareBooker',
            description: 'Online pet grooming booking platform connecting pet parents with trusted, verified groomers nationwide. Instant booking, real-time availability, and verified reviews.',
            url: 'https://www.petcarebooker.com',
            logo: 'https://www.petcarebooker.com/logo.png',
            image: 'https://www.petcarebooker.com/og-image.png',
            priceRange: '$$',
            telephone: '+1-555-PET-CARE',
            areaServed: [
              {
                '@type': 'State',
                name: 'Florida',
              },
              {
                '@type': 'State',
                name: 'New York',
              },
              {
                '@type': 'Country',
                name: 'United States',
              },
            ],
            serviceType: 'Pet Grooming Booking Platform',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Pet Grooming Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Dog Grooming',
                    description: 'Professional dog grooming including bath, haircut, nail trim, and ear cleaning',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Cat Grooming',
                    description: 'Expert cat grooming with gentle handling and specialized techniques',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Mobile Pet Grooming',
                    description: 'Convenient mobile grooming services that come to your home',
                  },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '1200',
              bestRating: '5',
              worstRating: '1',
            },
            sameAs: [
              'https://www.facebook.com/petcarebooker',
              'https://www.instagram.com/petcarebooker',
              'https://twitter.com/petcarebooker',
            ],
          }),
        }}
      />

      {/* Schema.org Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PetCareBooker',
            url: 'https://www.petcarebooker.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.petcarebooker.com/icon-512.png',
              width: 512,
              height: 512,
            },
            description: 'Book pet grooming appointments instantly. Find trusted groomers near you with verified reviews and real-time availability.',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: 'haquemediagroup@gmail.com',
              url: 'https://www.petcarebooker.com/contact',
            },
            sameAs: [
              'https://www.petcarebooker.com',
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '1200',
            },
          }),
        }}
      />

      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much does dog grooming cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dog grooming costs vary by location, pet size, breed, and services. On average, expect $50-$150 for a full grooming session including bath, haircut, nail trim, and ear cleaning. Small dogs (under 20 lbs) typically cost $50-$80, medium dogs (20-50 lbs) cost $70-$110, and large dogs (50+ lbs) cost $90-$150. Mobile pet grooming services may cost 10-20% more ($15-$25 additional).',
                },
              },
              {
                '@type': 'Question',
                name: 'How often should you groom your dog?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most dogs need professional grooming every 6-8 weeks, but this varies by breed and coat type. Breeds with continuously growing hair (Poodles, Shih Tzus, Yorkshire Terriers) may need grooming every 4-6 weeks. Short-haired breeds (Labradors, Beagles) can go 8-12 weeks between grooms.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is included in dog grooming?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A standard dog grooming session typically includes: bath with premium shampoo, blow dry and brush out, haircut or trim (breed-specific or your preference), nail trimming and filing, ear cleaning, and sanitary trim. Some groomers also include teeth brushing, paw pad moisturizing, and a cologne spritz at no extra charge.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does dog grooming take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most dog grooming appointments take 2-4 hours, depending on your dog\'s size, coat condition, and the services requested. Small dogs typically take 1.5-2.5 hours, medium dogs 2-3 hours, and large dogs 3-4 hours. Mobile grooming appointments are usually faster (1-2 hours) since your pet gets one-on-one attention.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to create an account to book?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No! You can book instantly without creating an account. Just browse groomers, pick a time, add your pet information, and confirm. We will send you SMS updates about your appointment.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are all groomers verified and licensed?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! All groomers on PetCareBooker are verified professionals with proper business licenses and insurance. We carefully vet each groomer to ensure they meet our standards for safety, cleanliness, and pet care expertise.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I book same-day grooming appointments?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Many groomers offer same-day appointments based on availability! Our real-time booking system shows you exactly when each groomer has open slots. During busy seasons, we recommend booking 2-3 days in advance.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you offer mobile grooming services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Many groomers on our platform offer mobile grooming that comes to your home. Mobile grooming is perfect for anxious pets, busy schedules, or multi-pet households. Use our filter to find Mobile Grooming services in your area.',
                },
              },
              {
                '@type': 'Question',
                name: 'What if my pet has special needs or is anxious?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Many of our groomers specialize in anxious, senior, or special-needs pets! When booking, look for groomers with Senior Pet Care, Anxiety-Friendly, or Special Needs badges. Mobile grooming can be especially helpful for anxious pets.',
                },
              },
              {
                '@type': 'Question',
                name: 'How far in advance should I book?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For routine grooming, booking 3-7 days in advance is ideal. During peak times (holidays, summer, weekends), we recommend 1-2 weeks ahead. However, many groomers have same-day or next-day availability!',
                },
              },
            ],
          }),
        }}
      />

      {/* Popular Cities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Find Groomers in Your City 🗺️
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse verified pet groomers in top cities across the US
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'Miami', slug: 'miami', emoji: '🌴' },
              { name: 'Tampa', slug: 'tampa', emoji: '⚡' },
              { name: 'Orlando', slug: 'orlando', emoji: '🎢' },
              { name: 'NYC', slug: 'new-york-city', emoji: '🗽' },
              { name: 'Chicago', slug: 'chicago', emoji: '🏙️' },
              { name: 'Los Angeles', slug: 'los-angeles', emoji: '🌟' },
              { name: 'Fort Lauderdale', slug: 'fort-lauderdale', emoji: '⛵' },
              { name: 'West Palm Beach', slug: 'west-palm-beach', emoji: '🌴' },
              { name: 'Brooklyn', slug: 'brooklyn', emoji: '🌉' },
              { name: 'Queens', slug: 'queens', emoji: '👑' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-purple-100"
              >
                <div className="text-4xl mb-2">{city.emoji}</div>
                <div className="font-bold text-gray-900">{city.name}</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/browse"
              className="text-purple-600 font-bold hover:underline text-lg"
            >
              View All Cities →
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-teal-500 py-20">
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

      <Footer />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PetCareBooker',
            url: 'https://www.petcarebooker.com',
            logo: 'https://petcarebooker.com/logo.png',
            description: 'Online pet grooming booking platform connecting pet owners with verified professional groomers',
            sameAs: [
              'https://www.facebook.com/petcarebooker',
              'https://twitter.com/petcarebooker',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              availableLanguage: 'English',
            },
          }),
        }}
      />
    </div>
  );
}

/* Updated */
