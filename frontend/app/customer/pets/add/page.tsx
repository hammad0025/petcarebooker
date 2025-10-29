'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PetInfoModal from '@/components/PetInfoModal';

const PET_TYPES = [
  { value: 'dog', label: 'Dog', emoji: '🐕' },
  { value: 'cat', label: 'Cat', emoji: '🐈' },
];

const DOG_BREEDS = [
  'Golden Retriever', 'Labrador', 'German Shepherd', 'Bulldog', 'Beagle',
  'Poodle', 'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Dachshund',
  'Siberian Husky', 'Great Dane', 'Chihuahua', 'Shih Tzu', 'Border Collie',
  'Australian Shepherd', 'Cocker Spaniel', 'French Bulldog', 'Maltese',
  'Basset Hound', 'English Springer Spaniel', 'Boston Terrier', 'Mastiff',
  'Pug', 'Weimaraner', 'Belgian Malinois', 'Vizsla', 'Havanese', 'Pomeranian',
  'Mutt/Mixed', 'Other'
];

const CAT_BREEDS = [
  'Persian', 'Maine Coon', 'British Shorthair', 'Ragdoll', 'Siamese',
  'American Shorthair', 'Scottish Fold', 'Bengal', 'Russian Blue', 'Sphynx',
  'Norwegian Forest Cat', 'Oriental Shorthair', 'Abyssinian', 'Devon Rex',
  'Exotic Shorthair', 'Burmese', 'Turkish Angora', 'American Curl', 'Munchkin',
  'Birman', 'Manx', 'Himalayan', 'Cornish Rex', 'Tonkinese', 'Egyptian Mau',
  'Savannah', 'British Longhair', 'Domestic Shorthair', 'Domestic Longhair',
  'Mixed/Mutt', 'Other'
];

export default function AddPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPetType, setSelectedPetType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [petName, setPetName] = useState('');

  const SIZE_OPTIONS = [
    { value: 'S', label: 'S', description: '1-20lbs' },
    { value: 'M', label: 'M', description: '21-40lbs' },
    { value: 'L', label: 'L', description: '41-80lbs' },
    { value: 'XL', label: 'XL+', description: '80+lbs' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    setPetName(name);
    setShowInfoModal(true);
  };

  const handleModalSubmit = async (additionalInfo: any) => {
    setLoading(true);
    setError('');

    try {
      const breedElement = document.querySelector('select[name="breed"]') as HTMLSelectElement;
      const breed = breedElement?.value || '';
      
      // Get the authentication token from localStorage
      const token = localStorage.getItem('customerToken');
      
      if (!token) {
        throw new Error('Please log in to add pets');
      }

      // Create the pet data object
      const petData = {
        name: petName,
        pet_type: selectedPetType,
        breed: breed,
        weight: selectedSize, // Using size as weight for now
        special_notes: `Issues: ${additionalInfo.issues.join(', ') || 'None'}. Birthday: ${additionalInfo.birthday || 'Unknown'}. Health issues: ${additionalInfo.healthIssues || 'None'}`,
      };

      // Make the API call to add the pet
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://petcarebooker.onrender.com';
      const response = await fetch(`${API_BASE_URL}/api/customer/pets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to add pet' }));
        throw new Error(errorData.detail || 'Failed to add pet');
      }

      // Close modal and redirect
      setShowInfoModal(false);
      router.push('/customer/pets');
    } catch (err: any) {
      console.error('Failed to add pet:', err);
      setError(err.message || 'Failed to add pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="text-purple-600 hover:text-purple-700 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">Add Your Pet</h1>
          <p className="text-gray-600 text-lg">Tell us about your furry friend</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label className="block text-gray-900 font-bold text-lg mb-3">What's your pet's name? 💕</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg transition-all"
                placeholder="Bella"
              />
            </div>

            {/* Pet Type - Visual Selector */}
            <div>
              <label className="block text-gray-900 font-bold text-lg mb-3">
                Type 🐾
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {PET_TYPES.map((pet) => (
                  <button
                    key={pet.value}
                    type="button"
                    onClick={() => setSelectedPetType(pet.value)}
                    className={`
                      p-6 rounded-2xl border-2 transition-all hover:scale-105
                      ${selectedPetType === pet.value 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="text-5xl mb-2">{pet.emoji}</div>
                    <div className={`text-lg font-semibold ${selectedPetType === pet.value ? 'text-blue-700' : 'text-gray-700'}`}>
                      {pet.label}
                    </div>
                  </button>
                ))}
              </div>
              {!selectedPetType && (
                <p className="text-red-500 text-sm mt-2">Please select a pet type</p>
              )}
            </div>

            {/* Breed - Dropdown */}
            <div>
              <label className="block text-gray-900 font-bold text-lg mb-3">
                Breed 🎯
              </label>
              {selectedPetType ? (
                <select
                  name="breed"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg transition-all bg-white"
                >
                  <option value="">Select breed...</option>
                  {(selectedPetType === 'dog' ? DOG_BREEDS : CAT_BREEDS).map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="w-full px-5 py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 text-lg text-center">
                  Please select pet type first
                </div>
              )}
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-gray-900 font-bold text-lg mb-3">
                Size 🎯
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setSelectedSize(size.value)}
                    className={`
                      px-4 py-6 rounded-2xl border-2 transition-all hover:scale-105 text-center
                      ${selectedSize === size.value 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <div className={`text-2xl font-extrabold mb-1 ${selectedSize === size.value ? 'text-blue-700' : 'text-gray-700'}`}>
                      {size.label}
                    </div>
                    <div className={`text-xs font-semibold ${selectedSize === size.value ? 'text-blue-600' : 'text-gray-600'}`}>
                      {size.description}
                    </div>
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-red-500 text-sm mt-2">Please select a size</p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-100 text-red-700 px-5 py-4 rounded-2xl font-semibold">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-5 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !selectedPetType || !selectedSize}
                className="flex-1 px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {loading ? 'Continuing...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>

        {/* Pet Info Modal */}
        <PetInfoModal
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          petName={petName}
          petType={selectedPetType}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
}

