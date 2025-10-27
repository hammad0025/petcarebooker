import Link from 'next/link';
import { Metadata } from 'next';

// City data - in production this would come from your database
const cityData: Record<string, any> = {
  'new-york-city': {
    name: 'New York City',
    state: 'NY',
    description: 'Find the best pet groomers in New York City. From Manhattan to Brooklyn, discover top-rated grooming salons with instant booking.',
    neighborhoods: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
    avgPrice: '$75-$150',
    totalGroomers: 247,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Spa Treatments'],
  },
  'los-angeles': {
    name: 'Los Angeles',
    state: 'CA',
    description: 'Discover LA\'s finest pet grooming services. From Hollywood to Venice Beach, book trusted groomers with verified reviews.',
    neighborhoods: ['Hollywood', 'Santa Monica', 'Venice', 'Downtown LA', 'Pasadena'],
    avgPrice: '$70-$140',
    totalGroomers: 198,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Luxury Spa'],
  },
  'miami': {
    name: 'Miami',
    state: 'FL',
    description: 'Book pet grooming in Miami with ease. Find experienced groomers in South Beach, Coral Gables, and beyond.',
    neighborhoods: ['South Beach', 'Coral Gables', 'Brickell', 'Wynwood', 'Coconut Grove'],
    avgPrice: '$65-$130',
    totalGroomers: 142,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'De-shedding'],
  },
  'west-palm-beach': {
    name: 'West Palm Beach',
    state: 'FL',
    description: 'Discover top-rated pet groomers in West Palm Beach. From downtown to the beaches, find trusted grooming services with instant booking.',
    neighborhoods: ['Downtown', 'Northwood', 'Flamingo Park', 'South Dixie', 'City Place'],
    avgPrice: '$60-$125',
    totalGroomers: 89,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Puppy Cuts'],
  },
  'tampa': {
    name: 'Tampa',
    state: 'FL',
    description: 'Find the best pet groomers in Tampa Bay. From Ybor City to Hyde Park, book verified groomers with real reviews.',
    neighborhoods: ['Hyde Park', 'Ybor City', 'Seminole Heights', 'Westshore', 'South Tampa'],
    avgPrice: '$60-$120',
    totalGroomers: 134,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Spa Treatments'],
  },
  'orlando': {
    name: 'Orlando',
    state: 'FL',
    description: 'Book pet grooming in Orlando instantly. Discover experienced groomers from Winter Park to Lake Nona with verified reviews.',
    neighborhoods: ['Winter Park', 'Downtown Orlando', 'Lake Nona', 'Dr. Phillips', 'College Park'],
    avgPrice: '$60-$125',
    totalGroomers: 156,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Creative Grooming'],
  },
  'fort-lauderdale': {
    name: 'Fort Lauderdale',
    state: 'FL',
    description: 'Find trusted pet groomers in Fort Lauderdale. From Las Olas to Victoria Park, book top-rated groomers online.',
    neighborhoods: ['Las Olas', 'Victoria Park', 'Wilton Manors', 'Harbor Beach', 'Rio Vista'],
    avgPrice: '$65-$130',
    totalGroomers: 98,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Bath Packages'],
  },
};

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityData[params.city];
  
  if (!city) {
    return {
      title: 'City Not Found | PetCareBooker',
    };
  }

  return {
    title: `Pet Groomers in ${city.name}, ${city.state} | Book Online | PetCareBooker`,
    description: city.description,
    openGraph: {
      title: `Best Pet Groomers in ${city.name}`,
      description: city.description,
      type: 'website',
    },
  };
}

export default function CityPage({ params }: Props) {
  const city = cityData[params.city];

  if (!city) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">City Not Found</h1>
          <Link href="/browse" className="text-purple-600 font-bold hover:underline">
            ← Browse All Groomers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-3xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            🐾 PetCareBooker
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Pet Groomers in {city.name} 🐾
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            {city.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="text-4xl font-bold text-purple-600">{city.totalGroomers}+</div>
              <div className="text-gray-600 font-medium">Verified Groomers</div>
            </div>
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="text-4xl font-bold text-pink-500">{city.avgPrice}</div>
              <div className="text-gray-600 font-medium">Average Price</div>
            </div>
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="text-4xl font-bold text-orange-500">4.9★</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full shadow-2xl p-2 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search by neighborhood or service..."
                className="flex-1 px-6 py-4 text-lg rounded-full focus:outline-none text-gray-800"
              />
              <Link 
                href="/browse"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:from-purple-700 hover:to-pink-600 transition-all whitespace-nowrap"
              >
                Find Groomers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
            Popular Services in {city.name} ✨
          </h2>
          <p className="text-center text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
            What pet parents are booking right now
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {city.topServices.map((service: string, index: number) => (
              <Link
                key={index}
                href={`/browse?service=${service.toLowerCase().replace(' ', '-')}`}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center hover:shadow-xl hover:scale-105 transition-all border-2 border-purple-100"
              >
                <div className="text-5xl mb-4">
                  {index === 0 ? '🐕' : index === 1 ? '🐈' : index === 2 ? '🚐' : '✨'}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service}</h3>
                <p className="text-purple-600 font-semibold">Browse →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
            Neighborhoods We Serve 🗺️
          </h2>
          <p className="text-center text-gray-700 text-xl mb-12 max-w-2xl mx-auto">
            Find groomers in your area of {city.name}
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {city.neighborhoods.map((neighborhood: string, index: number) => (
              <Link
                key={index}
                href={`/browse?city=${params.city}&neighborhood=${neighborhood.toLowerCase().replace(' ', '-')}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all border border-gray-200"
              >
                <div className="font-bold text-gray-900 mb-1">{neighborhood}</div>
                <div className="text-sm text-purple-600">View Groomers →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PetCareBooker */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Why {city.name} Pet Parents Choose Us 💜
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Booking</h3>
              <p className="text-gray-600">
                See real-time availability and book in seconds. No phone tag, no waiting for callbacks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                ⭐
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Verified Reviews</h3>
              <p className="text-gray-600">
                Read honest reviews from real pet parents in {city.name}. Make informed decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                📱
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">SMS Reminders</h3>
              <p className="text-gray-600">
                Never miss an appointment with automatic text reminders and confirmations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                How much does pet grooming cost in {city.name}?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                Pet grooming in {city.name} typically ranges from {city.avgPrice}, depending on your pet's size, breed, and the services you choose. Prices include bath, haircut, nail trim, and ear cleaning.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                Are all groomers on PetCareBooker verified?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                Yes! All groomers on PetCareBooker are verified professionals with proper licenses and insurance. We only partner with experienced groomers who love pets.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                Can I book same-day grooming appointments?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                Many of our {city.name} groomers offer same-day appointments based on availability. Use our real-time booking system to see open slots today.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                Do you offer mobile grooming in {city.name}?
              </summary>
              <p className="mt-4 text-gray-600 text-lg">
                Yes! Many groomers on our platform offer mobile grooming services that come to your home in {city.name}. Filter by "Mobile Grooming" when searching.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Ready to Book in {city.name}? 🎉
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of happy pet parents who trust PetCareBooker for their grooming needs.
          </p>
          <Link 
            href="/browse"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all hover:scale-110 shadow-2xl"
          >
            Browse {city.name} Groomers
          </Link>
        </div>
      </section>

      {/* Schema.org JSON-LD for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Pet Groomers in ${city.name}, ${city.state}`,
            description: city.description,
            itemListElement: [
              {
                '@type': 'Service',
                name: 'Pet Grooming Services',
                provider: {
                  '@type': 'Organization',
                  name: 'PetCareBooker',
                },
                areaServed: {
                  '@type': 'City',
                  name: city.name,
                  addressRegion: city.state,
                },
              },
            ],
          }),
        }}
      />

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

