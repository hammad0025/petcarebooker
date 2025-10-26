'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      // TODO: API call to add pet
      console.log('Adding pet:', {
        name: formData.get('name'),
        pet_type: formData.get('pet_type'),
        breed: formData.get('breed'),
        weight: formData.get('weight'),
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Pet Name *</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                placeholder="Bella"
              />
            </div>

            {/* Pet Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Pet Type *</label>
              <select
                name="pet_type"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="dog">Dog 🐕</option>
                <option value="cat">Cat 🐈</option>
              </select>
            </div>

            {/* Breed */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Breed</label>
              <input
                type="text"
                name="breed"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                placeholder="Golden Retriever"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Weight</label>
              <input
                type="text"
                name="weight"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                placeholder="50 lbs or Small/Medium/Large"
              />
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Special Notes</label>
              <textarea
                name="special_notes"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                placeholder="Allergies, fears, preferences, etc."
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
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

