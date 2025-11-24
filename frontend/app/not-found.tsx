import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - PetCareBooker',
  description: 'The page you are looking for does not exist. Return to PetCareBooker to find and book pet groomers near you.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-extrabold text-purple-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg hover:scale-105"
          >
            Go Home 🏠
          </Link>
          <Link
            href="/browse"
            className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all shadow-lg hover:scale-105"
          >
            Find Groomers 🐾
          </Link>
        </div>
        <div className="mt-12 text-gray-500">
          <p className="mb-2">Popular pages:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/blog" className="text-purple-600 hover:underline">Blog</Link>
            <Link href="/guides" className="text-purple-600 hover:underline">Guides</Link>
            <Link href="/faq" className="text-purple-600 hover:underline">FAQ</Link>
            <Link href="/contact" className="text-purple-600 hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

