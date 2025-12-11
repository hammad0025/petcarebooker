'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-purple-600">
                  🐾 PetCareBooker
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              <Link
                href="/browse"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:bg-purple-50 rounded-lg font-semibold transition-colors"
              >
                Find Groomers
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:bg-purple-50 rounded-lg font-semibold transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/guides"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:bg-purple-50 rounded-lg font-semibold transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/customer/login"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:bg-purple-50 rounded-lg font-semibold transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors text-center"
              >
                For Businesses ✨
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

