import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cat Grooming Supplies | Cat Grooming Products & Tools | Shop Online',
  description: 'Shop the best cat grooming supplies, products, and tools. Find cat grooming brushes, combs, shampoos, and more. Professional-quality cat grooming supplies for home use.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/cat-grooming-supplies',
  },
  openGraph: {
    title: 'Cat Grooming Supplies | Cat Grooming Products & Tools | Shop Online',
    description: 'Shop the best cat grooming supplies, products, and tools. Find cat grooming brushes, combs, shampoos, and more.',
    type: 'website',
    url: 'https://www.petcarebooker.com/cat-grooming-supplies',
  },
};

export default function CatGroomingSuppliesPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Cat Grooming Supplies & Products 🛒
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Shop professional-quality <strong>cat grooming supplies</strong>, <strong>cat grooming products</strong>, and <strong>cat grooming tools</strong>. Keep your cat's coat healthy between professional grooms with the best <strong>cat grooming supplies</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.amazon.com/s?k=cat+grooming+supplies&ref=nb_sb_noss"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition"
              >
                Shop Cat Grooming Supplies on Amazon →
              </a>
              <Link
                href="/cat-grooming"
                className="bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-800 transition"
              >
                Find Cat Grooming Services →
              </Link>
            </div>
          </div>
        </section>

        {/* Essential Cat Grooming Supplies */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Essential Cat Grooming Supplies
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cat Grooming Brushes</h3>
                <p className="text-gray-700 text-lg mb-4">
                  A quality <strong>cat grooming brush</strong> is essential for removing loose fur, preventing matting, and distributing natural oils. Different brushes work best for different coat types:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• <strong>Slicker brushes:</strong> Best for removing loose fur and preventing matting</li>
                  <li>• <strong>Bristle brushes:</strong> Ideal for short-haired cats and finishing</li>
                  <li>• <strong>Undercoat rakes:</strong> Essential for long-haired breeds</li>
                  <li>• <strong>De-matting combs:</strong> For removing existing mats safely</li>
                </ul>
                <a
                  href="https://www.amazon.com/s?k=cat+grooming+brush&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Shop Cat Brushes on Amazon →
                </a>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cat Grooming Combs</h3>
                <p className="text-gray-700 text-lg mb-4">
                  <strong>Cat grooming combs</strong> are perfect for detangling, removing mats, and finishing touches. Metal combs with both wide and fine teeth are most versatile.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• <strong>Wide-tooth combs:</strong> For detangling and removing large mats</li>
                  <li>• <strong>Fine-tooth combs:</strong> For finishing and removing small tangles</li>
                  <li>• <strong>Flea combs:</strong> For detecting and removing fleas</li>
                  <li>• <strong>De-matting combs:</strong> Specialized for severe matting</li>
                </ul>
                <a
                  href="https://www.amazon.com/s?k=cat+grooming+comb&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition"
                >
                  Shop Cat Combs on Amazon →
                </a>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cat Shampoos & Conditioners</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Quality <strong>cat grooming products</strong> include pH-balanced shampoos and conditioners designed specifically for cats. Never use human or dog products on cats.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• <strong>Hypoallergenic shampoos:</strong> For sensitive skin</li>
                  <li>• <strong>De-shedding shampoos:</strong> Reduce shedding between grooms</li>
                  <li>• <strong>Conditioners:</strong> Prevent matting and add shine</li>
                  <li>• <strong>Waterless shampoos:</strong> For quick cleanups between baths</li>
                </ul>
                <a
                  href="https://www.amazon.com/s?k=cat+shampoo&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Shop Cat Shampoos on Amazon →
                </a>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-orange-50 rounded-2xl p-8 shadow-lg border-2 border-teal-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nail Clippers & Trimmers</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Regular nail trimming is essential for cat health. <strong>Cat grooming tools</strong> for nails include guillotine clippers, scissor-style clippers, and nail grinders.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• <strong>Guillotine clippers:</strong> Most popular, easy to use</li>
                  <li>• <strong>Scissor-style clippers:</strong> Good for thick nails</li>
                  <li>• <strong>Nail grinders:</strong> For smooth edges and less stress</li>
                  <li>• <strong>Styptic powder:</strong> Essential for stopping bleeding if you cut too short</li>
                </ul>
                <a
                  href="https://www.amazon.com/s?k=cat+nail+clippers&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-700 transition"
                >
                  Shop Nail Clippers on Amazon →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Cat Grooming Tools */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Professional Cat Grooming Tools
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200">
              <p className="text-gray-700 text-lg mb-6">
                Professional <strong>cat grooming tools</strong> help you maintain your cat's coat between professional grooms. Investing in quality <strong>cat grooming supplies</strong> makes home grooming easier and more effective.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Essential Tools</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Slicker brush</li>
                    <li>✓ Wide and fine-tooth comb</li>
                    <li>✓ Nail clippers</li>
                    <li>✓ Cat-safe shampoo</li>
                    <li>✓ Conditioner</li>
                    <li>✓ Towels</li>
                    <li>✓ Ear cleaning solution</li>
                    <li>✓ Styptic powder</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Tools</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Undercoat rake (for long-haired cats)</li>
                    <li>✓ De-matting comb</li>
                    <li>✓ Nail grinder</li>
                    <li>✓ Grooming table (optional)</li>
                    <li>✓ Hair dryer (low heat setting)</li>
                    <li>✓ Grooming gloves</li>
                    <li>✓ Flea comb</li>
                    <li>✓ Waterless shampoo</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://www.amazon.com/s?k=cat+grooming+tools&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition"
                >
                  Shop All Cat Grooming Tools on Amazon →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product Recommendations */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Top-Rated Cat Grooming Products
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Cat Grooming Brush</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>Furminator deShedding Tool</strong> is consistently rated as one of the best <strong>cat grooming brushes</strong>. It removes loose fur and reduces shedding by up to 90%, making it essential for long-haired breeds.
                </p>
                <a
                  href="https://www.amazon.com/s?k=furminator+cat&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
                >
                  Shop Furminator on Amazon →
                </a>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Cat Grooming Comb</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>Chris Christensen Buttercomb</strong> is a professional-grade <strong>cat grooming comb</strong> that glides through fur without pulling. It's a favorite among professional groomers and cat owners alike.
                </p>
                <a
                  href="https://www.amazon.com/s?k=chris+christensen+buttercomb&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition"
                >
                  Shop Buttercomb on Amazon →
                </a>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Cat Shampoo</h3>
                <p className="text-gray-700 text-lg mb-4">
                  <strong>Burt's Bees for Cats</strong> offers natural, pH-balanced <strong>cat grooming products</strong> that are gentle on sensitive skin. Their hypoallergenic formula is perfect for cats with allergies or sensitive skin.
                </p>
                <a
                  href="https://www.amazon.com/s?k=burt%27s+bees+cat+shampoo&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Shop Burt's Bees on Amazon →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Cat Grooming Supplies */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              How to Use Cat Grooming Supplies
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Brushing Your Cat</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    Start with a slicker brush, working in the direction of hair growth. Be gentle and use short strokes. For long-haired cats, use an undercoat rake first, then finish with a slicker brush. Brush 2-3 times per week for long-haired cats, weekly for short-haired.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Bathing Your Cat</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    Use lukewarm water and cat-specific shampoo. Wet your cat thoroughly, apply shampoo, and rinse completely. Use a conditioner if needed. Dry with a towel and low-heat hair dryer if your cat tolerates it. Most cats only need baths every 4-6 weeks or when dirty.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Trimming Nails</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    Hold your cat securely and gently press the paw pad to extend the nail. Clip only the sharp tip, avoiding the quick (pink area). If you cut too short and it bleeds, apply styptic powder. Trim nails every 2-3 weeks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Shop Cat Grooming Supplies Today
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Get professional-quality <strong>cat grooming supplies</strong>, <strong>cat grooming products</strong>, and <strong>cat grooming tools</strong> to keep your cat healthy between professional grooms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.amazon.com/s?k=cat+grooming+supplies&ref=nb_sb_noss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition"
              >
                Shop All Cat Grooming Supplies →
              </a>
              <Link
                href="/cat-grooming"
                className="inline-block bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-800 transition"
              >
                Find Professional Cat Grooming →
              </Link>
            </div>
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
            '@id': 'https://www.petcarebooker.com/cat-grooming-supplies',
            name: 'Cat Grooming Supplies | Cat Grooming Products & Tools | Shop Online',
            description: 'Shop the best cat grooming supplies, products, and tools. Find cat grooming brushes, combs, shampoos, and more.',
            url: 'https://www.petcarebooker.com/cat-grooming-supplies',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PetCareBooker',
              url: 'https://www.petcarebooker.com',
            },
            about: {
              '@type': 'Product',
              name: 'Cat Grooming Supplies',
              description: 'Professional cat grooming supplies, products, and tools',
            },
          }),
        }}
      />
    </>
  );
}

