import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Grooming Blog - Tips, Guides & Local Recommendations | PetCareBooker',
  description: 'Expert pet grooming tips, city guides, and recommendations. Find the best groomers in your area and learn how to keep your pet looking their best.',
};

const blogPosts = [
  {
    slug: 'best-dog-groomers-nyc',
    title: '10 Best Dog Groomers in New York City (2025)',
    excerpt: 'Discover the top-rated dog grooming salons in NYC. From Manhattan to Brooklyn, find expert groomers your pup will love.',
    category: 'City Guides',
    city: 'New York City',
    image: '🗽',
    date: '2025-01-15',
  },
  {
    slug: 'cat-grooming-los-angeles',
    title: 'Complete Guide to Cat Grooming in Los Angeles',
    excerpt: 'Everything you need to know about cat grooming in LA. Costs, best salons, and tips for anxious cats.',
    category: 'City Guides',
    city: 'Los Angeles',
    image: '🌴',
    date: '2025-01-12',
  },
  {
    slug: 'mobile-pet-grooming-miami',
    title: 'Mobile Pet Grooming in Miami: Convenience at Your Door',
    excerpt: 'Why Miami pet parents are loving mobile grooming services. Find the best mobile groomers in your neighborhood.',
    category: 'City Guides',
    city: 'Miami',
    image: '🏖️',
    date: '2025-01-10',
  },
  {
    slug: 'how-often-groom-dog',
    title: 'How Often Should You Groom Your Dog? Expert Guide',
    excerpt: 'Learn the optimal grooming schedule for your dog based on breed, coat type, and lifestyle.',
    category: 'Pet Care Tips',
    city: null,
    image: '🐕',
    date: '2025-01-08',
  },
  {
    slug: 'cat-grooming-costs-guide',
    title: 'Cat Grooming Costs: What to Expect in 2025',
    excerpt: 'A comprehensive breakdown of cat grooming prices across the US. Know what you should pay for quality service.',
    category: 'Pet Care Tips',
    city: null,
    image: '🐈',
    date: '2025-01-05',
  },
  {
    slug: 'chicago-dog-wash-services',
    title: 'Best Dog Wash Services in Chicago: Self-Service vs Professional',
    excerpt: 'Compare Chicago\'s dog washing options. DIY stations, mobile services, and full-service grooming salons.',
    category: 'City Guides',
    city: 'Chicago',
    image: '🌆',
    date: '2025-01-03',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-3xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            🐾 PetCareBooker
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Pet Grooming Blog 📝
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            Expert tips, local recommendations, and everything you need to keep your pet looking and feeling their best.
          </p>
          
          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold border-2 border-purple-300 hover:bg-purple-50 transition">
              All Posts
            </button>
            <button className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-200 transition">
              City Guides
            </button>
            <button className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-200 transition">
              Pet Care Tips
            </button>
            <button className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-200 transition">
              Grooming 101
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center text-8xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                      {post.category}
                    </span>
                    {post.city && (
                      <span className="text-gray-500 text-xs">📍 {post.city}</span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Date & Read More */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-purple-600 font-bold group-hover:gap-2 flex items-center gap-1 transition-all">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Find Groomers in Your City 🗺️
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Browse verified groomers by location, read reviews, and book instantly.
          </p>
          <Link 
            href="/browse"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all hover:scale-110 shadow-2xl"
          >
            Browse All Groomers
          </Link>
        </div>
      </section>

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

