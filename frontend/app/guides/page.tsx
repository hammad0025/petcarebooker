import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pet Grooming Guides - How to Prepare Your Pet | PetCareBooker',
  description: 'Learn how to prepare your pet for grooming appointments. Expert tips for a stress-free grooming experience for dogs and cats.',
  alternates: {
    canonical: 'https://petcarebooker.com/guides',
  },
};

export default function GuidesPage() {
  const guides = [
    {
      title: 'How Often Should You Groom Your Dog?',
      description: 'Learn the ideal grooming frequency for your dog\'s breed, coat type, and lifestyle.',
      slug: 'how-often-groom-dog',
      category: 'Dog Care',
      readTime: '6 min read',
    },
    {
      title: 'Cat Grooming Costs: Complete Price Guide',
      description: 'Detailed pricing for baths, lion cuts, nail trims, and more. Compare prices and find affordable cat groomers.',
      slug: 'cat-grooming-costs-guide',
      category: 'Cat Care',
      readTime: '7 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-3xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            🐾 PetCareBooker
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Pet Grooming Guides 📚
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Expert advice on pet grooming, costs, frequency, and care tips. Everything you need to keep your furry friend healthy and happy.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-purple-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold">
                    {guide.category}
                  </span>
                  <span className="text-gray-500 text-sm">{guide.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {guide.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {guide.description}
                </p>
                <span className="text-purple-600 font-bold hover:underline">
                  Read Guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Book a Groomer? 🐾
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Find verified, professional groomers in your area. Compare prices, read reviews, and book instantly.
          </p>
          <Link
            href="/browse"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all hover:scale-110 shadow-xl"
          >
            Browse Groomers
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

