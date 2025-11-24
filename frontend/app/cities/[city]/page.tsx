import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

// City data - in production this would come from your database
const cityData: Record<string, any> = {
  // NEW YORK CITIES
  'new-york-city': {
    name: 'New York City',
    state: 'NY',
    description: 'Find the best pet groomers in New York City. From Manhattan to Brooklyn, discover top-rated grooming salons with instant booking and verified reviews.',
    neighborhoods: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Upper West Side', 'East Village', 'Williamsburg', 'Astoria', 'Park Slope'],
    avgPrice: '$75-$150',
    totalGroomers: 247,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Luxury Spa Treatments'],
    quickFacts: [
      '247+ verified professional groomers across all 5 boroughs',
      'Mobile grooming available - perfect for busy NYC pet parents',
      'Same-day appointments available at select locations',
      'Specialized services for small apartments and high-rise buildings',
    ],
  },
  'brooklyn': {
    name: 'Brooklyn',
    state: 'NY',
    description: 'Book top-rated pet groomers in Brooklyn, NY. From Williamsburg to Park Slope, find trusted groomers with real-time availability and instant booking.',
    neighborhoods: ['Williamsburg', 'Park Slope', 'Brooklyn Heights', 'DUMBO', 'Bushwick', 'Prospect Heights', 'Carroll Gardens', 'Fort Greene'],
    avgPrice: '$65-$135',
    totalGroomers: 89,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Organic Products'],
  },
  'queens': {
    name: 'Queens',
    state: 'NY',
    description: 'Discover professional pet groomers in Queens, NY. Serving Astoria, Long Island City, Flushing, and beyond with convenient online booking.',
    neighborhoods: ['Astoria', 'Long Island City', 'Flushing', 'Forest Hills', 'Jackson Heights', 'Bayside', 'Sunnyside', 'Ridgewood'],
    avgPrice: '$60-$125',
    totalGroomers: 67,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Multilingual Service'],
  },
  'buffalo': {
    name: 'Buffalo',
    state: 'NY',
    description: 'Find trusted pet groomers in Buffalo, NY. Book experienced groomers serving Elmwood Village, Allentown, and surrounding neighborhoods.',
    neighborhoods: ['Elmwood Village', 'Allentown', 'North Buffalo', 'South Buffalo', 'Delaware District'],
    avgPrice: '$55-$100',
    totalGroomers: 42,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Winter Coat Care', 'De-shedding'],
  },
  'rochester': {
    name: 'Rochester',
    state: 'NY',
    description: 'Book pet grooming in Rochester, NY. Discover groomers in Park Avenue, East End, and more with verified reviews and instant booking.',
    neighborhoods: ['Park Avenue', 'East End', 'South Wedge', 'Charlotte', 'Corn Hill'],
    avgPrice: '$55-$105',
    totalGroomers: 38,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Show Dog Prep'],
  },
  'syracuse': {
    name: 'Syracuse',
    state: 'NY',
    description: 'Find professional pet groomers in Syracuse, NY. Serving Armory Square, Westcott, and nearby areas with online booking.',
    neighborhoods: ['Armory Square', 'Westcott', 'University Hill', 'Sedgwick', 'Eastwood'],
    avgPrice: '$50-$95',
    totalGroomers: 34,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Puppy Introductions', 'Senior Pet Care'],
  },
  'albany': {
    name: 'Albany',
    state: 'NY',
    description: 'Book pet grooming in Albany, NY. Trusted groomers in Center Square, Pine Hills, and beyond with real-time availability.',
    neighborhoods: ['Center Square', 'Pine Hills', 'New Scotland', 'Delaware Avenue', 'Buckingham Pond'],
    avgPrice: '$55-$100',
    totalGroomers: 31,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Spa Services'],
  },
  'yonkers': {
    name: 'Yonkers',
    state: 'NY',
    description: 'Find pet groomers in Yonkers, NY. Book professional grooming services near you with instant online scheduling.',
    neighborhoods: ['Getty Square', 'Riverdale Avenue', 'Park Hill', 'Crestwood', 'Ludlow'],
    avgPrice: '$60-$115',
    totalGroomers: 28,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Express Services'],
  },
  
  // FLORIDA CITIES
  'miami': {
    name: 'Miami',
    state: 'FL',
    description: 'Book pet grooming in Miami with ease. Find experienced groomers in South Beach, Coral Gables, Brickell, and throughout Miami-Dade with instant online booking.',
    neighborhoods: ['South Beach', 'Coral Gables', 'Brickell', 'Wynwood', 'Coconut Grove', 'Design District', 'Little Havana', 'Key Biscayne'],
    avgPrice: '$65-$130',
    totalGroomers: 142,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Bath Packages'],
    quickFacts: [
      '142+ verified groomers across Miami-Dade County',
      'Specialized beach dog cleaning services available',
      'Bilingual groomers (English/Spanish) available',
      'Many salons offer luxury spa treatments',
    ],
  },
  'tampa': {
    name: 'Tampa',
    state: 'FL',
    description: 'Find the best pet groomers in Tampa Bay. From Ybor City to Hyde Park, book verified groomers with real reviews and same-day availability.',
    neighborhoods: ['Hyde Park', 'Ybor City', 'Seminole Heights', 'Westshore', 'South Tampa', 'Channelside', 'Downtown Tampa', 'Palma Ceia'],
    avgPrice: '$60-$120',
    totalGroomers: 134,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Spa Treatments'],
    quickFacts: [
      '134+ trusted groomers serving Tampa Bay area',
      'Most groomers offer air-conditioned facilities (important in FL heat!)',
      'Same-day and next-day appointments widely available',
      'Mobile grooming services throughout Hillsborough County',
    ],
  },
  'orlando': {
    name: 'Orlando',
    state: 'FL',
    description: 'Book pet grooming in Orlando instantly. Discover experienced groomers from Winter Park to Lake Nona with verified reviews and real-time booking.',
    neighborhoods: ['Winter Park', 'Downtown Orlando', 'Lake Nona', 'Dr. Phillips', 'College Park', 'Baldwin Park', 'Thornton Park', 'Milk District'],
    avgPrice: '$60-$125',
    totalGroomers: 156,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Creative Grooming'],
    quickFacts: [
      '156+ verified groomers in the Orlando metro area',
      'Tourist-friendly: Many groomers welcome visiting pets',
      'Theme park proximity - convenient for vacation pet care',
      'Creative grooming specialists available',
    ],
  },
  'west-palm-beach': {
    name: 'West Palm Beach',
    state: 'FL',
    description: 'Discover top-rated pet groomers in West Palm Beach, FL. From downtown to Palm Beach shores, find trusted grooming salons with instant online booking.',
    neighborhoods: ['Downtown West Palm Beach', 'Northwood', 'Flamingo Park', 'South Dixie', 'City Place', 'Old Northwood', 'El Cid', 'Grandview Heights'],
    avgPrice: '$60-$125',
    totalGroomers: 89,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Bath Packages'],
    quickFacts: [
      '89+ verified professional groomers in Palm Beach County',
      'Beach dog specialists - saltwater removal and sand-free coats',
      'Luxury spa services available for pampered pets',
      'Mobile grooming perfect for waterfront homes',
    ],
  },
  'fort-lauderdale': {
    name: 'Fort Lauderdale',
    state: 'FL',
    description: 'Pet grooming Fort Lauderdale: Find top-rated dog and cat groomers. Book instantly with verified reviews. Serving Las Olas, Victoria Park, Wilton Manors, and all of Broward County.',
    neighborhoods: ['Las Olas', 'Victoria Park', 'Wilton Manors', 'Harbor Beach', 'Rio Vista', 'Lauderdale-by-the-Sea', 'Colee Hammock', 'Coral Ridge', 'Imperial Point', 'Downtown Fort Lauderdale', 'Pompano Beach', 'Oakland Park'],
    avgPrice: '$65-$130',
    totalGroomers: 98,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Bath Packages'],
    quickFacts: [
      '98+ verified professional groomers serving all of Broward County',
      'Specialized beach dog grooming - saltwater removal and sand treatment experts',
      'Mobile grooming available for waterfront homes, marinas, and yacht-side service',
      'Year-round grooming essential due to Florida\'s humid climate and beach lifestyle',
      'Same-day appointments available at most salons, especially weekdays',
      'Luxury spa treatments available for pampered pets in upscale neighborhoods',
    ],
  },
  'jacksonville': {
    name: 'Jacksonville',
    state: 'FL',
    description: 'Book pet grooming in Jacksonville, FL. Find professional groomers in Riverside, San Marco, and throughout Duval County.',
    neighborhoods: ['Riverside', 'San Marco', 'Avondale', 'Jacksonville Beach', 'Southside', 'Mandarin', 'Ponte Vedra'],
    avgPrice: '$55-$110',
    totalGroomers: 87,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Large Breed Specialists'],
  },
  'st-petersburg': {
    name: 'St. Petersburg',
    state: 'FL',
    description: 'Discover pet groomers in St. Petersburg, FL. Book trusted groomers from Downtown St. Pete to St. Pete Beach with instant scheduling.',
    neighborhoods: ['Downtown St. Pete', 'St. Pete Beach', 'The Grand Central District', 'Historic Kenwood', 'Shore Acres', 'Gulfport'],
    avgPrice: '$60-$115',
    totalGroomers: 76,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Dog Care'],
  },
  'tallahassee': {
    name: 'Tallahassee',
    state: 'FL',
    description: 'Find pet groomers in Tallahassee, FL. Serving Midtown, College Town, and nearby neighborhoods with professional grooming services.',
    neighborhoods: ['Midtown', 'College Town', 'Killearn', 'Southwood', 'Betton Hills'],
    avgPrice: '$50-$100',
    totalGroomers: 41,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Student-Friendly Pricing', 'Mobile Grooming'],
  },
  'gainesville': {
    name: 'Gainesville',
    state: 'FL',
    description: 'Book pet grooming in Gainesville, FL. Trusted groomers near UF campus and throughout Alachua County with online booking.',
    neighborhoods: ['Downtown Gainesville', 'Duckpond', 'Haile Plantation', 'Tioga', 'University Heights'],
    avgPrice: '$50-$95',
    totalGroomers: 38,
    topServices: ['Dog Grooming', 'Cat Grooming', 'College Student Friendly', 'Gator-Themed Grooming'],
  },
  'clearwater': {
    name: 'Clearwater',
    state: 'FL',
    description: 'Find professional pet groomers in Clearwater, FL. Book groomers near Clearwater Beach and throughout Pinellas County.',
    neighborhoods: ['Clearwater Beach', 'Downtown Clearwater', 'Island Estates', 'Countryside', 'Safety Harbor'],
    avgPrice: '$55-$110',
    totalGroomers: 64,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Beach Dog Specialists', 'Mobile Grooming'],
  },
  'naples': {
    name: 'Naples',
    state: 'FL',
    description: 'Discover luxury pet groomers in Naples, FL. Book premium grooming services in Old Naples, Park Shore, and Marco Island.',
    neighborhoods: ['Old Naples', 'Park Shore', 'Pelican Bay', 'North Naples', 'Marco Island'],
    avgPrice: '$70-$145',
    totalGroomers: 52,
    topServices: ['Luxury Pet Spa', 'Dog Grooming', 'Cat Grooming', 'Mobile Concierge Service'],
  },
  'sarasota': {
    name: 'Sarasota',
    state: 'FL',
    description: 'Book pet grooming in Sarasota, FL. Find top-rated groomers from Downtown Sarasota to Siesta Key with instant booking.',
    neighborhoods: ['Downtown Sarasota', 'Siesta Key', 'Lido Key', 'Southside Village', 'Laurel Park'],
    avgPrice: '$60-$120',
    totalGroomers: 58,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Beach Bath Services', 'Show Dog Prep'],
  },
  'fort-myers': {
    name: 'Fort Myers',
    state: 'FL',
    description: 'Find pet groomers in Fort Myers, FL. Professional grooming from Downtown Fort Myers to Fort Myers Beach with real-time availability.',
    neighborhoods: ['Downtown Fort Myers', 'Fort Myers Beach', 'Cape Coral', 'Sanibel', 'Gateway'],
    avgPrice: '$55-$110',
    totalGroomers: 49,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Island Dog Specialists', 'Mobile Grooming'],
  },
  'boca-raton': {
    name: 'Boca Raton',
    state: 'FL',
    description: 'Book luxury pet grooming in Boca Raton, FL. Premium groomers serving Mizner Park, downtown Boca, and Delray Beach.',
    neighborhoods: ['Mizner Park', 'Downtown Boca', 'East Boca', 'Delray Beach', 'Deerfield Beach'],
    avgPrice: '$65-$135',
    totalGroomers: 67,
    topServices: ['Luxury Spa Services', 'Dog Grooming', 'Cat Grooming', 'Mobile Grooming'],
  },
  'pensacola': {
    name: 'Pensacola',
    state: 'FL',
    description: 'Find pet groomers in Pensacola, FL. Book trusted groomers from Pensacola Beach to downtown with verified reviews.',
    neighborhoods: ['Downtown Pensacola', 'Pensacola Beach', 'East Hill', 'North Hill', 'Gulf Breeze'],
    avgPrice: '$50-$100',
    totalGroomers: 36,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Beach Dog Care', 'Military Pet Friendly'],
  },
  'lakeland': {
    name: 'Lakeland',
    state: 'FL',
    description: 'Book pet grooming in Lakeland, FL. Professional groomers serving Polk County with convenient online scheduling.',
    neighborhoods: ['Downtown Lakeland', 'South Lakeland', 'Lake Morton', 'Highland City', 'Medulla'],
    avgPrice: '$50-$95',
    totalGroomers: 33,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Farm Dog Specialists', 'Mobile Grooming'],
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
  'chicago': {
    name: 'Chicago',
    state: 'IL',
    description: 'Find professional pet groomers in Chicago. Book top-rated groomers from Lincoln Park to Wicker Park with instant scheduling.',
    neighborhoods: ['Lincoln Park', 'Wicker Park', 'Lakeview', 'River North', 'Logan Square'],
    avgPrice: '$65-$130',
    totalGroomers: 156,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Winter Coat Care', 'Mobile Grooming'],
  },
};

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cityData[citySlug];
  
  if (!city) {
    return {
      title: 'City Not Found | PetCareBooker',
    };
  }

  // Special handling for Fort Lauderdale to target exact keyword
  const isFortLauderdale = citySlug === 'fort-lauderdale';
  const title = isFortLauderdale 
    ? `Pet Grooming Fort Lauderdale: Best Dog & Cat Groomers | Book Online`
    : `Pet Groomers in ${city.name}, ${city.state} | Book Online | PetCareBooker`;
  
  const canonicalUrl = `https://petcarebooker.com/cities/${citySlug}`;
  
  return {
    title,
    description: city.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: isFortLauderdale ? 'Pet Grooming Fort Lauderdale: Best Salons & Mobile Services' : `Best Pet Groomers in ${city.name}`,
      description: city.description,
      type: 'website',
      url: canonicalUrl,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = cityData[citySlug];

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
            {citySlug === 'fort-lauderdale' ? (
              <>Pet Grooming Fort Lauderdale 🐾</>
            ) : (
              <>Pet Groomers in {city.name} 🐾</>
            )}
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

      {/* Featured Groomer - only for cities that have it */}
      {city.featuredGroomer && (
        <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Featured Groomer in {city.name} ⭐
            </h2>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border-4 border-purple-200">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-5xl">
                  🐕
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-gray-900">{city.featuredGroomer.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold text-sm">
                      <span>★</span> {city.featuredGroomer.rating}
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center gap-1 mb-2">
                    <span>📍</span> {city.featuredGroomer.address}
                  </p>
                  {city.featuredGroomer.phone && (
                    <p className="text-gray-600 flex items-center gap-1 mb-4">
                      <span>📞</span> {city.featuredGroomer.phone}
                    </p>
                  )}
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {city.featuredGroomer.specialties.map((specialty: string, idx: number) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        ✨ {specialty}
                      </span>
                    ))}
                  </div>
                  
                  {/* Featured Review */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                    <p className="text-gray-700 italic text-lg mb-2">"{city.featuredGroomer.featuredReview}"</p>
                    <p className="text-gray-600 text-sm">
                      - {city.featuredGroomer.reviewCount} verified reviews
                    </p>
                  </div>
                </div>
              </div>
              
              <Link
                href="/browse"
                className="block bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
              >
                View More Groomers in {city.name} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quick Facts */}
      {city.quickFacts && city.quickFacts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Why Choose PetCareBooker in {city.name}? 🎯
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {city.quickFacts.map((fact: string, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100 flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">✓</div>
                  <p className="text-gray-700 text-lg font-medium">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Areas */}
      {city.popularAreas && city.popularAreas.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Popular Areas in {city.name} 📍
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {city.popularAreas.map((area: string, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-purple-500">
                    <p className="text-gray-900 text-lg font-semibold">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      <section className="py-20 bg-white">
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
                href={`/browse?city=${citySlug}&neighborhood=${neighborhood.toLowerCase().replace(' ', '-')}`}
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
            '@type': 'LocalBusiness',
            '@id': `https://petcarebooker.com/cities/${citySlug}`,
            name: `Pet Grooming Services in ${city.name}, ${city.state}`,
            description: city.description,
            url: `https://petcarebooker.com/cities/${citySlug}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: city.name,
              addressRegion: city.state,
              addressCountry: 'US',
            },
            areaServed: {
              '@type': 'City',
              name: city.name,
              addressRegion: city.state,
            },
            serviceType: 'Pet Grooming',
            priceRange: city.avgPrice || '$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '1200',
            },
            sameAs: [
              'https://www.petcarebooker.com',
            ],
          }),
        }}
      />

      <Footer />
    </div>
  );
}

