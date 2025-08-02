import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Bed, 
  Clock, 
  Phone, 
  Mail, 
  Heart,
  AlertTriangle,
  Filter,
  Star,
  Navigation
} from 'lucide-react';

const PatientDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - will be replaced with real API calls
  const availableHospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      distance: '2.5 km',
      availableBeds: 15,
      rating: 4.5,
      location: 'Downtown Medical District',
      phone: '+1 234-567-8900',
      specialties: ['General', 'Emergency', 'ICU'],
      estimatedWait: '30 mins'
    },
    {
      id: 2,
      name: 'Metro Health Center',
      distance: '4.1 km',
      availableBeds: 8,
      rating: 4.2,
      location: 'Northside Medical Plaza',
      phone: '+1 234-567-8901',
      specialties: ['Cardiology', 'Neurology'],
      estimatedWait: '45 mins'
    },
    {
      id: 3,
      name: 'Community Medical Center',
      distance: '6.8 km',
      availableBeds: 22,
      rating: 4.7,
      location: 'Eastside Healthcare Campus',
      phone: '+1 234-567-8902',
      specialties: ['General', 'Pediatrics', 'Maternity'],
      estimatedWait: '15 mins'
    }
  ];

  const patientInfo = {
    name: 'John Doe',
    bloodGroup: 'A+',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 234-567-8900',
      relationship: 'Spouse'
    },
    currentStatus: 'Searching for bed',
    lastSearch: '2 hours ago'
  };

  const filters = [
    { id: 'all', label: 'All Hospitals' },
    { id: 'nearby', label: 'Nearby (< 5km)' },
    { id: 'available', label: 'High Availability' },
    { id: 'rating', label: 'Top Rated' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-sm text-gray-600">Find available hospital beds</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Call 911
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Info Card */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{patientInfo.name}</h3>
                  <p className="text-sm text-gray-500">Blood Group: {patientInfo.bloodGroup}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Status</p>
                <p className="text-sm font-medium text-blue-600">{patientInfo.currentStatus}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Emergency Contact</p>
                  <p className="text-sm font-medium text-gray-900">{patientInfo.emergencyContact.name}</p>
                  <p className="text-sm text-gray-500">{patientInfo.emergencyContact.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Search</p>
                  <p className="text-sm font-medium text-gray-900">{patientInfo.lastSearch}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Available Hospitals</p>
                  <p className="text-sm font-medium text-green-600">{availableHospitals.length} found</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Search for Available Beds</h3>
            
            {/* Search Bar */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search hospitals, specialties, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedFilter === filter.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Available Hospitals */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Available Hospitals</h3>
          
          {availableHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{hospital.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{hospital.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{hospital.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bed className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{hospital.availableBeds} beds available</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{hospital.distance}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600">~{hospital.estimatedWait}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      <Bed className="h-4 w-4 mr-2" />
                      Book Bed
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Section */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">Emergency?</h3>
              <p className="text-sm text-red-600">
                If you're experiencing a medical emergency, call 911 immediately or visit the nearest emergency room.
              </p>
            </div>
            <button className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
              Call 911
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
