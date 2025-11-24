'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us - PetCareBooker | Get Help & Support';
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Get in touch with PetCareBooker. Have questions about booking pet grooming, becoming a groomer, or need technical support? Contact us today.');
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: 'General Question', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <p className="text-green-800 font-bold">✅ Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-800 font-bold">❌ Failed to send message. Please try emailing us directly at haquemediagroup@gmail.com</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                >
                  <option>General Question</option>
                  <option>Technical Support</option>
                  <option>Groomer Inquiry</option>
                  <option>Partnership Opportunity</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4 text-center">
              Or email us directly at{' '}
              <a href="mailto:haquemediagroup@gmail.com" className="text-purple-600 hover:underline">
                haquemediagroup@gmail.com
              </a>
            </p>
          </div>
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

      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact PetCareBooker',
            description: 'Get in touch with PetCareBooker for support, questions, or to become a groomer.',
            url: 'https://petcarebooker.com/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'PetCareBooker',
              email: 'haquemediagroup@gmail.com',
              url: 'https://petcarebooker.com',
            },
          }),
        }}
      />
    </div>
  );
}

