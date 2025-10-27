'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'http://localhost:8000' 
  : 'https://petcarebooker.onrender.com';

interface Pet {
  id: number;
  name: string;
  pet_type: string;
  breed: string;
  weight: string;
  special_notes: string;
}

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddPet, setShowAddPet] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    const name = localStorage.getItem('customerName');
    
    if (!token) {
      router.push('/customer/login');
      return;
    }

    setCustomerName(name || '');
    loadPets(token);
  }, []);

  const loadPets = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customer/pets`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to load pets');
      
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Failed to load pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('customerToken');
    if (!token) return;

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`${API_BASE_URL}/api/customer/pets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          pet_type: formData.get('pet_type'),
          breed: formData.get('breed'),
          weight: formData.get('weight'),
          special_notes: formData.get('special_notes'),
        }),
      });

      if (!response.ok) throw new Error('Failed to add pet');

      loadPets(token);
      setShowAddPet(false);
    } catch (error) {
      console.error('Failed to add pet:', error);
    }
  };

  const handleDeletePet = async (petId: number) => {
    if (!confirm('Are you sure you want to remove this pet?')) return;

    const token = localStorage.getItem('customerToken');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/customer/pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete pet');

      loadPets(token);
    } catch (error) {
      console.error('Failed to delete pet:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            PetCareBooker
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700">Hi, {customerName}!</span>
            <Link href="/browse" className="text-purple-600 hover:text-purple-700">
              Find Groomers
            </Link>
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
          <button
            onClick={() => setShowAddPet(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 shadow-lg"
          >
            + Add Pet
          </button>
        </div>

        {showAddPet && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Add New Pet</h3>
            <form onSubmit={handleAddPet} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Pet Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Max"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Type</label>
                  <select
                    name="pet_type"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  >
                    <option value="">Select...</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Breed</label>
                  <input
                    type="text"
                    name="breed"
                    placeholder="Golden Retriever"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Weight/Size</label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="50 lbs or Large"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Special Notes</label>
                <textarea
                  name="special_notes"
                  rows={3}
                  placeholder="Any allergies, behavioral notes, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddPet(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Add Pet
                </button>
              </div>
            </form>
          </div>
        )}

        {pets.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">🐕</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No pets yet</h3>
            <p className="text-gray-600 mb-6">Add your pets to quickly book appointments</p>
            <button
              onClick={() => setShowAddPet(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Add Your First Pet
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                    <p className="text-gray-600">
                      {pet.breed || 'Mixed'} {pet.pet_type}
                    </p>
                  </div>
                  <div className="text-4xl">
                    {pet.pet_type === 'dog' ? '🐕' : '🐱'}
                  </div>
                </div>
                {pet.weight && (
                  <p className="text-gray-600 mb-2">
                    <strong>Weight:</strong> {pet.weight}
                  </p>
                )}
                {pet.special_notes && (
                  <p className="text-gray-600 mb-4 text-sm">
                    <strong>Notes:</strong> {pet.special_notes}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link
                    href={`/browse`}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-center font-semibold hover:bg-purple-700"
                  >
                    Book Appointment
                  </Link>
                  <button
                    onClick={() => handleDeletePet(pet.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

