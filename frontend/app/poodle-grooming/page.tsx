import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Poodle Grooming Styles | Poodle Cuts | How to Groom a Poodle',
  description: 'Discover popular poodle grooming styles and poodle cuts. Learn about puppy cut, continental cut, sporting cut, and more. Find professional poodle groomers and learn how to groom a poodle.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/poodle-grooming',
  },
  openGraph: {
    title: 'Poodle Grooming | How to Groom a Poodle | Professional Poodle Groomers',
    description: 'Learn about poodle grooming styles, techniques, and costs. Find professional poodle groomers near you.',
    type: 'website',
    url: 'https://www.petcarebooker.com/poodle-grooming',
  },
};

export default function PoodleGroomingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Poodle Grooming: Complete Guide 🐩
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Everything you need to know about <strong>poodle grooming</strong>. Learn <strong>how to groom a poodle</strong>, discover popular grooming styles, find professional groomers, and understand poodle grooming costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse?service=dog-grooming"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
              >
                Find Poodle Groomers →
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

        {/* Why Poodle Grooming is Essential */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Why Poodle Grooming is Essential
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                <strong>Poodle grooming</strong> is not just about aesthetics - it's essential for your poodle's health and wellbeing. Poodles have a unique curly, dense coat that grows continuously and requires regular professional grooming every 4-6 weeks. Without proper <strong>poodle grooming</strong>, their coat can become matted, leading to skin irritation, infections, and discomfort.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Unlike many other breeds, poodles don't shed much, which makes them popular with allergy sufferers. However, this means their hair continues to grow and must be regularly trimmed. Learning <strong>how to groom a poodle</strong> or finding a professional groomer who specializes in poodles is crucial for maintaining your dog's health and appearance.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 border border-purple-100">
                  <div className="text-4xl mb-3">✂️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Prevents Matting</h3>
                  <p className="text-gray-600">Regular grooming prevents painful matting and skin issues</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-pink-100">
                  <div className="text-4xl mb-3">💅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maintains Health</h3>
                  <p className="text-gray-600">Early detection of skin conditions, parasites, and health issues</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-blue-100">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Keeps Coat Healthy</h3>
                  <p className="text-gray-600">Regular grooming maintains the poodle's signature curly coat</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Groom a Poodle */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              How to Groom a Poodle: Step-by-Step Guide
            </h2>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Brushing and Combing</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Before learning <strong>how to groom a poodle</strong>, you need to understand proper brushing techniques. Poodles should be brushed daily or at least every other day to prevent matting. Use a slicker brush followed by a metal comb to work through the entire coat, paying special attention to areas prone to matting like behind the ears, under the legs, and around the tail.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Use a slicker brush to remove loose hair and tangles</li>
                  <li>• Follow with a metal comb to check for remaining mats</li>
                  <li>• Brush in the direction of hair growth</li>
                  <li>• Be gentle around sensitive areas</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Bathing Your Poodle</h3>
                <p className="text-gray-700 text-lg mb-4">
                  When learning <strong>how to groom a poodle</strong>, proper bathing is crucial. Poodles should be bathed every 3-4 weeks or as needed. Use a high-quality dog shampoo designed for curly coats, and always follow with conditioner to maintain the coat's texture and prevent matting.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Wet the coat thoroughly with warm water</li>
                  <li>• Apply shampoo and work into a lather</li>
                  <li>• Rinse completely - leftover shampoo can cause irritation</li>
                  <li>• Apply conditioner and let sit for 3-5 minutes</li>
                  <li>• Rinse thoroughly again</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Drying and Fluffing</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Proper drying is essential when learning <strong>how to groom a poodle</strong>. Poodles should be dried with a high-velocity dryer, not just a towel. The dryer helps separate the curls and prevents matting. After drying, use a slicker brush to "fluff" the coat, which helps maintain the poodle's signature curly appearance.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Use a high-velocity dryer on low heat setting</li>
                  <li>• Dry completely - damp hair mats easily</li>
                  <li>• Brush while drying to separate curls</li>
                  <li>• Fluff the coat with a slicker brush after drying</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Clipping and Trimming</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The clipping stage is where professional <strong>poodle grooming</strong> really shines. Most pet owners prefer to have a professional groomer handle the clipping, as it requires specialized clippers, multiple blade sizes, and knowledge of poodle grooming styles. However, if you're learning <strong>how to groom a poodle</strong> at home, you'll need:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Professional-grade clippers (not human clippers)</li>
                  <li>• Multiple blade sizes (#10, #7, #5, #4)</li>
                  <li>• Scissors for detail work</li>
                  <li>• Knowledge of poodle grooming styles</li>
                  <li>• Patience and practice</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Finishing Touches</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Complete your <strong>poodle grooming</strong> session with finishing touches: nail trimming, ear cleaning, and sanitary trim. These steps are essential for your poodle's health and comfort.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Trim nails carefully, avoiding the quick</li>
                  <li>• Clean ears with a dog-safe ear cleaner</li>
                  <li>• Trim hair around eyes for visibility</li>
                  <li>• Sanitary trim for hygiene</li>
                  <li>• Trim paw pads for traction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Poodle Grooming Styles */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Popular Poodle Grooming Styles & Poodle Cuts
            </h2>
            <p className="text-center text-gray-700 text-lg mb-10 max-w-3xl mx-auto">
              When exploring <strong>poodle grooming styles</strong> and <strong>poodle cuts</strong>, you'll find a variety of options from practical pet cuts to elaborate show styles. Each <strong>poodle grooming style</strong> has different maintenance requirements and aesthetic appeal.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Puppy Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>puppy cut</strong> is one of the most popular <strong>poodle grooming</strong> styles for pet owners. The entire body is trimmed to 1-2 inches, creating a uniform, easy-to-maintain look. This style is perfect for active poodles and requires less maintenance than traditional show cuts.
                </p>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Continental Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>Continental cut</strong> is the classic show ring style. The face, feet, and base of the tail are shaved, while the rest of the body has longer hair with pom-poms on the legs and hips. This is a high-maintenance style best left to professional groomers.
                </p>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 3-4 weeks</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">English Saddle Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Similar to the Continental, the <strong>English Saddle cut</strong> features a shaved face, feet, and tail base, with longer hair on the body and pom-poms. The main difference is the "saddle" pattern on the back. This is another show-style cut requiring professional expertise.
                </p>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 3-4 weeks</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sporting Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>sporting cut</strong> is practical and low-maintenance. The body is trimmed short (1/2 to 1 inch), with slightly longer hair on the head and tail. This style is perfect for active poodles who spend time outdoors and is easier to maintain than show cuts.
                </p>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lamb Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>lamb cut</strong> features a shorter body (1-2 inches) with a fuller, rounded head that resembles a lamb. This is a popular pet cut that's easier to maintain than show styles while still looking polished and cute.
                </p>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Teddy Bear Cut</h3>
                <p className="text-gray-700 text-lg mb-4">
                  The <strong>Teddy Bear cut</strong> is a popular pet style where the entire body is trimmed to 1-2 inches with a rounded face. This creates an adorable, cuddly appearance that's easy to maintain and perfect for family pets.
                </p>
                <p className="text-gray-600"><strong>Maintenance:</strong> Every 4-6 weeks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Poodle Grooming Costs */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Poodle Grooming Costs
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <p className="text-gray-700 text-lg mb-6 text-center">
                <strong>Poodle grooming</strong> costs vary based on size, coat condition, and grooming style. Here's what to expect:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Toy Poodle</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-2">$50-$90</p>
                  <p className="text-gray-600 text-sm">Standard grooming every 4-6 weeks</p>
                </div>

                <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Miniature Poodle</h3>
                  <p className="text-3xl font-bold text-pink-600 mb-2">$60-$110</p>
                  <p className="text-gray-600 text-sm">Standard grooming every 4-6 weeks</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Standard Poodle</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">$80-$150</p>
                  <p className="text-gray-600 text-sm">Standard grooming every 4-6 weeks</p>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Factors Affecting Poodle Grooming Cost</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Grooming style:</strong> Show cuts (Continental, English Saddle) cost more than pet cuts (Puppy, Sporting)</li>
                  <li>• <strong>Coat condition:</strong> Severely matted coats require extra time and may incur dematting fees ($20-$50)</li>
                  <li>• <strong>Location:</strong> Prices vary by city and region</li>
                  <li>• <strong>Groomer experience:</strong> Master groomers specializing in poodles may charge premium rates</li>
                  <li>• <strong>Additional services:</strong> Nail grinding, teeth cleaning, and specialty products add to the cost</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Professional vs. Home Grooming */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Professional Poodle Grooming vs. Home Grooming
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Poodle Grooming</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Most poodle owners choose professional <strong>poodle grooming</strong> because it requires specialized equipment, skills, and knowledge. Professional groomers have:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Professional-grade clippers and equipment</li>
                  <li>✓ Knowledge of poodle grooming styles</li>
                  <li>✓ Experience handling anxious or difficult dogs</li>
                  <li>✓ Proper drying equipment (high-velocity dryers)</li>
                  <li>✓ Training in breed-specific techniques</li>
                  <li>✓ Ability to detect health issues early</li>
                </ul>
                <Link
                  href="/browse?service=dog-grooming"
                  className="inline-block mt-4 bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                >
                  Find Professional Poodle Groomers →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Home Poodle Grooming</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Learning <strong>how to groom a poodle</strong> at home is possible but requires investment in equipment and training. You'll need:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Professional clippers ($100-$300+)</li>
                  <li>• Multiple blade sizes</li>
                  <li>• High-velocity dryer ($200-$500+)</li>
                  <li>• Quality brushes and combs</li>
                  <li>• Training classes or tutorials</li>
                  <li>• Time and patience</li>
                </ul>
                <p className="text-gray-700 text-sm mt-4">
                  <strong>Tip:</strong> Many owners do basic maintenance at home (brushing, bathing) and take their poodle to a professional for clipping every 4-6 weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips for Poodle Owners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Tips for Successful Poodle Grooming
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Maintenance Between Grooms</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Brush daily or every other day</li>
                    <li>• Check for mats behind ears and under legs</li>
                    <li>• Keep face and eyes trimmed for visibility</li>
                    <li>• Trim nails every 2-3 weeks</li>
                    <li>• Clean ears weekly</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Finding a Good Poodle Groomer</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Look for groomers with poodle experience</li>
                    <li>• Ask to see examples of their work</li>
                    <li>• Check reviews from other poodle owners</li>
                    <li>• Ensure they use proper drying equipment</li>
                    <li>• Ask about their matting policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Book Poodle Grooming?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Find professional <strong>poodle grooming</strong> services near you. Expert groomers specializing in poodles, all grooming styles, and gentle handling.
            </p>
            <Link
              href="/browse?service=dog-grooming"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
            >
              Find Poodle Groomers Near Me →
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
            '@id': 'https://www.petcarebooker.com/poodle-grooming',
            name: 'Poodle Grooming Styles | Poodle Cuts | How to Groom a Poodle',
            description: 'Discover popular poodle grooming styles and poodle cuts. Learn about puppy cut, continental cut, sporting cut, and more.',
            url: 'https://www.petcarebooker.com/poodle-grooming',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PetCareBooker',
              url: 'https://www.petcarebooker.com',
            },
            about: {
              '@type': 'Service',
              serviceType: 'Poodle Grooming',
              description: 'Professional poodle grooming services and grooming styles',
            },
          }),
        }}
      />
    </>
  );
}

