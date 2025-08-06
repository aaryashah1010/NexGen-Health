import React, { useState, useEffect } from 'react';
import { 
  Siren, 
  MapPin, 
  Bed, 
  Clock, 
  Phone, 
  Navigation, 
  Filter,
  Star,
  Heart,
  Shield,
  Users,
  Search,
  RefreshCw
} from 'lucide-react';

const hospitalsMock = [
  {
    id: 1,
    name: 'CityCare Hospital',
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop",
    availableBeds: 12,
    totalBeds: 150,
    distance: 2.3,
    rating: 4.8,
    phone: '+91 98765 43210',
    specialty: 'Emergency Care',
    type: 'Government',
    estimatedTime: '8 mins',
    lastUpdated: '2 mins ago'
  },
  {
    id: 2,
    name: 'Healing Hands Clinic',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=200&fit=crop',
    availableBeds: 7,
    totalBeds: 80,
    distance: 1.8,
    rating: 4.6,
    phone: '+91 98765 43211',
    specialty: 'General Medicine',
    type: 'Private',
    estimatedTime: '6 mins',
    lastUpdated: '5 mins ago'
  },
  {
    id: 3,
    name: 'GreenLife Hospital',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop',
    availableBeds: 3,
    totalBeds: 200,
    distance: 4.1,
    rating: 4.9,
    phone: '+91 98765 43212',
    specialty: 'Multi-specialty',
    type: 'Private',
    estimatedTime: '12 mins',
    lastUpdated: '1 min ago'
  },
  {
    id: 4,
    name: 'Metro Medical Center',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
    availableBeds: 15,
    totalBeds: 120,
    distance: 3.2,
    rating: 4.7,
    phone: '+91 98765 43213',
    specialty: 'Cardiac Care',
    type: 'Private',
    estimatedTime: '10 mins',
    lastUpdated: '3 mins ago'
  },
  {
    id: 5,
    name: 'Community Health Hub',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=200&fit=crop',
    availableBeds: 8,
    totalBeds: 60,
    distance: 0.9,
    rating: 4.4,
    phone: '+91 98765 43214',
    specialty: 'Primary Care',
    type: 'Government',
    estimatedTime: '4 mins',
    lastUpdated: '7 mins ago'
  },
  {
    id: 6,
    name: 'Advanced Care Institute',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=200&fit=crop',
    availableBeds: 20,
    totalBeds: 250,
    distance: 5.7,
    rating: 4.9,
    phone: '+91 98765 43215',
    specialty: 'Trauma Center',
    type: 'Private',
    estimatedTime: '16 mins',
    lastUpdated: '4 mins ago'
  }
];

const PatientDashboard = () => {
  const [sortBy, setSortBy] = useState('distance');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Filter and sort hospitals
  const filteredAndSortedHospitals = hospitalsMock
    .filter(hospital => {
      const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hospital.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || hospital.type.toLowerCase() === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'availability':
          return b.availableBeds - a.availableBeds;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
        default:
          return a.distance - b.distance;
      }
    });

  const toggleFavorite = (hospitalId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(hospitalId)) {
      newFavorites.delete(hospitalId);
    } else {
      newFavorites.add(hospitalId);
    }
    setFavorites(newFavorites);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getBedAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 20) return 'text-green-600 bg-green-50';
    if (percentage > 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getBedAvailabilityStatus = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 20) return 'High';
    if (percentage > 10) return 'Medium';
    return 'Low';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter by Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="distance">Sort by Distance</option>
              <option value="availability">Sort by Availability</option>
              <option value="rating">Sort by Rating</option>
            </select>

            {/* Quick Stats */}
            <div className="flex items-center justify-center bg-blue-50 rounded-lg px-4 py-2">
              <Users className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">
                {filteredAndSortedHospitals.length} hospitals found
              </span>
            </div>
          </div>
        </div>
        
        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedHospitals.map((hospital) => (
            <div
              key={`${hospital.id}-${hospital.name}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image Header */}
              <div className="relative">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Hospital+Image';
                  }}
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(hospital.id)}
                    className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.has(hospital.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                    />
                  </button>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${hospital.type === 'Government' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {hospital.type}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getBedAvailabilityColor(hospital.availableBeds, hospital.totalBeds)}`}>
                    {getBedAvailabilityStatus(hospital.availableBeds, hospital.totalBeds)} Availability
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{hospital.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-gray-400" />
                  {hospital.specialty}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Bed className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-lg font-bold text-green-600">{hospital.availableBeds}</span>
                    </div>
                    <p className="text-xs text-gray-600">Available Beds</p>
                    <p className="text-xs text-gray-500">of {hospital.totalBeds} total</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-lg font-bold text-blue-600">{hospital.distance}km</span>
                    </div>
                    <p className="text-xs text-gray-600">Distance</p>
                    <p className="text-xs text-gray-500">~{hospital.estimatedTime}</p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  Updated {hospital.lastUpdated}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                    onClick={() => alert(`Emergency SOS sent to ${hospital.name}!\n\nYour location has been shared and they will contact you shortly.`)}
                  >
                    <Siren className="w-4 h-4" />
                    <span>Emergency SOS</span>
                  </button>
                  
                  <button
                    className="px-4 py-3 border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 rounded-lg flex items-center justify-center transition-all"
                    onClick={() => window.open(`tel:${hospital.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  
                  <button
                    className="px-4 py-3 border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-700 rounded-lg flex items-center justify-center transition-all"
                    onClick={() => alert(`Getting directions to ${hospital.name}...`)}
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedHospitals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;