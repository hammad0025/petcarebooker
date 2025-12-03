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
    description: 'Find top-rated dog groomers and cat grooming in Miami, FL. Book dog grooming Miami and cat grooming Miami FL services with verified reviews. Serving South Beach, Coral Gables, Brickell, and throughout Miami-Dade County.',
    neighborhoods: ['South Beach', 'Coral Gables', 'Brickell', 'Wynwood', 'Coconut Grove', 'Design District', 'Little Havana', 'Key Biscayne', 'Downtown Miami', 'Aventura', 'Bal Harbour', 'Sunny Isles', 'Doral', 'Miami Beach'],
    avgPrice: '$65-$130',
    totalGroomers: 142,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Bath Packages'],
    quickFacts: [
      '142+ verified professional groomers across Miami-Dade County',
      'Dog grooming Miami and cat grooming Miami FL specialists',
      'Specialized beach dog cleaning services - saltwater removal experts',
      'Bilingual groomers (English/Spanish) available',
      'Mobile pet grooming Miami services available throughout the city',
      'Many salons offer luxury spa treatments for pampered pets',
      'Pet grooming Miami FL: serving South Beach, Coral Gables, and all neighborhoods',
    ],
  },
  'tampa': {
    name: 'Tampa',
    state: 'FL',
    description: 'Find top-rated dog groomers and cat grooming in Tampa, FL. Book dog grooming Tampa and cat grooming Tampa FL services with verified reviews. Serving Hyde Park, Ybor City, Seminole Heights, and throughout Hillsborough County.',
    neighborhoods: ['Hyde Park', 'Ybor City', 'Seminole Heights', 'Westshore', 'South Tampa', 'Channelside', 'Downtown Tampa', 'Palma Ceia', 'Davis Islands', 'Carrollwood', 'New Tampa', 'Westchase', 'Brandon'],
    avgPrice: '$60-$120',
    totalGroomers: 134,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Spa Treatments'],
    quickFacts: [
      '134+ trusted groomers serving Tampa Bay area',
      'Dog grooming Tampa and cat grooming Tampa FL specialists',
      'Most groomers offer air-conditioned facilities (important in FL heat!)',
      'Same-day and next-day appointments widely available',
      'Mobile pet grooming Tampa services throughout Hillsborough County',
      'Pet grooming Tampa FL: serving Hyde Park, Ybor City, and all neighborhoods',
    ],
  },
  'orlando': {
    name: 'Orlando',
    state: 'FL',
    description: 'Find top-rated dog groomers and cat grooming in Orlando, FL. Book dog grooming Orlando and cat grooming Orlando FL services with verified reviews. Serving Winter Park, Lake Nona, Dr. Phillips, and throughout Orange County.',
    neighborhoods: ['Winter Park', 'Downtown Orlando', 'Lake Nona', 'Dr. Phillips', 'College Park', 'Baldwin Park', 'Thornton Park', 'Milk District', 'Windermere', 'Celebration', 'Kissimmee', 'Oviedo', 'Apopka'],
    avgPrice: '$60-$125',
    totalGroomers: 156,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Creative Grooming'],
    quickFacts: [
      '156+ verified groomers in the Orlando metro area',
      'Dog grooming Orlando and cat grooming Orlando FL specialists',
      'Tourist-friendly: Many groomers welcome visiting pets',
      'Theme park proximity - convenient for vacation pet care',
      'Mobile pet grooming Orlando services available',
      'Creative grooming specialists available',
      'Pet grooming Orlando FL: serving Winter Park, Lake Nona, and all neighborhoods',
    ],
  },
  'west-palm-beach': {
    name: 'West Palm Beach',
    state: 'FL',
    description: 'Discover top-rated pet grooming and mobile pet grooming in West Palm Beach, FL. From downtown West Palm Beach to the Palm Beach shores, find trusted dog and cat groomers with instant online booking.',    neighborhoods: ['Downtown West Palm Beach', 'Northwood', 'Flamingo Park', 'South Dixie', 'City Place', 'Old Northwood', 'El Cid', 'Grandview Heights'],
    avgPrice: '$60-$125',
    totalGroomers: 89,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Bath Packages'],
    quickFacts: [
      '89+ verified professional groomers in Palm Beach County',
      'Beach dog specialists - saltwater removal and sand-free coats',
      'Luxury spa services available for pampered pets',
      'Mobile grooming perfect for waterfront homes',
      'Mobile pet grooming West Palm Beach: book mobile dog and cat groomers that come to your home across downtown, Northwood, Flamingo Park, and more',    ],
  },
  'fort-lauderdale': {
    name: 'Fort Lauderdale',
    state: 'FL',
    description: 'Pet grooming Fort Lauderdale: Find top-rated dog grooming Fort Lauderdale and cat grooming Fort Lauderdale services. Book Fort Lauderdale pet grooming with mobile pet grooming Fort Lauderdale and salon services. Serving Las Olas, Victoria Park, Wilton Manors, Harbor Beach, and all of Broward County.',
    neighborhoods: ['Las Olas', 'Victoria Park', 'Wilton Manors', 'Harbor Beach', 'Rio Vista', 'Lauderdale-by-the-Sea', 'Colee Hammock', 'Coral Ridge', 'Imperial Point', 'Downtown Fort Lauderdale', 'Pompano Beach', 'Oakland Park', 'Fort Lauderdale Beach', 'Coral Ridge', 'Seven Isles'],
    avgPrice: '$65-$130',
    totalGroomers: 98,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Beach Bath Packages'],
    quickFacts: [
      '98+ verified professional groomers serving all of Broward County',
      'Pet grooming Fort Lauderdale and Fort Lauderdale pet grooming with 4.9★ average rating',
      'Dog grooming Fort Lauderdale and cat grooming Fort Lauderdale services available',
      'Mobile pet grooming Fort Lauderdale and mobile dog grooming Fort Lauderdale available',
      'Fort Lauderdale cat grooming specialists for anxious felines and long-haired breeds',
      'Specialized beach dog grooming - saltwater removal and sand treatment experts',
      'Mobile grooming available for waterfront homes, marinas, and yacht-side service',
      'Year-round grooming essential due to Florida\'s humid climate and beach lifestyle',
      'Same-day appointments available at most salons, especially weekdays',
      'Luxury spa treatments available for pampered pets in upscale neighborhoods',
      'Pet grooming Fort Lauderdale: serving Las Olas, Victoria Park, and all neighborhoods',
    ],  },
  'jacksonville': {
    name: 'Jacksonville',
    state: 'FL',
    description: 'Find top-rated dog groomers and cat grooming in Jacksonville, FL. Book dog grooming Jacksonville and cat grooming Jacksonville FL services with verified reviews. Serving Riverside, San Marco, Jacksonville Beach, and throughout Duval County.',
    neighborhoods: ['Riverside', 'San Marco', 'Avondale', 'Jacksonville Beach', 'Southside', 'Mandarin', 'Ponte Vedra', 'Downtown Jacksonville', 'Murray Hill', 'Springfield', 'Atlantic Beach', 'Neptune Beach', 'Orange Park', 'Fleming Island'],
    avgPrice: '$55-$110',
    totalGroomers: 87,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Large Breed Specialists'],
    quickFacts: [
      '87+ verified professional groomers serving all of Duval County',
      'Expert cat grooming Jacksonville FL services - gentle handling for anxious felines',
      'Dog grooming Jacksonville specialists for large breeds and beach dogs',
      'Mobile pet grooming Jacksonville services available throughout the city',
      'Beach dog specialists - serving Jacksonville Beach, Atlantic Beach, and Neptune Beach',
      'Large breed specialists - perfect for Great Danes, Mastiffs, and other big dogs',
      'Pet grooming Jacksonville FL: serving Riverside, San Marco, and all neighborhoods',
    ],
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
    description: 'Find top-rated pet groomers and mobile pet grooming in Tallahassee, FL. Book dog and cat grooming services near FSU, in Midtown, College Town, and throughout Leon County with instant online booking.',
    neighborhoods: ['Midtown', 'College Town', 'Killearn', 'Southwood', 'Betton Hills', 'FSU Area', 'Downtown Tallahassee', 'Northeast Tallahassee', 'Southside', 'Lake Jackson', 'Apalachee Parkway', 'Thomasville Road'],
    avgPrice: '$50-$100',
    totalGroomers: 41,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Mobile Grooming', 'Student-Friendly Pricing'],
    quickFacts: [
      '41+ verified professional groomers serving Tallahassee and Leon County',
      'Student-friendly pricing - perfect for FSU and FAMU students',
      'Mobile pet grooming Tallahassee services available throughout the city',
      'Affordable grooming options - lower prices than major metro areas',
      'Same-day appointments available, especially during summer break',
      'Pet grooming Tallahassee FL: serving Midtown, College Town, and all neighborhoods',
    ],
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
    description: 'Find top-rated dog groomers and cat grooming in Pensacola, FL. Book dog groomer Pensacola FL services and cat grooming Pensacola FL with verified reviews. Serving Pensacola Beach, Gulf Breeze, NAS Pensacola, and all of Escambia County.',
    neighborhoods: ['Downtown Pensacola', 'Pensacola Beach', 'East Hill', 'North Hill', 'Gulf Breeze', 'Perdido Key', 'Naval Air Station', 'Cordova Park', 'Bayou Texar', 'Myrtle Grove', 'Ensley', 'Brownsville', 'Warrington'],
    avgPrice: '$50-$100',
    totalGroomers: 36,
    topServices: ['Dog Grooming', 'Cat Grooming', 'Beach Dog Care', 'Military Pet Friendly'],
    quickFacts: [
      '36+ verified professional groomers serving Escambia County and NAS Pensacola',
      'Expert cat grooming Pensacola FL services - gentle handling for anxious felines',
      'Beach dog specialists - saltwater removal and sand-free coats for Pensacola Beach pets',
      'Dog groomers in Pensacola offer same-day appointments and mobile services',
      'Mobile pet grooming Pensacola services available throughout the city and Gulf Breeze',
      'Military-friendly pricing and flexible scheduling for NAS Pensacola families',
      'Pet grooming Pensacola FL: serving active military families and local residents',
    ],
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

  // Special handling for Fort Lauderdale, Tallahassee, and Pensacola to target exact keywords
  const isFortLauderdale = citySlug === 'fort-lauderdale';
  const isTallahassee = citySlug === 'tallahassee';
  const isPensacola = citySlug === 'pensacola';
  const title = isFortLauderdale 
    ? `Pet Grooming Fort Lauderdale | Dog & Cat Grooming | Book Online`
    : isTallahassee
    ? `Pet Groomers in Tallahassee, FL | Book Online | 41+ Verified Groomers`
    : isPensacola
    ? `Dog Groomers in Pensacola, FL | Cat Grooming Pensacola | Book Online`
    : `Pet Groomers in ${city.name}, ${city.state} | Book Online | PetCareBooker`;
  
  const canonicalUrl = `https://petcarebooker.com/cities/${citySlug}`;
  
  return {
    title,
    description: city.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: isFortLauderdale 
        ? 'Pet Grooming Fort Lauderdale | Dog Grooming & Cat Grooming Services' 
        : isTallahassee
        ? 'Pet Groomers in Tallahassee, FL | Book Dog & Cat Grooming Online'
        : isPensacola
        ? 'Dog Groomers in Pensacola, FL | Cat Grooming Pensacola FL | Book Online'
        : `Best Pet Groomers in ${city.name}`,
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
              <>Pet Grooming Fort Lauderdale | Dog & Cat Grooming 🐾</>
            ) : citySlug === 'pensacola' ? (
              <>Dog Groomers in Pensacola, FL | Cat Grooming 🐾</>
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

      {/* Tallahassee-Specific: Map & Coverage Area */}
      {citySlug === 'tallahassee' && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Coverage Map - Tallahassee, FL 🗺️
            </h2>
            <p className="text-center text-gray-700 text-xl mb-8 max-w-3xl mx-auto">
              Our verified pet groomers serve all of Tallahassee and Leon County, including Midtown, College Town near FSU, Killearn, Southwood, and surrounding neighborhoods. Mobile pet grooming Tallahassee services are available throughout the area.
            </p>
            
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220895.34567890123!2d-84.2807!3d30.4515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88ec8b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sTallahassee%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Pet Grooming Coverage Map - Tallahassee, FL"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📍 Areas We Serve</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Midtown Tallahassee</li>
                  <li>• College Town (FSU area)</li>
                  <li>• Killearn</li>
                  <li>• Southwood</li>
                  <li>• Betton Hills</li>
                  <li>• Downtown Tallahassee</li>
                  <li>• Northeast Tallahassee</li>
                  <li>• All of Leon County</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🚐 Mobile Grooming Available</h3>
                <p className="text-gray-700 mb-4">
                  Mobile pet grooming Tallahassee services come directly to your home, perfect for busy FSU students, families, and pet parents throughout the city.
                </p>
                <Link 
                  href="/browse?city=tallahassee&service=mobile-grooming"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Find Mobile Groomers →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tallahassee-Specific: Pricing Guide */}
      {citySlug === 'tallahassee' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Prices in Tallahassee, FL (2025) 💰
            </h2>
            <p className="text-center text-gray-700 text-xl mb-12 max-w-3xl mx-auto">
              Tallahassee offers some of the most affordable pet grooming in Florida. Prices are typically 20-30% lower than major metro areas like Miami or Tampa, making it perfect for students and budget-conscious pet parents.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Salon Grooming Prices</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Small Dogs (under 20 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$45-$75</p>
                  <p className="text-gray-600">Includes: Bath, haircut, nails, ears</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Medium Dogs (20-50 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$60-$90</p>
                  <p className="text-gray-600">Includes: Full groom package</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Large Dogs (50+ lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$75-$100</p>
                  <p className="text-gray-600">Includes: Complete grooming service</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Cats</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$50-$85</p>
                  <p className="text-gray-600">Gentle handling, specialized care</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mobile Pet Grooming Tallahassee Prices</h3>
              <p className="text-gray-700 mb-4">
                Mobile grooming typically costs $10-$20 more than salon prices for the convenience of coming to your home:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Small dogs:</strong> $55-$90</li>
                <li>• <strong>Medium dogs:</strong> $70-$110</li>
                <li>• <strong>Large dogs:</strong> $85-$120</li>
                <li>• <strong>Cats:</strong> $60-$100</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                <Link href="/blog/how-much-does-dog-grooming-cost" className="text-purple-600 font-bold hover:underline">
                  Learn more about pet grooming costs →
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Fort Lauderdale-Specific: Map & Coverage Area */}
      {citySlug === 'fort-lauderdale' && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Coverage Map - Fort Lauderdale, FL 🗺️
            </h2>
            <p className="text-center text-gray-700 text-xl mb-8 max-w-3xl mx-auto">
              Looking for <strong>pet grooming Fort Lauderdale</strong> or <strong>Fort Lauderdale pet grooming</strong> services? Our verified professionals offer <strong>dog grooming Fort Lauderdale</strong> and <strong>cat grooming Fort Lauderdale</strong> throughout Broward County, including Las Olas, Victoria Park, Wilton Manors, Harbor Beach, Rio Vista, Lauderdale-by-the-Sea, and downtown Fort Lauderdale. <strong>Pet grooming Fort Lauderdale</strong> includes both salon and <strong>mobile pet grooming Fort Lauderdale</strong> services perfect for waterfront homes, marinas, and yacht-side service. Compare prices, read verified reviews, and <Link href="/browse?city=fort-lauderdale" className="text-purple-600 font-semibold hover:underline">book instantly online</Link>.
            </p>
            
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1830.1234567890123!2d-80.1373!3d26.1224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9a6172bfeddb9%3A0x8c0b8b8b8b8b8b8b!2sFort%20Lauderdale%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Pet Grooming Coverage Map - Fort Lauderdale, FL"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📍 Areas We Serve</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Las Olas & Downtown Fort Lauderdale</li>
                  <li>• Victoria Park & Harbor Beach</li>
                  <li>• Wilton Manors & Rio Vista</li>
                  <li>• Lauderdale-by-the-Sea</li>
                  <li>• Colee Hammock & Coral Ridge</li>
                  <li>• Imperial Point & Pompano Beach</li>
                  <li>• Oakland Park</li>
                  <li>• All of Broward County</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🐕 Dog Groomers Fort Lauderdale</h3>
                <p className="text-gray-700 mb-4">
                  Our <strong>dog groomers Fort Lauderdale</strong> and <strong>groomers Fort Lauderdale</strong> professionals specialize in beach dogs, luxury spa treatments, and gentle cat grooming. Many offer <strong>mobile grooming Fort Lauderdale</strong> services that come to your waterfront home or marina.
                </p>
                <Link 
                  href="/browse?city=fort-lauderdale"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Find Groomers →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fort Lauderdale-Specific: Pricing Guide */}
      {citySlug === 'fort-lauderdale' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Fort Lauderdale Prices (2025) 💰
            </h2>
            <p className="text-center text-gray-700 text-xl mb-12 max-w-3xl mx-auto">
              <strong>Pet grooming Fort Lauderdale</strong> and <strong>Fort Lauderdale pet grooming</strong> prices are competitive with other South Florida cities. Our <strong>dog grooming Fort Lauderdale</strong> and <strong>cat grooming Fort Lauderdale</strong> professionals offer transparent pricing for salon and mobile services throughout Broward County.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Salon Grooming Prices</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Small Dogs (under 20 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$60-$85</p>
                  <p className="text-gray-600">Includes: Bath, haircut, nails, ears</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Medium Dogs (20-50 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$75-$105</p>
                  <p className="text-gray-600">Includes: Full groom package</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Large Dogs (50+ lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$90-$130</p>
                  <p className="text-gray-600">Includes: Complete grooming service</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Cats</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$65-$100</p>
                  <p className="text-gray-600">Gentle handling, specialized care</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mobile Dog Grooming Fort Lauderdale</h3>
              <p className="text-gray-700 mb-4">
                <strong>Mobile dog grooming Fort Lauderdale</strong> and <strong>mobile grooming Fort Lauderdale</strong> services typically cost $15-$25 more than salon prices for the convenience of coming to your home, marina, or yacht. Our <strong>groomers Fort Lauderdale</strong> mobile professionals bring the full salon experience to you:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Small dogs:</strong> $75-$110</li>
                <li>• <strong>Medium dogs:</strong> $90-$130</li>
                <li>• <strong>Large dogs:</strong> $105-$155</li>
                <li>• <strong>Cats:</strong> $80-$125</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                Mobile grooming is especially popular in waterfront communities, marinas, and luxury neighborhoods throughout Fort Lauderdale.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Fort Lauderdale-Specific: Dog & Cat Grooming Deep Dive */}
      {citySlug === 'fort-lauderdale' && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Pet Grooming Fort Lauderdale | Dog & Cat Grooming 🐕🐈
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Looking for <strong>pet grooming Fort Lauderdale</strong> or <strong>Fort Lauderdale pet grooming</strong> services? PetCareBooker connects you with top-rated professionals offering <strong>dog grooming Fort Lauderdale</strong> and <strong>cat grooming Fort Lauderdale</strong> across Las Olas, Victoria Park, Wilton Manors, Harbor Beach, and all of Broward County. Compare prices, read verified reviews, and book online in seconds.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Our <strong>pet grooming Fort Lauderdale</strong> professionals specialize in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg mb-4">
                  <li><strong>Dog grooming Fort Lauderdale</strong> - beach dog specialists with saltwater removal expertise</li>
                  <li><strong>Fort Lauderdale cat grooming</strong> and <strong>cat grooming Fort Lauderdale</strong> - gentle handling for anxious felines</li>
                  <li>Luxury spa treatments for pampered pets</li>
                  <li><strong>Mobile pet grooming Fort Lauderdale</strong> and <strong>mobile dog grooming Fort Lauderdale</strong> for waterfront homes and marinas</li>
                  <li>Year-round grooming essential for Florida&apos;s humid climate</li>
                </ul>
                <p className="text-lg text-gray-700">
                  Whether you need <strong>dog grooming Fort Lauderdale</strong>, <strong>cat grooming Fort Lauderdale</strong>, or <strong>mobile pet grooming Fort Lauderdale</strong> services, you&apos;ll find <strong>pet grooming Fort Lauderdale</strong> professionals that fit your schedule, budget, and your pet&apos;s needs.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Groomers?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>98+ verified professional groomers serving all of Broward County</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Specialized beach dog grooming - saltwater removal experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Mobile grooming available for waterfront homes and marinas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Same-day appointments available at most salons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-xl">✓</span>
                    <span>Luxury spa treatments for pampered pets</span>
                  </li>
                </ul>
                <Link 
                  href="/browse?city=fort-lauderdale"
                  className="inline-block mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-600 transition w-full text-center"
                >
                  Browse Fort Lauderdale Groomers →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fort Lauderdale-Specific: Mobile Dog Grooming Section */}
      {citySlug === 'fort-lauderdale' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Mobile Pet Grooming Fort Lauderdale 🚐
            </h2>
            <p className="text-center text-gray-700 text-xl mb-10 max-w-3xl mx-auto">
              Looking for <strong>mobile pet grooming Fort Lauderdale</strong>, <strong>mobile dog grooming Fort Lauderdale</strong>, or <strong>mobile grooming Fort Lauderdale</strong> services? Our <strong>groomers Fort Lauderdale</strong> mobile professionals bring the full salon experience directly to your home, marina, or yacht. Perfect for busy pet parents, waterfront residents, and those who prefer the convenience of at-home <strong>pet grooming Fort Lauderdale</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile Pet Grooming Fort Lauderdale Benefits</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>✓ <strong>Mobile pet grooming Fort Lauderdale</strong> and <strong>mobile dog grooming Fort Lauderdale</strong> comes to your location</li>
                  <li>✓ One-on-one attention for your pet</li>
                  <li>✓ Perfect for anxious dogs who prefer familiar surroundings</li>
                  <li>✓ Ideal for waterfront homes, marinas, and luxury communities</li>
                  <li>✓ No need to leave your home or office</li>
                  <li>✓ Same professional quality as salon grooming</li>
                </ul>
                <p className="mt-4 text-gray-600 text-sm">
                  <strong>Mobile grooming Fort Lauderdale</strong> services are especially popular in Las Olas, Harbor Beach, and waterfront communities throughout Broward County.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Fully equipped mobile grooming van with all salon amenities</li>
                  <li>• Professional <strong>groomers Fort Lauderdale</strong> with years of experience</li>
                  <li>• Same services as salon: bath, haircut, nails, ears, anal glands</li>
                  <li>• Typically 1-2 hour appointment per pet</li>
                  <li>• Convenient scheduling - book <strong>mobile dog grooming Fort Lauderdale</strong> around your schedule</li>
                </ul>
                <Link 
                  href="/browse?city=fort-lauderdale&service=mobile-grooming"
                  className="inline-block mt-4 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Book Mobile Grooming →
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mobile Pet Grooming Fort Lauderdale Pricing
              </h3>
              <p className="text-gray-700 mb-4 text-lg">
                <strong>Mobile pet grooming Fort Lauderdale</strong>, <strong>mobile dog grooming Fort Lauderdale</strong>, and <strong>mobile grooming Fort Lauderdale</strong> services typically cost $15-$25 more than salon prices for the convenience of coming to your location:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                <li><strong>Small dogs:</strong> $75-$110 (vs $60-$85 in salon)</li>
                <li><strong>Medium dogs:</strong> $90-$130 (vs $75-$105 in salon)</li>
                <li><strong>Large dogs:</strong> $105-$155 (vs $90-$130 in salon)</li>
                <li><strong>Cats:</strong> $80-$125 (vs $65-$100 in salon)</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                Many <strong>dog groomers Fort Lauderdale</strong> offer mobile services. Book <strong>mobile grooming Fort Lauderdale</strong> appointments with our verified professionals.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Fort Lauderdale-Specific: Cat Grooming Section */}
      {citySlug === 'fort-lauderdale' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Fort Lauderdale Cat Grooming & Cat Grooming Fort Lauderdale 🐈
            </h2>
            <p className="text-center text-gray-700 text-xl mb-10 max-w-3xl mx-auto">
              Looking for <strong>Fort Lauderdale cat grooming</strong> or <strong>cat grooming Fort Lauderdale</strong> services? Our verified cat groomers specialize in gentle handling for anxious felines, long-haired breeds, and senior cats. Book <strong>cat grooming Fort Lauderdale</strong> appointments with experienced professionals who understand feline behavior.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cat Grooming Fort Lauderdale Services</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• <strong>Full grooming:</strong> $65-$100 (bath, brush, nails, ears)</li>
                  <li>• <strong>Lion cuts & specialty styles:</strong> $75-$120</li>
                  <li>• <strong>De-shedding treatment:</strong> $55-$85</li>
                  <li>• <strong>Nail trim only:</strong> $20-$30</li>
                  <li>• <strong>Senior cat care:</strong> Specialized gentle handling</li>
                  <li>• <strong>Anxious cat services:</strong> Stress-free environment</li>
                </ul>
                <p className="mt-4 text-gray-600 text-sm">
                  <strong>Fort Lauderdale cat grooming</strong> and <strong>cat grooming Fort Lauderdale</strong> prices vary based on coat length, matting, and temperament. Many groomers offer stress-free environments for anxious cats.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Cat Groomers?</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>✓ Feline-certified groomers with cat behavior training</li>
                  <li>✓ Separate cat-only areas to reduce stress</li>
                  <li>✓ Gentle handling techniques for anxious cats</li>
                  <li>✓ Experience with long-haired breeds (Persians, Maine Coons)</li>
                  <li>✓ <strong>Mobile pet grooming Fort Lauderdale</strong> available for cats</li>
                  <li>✓ <strong>Fort Lauderdale cat grooming</strong> specialists serving all neighborhoods</li>
                </ul>
                <Link 
                  href="/browse?city=fort-lauderdale&service=cat-grooming"
                  className="inline-block mt-4 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Book Cat Grooming →
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tips for Cat Grooming in Fort Lauderdale
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                <li>Book regular <strong>cat grooming Fort Lauderdale</strong> appointments every 6-8 weeks for long-haired cats to prevent matting</li>
                <li>Introduce your cat to grooming gradually, especially if they&apos;re new to <strong>Fort Lauderdale cat grooming</strong> services</li>
                <li>Ask about sedation-free options if your cat is particularly anxious</li>
                <li>Many <strong>cat grooming Fort Lauderdale</strong> professionals offer home visits for less stress</li>
                <li>Consider <strong>mobile pet grooming Fort Lauderdale</strong> for cats who are stressed by car rides</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Pensacola-Specific: Map & Coverage Area */}
      {citySlug === 'pensacola' && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Coverage Map - Pensacola, FL 🗺️
            </h2>
            <p className="text-center text-gray-700 text-xl mb-8 max-w-3xl mx-auto">
              Looking for <strong>dog groomers in Pensacola</strong> or <strong>cat grooming Pensacola FL</strong> services? Our verified pet groomers serve all of Pensacola and Escambia County, including downtown Pensacola, Pensacola Beach, Gulf Breeze, Perdido Key, and NAS Pensacola. <strong>Dog groomer Pensacola FL</strong> services are available throughout the area, perfect for military families and beach residents. Compare prices, read reviews, and <Link href="/browse?city=pensacola" className="text-purple-600 font-semibold hover:underline">book instantly online</Link>.
            </p>
            
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110447.67283945061!2d-87.4307!3d30.4213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8890eb4c2b50b0e7%3A0x7b6f8b9c9c9c9c9c!2sPensacola%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Pet Grooming Coverage Map - Pensacola, FL"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📍 Areas We Serve</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Downtown Pensacola</li>
                  <li>• Pensacola Beach & Perdido Key</li>
                  <li>• Gulf Breeze</li>
                  <li>• NAS Pensacola (military base)</li>
                  <li>• East Hill & North Hill</li>
                  <li>• Cordova Park & Bayou Texar</li>
                  <li>• Myrtle Grove & Ensley</li>
                  <li>• All of Escambia County</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🐕 Dog Groomers in Pensacola</h3>
                <p className="text-gray-700 mb-4">
                  Our <strong>dog groomer Pensacola FL</strong> professionals specialize in beach dogs, military pets, and all breeds. Many offer mobile services that come directly to your home.
                </p>
                <Link 
                  href="/browse?city=pensacola&service=dog-grooming"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Find Dog Groomers →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pensacola-Specific: Cat Grooming Section */}
      {citySlug === 'pensacola' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Cat Grooming Pensacola FL 🐈
            </h2>
            <p className="text-center text-gray-700 text-xl mb-10 max-w-3xl mx-auto">
              Looking for professional <strong>cat grooming Pensacola</strong> services? Our verified cat groomers in Pensacola FL specialize in gentle handling for anxious felines, long-haired breeds, and senior cats. Book <strong>cat grooming Pensacola FL</strong> appointments with experienced professionals who understand feline behavior.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cat Grooming Services</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• <strong>Full grooming:</strong> $50-$85 (bath, brush, nails, ears)</li>
                  <li>• <strong>Lion cuts & specialty styles:</strong> $65-$100</li>
                  <li>• <strong>De-shedding treatment:</strong> $45-$70</li>
                  <li>• <strong>Nail trim only:</strong> $15-$25</li>
                  <li>• <strong>Senior cat care:</strong> Specialized gentle handling</li>
                </ul>
                <p className="mt-4 text-gray-600 text-sm">
                  <strong>Cat grooming Pensacola FL</strong> prices vary based on coat length, matting, and temperament. Many groomers offer stress-free environments for anxious cats.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Cat Groomers?</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>✓ Feline-certified groomers with cat behavior training</li>
                  <li>✓ Separate cat-only areas to reduce stress</li>
                  <li>✓ Gentle handling techniques for anxious cats</li>
                  <li>✓ Experience with long-haired breeds (Persians, Maine Coons)</li>
                  <li>✓ Mobile <strong>cat grooming Pensacola</strong> services available</li>
                </ul>
                <Link 
                  href="/browse?city=pensacola&service=cat-grooming"
                  className="inline-block mt-4 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Book Cat Grooming →
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tips for Cat Grooming in Pensacola
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                <li>Book regular appointments every 6-8 weeks for long-haired cats to prevent matting</li>
                <li>Introduce your cat to grooming gradually, especially if they&apos;re new to <strong>cat grooming Pensacola FL</strong> services</li>
                <li>Ask about sedation-free options if your cat is particularly anxious</li>
                <li>Many <strong>cat grooming Pensacola</strong> professionals offer home visits for less stress</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Pensacola-Specific: Dog Groomers Pricing Guide */}
      {citySlug === 'pensacola' && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Dog Groomer Pensacola FL Prices (2025) 💰
            </h2>
            <p className="text-center text-gray-700 text-xl mb-12 max-w-3xl mx-auto">
              <strong>Dog groomers in Pensacola</strong> offer competitive pricing, typically 15-20% lower than major metro areas. Whether you need a <strong>dog groomer Pensacola FL</strong> for beach dogs, military pets, or regular maintenance, you&apos;ll find affordable options.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Salon Grooming Prices</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Small Dogs (under 20 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$45-$70</p>
                  <p className="text-gray-600">Includes: Bath, haircut, nails, ears</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Medium Dogs (20-50 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$60-$85</p>
                  <p className="text-gray-600">Includes: Full groom package</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Large Dogs (50+ lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$75-$100</p>
                  <p className="text-gray-600">Includes: Complete grooming service</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Beach Dog Special</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$55-$90</p>
                  <p className="text-gray-600">Saltwater removal & sand treatment</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mobile Dog Grooming Pensacola</h3>
              <p className="text-gray-700 mb-4">
                Mobile <strong>dog groomer Pensacola FL</strong> services typically cost $10-$20 more than salon prices for the convenience of coming to your home:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Small dogs:</strong> $55-$90</li>
                <li>• <strong>Medium dogs:</strong> $70-$105</li>
                <li>• <strong>Large dogs:</strong> $85-$120</li>
                <li>• <strong>Beach dogs:</strong> $65-$110 (includes sand removal)</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                <Link href="/blog/how-much-does-dog-grooming-cost" className="text-purple-600 font-bold hover:underline">
                  Learn more about pet grooming costs →
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Jacksonville-Specific: Map & Coverage Area */}
      {citySlug === 'jacksonville' && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Coverage Map - Jacksonville, FL 🗺️
            </h2>
            <p className="text-center text-gray-700 text-xl mb-8 max-w-3xl mx-auto">
              Looking for <strong>dog grooming Jacksonville</strong> or <strong>cat grooming Jacksonville FL</strong> services? Our verified pet groomers serve all of Jacksonville and Duval County, including Riverside, San Marco, Jacksonville Beach, Atlantic Beach, Mandarin, and Ponte Vedra. <strong>Dog grooming Jacksonville</strong> professionals offer both salon and mobile services perfect for beach communities and large breed owners. Compare prices, read reviews, and <Link href="/browse?city=jacksonville" className="text-purple-600 font-semibold hover:underline">book instantly online</Link>.
            </p>
            
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221895.34567890123!2d-81.6557!3d30.3322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b742c8b5b0e7%3A0x7b6f8b9c9c9c9c9c!2sJacksonville%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Pet Grooming Coverage Map - Jacksonville, FL"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📍 Areas We Serve</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Riverside & San Marco</li>
                  <li>• Jacksonville Beach & Atlantic Beach</li>
                  <li>• Neptune Beach & Ponte Vedra</li>
                  <li>• Downtown Jacksonville</li>
                  <li>• Avondale & Murray Hill</li>
                  <li>• Springfield & Southside</li>
                  <li>• Mandarin & Orange Park</li>
                  <li>• All of Duval County</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🐕 Dog Grooming Jacksonville</h3>
                <p className="text-gray-700 mb-4">
                  Our <strong>dog grooming Jacksonville</strong> professionals specialize in large breeds, beach dogs, and all sizes. Many offer mobile services that come directly to your home.
                </p>
                <Link 
                  href="/browse?city=jacksonville&service=dog-grooming"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Find Dog Groomers →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Jacksonville-Specific: Cat Grooming Section */}
      {citySlug === 'jacksonville' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Cat Grooming Jacksonville FL 🐈
            </h2>
            <p className="text-center text-gray-700 text-xl mb-10 max-w-3xl mx-auto">
              Looking for professional <strong>cat grooming Jacksonville</strong> services? Our verified cat groomers in Jacksonville FL specialize in gentle handling for anxious felines, long-haired breeds, and senior cats. Book <strong>cat grooming Jacksonville FL</strong> appointments with experienced professionals who understand feline behavior.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cat Grooming Services</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• <strong>Full grooming:</strong> $55-$95 (bath, brush, nails, ears)</li>
                  <li>• <strong>Lion cuts & specialty styles:</strong> $70-$110</li>
                  <li>• <strong>De-shedding treatment:</strong> $50-$80</li>
                  <li>• <strong>Nail trim only:</strong> $18-$28</li>
                  <li>• <strong>Senior cat care:</strong> Specialized gentle handling</li>
                </ul>
                <p className="mt-4 text-gray-600 text-sm">
                  <strong>Cat grooming Jacksonville FL</strong> prices vary based on coat length, matting, and temperament. Many groomers offer stress-free environments for anxious cats.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Cat Groomers?</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>✓ Feline-certified groomers with cat behavior training</li>
                  <li>✓ Separate cat-only areas to reduce stress</li>
                  <li>✓ Gentle handling techniques for anxious cats</li>
                  <li>✓ Experience with long-haired breeds (Persians, Maine Coons)</li>
                  <li>✓ Mobile <strong>cat grooming Jacksonville</strong> services available</li>
                </ul>
                <Link 
                  href="/browse?city=jacksonville&service=cat-grooming"
                  className="inline-block mt-4 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Book Cat Grooming →
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tips for Cat Grooming in Jacksonville
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                <li>Book regular appointments every 6-8 weeks for long-haired cats to prevent matting</li>
                <li>Introduce your cat to grooming gradually, especially if they&apos;re new to <strong>cat grooming Jacksonville FL</strong> services</li>
                <li>Ask about sedation-free options if your cat is particularly anxious</li>
                <li>Many <strong>cat grooming Jacksonville</strong> professionals offer home visits for less stress</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Jacksonville-Specific: Dog Grooming Pricing Guide */}
      {citySlug === 'jacksonville' && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Dog Grooming Jacksonville Prices (2025) 💰
            </h2>
            <p className="text-center text-gray-700 text-xl mb-12 max-w-3xl mx-auto">
              <strong>Dog grooming Jacksonville</strong> offers competitive pricing, typically 10-15% lower than major metro areas. Whether you need <strong>dog grooming Jacksonville</strong> for large breeds, beach dogs, or regular maintenance, you&apos;ll find affordable options.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Salon Grooming Prices</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Small Dogs (under 20 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$50-$70</p>
                  <p className="text-gray-600">Includes: Bath, haircut, nails, ears</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Medium Dogs (20-50 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$65-$85</p>
                  <p className="text-gray-600">Includes: Full groom package</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Large Dogs (50+ lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$80-$110</p>
                  <p className="text-gray-600">Includes: Complete grooming service</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Extra Large Dogs (80+ lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$95-$130</p>
                  <p className="text-gray-600">Perfect for Great Danes, Mastiffs, etc.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mobile Pet Grooming Jacksonville</h3>
              <p className="text-gray-700 mb-4">
                Mobile <strong>dog grooming Jacksonville</strong> services typically cost $10-$20 more than salon prices for the convenience of coming to your home:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Small dogs:</strong> $60-$90</li>
                <li>• <strong>Medium dogs:</strong> $75-$105</li>
                <li>• <strong>Large dogs:</strong> $90-$130</li>
                <li>• <strong>Extra large dogs:</strong> $105-$150</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                <Link href="/blog/how-much-does-dog-grooming-cost" className="text-purple-600 font-bold hover:underline">
                  Learn more about pet grooming costs →
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

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

      {/* West Palm Beach Deep-Dive SEO Section */}
      {citySlug === 'west-palm-beach' && (
        <>
          {/* Map + Overview */}
          <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Mobile Pet Grooming & Salons in West Palm Beach 🐕
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Looking for <strong>mobile pet grooming West Palm Beach</strong> or a trusted local
                    salon? PetCareBooker connects you with dog and cat groomers across downtown West Palm
                    Beach, Northwood, Flamingo Park, South Dixie, CityPlace, and the surrounding Palm Beach
                    County neighborhoods. Compare prices, read verified reviews, and book online in seconds.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Whether you prefer a traditional grooming salon or <strong>mobile dog grooming West Palm
                    Beach</strong> services that come right to your driveway, you will find options that fit
                    your schedule, budget, and your pet&apos;s temperament. Many local groomers specialize in
                    beach dogs, senior pets, and anxious rescue pups.
                  </p>
                  <p className="text-lg text-gray-700">
                    Want a deeper breakdown of specific salons, mobile vans, and pricing? Read our in‑depth{' '}
                    <Link href="/blog/best-pet-groomers-west-palm-beach" className="text-purple-600 font-semibold hover:underline">
                      Best Pet Groomers in West Palm Beach guide
                    </Link>{' '}
                    for detailed recommendations, cost examples, and FAQs.
                  </p>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-purple-200 bg-white">
                  <div className="h-80 w-full">
                    <iframe
                      title="Pet grooming in West Palm Beach, FL"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.118977708715!2d-80.064166!3d26.715342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d92b32b9c1d2a1%3A0x4c7e0d3d4e1e9a2!2sWest%20Palm%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1700000000000"
                      loading="lazy"
                      className="w-full h-full border-0"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="p-4 text-sm text-gray-600">
                    View groomers across Downtown West Palm Beach, Northwood, Flamingo Park, El Cid, Grandview Heights,
                    Palm Beach Shores, and nearby waterfront communities.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing & Mobile Grooming Details */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
                West Palm Beach Pet Grooming Prices (2025) 💰
              </h2>
              <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
                Grooming prices in West Palm Beach are competitive with other South Florida cities like{' '}
                <Link href="/cities/fort-lauderdale" className="text-purple-600 font-semibold hover:underline">
                  Fort Lauderdale
                </Link>{' '}
                and{' '}
                <Link href="/cities/miami" className="text-purple-600 font-semibold hover:underline">
                  Miami
                </Link>
                , while typically remaining 10–15% lower than luxury Palm Beach Island salons.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Salon Grooming in West Palm Beach</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li><strong>Small dogs (under 15 lbs):</strong> $55–$85</li>
                    <li><strong>Medium dogs (15–40 lbs):</strong> $70–$105</li>
                    <li><strong>Large dogs (40–80 lbs):</strong> $85–$125</li>
                    <li><strong>Extra‑large dogs (80+ lbs):</strong> $110–$160</li>
                    <li><strong>Cats:</strong> $60–$105 depending on coat length</li>
                  </ul>
                  <p className="mt-4 text-gray-700 text-sm">
                    Prices usually include bath, haircut, nail trim, ear cleaning, and sanitary trim. Exact pricing
                    depends on coat condition, matting, and requested style.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Mobile Dog Grooming West Palm Beach</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    <strong>Mobile grooming West Palm Beach</strong> vans typically charge{' '}
                    <strong>$15–$25 more</strong> than in‑salon services in exchange for driveway‑side convenience
                    and one‑on‑one attention.
                  </p>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li><strong>Small dogs:</strong> $70–$110</li>
                    <li><strong>Medium dogs:</strong> $85–$125</li>
                    <li><strong>Large dogs:</strong> $100–$150</li>
                    <li><strong>Cats:</strong> $75–$115</li>
                  </ul>
                  <p className="mt-4 text-gray-700 text-sm">
                    Mobile groomers are especially popular in waterfront communities, high‑rise condos along Flagler
                    Drive, Palm Beach Shores, and gated communities throughout western Palm Beach County.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  How to Save on Pet Grooming in West Palm Beach
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                  <li>Book regular appointments every 4–6 weeks to avoid matting fees and keep pricing predictable.</li>
                  <li>Use bath‑only or de‑shedding packages between full grooms for beach dogs that swim often.</li>
                  <li>
                    Ask groomers listed on{' '}
                    <Link href="/browse" className="text-purple-600 font-semibold hover:underline">
                      PetCareBooker
                    </Link>{' '}
                    about multi‑pet or loyalty discounts.
                  </li>
                  <li>
                    Read our{' '}
                    <Link href="/blog/how-much-does-dog-grooming-cost" className="text-purple-600 font-semibold hover:underline">
                      national dog grooming cost guide
                    </Link>{' '}
                    to compare West Palm Beach pricing with other U.S. cities.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prep & Internal Links */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
                Preparing Your Pet for a West Palm Beach Grooming Appointment ✂️
              </h2>
              <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
                A little preparation goes a long way—especially in Florida&apos;s humid, beach‑heavy climate.
                Follow these steps before you head to your West Palm Beach dog or cat groomer.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Day Before Grooming</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                    <li>Brush out loose fur and light tangles, especially after beach days.</li>
                    <li>Check for sand, burrs, and ticks—common in Palm Beach County parks.</li>
                    <li>
                      Review our{' '}
                      <Link href="/guides" className="text-purple-600 font-semibold hover:underline">
                        step‑by‑step grooming preparation guide
                      </Link>{' '}
                      for detailed tips.
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Day Of Grooming</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                    <li>Give your dog a bathroom break right before the appointment or mobile van arrival.</li>
                    <li>Avoid feeding a large meal within 2 hours of grooming, especially in hot weather.</li>
                    <li>
                      Bring or share reference photos with your groomer so your West Palm Beach pup gets the
                      exact style you want.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/browse?city=west-palm-beach"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all hover:scale-110 shadow-xl"
                >
                  Browse West Palm Beach Groomers
                </Link>
              </div>
            </div>
          </section>
        </>
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

      {/* Universal Map Section - for cities without specific map sections */}
      {!['tallahassee', 'fort-lauderdale', 'pensacola', 'jacksonville', 'west-palm-beach'].includes(citySlug) && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Coverage Map - {city.name}, {city.state} 🗺️
            </h2>
            <p className="text-center text-gray-700 text-xl mb-8 max-w-3xl mx-auto">
              Our verified pet groomers serve all of {city.name} and surrounding areas. Find <strong>pet grooming near me</strong> in {city.name}, {city.state} with our comprehensive directory of professional groomers. Mobile pet grooming {city.name} services are available throughout the area.
            </p>
            
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1234567890123!2d-73.9876543!3d40.7127754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(city.name + ' ' + city.state)}!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title={`Pet Grooming Coverage Map - ${city.name}, ${city.state}`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📍 Areas We Serve</h3>
                <ul className="space-y-2 text-gray-700">
                  {city.neighborhoods.slice(0, 7).map((neighborhood: string, idx: number) => (
                    <li key={idx}>• {neighborhood}</li>
                  ))}
                  <li>• All of {city.name} and surrounding areas</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🚐 Mobile Grooming Available</h3>
                <p className="text-gray-700 mb-4">
                  Mobile pet grooming {city.name} services come directly to your home, perfect for busy pet parents throughout the city.
                </p>
                <Link 
                  href={`/browse?city=${citySlug}&service=mobile-grooming`}
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Find Mobile Groomers →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Universal Pricing Section - for cities without specific pricing sections */}
      {!['tallahassee', 'fort-lauderdale', 'pensacola', 'jacksonville', 'west-palm-beach'].includes(citySlug) && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Pet Grooming Prices in {city.name}, {city.state} (2025) 💰
            </h2>
            <p className="text-center text-gray-700 text-xl mb-12 max-w-3xl mx-auto">
              Pet grooming prices in {city.name} are competitive and vary based on your pet's size, breed, and services. Below are average prices for salon and mobile grooming services.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Salon Grooming Prices</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Small Dogs (under 20 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">{city.avgPrice.split('-')[0]}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '100') - 20}</p>
                  <p className="text-gray-600">Includes: Bath, haircut, nails, ears</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Medium Dogs (20-50 lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">{city.avgPrice}</p>
                  <p className="text-gray-600">Includes: Full groom package</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Large Dogs (50+ lbs)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '60') + 20}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '130') + 20}</p>
                  <p className="text-gray-600">Includes: Complete grooming service</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Cats</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '50') - 10}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '100') - 20}</p>
                  <p className="text-gray-600">Gentle handling, specialized care</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mobile Pet Grooming {city.name} Prices</h3>
              <p className="text-gray-700 mb-4">
                Mobile grooming typically costs $10-$25 more than salon prices for the convenience of coming to your home:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Small dogs:</strong> ${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '50') + 10}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '100') - 10}</li>
                <li>• <strong>Medium dogs:</strong> ${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '60') + 15}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '120') + 5}</li>
                <li>• <strong>Large dogs:</strong> ${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '70') + 20}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '130') + 20}</li>
                <li>• <strong>Cats:</strong> ${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '50') + 5}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '100') - 5}</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                <Link href="/blog/how-much-does-dog-grooming-cost" className="text-purple-600 font-bold hover:underline">
                  Learn more about pet grooming costs →
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Universal Cat Grooming Section - for cities without specific cat grooming sections */}
      {!['fort-lauderdale', 'pensacola', 'jacksonville'].includes(citySlug) && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Cat Grooming {city.name} {city.state} 🐈
            </h2>
            <p className="text-center text-gray-700 text-xl mb-10 max-w-3xl mx-auto">
              Looking for professional <strong>cat grooming {city.name}</strong> services? Our verified cat groomers in {city.name} {city.state} specialize in gentle handling for anxious felines, long-haired breeds, and senior cats. Book <strong>cat grooming {city.name}</strong> appointments with experienced professionals who understand feline behavior.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cat Grooming Services</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• <strong>Full grooming:</strong> ${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '50') - 10}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '100') - 20} (bath, brush, nails, ears)</li>
                  <li>• <strong>Lion cuts & specialty styles:</strong> ${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '50') + 5}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '100') - 10}</li>
                  <li>• <strong>De-shedding treatment:</strong> ${parseInt(city.avgPrice.split('-')[0]?.replace('$', '').replace(',', '') || '50') - 15}-${parseInt(city.avgPrice.split('-')[1]?.replace('$', '').replace(',', '') || '100') - 30}</li>
                  <li>• <strong>Nail trim only:</strong> $15-$30</li>
                  <li>• <strong>Senior cat care:</strong> Specialized gentle handling</li>
                </ul>
                <p className="mt-4 text-gray-600 text-sm">
                  <strong>Cat grooming {city.name}</strong> prices vary based on coat length, matting, and temperament. Many groomers offer stress-free environments for anxious cats.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Cat Groomers?</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>✓ Feline-certified groomers with cat behavior training</li>
                  <li>✓ Separate cat-only areas to reduce stress</li>
                  <li>✓ Gentle handling techniques for anxious cats</li>
                  <li>✓ Experience with long-haired breeds (Persians, Maine Coons)</li>
                  <li>✓ Mobile <strong>cat grooming {city.name}</strong> services available</li>
                </ul>
                <Link 
                  href={`/browse?city=${citySlug}&service=cat-grooming`}
                  className="inline-block mt-4 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Book Cat Grooming →
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tips for Cat Grooming in {city.name}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                <li>Book regular appointments every 6-8 weeks for long-haired cats to prevent matting</li>
                <li>Introduce your cat to grooming gradually, especially if they&apos;re new to <strong>cat grooming {city.name}</strong> services</li>
                <li>Ask about sedation-free options if your cat is particularly anxious</li>
                <li>Many <strong>cat grooming {city.name}</strong> professionals offer home visits for less stress</li>
              </ul>
            </div>
          </div>
        </section>
      )}

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
            '@id': `https://www.petcarebooker.com/cities/${citySlug}`,
            name: `Pet Grooming Services in ${city.name}, ${city.state}`,
            description: city.description,
            url: `https://www.petcarebooker.com/cities/${citySlug}`,
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
            telephone: '+1-800-PET-CARE',
          }),
        }}
      />

      <Footer />
    </div>
  );
}

