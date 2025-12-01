import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🐾 PetCareBooker</h3>
            <p className="text-gray-400 text-sm">
              Making pet grooming simple, fast, and stress-free.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">For Pet Parents</h4>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-gray-400 hover:text-white transition text-sm">Find Groomers</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition text-sm">Blog</Link></li>
              <li><Link href="/guides" className="text-gray-400 hover:text-white transition text-sm">Grooming Guides</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition text-sm">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">For Businesses</h4>
            <ul className="space-y-2">
              <li><Link href="/for-businesses" className="text-gray-400 hover:text-white transition text-sm">Why Join?</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-white transition text-sm">List Your Business</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition text-sm">Groomer Login</Link></li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <h4 className="font-bold mb-2">Grow With PetCareBooker</h4>
            <p className="text-gray-300 text-sm mb-3">
              See how we bring you new clients, handle bookings, and keep your schedule full.
            </p>
            <Link
              href="/for-businesses"
              className="inline-flex items-center justify-center w-full bg-white text-purple-600 font-semibold py-2 rounded-full hover:bg-gray-100 transition text-sm"
            >
              List Your Business →
            </Link>
            <div className="mt-3 text-xs text-gray-300 space-y-1">
              <p>📹 Book a demo: <a href="mailto:hello@petcarebooker.com" className="underline">hello@petcarebooker.com</a></p>
              <p>📄 Download guide: <Link href="/guides" className="underline">Groomer Playbook</Link></p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition text-sm">Pet Grooming Blog</Link></li>
              <li><Link href="/guides" className="text-gray-400 hover:text-white transition text-sm">Grooming Tips</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition text-sm">Help Center</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 PetCareBooker. Making tails wag since today! 🐾
          </p>
        </div>
      </div>
    </footer>
  );
}

