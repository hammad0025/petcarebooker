'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PET_TYPES = [
  { value: 'dog', label: 'Dog', emoji: '🐕' },
  { value: 'cat', label: 'Cat', emoji: '🐈' },
  { value: 'rabbit', label: 'Rabbit', emoji: '🐰' },
  { value: 'bird', label: 'Bird', emoji: '🦜' },
  { value: 'guinea-pig', label: 'Guinea Pig', emoji: '🐹' },
  { value: 'hamster', label: 'Hamster', emoji: '🐭' },
  { value: 'ferret', label: 'Ferret', emoji: '🦡' },
  { value: 'reptile', label: 'Reptile', emoji: '🦎' },
  { value: 'fish', label: 'Fish', emoji: '🐠' },
  { value: 'horse', label: 'Horse', emoji: '🐴' },
  { value: 'other', label: 'Other', emoji: '🐾' },
];

export default function AddPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPetType, setSelectedPetType] = useState('');
  const [weightValue, setWeightValue] = useState(25);
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');

  const convertWeight = (value: number, from: 'lbs' | 'kg', to: 'lbs' | 'kg'): number => {
    if (from === to) return value;
    if (from === 'lbs' && to === 'kg') return Math.round(value * 0.453592);
    return Math.round(value * 2.20462);
  };

  const handleUnitToggle = () => {
    const newUnit = weightUnit === 'lbs' ? 'kg' : 'lbs';
    setWeightValue(convertWeight(weightValue, weightUnit, newUnit));
    setWeightUnit(newUnit);
  };

  const getWeightLabel = () => {
    if (weightUnit === 'lbs') {
      if (weightValue < 15) return 'Small';
      if (weightValue < 40) return 'Medium';
      if (weightValue < 80) return 'Large';
      return 'Extra Large';
    } else {
      if (weightValue < 7) return 'Small';
      if (weightValue < 18) return 'Medium';
      if (weightValue < 36) return 'Large';
      return 'Extra Large';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      // TODO: API call to add pet
      console.log('Adding pet:', {
        name: formData.get('name'),
        pet_type: selectedPetType,
        breed: formData.get('breed'),
        weight: `${weightValue} ${weightUnit}`,
        special_notes: formData.get('special_notes'),
      });

      // For now, just redirect to my-pets
      router.push('/my-pets');
    } catch (err) {
      setError('Failed to add pet');
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
              <label className="block text-gray-900 font-bold text-lg mb-3">What kind of pet? 🐾</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {PET_TYPES.map((pet) => (
                  <button
                    key={pet.value}
                    type="button"
                    onClick={() => setSelectedPetType(pet.value)}
                    className={`
                      p-4 rounded-2xl border-2 transition-all hover:scale-105
                      ${selectedPetType === pet.value 
                        ? 'border-purple-500 bg-purple-50 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-purple-300'
                      }
                    `}
                  >
                    <div className="text-4xl mb-1">{pet.emoji}</div>
                    <div className={`text-sm font-semibold ${selectedPetType === pet.value ? 'text-purple-700' : 'text-gray-700'}`}>
                      {pet.label}
                    </div>
                  </button>
                ))}
              </div>
              {!selectedPetType && (
                <p className="text-red-500 text-sm mt-2">Please select a pet type</p>
              )}
            </div>

            {/* Breed */}
            <div>
              <label className="block text-gray-900 font-bold text-lg mb-3">Breed (optional) 🎯</label>
              <input
                type="text"
                name="breed"
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg transition-all"
                placeholder="Golden Retriever, Tabby, etc."
              />
            </div>

            {/* Weight - Modern Dial */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-gray-900 font-bold text-lg">Weight ⚖️</label>
                <button
                  type="button"
                  onClick={handleUnitToggle}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold hover:from-purple-200 hover:to-pink-200 transition-all"
                >
                  Switch to {weightUnit === 'lbs' ? 'kg' : 'lbs'}
                </button>
              </div>

              {/* Weight Display */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-4">
                <div className="text-center mb-2">
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    {weightValue}
                  </div>
                  <div className="text-2xl font-bold text-gray-700 mt-1">
                    {weightUnit}
                  </div>
                  <div className="inline-block mt-2 px-4 py-1 bg-white rounded-full text-purple-700 font-semibold text-sm shadow-sm">
                    {getWeightLabel()}
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min={weightUnit === 'lbs' ? 1 : 1}
                  max={weightUnit === 'lbs' ? 200 : 90}
                  value={weightValue}
                  onChange={(e) => setWeightValue(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-7
                    [&::-webkit-slider-thumb]:h-7
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-purple-600
                    [&::-webkit-slider-thumb]:to-pink-600
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-moz-range-thumb]:w-7
                    [&::-moz-range-thumb]:h-7
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-gradient-to-r
                    [&::-moz-range-thumb]:from-purple-600
                    [&::-moz-range-thumb]:to-pink-600
                    [&::-moz-range-thumb]:shadow-lg
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:transition-transform
                    [&::-moz-range-thumb]:border-0
                  "
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                  <span>{weightUnit === 'lbs' ? '1 lb' : '1 kg'}</span>
                  <span>{weightUnit === 'lbs' ? '200 lbs' : '90 kg'}</span>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-gray-900 font-bold text-lg mb-3">Special Notes (optional) 📝</label>
              <textarea
                name="special_notes"
                rows={4}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg transition-all resize-none"
                placeholder="Any allergies, fears, or special care instructions..."
              />
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
                disabled={loading || !selectedPetType}
                className="flex-1 px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {loading ? 'Adding...' : 'Add Pet 🐾'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

