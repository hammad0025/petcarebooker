import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - PetCareBooker | Get Help & Support',
  description: 'Get in touch with PetCareBooker. Have questions about booking pet grooming, becoming a groomer, or need technical support? Contact us today.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-3xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            🐾 PetCareBooker
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Contact Us 📧
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            Have questions? We're here to help! Reach out and we'll get back to you quickly.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Email */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h2>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll respond within 24 hours.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                For faster response, use the contact form below.
              </p>
              <a 
                href="mailto:haquemediagroup@gmail.com"
                className="text-purple-600 font-bold hover:underline text-lg"
              >
                haquemediagroup@gmail.com
              </a>
            </div>

            {/* Help Center */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">❓</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
              <p className="text-gray-600 mb-4">
                Check our frequently asked questions for quick answers.
              </p>
              <Link
                href="/faq"
                className="text-purple-600 font-bold hover:underline text-lg"
              >
                Visit FAQ Page →
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      <Footer />

      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact PetCareBooker',
            description: 'Get in touch with PetCareBooker for support, questions, or to become a groomer.',
            url: 'https://www.petcarebooker.com/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'PetCareBooker',
              email: 'haquemediagroup@gmail.com',
              url: 'https://www.petcarebooker.com',
            },
          }),
        }}
      />
    </div>
  );
}

