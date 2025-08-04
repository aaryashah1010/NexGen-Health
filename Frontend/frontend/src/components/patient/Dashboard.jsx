import React from 'react';
import { Heart } from 'lucide-react';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to NexGen Health</h2>
          <p className="text-gray-600 mb-6">Complete your profile to get started</p>
          
          <button 
            onClick={() => window.location.href = '/patient/profile'}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Heart className="h-5 w-5 mr-2" />
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
