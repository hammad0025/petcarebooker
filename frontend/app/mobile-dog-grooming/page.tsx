import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mobile Dog Grooming | Mobile Groomers Near Me | Book Online',
  description: 'Find mobile dog grooming services near you. Mobile groomers come to your home with fully-equipped vans. Book mobile dog grooming online - perfect for anxious pets, busy schedules, and multi-pet households.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/mobile-dog-grooming',
  },
  openGraph: {
    title: 'Mobile Dog Grooming | Mobile Groomers Near Me | Book Online',
    description: 'Find mobile dog grooming services near you. Mobile groomers come to your home with fully-equipped vans. Book mobile dog grooming online.',
    type: 'website',
    url: 'https://www.petcarebooker.com/mobile-dog-grooming',
  },
};

export default function MobileDogGroomingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Mobile Dog Grooming: Convenience at Your Doorstep 🚐
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Find <strong>mobile dog grooming</strong> services and <strong>mobile groomers near me</strong>. Professional groomers come to your home with fully-equipped vans. No travel stress, no waiting rooms - just convenient, stress-free grooming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse?service=mobile-grooming"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
              >
                Find Mobile Groomers Near Me →
              </Link>
              <Link
                href="/cities"
                className="bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-800 transition"
              >
                Browse by City →
              </Link>
            </div>
          </div>
        </section>

        {/* What is Mobile Dog Grooming */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                What is Mobile Dog Grooming?
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                <strong>Mobile dog grooming</strong> brings professional pet grooming services directly to your home. Instead of driving your dog to a salon, a fully-equipped <strong>mobile dog grooming</strong> van arrives at your driveway with everything needed for a complete grooming session. This eliminates travel stress, reduces exposure to other pets, and provides one-on-one attention in a familiar environment.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                When you search for <strong>mobile groomers near me</strong>, you'll find licensed professionals who operate state-of-the-art grooming vans with climate control, professional-grade equipment, and all the amenities of a traditional salon. <strong>Mobile dog grooming</strong> is perfect for anxious pets, busy schedules, multi-pet households, and pet parents who prefer the convenience of at-home service.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 border border-purple-100">
                  <div className="text-4xl mb-3">🚐</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fully Equipped Vans</h3>
                  <p className="text-gray-600">Professional-grade equipment, climate control, and all salon amenities in a mobile unit</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-pink-100">
                  <div className="text-4xl mb-3">🏠</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">At Your Home</h3>
                  <p className="text-gray-600">No travel required - groomers come to your driveway, condo, or office</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-orange-100">
                  <div className="text-4xl mb-3">❤️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">One-on-One Care</h3>
                  <p className="text-gray-600">Individual attention in a quiet, stress-free environment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Why Choose Mobile Dog Grooming?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect for Anxious Pets</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Many dogs experience stress when traveling to a salon or being in unfamiliar environments. <strong>Mobile dog grooming</strong> eliminates this anxiety by bringing the service to your pet's familiar surroundings. Your dog stays in their comfort zone while receiving professional care.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ No car rides or travel stress</li>
                  <li>✓ Familiar environment reduces anxiety</li>
                  <li>✓ No exposure to other animals</li>
                  <li>✓ Quiet, one-on-one attention</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Convenience for Busy Schedules</h3>
                <p className="text-gray-700 text-lg mb-4">
                  <strong>Mobile groomers near me</strong> work around your schedule, eliminating the need to drop off and pick up your pet. While your dog is being groomed in the van, you can continue working, running errands, or relaxing at home. No waiting rooms, no parking hassles.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ No drop-off or pick-up trips</li>
                  <li>✓ Work from home while pet is groomed</li>
                  <li>✓ Flexible scheduling</li>
                  <li>✓ Perfect for busy professionals</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ideal for Multi-Pet Households</h3>
                <p className="text-gray-700 text-lg mb-4">
                  If you have multiple dogs or pets, <strong>mobile dog grooming</strong> is especially convenient. Many mobile groomers offer package deals for multiple pets and can groom them back-to-back in the same visit. This saves time and often money compared to multiple salon visits.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Multiple pets groomed in one visit</li>
                  <li>✓ Package deals available</li>
                  <li>✓ No need to coordinate multiple appointments</li>
                  <li>✓ Saves time and money</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect for Senior or Special Needs Pets</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Senior dogs or pets with mobility issues benefit greatly from <strong>mobile dog grooming</strong>. The groomer comes to your home, eliminating the physical stress of travel. Many mobile groomers are experienced with special needs pets and can provide gentle, accommodating care.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ No travel stress for senior pets</li>
                  <li>✓ Experienced with special needs</li>
                  <li>✓ Gentle, accommodating care</li>
                  <li>✓ Comfortable environment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              How Mobile Dog Grooming Works
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Book Your Appointment</h3>
                  <p className="text-gray-700 text-lg">
                    Search for <strong>mobile groomers near me</strong> on PetCareBooker and book an appointment online. Choose a date and time that works for your schedule. Most <strong>mobile dog grooming</strong> services require 1-2 weeks advance booking, especially during peak seasons.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Groomer Arrives at Your Home</h3>
                  <p className="text-gray-700 text-lg">
                    On the day of your appointment, the <strong>mobile dog grooming</strong> van arrives at your home. The groomer will call or text when they're on their way. Ensure you have driveway access or street parking available for the van (typically 20-25 feet long).
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Pet is Groomed</h3>
                  <p className="text-gray-700 text-lg">
                    Your dog is taken into the climate-controlled van where they receive a complete grooming session. This typically includes bath, blow-dry, haircut, nail trim, ear cleaning, and sanitary trim. The entire process takes 1-2 hours depending on your dog's size and coat condition.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Receive Your Freshly Groomed Pet</h3>
                  <p className="text-gray-700 text-lg">
                    Once grooming is complete, your freshly groomed pet is returned to you. The groomer handles all cleanup, so there's no mess in your home. Many <strong>mobile dog grooming</strong> services also offer text updates with photos during the grooming process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Mobile Dog Grooming Prices
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <p className="text-gray-700 text-lg mb-6 text-center">
                <strong>Mobile dog grooming</strong> typically costs $15-$25 more than salon grooming due to the convenience and overhead of operating a mobile unit. However, many pet parents find the added cost worth it for the convenience and reduced stress.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Average Mobile Dog Grooming Prices</h3>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li><strong>Small dogs (under 15 lbs):</strong> $70-$110</li>
                    <li><strong>Medium dogs (15-40 lbs):</strong> $85-$130</li>
                    <li><strong>Large dogs (40-80 lbs):</strong> $100-$150</li>
                    <li><strong>Extra-large dogs (80+ lbs):</strong> $125-$175</li>
                    <li><strong>Cats:</strong> $75-$120</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    Prices vary by location, groomer experience, and service level. Exact pricing depends on coat condition, matting, and requested style.
                  </p>
                </div>

                <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li>✓ Full bath with premium shampoo</li>
                    <li>✓ Blow-dry and brush-out</li>
                    <li>✓ Haircut or trim (breed-specific or custom)</li>
                    <li>✓ Nail trimming and filing</li>
                    <li>✓ Ear cleaning</li>
                    <li>✓ Sanitary trim</li>
                    <li>✓ Paw pad moisturizing (many groomers)</li>
                    <li>✓ Cologne spritz (many groomers)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Find Mobile Dog Grooming in Your City
            </h2>
            <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
              <strong>Mobile groomers near me</strong> are available in cities across the United States. Click on your city below to find <strong>mobile dog grooming</strong> services in your area.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Miami', state: 'FL', slug: 'miami' },
                { name: 'Los Angeles', state: 'CA', slug: 'los-angeles' },
                { name: 'New York City', state: 'NY', slug: 'new-york-city' },
                { name: 'Chicago', state: 'IL', slug: 'chicago' },
                { name: 'West Palm Beach', state: 'FL', slug: 'west-palm-beach' },
                { name: 'Virginia Beach', state: 'VA', slug: 'virginia-beach' },
                { name: 'Houston', state: 'TX', slug: 'houston' },
                { name: 'Phoenix', state: 'AZ', slug: 'phoenix' },
                { name: 'San Diego', state: 'CA', slug: 'san-diego' },
                { name: 'Dallas', state: 'TX', slug: 'dallas' },
                { name: 'Austin', state: 'TX', slug: 'austin' },
                { name: 'Seattle', state: 'WA', slug: 'seattle' },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition text-center"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {city.name}, {city.state}
                  </h3>
                  <p className="text-gray-600">Mobile dog grooming in {city.name}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/cities"
                className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition"
              >
                View All Cities →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Book Mobile Dog Grooming?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Find <strong>mobile groomers near me</strong> and book <strong>mobile dog grooming</strong> services online. Instant booking, verified reviews, and convenient at-home service.
            </p>
            <Link
              href="/browse?service=mobile-grooming"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
            >
              Find Mobile Groomers Near Me →
            </Link>
          </div>
        </section>
      </div>
      <Footer />

      {/* Schema.org WebPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://www.petcarebooker.com/mobile-dog-grooming',
            name: 'Mobile Dog Grooming | Mobile Groomers Near Me',
            description: 'Find mobile dog grooming services near you. Mobile groomers come to your home with fully-equipped vans. Book mobile dog grooming online.',
            url: 'https://www.petcarebooker.com/mobile-dog-grooming',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PetCareBooker',
              url: 'https://www.petcarebooker.com',
            },
            about: {
              '@type': 'Service',
              serviceType: 'Mobile Dog Grooming',
              description: 'Professional mobile dog grooming services that come to your home',
            },
          }),
        }}
      />
    </>
  );
}

