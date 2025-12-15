import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Shih Tzu Grooming Styles | Types of Shih Tzu Haircuts | Professional Grooming',
  description: 'Discover popular Shih Tzu grooming styles and types of Shih Tzu haircuts. Learn about the puppy cut, show cut, teddy bear cut, and more. Find professional Shih Tzu groomers.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/shih-tzu-grooming',
  },
  openGraph: {
    title: 'Shih Tzu Grooming Styles | Types of Shih Tzu Haircuts | Professional Grooming',
    description: 'Discover popular Shih Tzu grooming styles and types of Shih Tzu haircuts. Learn about the puppy cut, show cut, teddy bear cut, and more.',
    type: 'website',
    url: 'https://www.petcarebooker.com/shih-tzu-grooming',
  },
};

export default function ShihTzuGroomingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Shih Tzu Grooming Styles & Haircuts 🐕
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Discover popular <strong>Shih Tzu grooming styles</strong> and <strong>types of Shih Tzu haircuts</strong>. Learn about the puppy cut, show cut, teddy bear cut, and other professional <strong>Shih Tzu grooming</strong> options. Find expert groomers specializing in Shih Tzus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse?service=dog-grooming"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
              >
                Find Shih Tzu Groomers →
              </Link>
              <Link
                href="/dog-grooming"
                className="bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-800 transition"
              >
                Learn About Dog Grooming →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Shih Tzu Grooming is Important */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Why Shih Tzu Grooming is Essential
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Shih Tzus have a long, luxurious double coat that grows continuously and requires regular professional grooming. <strong>Shih Tzu grooming</strong> is essential to prevent matting, maintain the coat's health, and keep your Shih Tzu comfortable. Without proper <strong>Shih Tzu grooming</strong>, their dense, fine hair can become severely matted, leading to skin irritation, infections, and discomfort.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                When exploring <strong>Shih Tzu grooming styles</strong> and <strong>types of Shih Tzu haircuts</strong>, you'll find options ranging from the classic long show coat to practical short cuts. The right <strong>Shih Tzu grooming style</strong> depends on your lifestyle, your Shih Tzu's activity level, and how much maintenance you can commit to.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 border border-purple-100">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Prevents Matting</h3>
                  <p className="text-gray-600">Regular grooming prevents painful matting of the dense Shih Tzu coat</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-pink-100">
                  <div className="text-4xl mb-3">💅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maintains Health</h3>
                  <p className="text-gray-600">Early detection of skin conditions and health issues</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-orange-100">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Stylish Appearance</h3>
                  <p className="text-gray-600">Various Shih Tzu grooming styles to match your preferences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Shih Tzu Grooming Styles */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Popular Shih Tzu Grooming Styles & Types of Shih Tzu Haircuts
            </h2>
            <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
              When choosing <strong>Shih Tzu grooming styles</strong> and <strong>types of Shih Tzu haircuts</strong>, consider your lifestyle and maintenance preferences. Here are the most popular <strong>Shih Tzu grooming</strong> options:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Puppy Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>puppy cut</strong> is the most popular <strong>Shih Tzu haircut</strong> for pet owners. The entire body is trimmed to 1-2 inches, creating a uniform, easy-to-maintain look. This <strong>Shih Tzu grooming style</strong> is perfect for active dogs and requires minimal daily maintenance.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Body trimmed to 1-2 inches</li>
                  <li>• Face trimmed short for easy care</li>
                  <li>• Low maintenance</li>
                  <li>• Perfect for active Shih Tzus</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Show Cut (Long Coat)</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>show cut</strong> is the traditional <strong>Shih Tzu grooming style</strong> with a long, flowing coat that reaches the ground. This is the classic Shih Tzu look but requires extensive daily maintenance including brushing, conditioning, and topknot styling.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Long, floor-length coat</li>
                  <li>• Topknot on head</li>
                  <li>• Requires daily brushing</li>
                  <li>• Traditional show ring style</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Daily brushing, professional grooming every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Teddy Bear Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>Teddy Bear cut</strong> is a popular <strong>Shih Tzu haircut</strong> that creates a rounded, cuddly appearance. The body is trimmed to 1-2 inches with a rounded face, making your Shih Tzu look like a teddy bear.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Rounded face and body</li>
                  <li>• 1-2 inch length</li>
                  <li>• Adorable, cuddly appearance</li>
                  <li>• Easy to maintain</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Summer Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>summer cut</strong> is a practical <strong>Shih Tzu grooming style</strong> for hot weather. The body is trimmed very short (1/2 to 1 inch) while keeping slightly longer hair on the head and tail.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Very short body (1/2-1 inch)</li>
                  <li>• Longer head and tail</li>
                  <li>• Cool and comfortable</li>
                  <li>• Minimal maintenance</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lion Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>lion cut</strong> is a unique <strong>Shih Tzu haircut</strong> where the body is shaved short while leaving a mane around the head and neck, and a tuft on the tail. This creates a lion-like appearance.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Shaved body with mane</li>
                  <li>• Distinctive lion appearance</li>
                  <li>• Low maintenance body</li>
                  <li>• Fun, unique style</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Modified Show Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>modified show cut</strong> is a compromise between the show cut and puppy cut. This <strong>Shih Tzu grooming style</strong> features a longer coat (3-4 inches) but is more manageable than the full show cut.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Medium-length coat (3-4 inches)</li>
                  <li>• Elegant appearance</li>
                  <li>• Moderate maintenance</li>
                  <li>• Best of both worlds</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Weekly brushing, grooming every 4-6 weeks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shih Tzu Grooming Costs */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Shih Tzu Grooming Costs
            </h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <p className="text-gray-700 text-lg mb-6 text-center">
                <strong>Shih Tzu grooming</strong> costs vary based on the <strong>Shih Tzu grooming style</strong> chosen, coat condition, and location. Here's what to expect:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Standard Shih Tzu Grooming</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$50-$90</p>
                  <p className="text-gray-600 text-sm mb-4">Puppy cut, Teddy Bear cut, or Summer cut</p>
                  <p className="text-gray-700">Includes: bath, haircut, nail trim, ear cleaning, sanitary trim</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-pink-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Show Cut Maintenance</h3>
                  <p className="text-3xl font-bold text-pink-600 mb-2">$65-$130</p>
                  <p className="text-gray-600 text-sm mb-4">Long coat maintenance and styling</p>
                  <p className="text-gray-700">Includes: full bath, conditioning, styling, topknot, nail trim, ear cleaning</p>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Factors Affecting Shih Tzu Grooming Cost</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Shih Tzu grooming style:</strong> Show cuts cost more than pet cuts</li>
                  <li>• <strong>Coat condition:</strong> Severely matted coats require extra time ($25-$50 dematting fee)</li>
                  <li>• <strong>Location:</strong> Prices vary by city and region</li>
                  <li>• <strong>Groomer experience:</strong> Specialists may charge premium rates</li>
                  <li>• <strong>Additional services:</strong> Teeth cleaning, nail grinding, specialty products add to cost</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Find Professional Shih Tzu Grooming Services
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Discover the perfect <strong>Shih Tzu grooming style</strong> for your pet. Find expert groomers specializing in <strong>types of Shih Tzu haircuts</strong> and <strong>Shih Tzu grooming</strong> near you.
            </p>
            <Link
              href="/browse?service=dog-grooming"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
            >
              Find Shih Tzu Groomers Near Me →
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
            '@id': 'https://www.petcarebooker.com/shih-tzu-grooming',
            name: 'Shih Tzu Grooming Styles | Types of Shih Tzu Haircuts | Professional Grooming',
            description: 'Discover popular Shih Tzu grooming styles and types of Shih Tzu haircuts. Learn about the puppy cut, show cut, teddy bear cut, and more.',
            url: 'https://www.petcarebooker.com/shih-tzu-grooming',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PetCareBooker',
              url: 'https://www.petcarebooker.com',
            },
            about: {
              '@type': 'Service',
              serviceType: 'Shih Tzu Grooming',
              description: 'Professional Shih Tzu grooming services and grooming styles',
            },
          }),
        }}
      />
    </>
  );
}

