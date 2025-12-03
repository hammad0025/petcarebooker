import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Grooming Guides & Tips | How to Prepare Your Pet | PetCareBooker',
  description: 'Expert pet grooming guides and tips. Learn how to prepare your dog or cat for grooming, what to expect, and how to care for your pet between appointments.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/guides',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Pet Grooming Guides & Tips',
    description: 'Expert advice on preparing your pet for grooming, choosing the right groomer, and maintaining your pet between appointments.',
    type: 'article',
  },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            🐾 PetCareBooker
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/browse" className="text-white hover:text-gray-100 font-semibold transition-all hover:scale-105">
              Find Groomers
            </Link>
            <Link href="/blog" className="text-white hover:text-gray-100 font-semibold transition-all hover:scale-105">
              Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Pet Grooming Guides 📚
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            Everything you need to know about pet grooming, from preparation to aftercare
          </p>
        </div>
      </section>

      {/* How to Prepare Your Pet for Grooming */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-10 mb-12">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
              How to Prepare Your Pet for Grooming 🐕
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Proper preparation ensures a stress-free grooming experience for your pet. Follow these expert-recommended steps to help your furry friend feel comfortable and look their best.
            </p>
          </div>

          {/* Step-by-step guide */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Brush Your Pet Beforehand</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Brush your dog or cat thoroughly 24 hours before the appointment to remove loose fur, mats, and tangles. This makes the groomer's job easier and reduces grooming time.
                  </p>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-gray-700">Use a slicker brush for long-haired pets and a rubber curry brush for short-haired breeds. Pay extra attention to areas prone to matting like behind ears, armpits, and the belly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-pink-500">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Exercise Your Pet Before the Appointment</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Take your pet for a long walk or play session 1-2 hours before grooming. A tired pet is typically calmer and more relaxed during the grooming process.
                  </p>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-gray-700">For dogs, a 30-45 minute walk or fetch session works well. For cats, try 15-20 minutes of interactive play with a feather wand or laser pointer.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Don't Feed a Large Meal Right Before</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Avoid feeding your pet a heavy meal within 2 hours of grooming. A full stomach can cause discomfort when your pet is being handled, lifted, or positioned during grooming.
                  </p>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-gray-700">A light snack or small treat before leaving is fine and can help with anxiety. Just avoid large meals that might cause nausea or bathroom accidents.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Take a Bathroom Break First</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Make sure your pet relieves themselves right before the appointment. This prevents accidents during grooming and keeps your pet more comfortable throughout the session.
                  </p>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-gray-700">For dogs, take them to their favorite potty spot. For cats using mobile grooming, offer the litter box one last time before the groomer arrives.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-pink-500">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Communicate Special Needs to Your Groomer</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Inform the groomer about any health issues, anxiety triggers, sensitive areas, or specific styling preferences. Clear communication ensures the best experience for your pet.
                  </p>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-gray-700">Mention things like: "She's sensitive about her paws," "He has a small skin tag on his back," or "Please keep face fur longer." Good groomers appreciate the heads up!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Stay Calm and Positive</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Pets pick up on your emotions. Stay upbeat, use a happy voice, and treat drop-off like a normal, positive event. Your calm energy helps your pet feel safe and relaxed.
                  </p>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="text-gray-800 font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-gray-700">Avoid prolonged goodbyes or anxious hovering. A quick, cheerful "See you soon!" and a treat creates positive associations with grooming appointments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Tips */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Additional Grooming Tips 💡
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🗓️</span> Book Regular Appointments
              </h3>
              <p className="text-gray-700">
                Schedule grooming every 4-8 weeks depending on breed and coat type. Regular grooming prevents matting and keeps your pet comfortable.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🏠</span> Practice at Home
              </h3>
              <p className="text-gray-700">
                Get your pet used to being touched everywhere - paws, ears, tail, face. This makes professional grooming much easier and less stressful.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🎁</span> Bring Favorite Treats
              </h3>
              <p className="text-gray-700">
                Ask if you can provide special treats for your pet during grooming. Familiar rewards help create positive associations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>📸</span> Save Reference Photos
              </h3>
              <p className="text-gray-700">
                Show your groomer photos of your desired style. Visual references ensure you both have the same expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            What to Expect During Grooming ✂️
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Typical Grooming Process:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">1.</span>
                  <p className="text-gray-700"><strong>Initial Assessment:</strong> Groomer checks coat condition, skin health, and discusses your preferences.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">2.</span>
                  <p className="text-gray-700"><strong>Pre-Bath Brush:</strong> Removes loose fur and mats before bathing to ensure better results.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">3.</span>
                  <p className="text-gray-700"><strong>Bath Time:</strong> Warm water wash with premium shampoo (sometimes conditioner for long coats).</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">4.</span>
                  <p className="text-gray-700"><strong>Blow Dry & Brush:</strong> Thorough drying and brushing to fluff the coat and check for any issues.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">5.</span>
                  <p className="text-gray-700"><strong>Haircut/Trim:</strong> Breed-specific or custom styling based on your preferences.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">6.</span>
                  <p className="text-gray-700"><strong>Nail Trim & Ears:</strong> Nail clipping/filing and ear cleaning for complete hygiene.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">7.</span>
                  <p className="text-gray-700"><strong>Final Touches:</strong> Sanitary trim, paw pad trimming, and optional cologne spritz.</p>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">⏱️ How Long Does Grooming Take?</h3>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li><strong>Small dogs (under 20 lbs):</strong> 1-2 hours</li>
                <li><strong>Medium dogs (20-50 lbs):</strong> 2-3 hours</li>
                <li><strong>Large dogs (50+ lbs):</strong> 3-4 hours</li>
                <li><strong>Cats:</strong> 1-2 hours (less if shorthaired)</li>
                <li><strong>Heavily matted pets:</strong> Add 30-60 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Ready to Book a Groomer? 🐾
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Find trusted, verified groomers near you with instant online booking
          </p>
          <Link 
            href="/browse"
            className="inline-block bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all hover:scale-110 shadow-2xl"
          >
            Find Groomers Near You
          </Link>
        </div>
      </section>

      {/* Schema.org HowTo structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Prepare Your Pet for Grooming',
            description: 'A step-by-step guide to preparing your dog or cat for a professional grooming appointment. Expert tips for a stress-free grooming experience.',
            image: 'https://www.petcarebooker.com/guides-image.png',
            totalTime: 'PT30M',
            estimatedCost: {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              value: '0',
            },
            tool: [
              {
                '@type': 'HowToTool',
                name: 'Pet brush',
              },
              {
                '@type': 'HowToTool',
                name: 'Pet leash',
              },
            ],
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Brush Your Pet Beforehand',
                text: 'Brush your dog or cat thoroughly 24 hours before the appointment to remove loose fur, mats, and tangles. This makes the groomer\'s job easier and reduces grooming time. Use a slicker brush for long-haired pets and a rubber curry brush for short-haired breeds.',
                url: 'https://www.petcarebooker.com/guides#step1',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Exercise Your Pet Before the Appointment',
                text: 'Take your pet for a long walk or play session 1-2 hours before grooming. A tired pet is typically calmer and more relaxed during the grooming process. For dogs, a 30-45 minute walk works well. For cats, try 15-20 minutes of interactive play.',
                url: 'https://www.petcarebooker.com/guides#step2',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Don\'t Feed a Large Meal Right Before',
                text: 'Avoid feeding your pet a heavy meal within 2 hours of grooming. A full stomach can cause discomfort when your pet is being handled. A light snack or small treat is fine.',
                url: 'https://www.petcarebooker.com/guides#step3',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Take a Bathroom Break First',
                text: 'Make sure your pet relieves themselves right before the appointment. This prevents accidents during grooming and keeps your pet more comfortable throughout the session.',
                url: 'https://www.petcarebooker.com/guides#step4',
              },
              {
                '@type': 'HowToStep',
                position: 5,
                name: 'Communicate Special Needs to Your Groomer',
                text: 'Inform the groomer about any health issues, anxiety triggers, sensitive areas, or specific styling preferences. Clear communication ensures the best experience for your pet.',
                url: 'https://www.petcarebooker.com/guides#step5',
              },
              {
                '@type': 'HowToStep',
                position: 6,
                name: 'Stay Calm and Positive',
                text: 'Pets pick up on your emotions. Stay upbeat, use a happy voice, and treat drop-off like a normal, positive event. Your calm energy helps your pet feel safe and relaxed.',
                url: 'https://www.petcarebooker.com/guides#step6',
              },
            ],
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



