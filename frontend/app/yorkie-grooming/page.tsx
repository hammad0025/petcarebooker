import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Yorkie Grooming Styles | Yorkie Haircuts | Professional Yorkie Grooming',
  description: 'Discover popular Yorkie grooming styles and Yorkie haircuts. Learn about the puppy cut, show cut, and other Yorkie grooming options. Find professional Yorkie groomers near you.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/yorkie-grooming',
  },
  openGraph: {
    title: 'Yorkie Grooming Styles | Yorkie Haircuts | Professional Yorkie Grooming',
    description: 'Discover popular Yorkie grooming styles and Yorkie haircuts. Learn about the puppy cut, show cut, and other Yorkie grooming options.',
    type: 'website',
    url: 'https://www.petcarebooker.com/yorkie-grooming',
  },
};

export default function YorkieGroomingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Yorkie Grooming Styles & Haircuts 🐕
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover popular <strong>Yorkie grooming styles</strong> and <strong>Yorkie haircuts</strong>. Learn about the puppy cut, show cut, and other professional <strong>Yorkie grooming</strong> options. Find expert groomers specializing in Yorkshire Terriers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse?service=dog-grooming"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition"
              >
                Find Yorkie Groomers →
              </Link>
              <Link
                href="/dog-grooming"
                className="bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition"
              >
                Learn About Dog Grooming →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Yorkie Grooming is Important */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Why Yorkie Grooming is Essential
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Yorkshire Terriers have a unique, silky coat that grows continuously and requires regular professional grooming. <strong>Yorkie grooming</strong> is essential to prevent matting, maintain the coat's texture, and keep your Yorkie healthy and comfortable. Without proper <strong>Yorkie grooming</strong>, their long, fine hair can become tangled and matted, leading to skin irritation and discomfort.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                When exploring <strong>Yorkie grooming styles</strong> and <strong>Yorkie haircuts</strong>, you'll find options ranging from the classic long show coat to practical short cuts. The right <strong>Yorkie grooming style</strong> depends on your lifestyle, your Yorkie's activity level, and how much maintenance you can commit to.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 border border-blue-100">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Prevents Matting</h3>
                  <p className="text-gray-600">Regular grooming prevents painful matting of the silky Yorkie coat</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-purple-100">
                  <div className="text-4xl mb-3">💅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maintains Health</h3>
                  <p className="text-gray-600">Early detection of skin conditions and health issues</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-pink-100">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Stylish Appearance</h3>
                  <p className="text-gray-600">Various Yorkie grooming styles to match your preferences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Yorkie Grooming Styles */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Popular Yorkie Grooming Styles & Yorkie Haircuts
            </h2>
            <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
              When choosing <strong>Yorkie grooming styles</strong> and <strong>Yorkie haircuts</strong>, consider your lifestyle and maintenance preferences. Here are the most popular <strong>Yorkie grooming</strong> options:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Puppy Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>puppy cut</strong> is one of the most popular <strong>Yorkie haircuts</strong> for pet owners. The entire body is trimmed to 1-2 inches, creating a uniform, easy-to-maintain look. This <strong>Yorkie grooming style</strong> is perfect for active dogs and requires minimal daily maintenance.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Body trimmed to 1-2 inches</li>
                  <li>• Face trimmed short for easy care</li>
                  <li>• Low maintenance</li>
                  <li>• Perfect for active Yorkies</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Show Cut (Long Coat)</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>show cut</strong> is the traditional <strong>Yorkie grooming style</strong> with a long, flowing coat that reaches the floor. This is the classic Yorkie look but requires extensive daily maintenance including brushing, conditioning, and wrapping the hair.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Long, floor-length coat</li>
                  <li>• Parted down the middle</li>
                  <li>• Requires daily brushing</li>
                  <li>• Traditional show ring style</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Daily brushing, professional grooming every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Teddy Bear Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>Teddy Bear cut</strong> is a popular <strong>Yorkie haircut</strong> that creates a rounded, cuddly appearance. The body is trimmed to 1-2 inches with a rounded face, making your Yorkie look like a teddy bear.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Rounded face and body</li>
                  <li>• 1-2 inch length</li>
                  <li>• Adorable, cuddly appearance</li>
                  <li>• Easy to maintain</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Summer Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>summer cut</strong> is a practical <strong>Yorkie grooming style</strong> for hot weather. The body is trimmed very short (1/2 to 1 inch) while keeping slightly longer hair on the head and tail.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Very short body (1/2-1 inch)</li>
                  <li>• Longer head and tail</li>
                  <li>• Cool and comfortable</li>
                  <li>• Minimal maintenance</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Modified Show Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>modified show cut</strong> is a compromise between the show cut and puppy cut. This <strong>Yorkie haircut</strong> features a longer coat (3-4 inches) but is more manageable than the full show cut.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Medium-length coat (3-4 inches)</li>
                  <li>• Elegant appearance</li>
                  <li>• Moderate maintenance</li>
                  <li>• Best of both worlds</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Weekly brushing, grooming every 4-6 weeks</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lamb Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>lamb cut</strong> is a cute <strong>Yorkie grooming style</strong> with a shorter body (1-2 inches) and a fuller, rounded head. This creates a lamb-like appearance that's both adorable and practical.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Shorter body, fuller head</li>
                  <li>• Lamb-like appearance</li>
                  <li>• Easy maintenance</li>
                  <li>• Great for family pets</li>
                </ul>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Yorkie Grooming Costs */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Yorkie Grooming Costs
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200">
              <p className="text-gray-700 text-lg mb-6 text-center">
                <strong>Yorkie grooming</strong> costs vary based on the <strong>Yorkie grooming style</strong> chosen, coat condition, and location. Here's what to expect:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Standard Yorkie Grooming</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">$45-$85</p>
                  <p className="text-gray-600 text-sm mb-4">Puppy cut, Teddy Bear cut, or Summer cut</p>
                  <p className="text-gray-700">Includes: bath, haircut, nail trim, ear cleaning, sanitary trim</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Show Cut Maintenance</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$60-$120</p>
                  <p className="text-gray-600 text-sm mb-4">Long coat maintenance and styling</p>
                  <p className="text-gray-700">Includes: full bath, conditioning, styling, wrapping, nail trim, ear cleaning</p>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Factors Affecting Yorkie Grooming Cost</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Yorkie grooming style:</strong> Show cuts cost more than pet cuts</li>
                  <li>• <strong>Coat condition:</strong> Severely matted coats require extra time ($20-$40 dematting fee)</li>
                  <li>• <strong>Location:</strong> Prices vary by city and region</li>
                  <li>• <strong>Groomer experience:</strong> Specialists may charge premium rates</li>
                  <li>• <strong>Additional services:</strong> Teeth cleaning, nail grinding, specialty products add to cost</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Yorkie Grooming Tips */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Yorkie Grooming Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Maintenance</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Brush daily to prevent matting</li>
                  <li>• Use a slicker brush and metal comb</li>
                  <li>• Check for mats behind ears and under legs</li>
                  <li>• Keep face trimmed for visibility</li>
                  <li>• Clean eyes daily to prevent staining</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Choosing a Yorkie Groomer</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Look for groomers with Yorkie experience</li>
                  <li>• Ask to see examples of their work</li>
                  <li>• Check reviews from other Yorkie owners</li>
                  <li>• Ensure they understand Yorkie coat care</li>
                  <li>• Ask about their matting policy</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Find Professional Yorkie Grooming Services
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Discover the perfect <strong>Yorkie grooming style</strong> for your pet. Find expert groomers specializing in <strong>Yorkie haircuts</strong> and <strong>Yorkie grooming</strong> near you.
            </p>
            <Link
              href="/browse?service=dog-grooming"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition"
            >
              Find Yorkie Groomers Near Me →
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
            '@id': 'https://www.petcarebooker.com/yorkie-grooming',
            name: 'Yorkie Grooming Styles | Yorkie Haircuts | Professional Yorkie Grooming',
            description: 'Discover popular Yorkie grooming styles and Yorkie haircuts. Learn about the puppy cut, show cut, and other Yorkie grooming options.',
            url: 'https://www.petcarebooker.com/yorkie-grooming',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PetCareBooker',
              url: 'https://www.petcarebooker.com',
            },
            about: {
              '@type': 'Service',
              serviceType: 'Yorkie Grooming',
              description: 'Professional Yorkie grooming services and grooming styles',
            },
          }),
        }}
      />
    </>
  );
}

