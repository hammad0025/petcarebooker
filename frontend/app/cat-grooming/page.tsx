import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cat Grooming | Cat Grooming Near Me | Professional Cat Groomers',
  description: 'Find professional cat grooming services near you. Expert cat groomers offer gentle handling, breed-specific cuts, and mobile grooming. Book cat grooming online with verified reviews.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/cat-grooming',
  },
  openGraph: {
    title: 'Cat Grooming | Cat Grooming Near Me | Professional Cat Groomers',
    description: 'Find professional cat grooming services near you. Expert cat groomers offer gentle handling, breed-specific cuts, and mobile grooming.',
    type: 'website',
    url: 'https://www.petcarebooker.com/cat-grooming',
  },
};

export default function CatGroomingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Cat Grooming: Professional Care for Your Feline Friend 🐱
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Find <strong>cat grooming</strong> services and <strong>cat grooming near me</strong>. Expert cat groomers offer gentle handling, breed-specific expertise, and stress-free grooming experiences. Book professional <strong>cat grooming</strong> online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse?service=cat-grooming"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition"
              >
                Find Cat Grooming Near Me →
              </Link>
              <Link
                href="/cat-grooming-supplies"
                className="bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-800 transition"
              >
                Shop Cat Grooming Supplies →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Cat Grooming is Important */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-orange-200">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Why Professional Cat Grooming is Essential
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                <strong>Cat grooming</strong> is more than just keeping your feline friend looking good - it's essential for their health and wellbeing. Regular <strong>cat grooming</strong> helps prevent matting, reduces hairballs, maintains healthy skin and coat, and allows early detection of health issues like skin conditions, parasites, or lumps.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                While some cats are excellent self-groomers, many breeds require regular professional <strong>cat grooming</strong> to maintain their coat health. Long-haired breeds like Persians, Maine Coons, and Ragdolls are particularly prone to matting and need regular grooming every 4-6 weeks. Even short-haired cats benefit from professional <strong>cat grooming</strong> for nail trimming, ear cleaning, and overall health maintenance.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 border border-orange-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Health Benefits</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Prevents matting and skin irritation</li>
                    <li>✓ Reduces hairballs and shedding</li>
                    <li>✓ Early detection of health issues</li>
                    <li>✓ Maintains healthy skin and coat</li>
                    <li>✓ Prevents nail overgrowth</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 border border-pink-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Comfort & Wellbeing</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Reduces stress and anxiety</li>
                    <li>✓ Prevents painful matting</li>
                    <li>✓ Keeps cats comfortable</li>
                    <li>✓ Improves mobility and flexibility</li>
                    <li>✓ Enhances overall quality of life</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cat Grooming Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Cat Grooming Services Available
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Cat Grooming</h3>
                <p className="text-gray-700 text-lg mb-4">
                  A complete <strong>cat grooming</strong> session includes bath, blow-dry, brush-out, nail trimming, ear cleaning, and sanitary trim. This is ideal for long-haired breeds or cats who need regular maintenance.
                </p>
                <p className="text-gray-600 mb-4"><strong>Price Range:</strong> $60-$130 depending on breed and coat condition</p>
                <Link
                  href="/browse?service=cat-grooming"
                  className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Book Full Cat Grooming →
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lion Cut for Severely Matted Cats</h3>
                <p className="text-gray-700 text-lg mb-4">
                  For cats with severe matting that can't be brushed out, a lion cut removes all fur except for the head, feet, and tail tip. This is a last resort but can be life-saving for severely matted cats.
                </p>
                <p className="text-gray-600 mb-4"><strong>Price Range:</strong> $85-$150 depending on severity</p>
                <Link
                  href="/browse?service=cat-grooming"
                  className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition"
                >
                  Find Lion Cut Specialists →
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile Cat Grooming</h3>
                <p className="text-gray-700 text-lg mb-4">
                  <strong>Mobile cat grooming</strong> brings professional grooming services to your home. This is perfect for anxious cats who don't travel well or prefer familiar environments. Many cats are less stressed when groomed at home.
                </p>
                <p className="text-gray-600 mb-4"><strong>Price Range:</strong> $75-$120 (typically $15-$25 more than salon)</p>
                <Link
                  href="/browse?service=mobile-grooming&service=cat-grooming"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Find Mobile Cat Grooming →
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Maintenance Services</h3>
                <p className="text-gray-700 text-lg mb-4">
                  For cats who don't need full grooming, basic services include nail trimming, ear cleaning, sanitary trim, and brush-out. These services are perfect for short-haired cats or between full grooms.
                </p>
                <p className="text-gray-600 mb-4"><strong>Price Range:</strong> $30-$60</p>
                <Link
                  href="/browse?service=cat-grooming"
                  className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-700 transition"
                >
                  Book Basic Services →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Breed-Specific Cat Grooming */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Breed-Specific Cat Grooming Needs
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Long-Haired Breeds (Persian, Maine Coon, Ragdoll)</h3>
                <p className="text-gray-700 text-lg mb-3">
                  Long-haired cats require the most frequent <strong>cat grooming</strong> - typically every 4-6 weeks. These breeds are prone to matting, especially around the belly, armpits, and behind the ears. Professional <strong>cat grooming</strong> is essential to prevent painful matting and skin issues.
                </p>
                <p className="text-gray-600"><strong>Recommended Frequency:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Medium-Haired Breeds (Norwegian Forest Cat, Siberian)</h3>
                <p className="text-gray-700 text-lg mb-3">
                  Medium-haired cats benefit from <strong>cat grooming</strong> every 6-8 weeks. While they're better self-groomers than long-haired breeds, they still need regular professional care to prevent matting and maintain coat health.
                </p>
                <p className="text-gray-600"><strong>Recommended Frequency:</strong> Every 6-8 weeks</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Short-Haired Breeds (American Shorthair, British Shorthair)</h3>
                <p className="text-gray-700 text-lg mb-3">
                  Short-haired cats typically need <strong>cat grooming</strong> less frequently - every 8-12 weeks or as needed. However, they still benefit from regular nail trimming, ear cleaning, and occasional baths to reduce shedding and maintain skin health.
                </p>
                <p className="text-gray-600"><strong>Recommended Frequency:</strong> Every 8-12 weeks or as needed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cat Grooming Tips */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Tips for Successful Cat Grooming
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Preparing Your Cat</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Start grooming when your cat is young to acclimate them</li>
                  <li>• Brush your cat regularly between professional grooms</li>
                  <li>• Keep grooming sessions positive with treats and praise</li>
                  <li>• Choose a cat-only groomer or facility for less stress</li>
                  <li>• Consider sedation for extremely anxious cats (consult your vet)</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Most <strong>cat grooming</strong> sessions take 1-2 hours</li>
                  <li>• Groomers use gentle, fear-free techniques</li>
                  <li>• Separate quiet areas for nervous cats</li>
                  <li>• Extended appointment times for gentle handling</li>
                  <li>• Mobile grooming available for home-shy cats</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Find Cat Grooming in Your City
            </h2>
            <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
              Search for <strong>cat grooming near me</strong> in cities across the United States. Click on your city below to find professional <strong>cat grooming</strong> services in your area.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Miami', state: 'FL', slug: 'miami' },
                { name: 'Denver', state: 'CO', slug: 'denver' },
                { name: 'Atlanta', state: 'GA', slug: 'atlanta' },
                { name: 'Los Angeles', state: 'CA', slug: 'los-angeles' },
                { name: 'New York City', state: 'NY', slug: 'new-york-city' },
                { name: 'Chicago', state: 'IL', slug: 'chicago' },
                { name: 'Houston', state: 'TX', slug: 'houston' },
                { name: 'Phoenix', state: 'AZ', slug: 'phoenix' },
                { name: 'San Diego', state: 'CA', slug: 'san-diego' },
                { name: 'Dallas', state: 'TX', slug: 'dallas' },
                { name: 'Seattle', state: 'WA', slug: 'seattle' },
                { name: 'Boston', state: 'MA', slug: 'boston' },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition text-center"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {city.name}, {city.state}
                  </h3>
                  <p className="text-gray-600">Cat grooming in {city.name}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/cities"
                className="inline-block bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition"
              >
                View All Cities →
              </Link>
            </div>
          </div>
        </section>

        {/* Supplies CTA */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Need Cat Grooming Supplies?
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Keep your cat's coat healthy between professional grooms with quality <strong>cat grooming supplies</strong>. Shop brushes, combs, shampoos, and more.
              </p>
              <Link
                href="/cat-grooming-supplies"
                className="inline-block bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition"
              >
                Shop Cat Grooming Supplies →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Book Cat Grooming?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Find <strong>cat grooming near me</strong> and book professional <strong>cat grooming</strong> services online. Expert groomers, gentle handling, and verified reviews.
            </p>
            <Link
              href="/browse?service=cat-grooming"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition"
            >
              Find Cat Grooming Near Me →
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
            '@id': 'https://www.petcarebooker.com/cat-grooming',
            name: 'Cat Grooming | Cat Grooming Near Me | Professional Cat Groomers',
            description: 'Find professional cat grooming services near you. Expert cat groomers offer gentle handling, breed-specific cuts, and mobile grooming.',
            url: 'https://www.petcarebooker.com/cat-grooming',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PetCareBooker',
              url: 'https://www.petcarebooker.com',
            },
            about: {
              '@type': 'Service',
              serviceType: 'Cat Grooming',
              description: 'Professional cat grooming services with gentle handling for anxious felines',
            },
          }),
        }}
      />
    </>
  );
}

