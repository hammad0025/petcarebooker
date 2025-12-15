import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Dog Grooming School | Dog Grooming Course | Become a Professional Groomer',
  description: 'Find the best dog grooming school and dog grooming course programs. Learn how to become a professional dog groomer with certification and training.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/dog-grooming-school',
  },
  openGraph: {
    title: 'Dog Grooming School | Dog Grooming Course | Become a Professional Groomer',
    description: 'Find the best dog grooming school and dog grooming course programs. Learn how to become a professional dog groomer.',
    type: 'website',
    url: 'https://www.petcarebooker.com/dog-grooming-school',
  },
};

export default function DogGroomingSchoolPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Dog Grooming School & Training Programs 🎓
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find the best <strong>dog grooming school</strong> and <strong>dog grooming course</strong> programs. Learn how to become a professional dog groomer with certification programs, hands-on training, and online courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/for-businesses"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition"
              >
                Start Your Grooming Business →
              </Link>
              <Link
                href="/browse"
                className="bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition"
              >
                Find Professional Groomers →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Become a Dog Groomer */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Why Attend Dog Grooming School?
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                A <strong>dog grooming school</strong> provides the foundation you need to start a successful career as a professional dog groomer. Whether you're looking to work in a salon, start your own mobile grooming business, or work from home, a quality <strong>dog grooming course</strong> will teach you essential skills, safety protocols, and business practices.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Professional <strong>dog grooming school</strong> programs cover everything from basic bathing and brushing to advanced styling techniques, breed-specific cuts, handling anxious dogs, and business management. Many programs also offer certification upon completion, which can help you stand out to employers and clients.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 border border-blue-100">
                  <div className="text-4xl mb-3">💼</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Career Opportunities</h3>
                  <p className="text-gray-600">High demand for skilled groomers, flexible schedules, and good earning potential</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-purple-100">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Training</h3>
                  <p className="text-gray-600">Learn from experienced instructors with hands-on practice</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-pink-100">
                  <div className="text-4xl mb-3">📜</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Certification</h3>
                  <p className="text-gray-600">Earn credentials that demonstrate your expertise to employers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Dog Grooming Courses */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Types of Dog Grooming Courses
            </h2>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. In-Person Dog Grooming School</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Traditional <strong>dog grooming school</strong> programs offer hands-on training in a classroom or salon setting. These programs typically last 2-6 months and provide the most comprehensive training. You'll work with real dogs under the supervision of experienced instructors.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Hands-on practice with live dogs</li>
                  <li>• Direct supervision and feedback from instructors</li>
                  <li>• Networking opportunities with other students</li>
                  <li>• Access to professional equipment and facilities</li>
                  <li>• Typically 2-6 months in duration</li>
                  <li>• Cost: $3,000-$10,000+ depending on program</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  <strong>Best for:</strong> Those who learn best through hands-on practice and want comprehensive, structured training.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Online Dog Grooming Course</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Online <strong>dog grooming course</strong> programs offer flexibility and convenience. These programs combine video lessons, written materials, and sometimes virtual instruction. However, you'll need access to dogs for practice and may need to supplement with hands-on training.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Learn at your own pace</li>
                  <li>• Lower cost than in-person programs</li>
                  <li>• Access from anywhere</li>
                  <li>• Video demonstrations and tutorials</li>
                  <li>• Typically 3-12 months to complete</li>
                  <li>• Cost: $500-$3,000</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  <strong>Best for:</strong> Self-motivated learners who need flexibility and have access to dogs for practice.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Apprenticeship Programs</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Some <strong>dog grooming school</strong> programs offer apprenticeships where you learn on the job under an experienced groomer. These programs combine paid work with training, allowing you to earn while you learn.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Earn money while learning</li>
                  <li>• Real-world experience in a working salon</li>
                  <li>• Mentorship from experienced groomers</li>
                  <li>• Potential for job placement after completion</li>
                  <li>• Typically 6-12 months</li>
                  <li>• May have lower or no tuition costs</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  <strong>Best for:</strong> Those who want to learn while earning and prefer on-the-job training.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Certification Programs</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Certification-focused <strong>dog grooming course</strong> programs prepare you for industry certifications like the National Dog Groomers Association of America (NDGAA) or International Professional Groomers (IPG) certification. These programs focus on meeting certification standards.
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Prepares for industry certifications</li>
                  <li>• Recognized credentials</li>
                  <li>• May include exam preparation</li>
                  <li>• Can enhance career prospects</li>
                  <li>• Duration varies by program</li>
                  <li>• Cost: $1,000-$5,000+</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  <strong>Best for:</strong> Those who want recognized credentials and plan to work in established salons or start their own business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              What You'll Learn in Dog Grooming School
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Skills</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>✓ Bathing and drying techniques</li>
                  <li>✓ Clipping and scissoring</li>
                  <li>✓ Breed-specific grooming styles</li>
                  <li>✓ Nail trimming and filing</li>
                  <li>✓ Ear cleaning and plucking</li>
                  <li>✓ Sanitary trimming</li>
                  <li>✓ De-matting techniques</li>
                  <li>✓ Handling different coat types</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safety & Health</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>✓ Recognizing health issues</li>
                  <li>✓ First aid for pets</li>
                  <li>✓ Safe handling techniques</li>
                  <li>✓ Equipment safety</li>
                  <li>✓ Preventing injuries</li>
                  <li>✓ Working with anxious dogs</li>
                  <li>✓ Understanding dog behavior</li>
                  <li>✓ When to refer to a veterinarian</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Skills</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>✓ Pricing your services</li>
                  <li>✓ Client communication</li>
                  <li>✓ Appointment scheduling</li>
                  <li>✓ Marketing your business</li>
                  <li>✓ Record keeping</li>
                  <li>✓ Insurance and legal requirements</li>
                  <li>✓ Equipment selection and maintenance</li>
                  <li>✓ Building client relationships</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Techniques</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>✓ Creative grooming</li>
                  <li>✓ Show ring preparation</li>
                  <li>✓ Hand-stripping</li>
                  <li>✓ Specialty cuts</li>
                  <li>✓ Color enhancement</li>
                  <li>✓ Working with difficult dogs</li>
                  <li>✓ Senior pet care</li>
                  <li>✓ Puppy introductions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Choose a Dog Grooming School */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              How to Choose the Right Dog Grooming School
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Accreditation and Certification</h3>
                  <p className="text-gray-700 text-lg">
                    Look for <strong>dog grooming school</strong> programs that are accredited or recognized by industry organizations. Check if the program prepares you for certification exams and if graduates are eligible for professional certifications.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Instructor Experience</h3>
                  <p className="text-gray-700 text-lg">
                    Research the instructors' backgrounds. Look for instructors with years of professional grooming experience, certifications, and teaching experience. Good instructors make all the difference in a <strong>dog grooming course</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Hands-On Training</h3>
                  <p className="text-gray-700 text-lg">
                    Ensure the <strong>dog grooming school</strong> provides ample hands-on practice with real dogs. You can't learn grooming from books alone - you need to practice on actual dogs under supervision.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">4. Curriculum Coverage</h3>
                  <p className="text-gray-700 text-lg">
                    Review the <strong>dog grooming course</strong> curriculum to ensure it covers all essential topics: basic grooming, breed-specific styles, safety, health, and business skills. A comprehensive program should cover both technical and business aspects.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">5. Job Placement Assistance</h3>
                  <p className="text-gray-700 text-lg">
                    Some <strong>dog grooming school</strong> programs offer job placement assistance or have relationships with local salons. This can be valuable when you're starting your career.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">6. Cost and Value</h3>
                  <p className="text-gray-700 text-lg">
                    Compare costs across different <strong>dog grooming course</strong> programs, but don't just choose the cheapest option. Consider the value - what you'll learn, the quality of instruction, and the support provided. Some programs include equipment or tools in the tuition.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">7. Reviews and Reputation</h3>
                  <p className="text-gray-700 text-lg">
                    Research the <strong>dog grooming school</strong>'s reputation. Read reviews from former students, check their success rates, and see where graduates are working. A good program will have positive reviews and successful graduates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
              Career Opportunities After Dog Grooming School
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Salon Groomer</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Work in a pet grooming salon, either as an employee or independent contractor. Salons provide steady clientele, equipment, and support.
                </p>
                <p className="text-gray-600"><strong>Average Salary:</strong> $25,000-$45,000/year</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile Groomer</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Start your own mobile grooming business or work for a mobile grooming company. Mobile grooming is growing rapidly and offers flexibility and higher earning potential.
                </p>
                <p className="text-gray-600"><strong>Average Income:</strong> $40,000-$80,000+/year</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Home-Based Groomer</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Set up a grooming station in your home or garage. This option offers low overhead and the ability to work from home.
                </p>
                <p className="text-gray-600"><strong>Average Income:</strong> $30,000-$60,000/year</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Grooming Instructor</h3>
                <p className="text-gray-700 text-lg mb-4">
                  After gaining experience, you can become an instructor at a <strong>dog grooming school</strong> or offer private training. Teaching can be rewarding and provide additional income.
                </p>
                <p className="text-gray-600"><strong>Average Salary:</strong> $30,000-$50,000/year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Ready to Start Your Dog Grooming Career?
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Research <strong>dog grooming school</strong> programs in your area, read reviews, and visit schools if possible. A quality <strong>dog grooming course</strong> is an investment in your future career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/for-businesses"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition"
                >
                  Learn About Starting a Grooming Business →
                </Link>
                <Link
                  href="/browse"
                  className="inline-block bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-300 transition"
                >
                  See Professional Groomers in Action →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Find the Right Dog Grooming School for You
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Research <strong>dog grooming school</strong> programs and <strong>dog grooming course</strong> options in your area. Start your journey to becoming a professional dog groomer today.
            </p>
            <Link
              href="/for-businesses"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition"
            >
              Learn More About Grooming Careers →
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
            '@id': 'https://www.petcarebooker.com/dog-grooming-school',
            name: 'Dog Grooming School | Dog Grooming Course | Become a Professional Groomer',
            description: 'Find the best dog grooming school and dog grooming course programs. Learn how to become a professional dog groomer.',
            url: 'https://www.petcarebooker.com/dog-grooming-school',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PetCareBooker',
              url: 'https://www.petcarebooker.com',
            },
            about: {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'Professional Certification',
              description: 'Dog grooming school and training programs',
            },
          }),
        }}
      />
    </>
  );
}

