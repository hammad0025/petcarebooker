import Link from 'next/link';
import { Metadata } from 'next';

// This would come from a CMS or database in production
const blogContent: Record<string, any> = {
  'best-dog-groomers-nyc': {
    title: '10 Best Dog Groomers in New York City (2025)',
    description: 'Discover the top-rated dog grooming salons in NYC. From Manhattan to Brooklyn, find expert groomers your pup will love. Reviews, prices, and booking info.',
    author: 'PetCareBooker Team',
    date: '2025-01-15',
    city: 'New York City',
    state: 'NY',
    category: 'City Guides',
    image: '🗽',
    content: `
New York City is home to some of the best dog groomers in the country. Whether you're in Manhattan, Brooklyn, Queens, or the Bronx, finding a trusted groomer for your furry friend is essential.

## Why Professional Dog Grooming Matters

Regular grooming isn't just about keeping your dog looking good—it's about their health and happiness. Professional groomers can:

- Detect skin issues, lumps, or parasites early
- Keep your dog's coat healthy and mat-free
- Trim nails safely without causing pain
- Clean ears to prevent infections
- Provide a stress-free experience with proper handling techniques

## Top 10 Dog Groomers in NYC

### 1. Pawsitive Grooming (Manhattan)
**Location:** Upper West Side
**Specialty:** Long-haired breeds, show dog prep
**Price Range:** $75-$150
**Why We Love Them:** Expert handling of anxious dogs, luxury spa treatments

### 2. Brooklyn Bark & Bath (Brooklyn)
**Location:** Williamsburg
**Specialty:** Creative cuts, breed-specific styling
**Price Range:** $60-$120
**Why We Love Them:** Eco-friendly products, patient with senior dogs

### 3. Chelsea Paws Grooming Salon (Manhattan)
**Location:** Chelsea
**Specialty:** Small breeds, cat grooming
**Price Range:** $65-$110
**Why We Love Them:** Same-day appointments, mobile grooming available

### 4. Queens Pet Spa (Queens)
**Location:** Astoria
**Specialty:** Large breeds, de-shedding treatments
**Price Range:** $70-$140
**Why We Love Them:** Spacious facilities, certified groomers

### 5. The Dog Spot (Manhattan)
**Location:** East Village
**Specialty:** Natural products, hypoallergenic treatments
**Price Range:** $80-$130
**Why We Love Them:** Organic shampoos, calming environment

## How to Choose the Right Groomer

When selecting a groomer in NYC, consider:

1. **Certifications** - Look for certified professional groomers (CPG)
2. **Reviews** - Check Google, Yelp, and PetCareBooker reviews
3. **Facility** - Visit to ensure cleanliness and safety
4. **Handling** - Ask about their approach to anxious dogs
5. **Pricing** - Get detailed quotes including add-ons

## NYC Dog Grooming Costs

Average prices in New York City (2025):
- **Small dogs (under 15 lbs):** $60-$90
- **Medium dogs (15-40 lbs):** $75-$110
- **Large dogs (40-80 lbs):** $90-$140
- **Extra-large dogs (80+ lbs):** $120-$180

Add-ons:
- De-shedding treatment: +$15-$30
- Teeth brushing: +$10-$15
- Nail grinding: +$5-$10
- Flea/tick treatment: +$15-$25

## Booking Your NYC Dog Groomer

Ready to book? Use PetCareBooker to:
- Compare prices and reviews
- See real-time availability
- Book instantly with verified groomers
- Get SMS reminders

[Browse NYC Dog Groomers →](/browse)

## Frequently Asked Questions

**How often should I groom my dog in NYC?**
Most dogs need professional grooming every 6-8 weeks. Breeds with continuously growing hair (Poodles, Shih Tzus) may need grooming every 4-6 weeks.

**Do NYC groomers require vaccinations?**
Yes, most reputable groomers require proof of rabies, distemper, and bordetella (kennel cough) vaccinations.

**Can I stay with my dog during grooming?**
Policies vary. Some groomers allow it, while others find it increases dog anxiety. Ask when booking.

**What if my dog is aggressive or anxious?**
Many NYC groomers specialize in anxious or reactive dogs. Mention this when booking so they can prepare.

## Neighborhoods We Serve

PetCareBooker connects you with groomers throughout NYC:
- Manhattan (Upper East Side, Upper West Side, Midtown, Downtown)
- Brooklyn (Williamsburg, Park Slope, DUMBO, Bushwick)
- Queens (Astoria, Long Island City, Flushing)
- Bronx (Riverdale, Fordham, Pelham Bay)
- Staten Island (St. George, Tottenville)

---

*Last updated: January 2025. Prices and availability subject to change. Book through PetCareBooker for the most current information.*
    `,
  },
  'best-pet-groomers-west-palm-beach': {
    title: 'Best Pet Groomers in West Palm Beach, FL (2025)',
    description: 'Find top-rated dog and cat groomers in West Palm Beach. Compare prices, read reviews, and book instantly. From downtown to the beaches.',
    author: 'PetCareBooker Team',
    date: '2025-01-18',
    city: 'West Palm Beach',
    state: 'FL',
    category: 'City Guides',
    image: '🌴',
    content: `
West Palm Beach is a pet-friendly paradise with excellent grooming services throughout the city. Whether you're in downtown, Northwood, or near the beaches, finding the right groomer for your furry friend is essential.

## Why Pet Grooming Matters in South Florida

Florida's humid climate makes regular grooming especially important for pets. Professional groomers in West Palm Beach help with:

- Managing humidity-related coat issues and matting
- Preventing hot spots and skin irritations
- Keeping nails trimmed for walks on hot pavement
- De-shedding for year-round comfort
- Tick and flea prevention treatments

## Top Pet Groomers in West Palm Beach

### 1. Palm Beach Paws Grooming (Downtown)
**Location:** Downtown West Palm Beach
**Specialty:** All breeds, luxury spa treatments
**Price Range:** $65-$125
**Why We Love Them:** Climate-controlled facility, gentle handling, same-day appointments

### 2. Coastal Cuts Pet Salon (Northwood)
**Location:** Northwood
**Specialty:** Large breeds, creative cuts
**Price Range:** $60-$110
**Why We Love Them:** Experienced with anxious dogs, eco-friendly products

### 3. Flamingo Park Pet Spa (Flamingo Park)
**Location:** Flamingo Park neighborhood
**Specialty:** Small dogs, cats, senior pets
**Price Range:** $55-$100
**Why We Love Them:** Cage-free environment, certified groomers

### 4. Beachside Grooming (Near beaches)
**Location:** Near Palm Beach shores
**Specialty:** Beach bath packages, de-shedding
**Price Range:** $70-$120
**Why We Love Them:** Post-beach cleanup specialists, mobile service available

### 5. City Place Pet Care (City Place)
**Location:** City Place district
**Specialty:** Breed-specific cuts, show prep
**Price Range:** $75-$130
**Why We Love Them:** Convenient downtown location, online booking

## West Palm Beach Pet Grooming Costs

Average prices in West Palm Beach (2025):
- **Small dogs (under 15 lbs):** $55-$85
- **Medium dogs (15-40 lbs):** $70-$100
- **Large dogs (40-80 lbs):** $85-$125
- **Cats:** $60-$95

Popular add-ons:
- De-shedding treatment: +$20-$35
- Flea/tick bath: +$15-$25
- Teeth brushing: +$10
- Nail grinding: +$5-$10

## How to Choose a Groomer in WPB

Consider these factors:

1. **Climate Experience** - Florida groomers understand humidity challenges
2. **Indoor Facilities** - Air conditioning is essential in summer
3. **Reviews** - Check PetCareBooker and Google reviews
4. **Certifications** - Look for certified professional groomers
5. **Emergency Protocols** - Ask about heat-related safety measures

## Mobile Grooming in West Palm Beach

Many WPB groomers offer mobile services, bringing the salon to your door. Benefits include:
- Less stress for anxious pets
- No travel in hot weather
- Convenient for multiple pets
- One-on-one attention

Average mobile grooming cost: +$10-$20 vs salon prices

## Frequently Asked Questions

**How often should I groom my dog in West Palm Beach?**
Due to Florida's humidity, most dogs benefit from grooming every 4-6 weeks. Breeds with thick coats may need more frequent visits during summer.

**Do groomers in West Palm Beach use air conditioning?**
Reputable groomers always have climate-controlled facilities. Never leave your pet with a groomer lacking proper AC in Florida.

**Can I get same-day grooming in WPB?**
Many groomers offer same-day appointments, especially on weekdays. Book through PetCareBooker to see real-time availability.

**What's the best time of year for grooming in South Florida?**
Year-round grooming is essential in Florida. Many pet parents opt for shorter "summer cuts" from April through October.

## Neighborhoods We Serve

- Downtown West Palm Beach
- Northwood
- Flamingo Park
- South Dixie
- City Place
- El Cid
- Old Northwood Historic District
- Grandview Heights

[Browse West Palm Beach Groomers →](/cities/west-palm-beach)

---

*Last updated: January 2025. Prices subject to change.*
    `,
  },
  'tampa-pet-grooming-guide': {
    title: 'Complete Guide to Pet Grooming in Tampa, FL (2025)',
    description: 'Find the best pet groomers in Tampa Bay. Compare Hyde Park, Ybor City, and South Tampa options. Prices, reviews, and instant booking.',
    author: 'PetCareBooker Team',
    date: '2025-01-17',
    city: 'Tampa',
    state: 'FL',
    category: 'City Guides',
    image: '⚡',
    content: `
Tampa's vibrant pet community deserves exceptional grooming services. From the historic streets of Ybor City to the upscale neighborhoods of Hyde Park, finding the perfect groomer for your pet is easier than ever.

## Tampa's Best Pet Grooming Salons

### 1. Hyde Park Pet Boutique (Hyde Park)
**Location:** Hyde Park Village
**Specialty:** Designer cuts, luxury spa
**Price Range:** $75-$140
**Why We Love Them:** Upscale boutique atmosphere, premium products, valet parking

### 2. Ybor City Pet Parlor (Ybor City)
**Location:** Historic Ybor
**Specialty:** All breeds, creative grooming
**Price Range:** $60-$115
**Why We Love Them:** Historic charm, experienced groomers, walk-ins welcome

### 3. Seminole Heights Grooming Co. (Seminole Heights)
**Location:** Seminole Heights
**Specialty:** Eco-friendly grooming, natural products
**Price Range:** $65-$120
**Why We Love Them:** Sustainable practices, organic shampoos, local favorite

### 4. Westshore Pet Spa (Westshore)
**Location:** Westshore business district
**Specialty:** Express grooming, busy professionals
**Price Range:** $70-$125
**Why We Love Them:** Fast service, early/late hours, convenient parking

### 5. South Tampa Pet Care (South Tampa)
**Location:** South Tampa
**Specialty:** Senior pets, gentle handling
**Price Range:** $65-$120
**Why We Love Them:** Experienced with elderly dogs, low-stress environment

## Tampa Pet Grooming Pricing

Average costs in Tampa Bay (2025):
- **Small dogs:** $60-$90
- **Medium dogs:** $75-$105
- **Large dogs:** $90-$130
- **Extra-large dogs:** $110-$150
- **Cats:** $65-$100

Popular services:
- Full groom (bath, cut, nails, ears): Standard price
- Bath only: -$20-$30
- De-shedding treatment: +$20-$30
- Teeth brushing: +$10-$15

## What Makes Tampa Groomers Special

Tampa groomers understand Florida's unique challenges:

1. **Humidity Management** - Expert de-shedding techniques
2. **Outdoor Lifestyle** - Cleaning up after dog park visits, beach trips
3. **Year-Round Service** - No "off-season" in Tampa
4. **Pest Prevention** - Tick and flea treatments essential

## Mobile Pet Grooming in Tampa

Mobile grooming is huge in Tampa! Benefits include:
- Avoids traffic stress (I-275 gridlock)
- Convenient for Bayshore pet parents
- Perfect for multiple pets
- No wait times

Top mobile grooming areas: Hyde Park, South Tampa, Channelside, Westshore

## Frequently Asked Questions

**What neighborhoods have the most groomers?**
Hyde Park, South Tampa, and Seminole Heights have the highest concentration of quality groomers.

**Do Tampa groomers work with aggressive dogs?**
Many Tampa groomers specialize in anxious or reactive pets. Always mention behavioral concerns when booking.

**Can I stay during grooming?**
Policies vary. Boutique salons in Hyde Park often allow it, while high-volume shops may not.

**What about Sunday grooming?**
Several Tampa groomers open Sundays. Use PetCareBooker's filters to find weekend availability.

## Tampa Bay Areas We Serve

- Hyde Park
- Ybor City
- Seminole Heights
- Westshore
- South Tampa
- Channelside
- Davis Islands
- Palma Ceia

[Browse Tampa Groomers →](/cities/tampa)

---

*Last updated: January 2025*
    `,
  },
  'orlando-dog-grooming-2025': {
    title: 'Best Dog Grooming in Orlando, FL: 2025 Guide',
    description: 'Discover Orlando\'s top dog groomers from Winter Park to Lake Nona. Compare prices, read reviews, and book same-day appointments.',
    author: 'PetCareBooker Team',
    date: '2025-01-16',
    city: 'Orlando',
    state: 'FL',
    category: 'City Guides',
    image: '🎢',
    content: `
Orlando isn't just the theme park capital—it's also home to exceptional pet grooming services. Whether you're in Winter Park, Lake Nona, or downtown, finding a trusted groomer for your dog is essential.

## Top Dog Groomers in Orlando

### 1. Winter Park Pet Boutique (Winter Park)
**Location:** Park Avenue, Winter Park
**Specialty:** Show dogs, breed-specific cuts
**Price Range:** $75-$145
**Why We Love Them:** Upscale service, experienced with all breeds, complimentary nail polish

### 2. Lake Nona Pet Spa (Lake Nona)
**Location:** Lake Nona Town Center
**Specialty:** Modern facility, tech-enabled booking
**Price Range:** $70-$130
**Why We Love Them:** State-of-the-art equipment, live cam option, smart scheduling

### 3. College Park Grooming (College Park)
**Location:** Edgewater Drive
**Specialty:** Rescue dogs, gentle handling
**Price Range:** $60-$110
**Why We Love Them:** Patient with fearful dogs, rescue-friendly, donations to local shelters

### 4. Dr. Phillips Pet Care (Dr. Phillips)
**Location:** Dr. Phillips area
**Specialty:** Doodles, large breeds
**Price Range:** $80-$140
**Why We Love Them:** Doodle experts, spacious facility, free teeth brushing

### 5. Downtown Orlando Pet Salon (Downtown)
**Location:** Thornton Park
**Specialty:** Creative grooming, walk-ins
**Price Range:** $65-$120
**Why We Love Them:** Central location, colored mohawks available, fun atmosphere

## Orlando Dog Grooming Costs

Average prices in Orlando (2025):
- **Toy breeds (Yorkies, Maltese):** $60-$85
- **Small dogs (Shih Tzus, Poodles):** $70-$100
- **Medium dogs (Cockers, Bulldogs):** $80-$115
- **Large dogs (Labs, Golden Retrievers):** $95-$135
- **Giant breeds (Great Danes, Mastiffs):** $120-$160

Special services:
- Doodle groom (time-intensive): $90-$150
- Creative grooming (colors, designs): +$30-$60
- Deshedding treatment: +$20-$35
- Teeth cleaning add-on: +$12-$20

## Why Orlando Dogs Need Regular Grooming

Orlando's climate creates unique grooming needs:

1. **Theme Park Visitors** - Keep your travel buddy fresh for vacation photos
2. **Lake Activities** - Post-swim cleanups essential
3. **Hot Summers** - Summer cuts keep dogs comfortable
4. **Year-Round Fleas** - Regular treatments prevent infestations

## Mobile Grooming in Orlando

Mobile grooming is perfect for Orlando's sprawl! Popular areas:

- Winter Park (avoid Park Avenue traffic)
- Lake Nona (new developments)
- Dr. Phillips (family-friendly neighborhoods)
- Baldwin Park (pet-friendly community)
- Windermere (estate properties)

Average mobile cost: $85-$150 depending on dog size

## Frequently Asked Questions

**Can I book same-day grooming in Orlando?**
Yes! Many Orlando groomers have same-day availability, especially weekdays. Check PetCareBooker for real-time slots.

**Do Orlando groomers groom cats too?**
Most Orlando groomers offer cat services, though some require separate booking times. Always mention you have a cat when calling.

**What's the best neighborhood for dog grooming?**
Winter Park and Lake Nona have the highest concentration of quality groomers, but every Orlando neighborhood has options.

**How long does grooming take in Orlando?**
Expect 2-4 hours depending on your dog's size and coat. Express services (1-2 hours) cost $10-$20 more.

## Orlando Neighborhoods We Serve

- Winter Park
- Lake Nona
- Dr. Phillips
- College Park
- Downtown Orlando
- Baldwin Park
- Thornton Park
- Windermere
- MetroWest
- Waterford Lakes

[Browse Orlando Groomers →](/cities/orlando)

---

*Last updated: January 2025*
    `,
  },
  'fort-lauderdale-pet-grooming': {
    title: 'Fort Lauderdale Pet Grooming: Best Salons & Mobile Services',
    description: 'Find top pet groomers in Fort Lauderdale. From Las Olas to Wilton Manors, discover trusted groomers with instant booking and verified reviews.',
    author: 'PetCareBooker Team',
    date: '2025-01-15',
    city: 'Fort Lauderdale',
    state: 'FL',
    category: 'City Guides',
    image: '⛵',
    content: `
Fort Lauderdale's beach lifestyle demands exceptional pet grooming. Whether your furry friend needs a post-beach cleanup or a luxury spa day, Fort Lauderdale's groomers deliver world-class service.

## Best Pet Groomers in Fort Lauderdale

### 1. Las Olas Pet Boutique (Las Olas)
**Location:** East Las Olas Boulevard
**Specialty:** Luxury grooming, designer pets
**Price Range:** $75-$145
**Why We Love Them:** High-end boutique, celebrity clientele, premium products

### 2. Victoria Park Pet Spa (Victoria Park)
**Location:** Victoria Park neighborhood
**Specialty:** Eco-friendly, natural products
**Price Range:** $65-$120
**Why We Love Them:** Organic shampoos, sustainability focus, calm environment

### 3. Wilton Manors Grooming Co. (Wilton Manors)
**Location:** Wilton Drive
**Specialty:** Creative cuts, LGBTQ+ owned
**Price Range:** $70-$125
**Why We Love Them:** Inclusive atmosphere, creative grooming, community-focused

### 4. Harbor Beach Pet Care (Harbor Beach)
**Location:** Near Bonnet House
**Specialty:** Beach bath packages, salt removal
**Price Range:** $80-$135
**Why We Love Them:** Beach dog specialists, saltwater treatment expertise

### 5. Rio Vista Pet Salon (Rio Vista)
**Location:** Rio Vista neighborhood
**Specialty:** Mobile service, waterfront homes
**Price Range:** $75-$130
**Why We Love Them:** Boat-friendly, mobile yacht-side grooming, flexible hours

## Fort Lauderdale Grooming Prices

Average costs in Fort Lauderdale (2025):
- **Small dogs:** $65-$95
- **Medium dogs:** $80-$110
- **Large dogs:** $95-$135
- **Extra-large dogs:** $120-$160
- **Cats:** $70-$105

Beach-specific services:
- Beach cleanup bath: $40-$60 (bath only)
- Saltwater removal treatment: +$15-$25
- Sand mat removal: +$20-$40
- Waterproof coat treatment: +$25

## Beach Dog Grooming Tips

Fort Lauderdale groomers specialize in beach dogs:

1. **Saltwater Rinse** - Removes salt that dries skin
2. **Sand Removal** - Professional mat treatment
3. **Paw Care** - Hot sand protection for pads
4. **Ear Cleaning** - Prevents water-related infections
5. **UV Protection** - Sun-safe coat treatments

## Mobile Pet Grooming in Fort Lauderdale

Perfect for Fort Lauderdale's boating lifestyle! Mobile groomers serve:

- Waterfront properties
- Marina residents
- Yacht owners (boat-side service!)
- Gated communities
- High-rise condos

Average mobile price: $90-$150

## Frequently Asked Questions

**Do Fort Lauderdale groomers clean beach dogs?**
Absolutely! Many specialize in post-beach cleanups. "Beach bath" packages are popular and affordable.

**Can mobile groomers come to my boat?**
Yes! Several Fort Lauderdale mobile groomers offer yacht-side service at marinas.

**What's included in a beach bath?**
Typically: saltwater rinse, sand removal, paw cleaning, light brush, ear check. No haircut (bath only service).

**How often should beach dogs be groomed?**
If your dog swims weekly, light grooming/baths every 2 weeks. Full groom every 6-8 weeks.

## Fort Lauderdale Neighborhoods

- Las Olas
- Victoria Park
- Wilton Manors
- Harbor Beach
- Rio Vista
- Lauderdale-by-the-Sea
- Coral Ridge
- Imperial Point

[Browse Fort Lauderdale Groomers →](/cities/fort-lauderdale)

---

*Last updated: January 2025*
    `,
  },
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogContent[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found | PetCareBooker Blog',
    };
  }

  return {
    title: `${post.title} | PetCareBooker Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogContent[params.slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-purple-600 font-bold hover:underline">
            ← Back to Blog
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

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-purple-600">Blog</Link>
            <span>→</span>
            <span className="text-gray-900 font-semibold">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            {/* Category & Location */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold">
                {post.category}
              </span>
              {post.city && (
                <span className="text-gray-600 flex items-center gap-1">
                  📍 {post.city}, {post.state}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-gray-600">
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </time>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="h-96 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl flex items-center justify-center text-9xl mb-12 shadow-lg">
            {post.image}
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-purple-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:my-6 prose-li:my-2
            "
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/##/g, '<h2>').replace(/###/g, '<h3>') }}
          />

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-10 text-center mt-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Book a Groomer? 🐾
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Find verified groomers in {post.city || 'your area'}, compare prices, and book instantly.
            </p>
            <Link 
              href="/browse"
              className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all hover:scale-110 shadow-xl"
            >
              Browse Groomers
            </Link>
          </div>
        </div>
      </article>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            author: {
              '@type': 'Organization',
              name: post.author,
            },
            datePublished: post.date,
            dateModified: post.date,
            publisher: {
              '@type': 'Organization',
              name: 'PetCareBooker',
              logo: {
                '@type': 'ImageObject',
                url: 'https://petcarebooker.com/logo.png',
              },
            },
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

