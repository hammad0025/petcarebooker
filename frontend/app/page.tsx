import Link from 'next/link';
import CityAutocomplete from '@/components/CityAutocomplete';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PetCareBooker | Book Pet Grooming Near You | Instant Online Booking',
  description: 'Find and book trusted pet groomers near you instantly. No phone calls, no waiting. Compare prices, read verified reviews, and schedule dog and cat grooming in seconds. Serving 100+ cities nationwide.',
  keywords: 'pet grooming, dog grooming, cat grooming, mobile pet grooming, pet grooming near me, book pet groomer, dog groomer near me, pet spa',
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
            href="/guides" 
            className="text-white hover:text-gray-100 font-semibold transition-all hover:scale-105"
          >
            Guides
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

                 {/* Large Search Bar - Vagaro/Booksy style with autocomplete */}
                 <div className="w-full max-w-3xl mb-8">
                   <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3">
                     <div className="flex-1">
                       <CityAutocomplete />
                     </div>
                     <select className="px-4 py-5 text-xl rounded-xl focus:outline-none bg-gray-50 text-gray-700 border border-gray-200">
                       <option>All Services</option>
                       <option>Dog Grooming</option>
                       <option>Cat Grooming</option>
                       <option>Mobile Grooming</option>
                       <option>Spa Services</option>
                     </select>
                     <Link 
                       href="/browse"
                       className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-5 rounded-xl font-bold hover:from-purple-700 hover:to-pink-600 transition-all whitespace-nowrap text-xl shadow-lg hover:scale-105"
                     >
                       Search
                     </Link>
                   </div>
                 </div>

          {/* Popular Cities Quick Links */}
          <div className="mb-8">
            <p className="text-white/90 text-lg mb-4 font-semibold">Popular Cities:</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              <Link href="/cities/miami" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">Miami</Link>
              <Link href="/cities/new-york-city" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">NYC</Link>
              <Link href="/cities/tampa" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">Tampa</Link>
              <Link href="/cities/orlando" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">Orlando</Link>
              <Link href="/cities/brooklyn" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">Brooklyn</Link>
              <Link href="/cities/west-palm-beach" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">West Palm Beach</Link>
              <Link href="/cities/fort-lauderdale" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">Fort Lauderdale</Link>
              <Link href="/cities/jacksonville" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">Jacksonville</Link>
              <Link href="/cities/buffalo" className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all text-sm font-medium">Buffalo</Link>
              <Link href="/browse" className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all text-sm font-bold border border-white/30">View All Cities →</Link>
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

      {/* FAQ Section with Schema Markup */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-4">
            Frequently Asked Questions 💬
          </h2>
          <p className="text-center text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
            Everything you need to know about booking pet grooming with PetCareBooker
          </p>

          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                How much does pet grooming cost?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Pet grooming costs vary by location, pet size, and services. On average, expect $50-$150 for a full grooming session including bath, haircut, nail trim, and ear cleaning. Small dogs typically cost $50-$80, medium dogs $70-$110, and large dogs $90-$150. Mobile grooming services may cost 10-20% more.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Do I need to create an account to book?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                No! You can book instantly without creating an account. Just browse groomers, pick a time, add your pet's information, and confirm. We'll send you SMS updates about your appointment. Creating an account is optional but helpful if you want to manage multiple pets or track appointment history.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Are all groomers verified and licensed?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Yes! All groomers on PetCareBooker are verified professionals with proper business licenses and insurance. We carefully vet each groomer to ensure they meet our standards for safety, cleanliness, and pet care expertise. You can read verified reviews from real pet parents before booking.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Can I book same-day grooming appointments?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Many groomers offer same-day appointments based on availability! Our real-time booking system shows you exactly when each groomer has open slots. During busy seasons (holidays, summer), we recommend booking 2-3 days in advance. Mobile groomers especially tend to book quickly.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                What's included in a standard grooming appointment?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                A standard grooming session typically includes: bath with premium shampoo, blow dry and brush out, haircut or trim (breed-specific or your preference), nail trimming and filing, ear cleaning, and sanitary trim. Some groomers also include teeth brushing, paw pad moisturizing, and a cologne spritz at no extra charge.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                Do you offer mobile grooming services?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Yes! Many groomers on our platform offer mobile grooming that comes to your home. Mobile grooming is perfect for anxious pets, busy schedules, or multi-pet households. Mobile groomers arrive in fully-equipped vans with everything needed. Use our filter to find "Mobile Grooming" services in your area.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                What if my pet has special needs or is anxious?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Many of our groomers specialize in anxious, senior, or special-needs pets! When booking, look for groomers with "Senior Pet Care," "Anxiety-Friendly," or "Special Needs" badges. You can also message groomers before booking to discuss your pet's specific requirements. Mobile grooming can be especially helpful for anxious pets as it's a calmer, one-on-one environment.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer hover:text-purple-600">
                How far in advance should I book?
              </summary>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                For routine grooming, booking 3-7 days in advance is ideal. During peak times (holidays, summer, weekends), we recommend 1-2 weeks ahead. However, many groomers have same-day or next-day availability! Our real-time calendar shows you exactly what's available so you can book what works best for your schedule.
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
                name: 'How much does pet grooming cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pet grooming costs vary by location, pet size, and services. On average, expect $50-$150 for a full grooming session including bath, haircut, nail trim, and ear cleaning. Small dogs typically cost $50-$80, medium dogs $70-$110, and large dogs $90-$150.',
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
                name: 'What is included in a standard grooming appointment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A standard grooming session typically includes: bath with premium shampoo, blow dry and brush out, haircut or trim, nail trimming and filing, ear cleaning, and sanitary trim. Some groomers also include teeth brushing and paw pad moisturizing.',
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
        <div className="container mx-auto px-4">
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

      <Footer />
              <h4 className="font-bold mb-4">Florida Cities</h4>
              <ul className="space-y-2">
                <li><Link href="/cities/miami" className="text-gray-400 hover:text-white transition">Miami</Link></li>
                <li><Link href="/cities/tampa" className="text-gray-400 hover:text-white transition">Tampa</Link></li>
                <li><Link href="/cities/orlando" className="text-gray-400 hover:text-white transition">Orlando</Link></li>
                <li><Link href="/cities/west-palm-beach" className="text-gray-400 hover:text-white transition">West Palm Beach</Link></li>
                <li><Link href="/cities/fort-lauderdale" className="text-gray-400 hover:text-white transition">Fort Lauderdale</Link></li>
                <li><Link href="/cities/jacksonville" className="text-gray-400 hover:text-white transition">Jacksonville</Link></li>
                <li><Link href="/cities/naples" className="text-gray-400 hover:text-white transition">Naples</Link></li>
                <li><Link href="/browse" className="text-gray-400 hover:text-white transition">View All →</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">New York Cities</h4>
              <ul className="space-y-2">
                <li><Link href="/cities/new-york-city" className="text-gray-400 hover:text-white transition">New York City</Link></li>
                <li><Link href="/cities/brooklyn" className="text-gray-400 hover:text-white transition">Brooklyn</Link></li>
                <li><Link href="/cities/queens" className="text-gray-400 hover:text-white transition">Queens</Link></li>
                <li><Link href="/cities/buffalo" className="text-gray-400 hover:text-white transition">Buffalo</Link></li>
                <li><Link href="/cities/rochester" className="text-gray-400 hover:text-white transition">Rochester</Link></li>
                <li><Link href="/cities/syracuse" className="text-gray-400 hover:text-white transition">Syracuse</Link></li>
                <li><Link href="/cities/albany" className="text-gray-400 hover:text-white transition">Albany</Link></li>
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

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PetCareBooker',
            url: 'https://www.petcarebooker.com',
            logo: 'https://www.petcarebooker.com/logo.png',
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

