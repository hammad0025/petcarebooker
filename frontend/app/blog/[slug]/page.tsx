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

