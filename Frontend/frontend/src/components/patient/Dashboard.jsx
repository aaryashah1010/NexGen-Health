import React, { useState } from 'react';
import { Siren } from 'lucide-react';

const hospitalsMock = [
  {
    id: 1,
    name: 'CityCare Hospital',
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop",
    availableBeds: 12,
  },
  {
    id: 2,
    name: 'Healing Hands Clinic',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=200&fit=crop',
    availableBeds: 7,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
  },
];

const PatientDashboard = () => {
  const [sortBy, setSortBy] = useState('distance');
  
  // Sort hospitals based on selected criteria
  const sortedHospitals = [...hospitalsMock].sort((a, b) => {
    if (sortBy === 'availability') {
      return b.availableBeds - a.availableBeds;
    }
    return a.id - b.id; // Default sort by distance (using id as proxy)
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Find Hospitals</h1>
            <p className="text-sm text-gray-600">Sort and discover the nearest hospital options</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sort"
                value="distance"
                checked={sortBy === 'distance'}
                onChange={() => setSortBy('distance')}
                className="accent-green-600"
              />
              <span className="ml-2 text-gray-700">Sort by Distance</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sort"
                value="availability"
                checked={sortBy === 'availability'}
                onChange={() => setSortBy('availability')}
                className="accent-green-600"
              />
              <span className="ml-2 text-gray-700">Sort by Availability</span>
            </label>
          </div>
        </div>
        
        {/* Hospital Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition duration-200 p-4 flex flex-col"
            >
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Hospital+Image';
                }}
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">{hospital.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{hospital.availableBeds} beds available</p>
              </div>
              <button
                className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium"
                onClick={() => alert(`SOS sent to ${hospital.name}`)}
              >
                <Siren className="w-4 h-4" />
                Send SOS
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;