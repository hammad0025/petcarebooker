'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Pet {
  id: number;
  name: string;
  pet_type: string;
  breed: string;
  photo_url?: string;
  next_groom_due?: string;
  favorite_groomer_id?: number;
}

export default function MyPetsPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Load pets from API
    // For now, show empty state or demo data
    setLoading(false);
  }, []);

  const getPetEmoji = (petType: string) => {
    return petType.toLowerCase() === 'dog' ? '🐕' : '🐈';
  };

  const getDaysUntilGroom = (nextGroomDate?: string) => {
    if (!nextGroomDate) return null;
    const due = new Date(nextGroomDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    // Ensure canonical tag is set for this noindex page
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.petcarebooker.com/my-pets');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-purple-600 hover:text-purple-700">
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-purple-900">My Pets</h1>
          </div>
          <button 
            onClick={() => router.push('/customer/pets/add')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            + Add Pet
          </button>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-purple-600 text-4xl">🐾</div>
            <p className="mt-4 text-purple-600 font-medium">Loading your pets...</p>
          </div>
        ) : pets.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🐕🐈</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No pets yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add your furry friends to start booking grooming appointments tailored just for them!
            </p>
            <button 
              onClick={() => router.push('/customer/pets/add')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all hover:scale-110"
            >
              + Add Your First Pet 🐾
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => {
              const daysUntil = getDaysUntilGroom(pet.next_groom_due);
              const isOverdue = daysUntil && daysUntil < 0;
              const isDueSoon = daysUntil && daysUntil <= 7 && daysUntil >= 0;
              
              return (
                <div 
                  key={pet.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 overflow-hidden border-2 border-transparent hover:border-purple-300"
                >
                  {/* Pet Photo */}
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center relative">
                    {pet.photo_url ? (
                      <img 
                        src={pet.photo_url} 
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-8xl">{getPetEmoji(pet.pet_type)}</div>
                    )}
                    {isOverdue && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        Overdue!
                      </div>
                    )}
                    {isDueSoon && !isOverdue && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        Due Soon
                      </div>
                    )}
                  </div>

                  {/* Pet Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                        <p className="text-gray-600 capitalize">{pet.breed || pet.pet_type}</p>
                      </div>
                    </div>

                    {/* Next Groom Badge */}
                    {pet.next_groom_due && (
                      <div className={`mb-4 px-4 py-2 rounded-2xl ${
                        isOverdue ? 'bg-red-100 text-red-800' :
                        isDueSoon ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        <p className="text-sm font-semibold">
                          {isOverdue && `Overdue by ${Math.abs(daysUntil!)} days`}
                          {!isOverdue && isDueSoon && `Due in ${daysUntil} days`}
                          {!isOverdue && !isDueSoon && `Due in ${daysUntil} days`}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-2">
                      <Link 
                        href={`/book?pet=${pet.id}`}
                        className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold text-center hover:shadow-lg transition-all hover:scale-105"
                      >
                        ✂️ Book Grooming
                      </Link>
                      <Link 
                        href={`/customer/pets/${pet.id}`}
                        className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

