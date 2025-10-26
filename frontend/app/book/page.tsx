'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { shopsApi } from '@/lib/api';

interface Pet {
  id: number;
  name: string;
  pet_type: string;
  photo_url?: string;
}

interface Shop {
  id: number;
  business_name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  phone: string;
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const petId = searchParams.get('pet');
  
  const [step, setStep] = useState<'pet' | 'shop' | 'service' | 'time' | 'confirm'>('pet');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (petId) {
      // TODO: Load pet by ID
      setSelectedPet({ id: parseInt(petId), name: 'Bella', pet_type: 'dog' });
      setStep('shop');
    }
    loadShops();
  }, [petId]);

  const loadShops = async () => {
    try {
      const data = await shopsApi.getAll();
      setShops(data);
    } catch (error) {
      console.error('Failed to load shops:', error);
    }
  };

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet);
    setStep('shop');
  };

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    // TODO: Navigate to service selection with pet and shop context
    router.push(`/shop/${shop.slug}/book?pet=${selectedPet?.id}`);
  };

  if (step === 'pet' && !petId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">Which pet needs grooming?</h1>
          <p className="text-gray-600 text-lg mb-8">Select a pet to book their appointment</p>
          
          {/* Pet Selection Tiles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: Map over actual pets */}
            <button
              onClick={() => handlePetSelect({ id: 1, name: 'Bella', pet_type: 'dog' })}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-purple-300"
            >
              <div className="text-7xl text-center mb-4">🐕</div>
              <h3 className="text-2xl font-bold text-center text-gray-900">Bella</h3>
              <p className="text-center text-gray-600">Golden Retriever</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {['Pet', 'Shop', 'Service', 'Time', 'Confirm'].map((stepName, idx) => (
              <div key={stepName} className="flex items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  idx <= ['pet', 'shop', 'service', 'time', 'confirm'].indexOf(step) 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {idx + 1}
                </div>
                {idx < 4 && <div className="w-16 h-1 bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>

        {/* Shop Selection */}
        <div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Find a groomer for {selectedPet?.name} 🐾
          </h1>
          <p className="text-gray-600 text-lg mb-8">Choose where {selectedPet?.name} will get pampered</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <button
                key={shop.id}
                onClick={() => handleShopSelect(shop)}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left border-2 border-transparent hover:border-purple-300"
              >
                <div className="h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl mb-4 flex items-center justify-center">
                  <div className="text-5xl">✂️</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.business_name}</h3>
                <p className="text-gray-600 text-sm mb-3">{shop.city}, {shop.state}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{shop.description}</p>
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-semibold">
                  Select → 
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <BookPageContent />
    </Suspense>
  );
}

