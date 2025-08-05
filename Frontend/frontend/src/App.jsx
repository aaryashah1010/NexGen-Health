
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/Dashboard';
import PatientDashboard from './components/patient/Dashboard';
import PatientProfile from './components/patient/Profile';
import TestConnection from './components/TestConnection';
import ProfileVerify from './components/patient/ProfileVerify';
const Home = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to{' '}
          <span className="text-blue-600">NexGen Health</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Smart Bed Allocation System - Connecting patients with available hospital beds efficiently.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="/login"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<TestConnection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Patient Routes */}
              <Route 
                path="/patient/*" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <Routes>
                      <Route path="dashboard" element={<PatientDashboard />} />
                      <Route path="profile" element={<PatientProfile />} />
                      <Route path="profile-verify" element={<ProfileVerify />} />
                      {/* Add more patient routes as needed */}
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
