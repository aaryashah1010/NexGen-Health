const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    console.log('Making API request to:', url);
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API methods
export const api = {
  // Auth endpoints
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  getCurrentUser: () => apiRequest('/auth/me'),

  // Patient endpoints
  createPatientProfile: (profileData) => apiRequest('/patient/profile', {
    method: 'POST',
    body: JSON.stringify(profileData),
  }),

  getPatientProfile: () => apiRequest('/patient/profile'),

  // Test endpoint - call the root endpoint directly
  testConnection: async () => {
    const response = await fetch('http://localhost:4000/');
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },
};

export default api;
