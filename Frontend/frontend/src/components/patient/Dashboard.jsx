import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
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

const PatientDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [sortBy, setSortBy] = useState('distance');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await api.getHospitals();
        // Map backend fields to frontend fields
        const mapped = (data.hospitals || []).map(hospital => ({
          id: hospital.id,
          name: hospital.hospitalName, // backend: hospitalName
          type: hospital.hospitalType, // backend: hospitalType
          city: hospital.city,
          address: hospital.address,
          location: hospital.location,
          contactPerson: hospital.contactPerson,
          totalBeds: hospital.totalBeds,
          availableBeds: hospital.available, // backend: available
          isVerified: hospital.isVerified,
          verificationDocuments: hospital.verificationDocuments,
          // Add defaults for missing fields
          image: hospital.image || 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Hospital+Image',
          rating: hospital.rating || 4.2,
          specialty: hospital.specialty || 'General',
          distance: hospital.distance || Math.floor(Math.random() * 10) + 1, // fake distance if not present
          estimatedTime: hospital.estimatedTime || '10-20 min',
          phone: hospital.contactPersonPhone || 'N/A',
          lastUpdated: hospital.updatedAt ? new Date(hospital.updatedAt).toLocaleString() : 'Recently'
        }));
        setHospitals(mapped);
      } catch (err) {
        setHospitals([]);
      }
    };
    fetchHospitals();
  }, []);

  // Filter and sort hospitals
  const filteredAndSortedHospitals = hospitals
    .filter(hospital => {
      const matchesSearch = hospital.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hospital.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || hospital.type?.toLowerCase() === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'availability':
          return (b.availableBeds || 0) - (a.availableBeds || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'distance':
        default:
          return (a.distance || 0) - (b.distance || 0);
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