import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ - PetCareBooker | Pet Grooming Booking Questions',
  description: 'Get answers to common questions about booking pet grooming appointments, pricing, cancellations, and more. For pet parents and groomers.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/faq',
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6">
        <div className="container mx-auto px-4">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer hover:opacity-90">
              🐾 PetCareBooker
            </h1>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Frequently Asked Questions 💬
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            Everything you need to know about booking pet grooming with PetCareBooker
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* For Pet Parents */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">🐕 For Pet Parents</h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  Do I need to create an account to book?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  No! You can book instantly as a guest. Just enter your pet's info and contact details. 
                  However, creating an account lets you save your pets, track appointment history, and book faster next time.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  How do I find groomers near me?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Click "Find Groomers" and enter your city or zip code. You'll see all available groomers in your area 
                  with their ratings, services, prices, and next available appointment time.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  Can I book for multiple pets at once?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Yes! During booking, you can add multiple pets and select services for each one. 
                  The system will show you available time slots that accommodate all your pets.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  What if I need to cancel or reschedule?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  You'll receive a confirmation SMS with a link to manage your appointment. Click it to cancel or reschedule. 
                  Please note that each groomer sets their own cancellation policy (usually 24 hours notice).
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  How do I know the groomer is trustworthy?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  All groomers on PetCareBooker are verified professionals. You can read reviews from other pet parents, 
                  see their average rating, and view photos of their work before booking.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  Will I get a reminder before my appointment?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Yes! You'll receive an SMS reminder 24 hours before your appointment with all the details 
                  (time, location, groomer name, and your pet's services).
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  How does payment work?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Payment is handled directly with the groomer at the time of service. 
                  Prices are shown upfront when you book, so there are no surprises.
                </p>
              </details>
            </div>
          </div>

          {/* For Groomers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-pink-500 mb-6">✂️ For Groomers</h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  How much does it cost to join?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  It's free to create your profile and start accepting bookings! We only take a small commission 
                  on completed appointments. No monthly fees, no setup costs, no hidden charges.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  How quickly can I start accepting bookings?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  You can be live in under 10 minutes! Just create your profile, add your services and prices, 
                  set your availability, and you're ready to accept bookings.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  Can I control my own schedule?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Absolutely! You set your working hours, service duration, and buffer time between appointments. 
                  You can block out time for personal days or emergencies anytime.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  Do you handle payment processing?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Currently, payment is handled directly between you and the client. 
                  We're working on integrated payment processing for future releases!
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  What if I get a no-show?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Our automated SMS reminders reduce no-shows by up to 80%. You can also set your own 
                  cancellation policy (e.g., require 24 hours notice) which is shown to clients when they book.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  Can I see my booking history and analytics?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Yes! Your dashboard shows all past and upcoming bookings, total revenue, popular services, 
                  client retention rates, and more. Use these insights to optimize your business.
                </p>
              </details>
            </div>
          </div>

          {/* General */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">📱 General</h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  Is there a mobile app?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Not yet, but our website is fully mobile-responsive! You can book appointments and manage 
                  your account from any device. A native mobile app is coming soon!
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  What cities/areas do you serve?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  We're currently available nationwide! As long as a groomer in your area has joined our platform, 
                  you can book them. We're adding new groomers every day.
                </p>
              </details>

              <details className="bg-white rounded-2xl p-6 shadow-lg">
                <summary className="font-bold text-xl text-gray-900 cursor-pointer">
                  How do I contact support?
                </summary>
                <p className="mt-4 text-gray-600 text-lg">
                  Email us at support@petcarebooker.com or use our{' '}
                  <Link href="/contact" className="text-purple-600 underline font-bold">contact form</Link>. 
                  We typically respond within 24 hours.
                </p>
              </details>
            </div>
          </div>

          {/* Still have questions? */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Still have questions? 🤔</h2>
            <p className="text-xl mb-8">
              We're here to help! Reach out and we'll get back to you quickly.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-110 shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': 'https://www.petcarebooker.com/faq',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do I need to create an account to book?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No! You can book instantly as a guest. Just enter your pet\'s info and contact details. However, creating an account lets you save your pets, track appointment history, and book faster next time.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I find groomers near me?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Click "Find Groomers" and enter your city or zip code. You\'ll see all available groomers in your area with their ratings, services, prices, and next available appointment time.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I book for multiple pets at once?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! During booking, you can add multiple pets and select services for each one. The system will show you available time slots that accommodate all your pets.',
                },
              },
              {
                '@type': 'Question',
                name: 'What if I need to cancel or reschedule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You\'ll receive a confirmation SMS with a link to manage your appointment. Click it to cancel or reschedule. Please note that each groomer sets their own cancellation policy (usually 24 hours notice).',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I know the groomer is trustworthy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'All groomers on PetCareBooker are verified professionals. You can read reviews from other pet parents, see their average rating, and view photos of their work before booking.',
                },
              },
              {
                '@type': 'Question',
                name: 'Will I get a reminder before my appointment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! You\'ll receive an SMS reminder 24 hours before your appointment with all the details (time, location, groomer name, and your pet\'s services).',
                },
              },
              {
                '@type': 'Question',
                name: 'How does payment work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Payment is handled directly with the groomer at the time of service. Prices are shown upfront when you book, so there are no surprises.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does it cost to join as a groomer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It\'s free to create your profile and start accepting bookings! We only take a small commission on completed appointments. No monthly fees, no setup costs, no hidden charges.',
                },
              },
              {
                '@type': 'Question',
                name: 'How quickly can I start accepting bookings?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can be live in under 10 minutes! Just create your profile, add your services and prices, set your availability, and you\'re ready to accept bookings.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I control my own schedule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! You set your working hours, service duration, and buffer time between appointments. You can block out time for personal days or emergencies anytime.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there a mobile app?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Not yet, but our website is fully mobile-responsive! You can book appointments and manage your account from any device. A native mobile app is coming soon!',
                },
              },
              {
                '@type': 'Question',
                name: 'What cities/areas do you serve?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We\'re currently available nationwide! As long as a groomer in your area has joined our platform, you can book them. We\'re adding new groomers every day.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I contact support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Email us at support@petcarebooker.com or use our contact form. We typically respond within 24 hours.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

