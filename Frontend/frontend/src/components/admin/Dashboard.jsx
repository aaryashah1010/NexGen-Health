import React, { useState, useEffect } from 'react';
import {
  Building2,
  Bed,
  Users,
  Activity,
  Plus,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Settings,
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  BedDouble,
  Stethoscope,
  Heart,
  Shield,
  Zap,
  RefreshCw,
  ChevronDown,
  MoreHorizontal,
  Save,
  X,
  UserCheck,
  Siren,
  LineChart,
  Map
} from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  // State management for all dashboard features
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showBedManagementModal, setShowBedManagementModal] = useState(false);
  const [showSOSChart, setShowSOSChart] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sosMessages, setSOSMessages] = useState([]);

  // Form states
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    department: ''
  });

  const [bedForm, setBedForm] = useState({
    bedNumber: '',
    bedType: 'general',
    status: 'available',
    department: 'general'
  });

  // Hospital profile fetched from backend
  const [hospitalProfile, setHospitalProfile] = useState(null);

  // Beds and doctors fetched from backend (replace mock data with API calls)
  const [beds, setBeds] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // SOS data for charts (replace with API call)
  const [sosData, setSOSData] = useState([
    { time: '06:00', count: 2, status: 'resolved' },
    { time: '08:00', count: 5, status: 'resolved' },
    { time: '10:00', count: 3, status: 'resolved' },
    { time: '12:00', count: 8, status: 'active' },
    { time: '14:00', count: 4, status: 'resolved' },
    { time: '16:00', count: 6, status: 'active' },
    { time: '18:00', count: 2, status: 'active' },
  ]);

  // Statistics derived from database
 

  // Fetch hospital profile by ID (from user)
const fetchHospitalProfile = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    if (!userId) return;

    const data = await api.getHospitalsById(userId);
    setHospitalProfile(data.hospital || data.profile || null);
  } catch (error) {
    console.error('Failed to fetch hospital profile:', error);
    setHospitalProfile(null);
  }
};
console.log(hospitalProfile?.available);
 const stats = {
    totalBeds:hospitalProfile?.totalBeds||0,
    availableBeds:hospitalProfile?.available||0,
    occupiedBeds: beds.filter(bed => bed.status === 'occupied').length,
    maintenanceBeds: beds.filter(bed => bed.status === 'maintenance').length,
    totalDoctors: doctors.length,
    sosToday: sosData.reduce((sum, item) => sum + item.count, 0),
    activeSOS: sosData.filter(item => item.status === 'active').reduce((sum, item) => sum + item.count, 0)
  };
  // Fetch doctors for the hospital
  const fetchDoctors = async () => {
    try {
      // Replace with your actual API call
      // const data = await api.getDoctorsByHospitalId(hospitalId);
      // setDoctors(data.doctors);
      setDoctors([]);
    } catch (error) {
      setDoctors([]);
    }
  };

  // Fetch SOS data for the hospital
  const fetchSOSData = async () => {
    try {
      // Replace with your actual API call
      // const data = await api.getSOSDataByHospitalId(hospitalId);
      // setSOSData(data.sosData);
    } catch (error) {
      setSOSData([]);
    }
  };

  // Handler functions
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      // POST /api/admin/doctors
      const newDoctor = {
        ...doctorForm,
        id: doctors.length + 1,
        hospitalId: hospitalProfile?.id
      };
      setDoctors([...doctors, newDoctor]);
      setDoctorForm({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        licenseNumber: '',
        department: ''
      });
      setShowAddDoctorModal(false);
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleBedStatusChange = async (bedId, newStatus) => {
    try {
      // PUT /api/admin/beds/:id
      setBeds(beds.map(bed =>
        bed.id === bedId ? { ...bed, status: newStatus } : bed
      ));
      console.log(`Bed ${bedId} status changed to ${newStatus}`);
    } catch (error) {
      console.error('Error updating bed status:', error);
    }
  };

  const handleAddBed = async (e) => {
    e.preventDefault();
    try {
      // POST /api/admin/beds
      const newBed = {
        ...bedForm,
        id: beds.length + 1,
        patientId: null
      };
      setBeds([...beds, newBed]);
      setBedForm({
        bedNumber: '',
        bedType: 'general',
        status: 'available',
        department: 'general'
      });
      setShowBedManagementModal(false);
      alert('Bed added successfully!');
    } catch (error) {
      console.error('Error adding bed:', error);
    }
  };

  const handleDeleteBed = async (bedId) => {
    if (window.confirm('Are you sure you want to delete this bed?')) {
      try {
        // DELETE /api/admin/beds/:id
        setBeds(beds.filter(bed => bed.id !== bedId));
        console.log(`Bed ${bedId} deleted`);
      } catch (error) {
        console.error('Error deleting bed:', error);
      }
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchHospitalProfile(),
        fetchDoctors(),
        fetchSOSData()
      ]);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1500);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchHospitalProfile();
    fetchDoctors();
    fetchSOSData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Bed className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalBeds}</div>
            <div className="text-sm text-gray-600">Total Beds</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.availableBeds}</div>
            <div className="text-sm text-gray-600">Available Beds</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalDoctors}</div>
            <div className="text-sm text-gray-600">Total Doctors</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-50 rounded-xl">
                <Settings className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.maintenanceBeds}</div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <Siren className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.activeSOS}</div>
            <div className="text-sm text-gray-600">Active SOS</div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setShowAddDoctorModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-3">
              <UserPlus className="w-6 h-6" />
              <span className="text-lg font-semibold">Add Doctor</span>
            </div>
          </button>
          <button
            onClick={() => setShowBedManagementModal(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-3">
              <BedDouble className="w-6 h-6" />
              <span className="text-lg font-semibold">Manage Beds</span>
            </div>
          </button>
          <button
            onClick={() => setShowSOSChart(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-3">
              <LineChart className="w-6 h-6" />
              <span className="text-lg font-semibold">SOS Analytics</span>
            </div>
          </button>
        </div>

        {/* Bed Management Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Bed Management</h3>
            <button
              onClick={() => setShowBedManagementModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2 inline" />
              Add Bed
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Bed Number</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {beds.map((bed) => (
                  <tr key={bed.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{bed.bedNumber}</td>
                    <td className="px-6 py-4 text-gray-700 capitalize">{bed.bedType}</td>
                    <td className="px-6 py-4 text-gray-700 capitalize">{bed.department}</td>
                    <td className="px-6 py-4">
                      <select
                        value={bed.status}
                        onChange={(e) => handleBedStatusChange(bed.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          bed.status === 'available' ? 'bg-green-100 text-green-800 border-green-200' :
                          bed.status === 'occupied' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          bed.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="cleaning">Cleaning</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBed(bed.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctors List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Hospital Doctors</h3>
            <button
              onClick={() => setShowAddDoctorModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-4 h-4 mr-2 inline" />
              Add Doctor
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Department:</strong> {doctor.department}</p>
                  <p><strong>Phone:</strong> {doctor.phone}</p>
                  <p><strong>License:</strong> {doctor.licenseNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Doctor</h3>
              <button
                onClick={() => setShowAddDoctorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <input
                type="text"
                placeholder="Doctor Name"
                value={doctorForm.name}
                onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={doctorForm.email}
                onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={doctorForm.phone}
                onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Specialization"
                value={doctorForm.specialization}
                onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="License Number"
                value={doctorForm.licenseNumber}
                onChange={(e) => setDoctorForm({ ...doctorForm, licenseNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={doctorForm.department}
                onChange={(e) => setDoctorForm({ ...doctorForm, department: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Department</option>
                <option value="general">General</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="icu">ICU</option>
                <option value="emergency">Emergency</option>
              </select>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Bed Modal */}
      {showBedManagementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Bed</h3>
              <button
                onClick={() => setShowBedManagementModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddBed} className="space-y-4">
              <input
                type="text"
                placeholder="Bed Number (e.g., ICU-101)"
                value={bedForm.bedNumber}
                onChange={(e) => setBedForm({ ...bedForm, bedNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={bedForm.bedType}
                onChange={(e) => setBedForm({ ...bedForm, bedType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="general">General</option>
                <option value="icu">ICU</option>
                <option value="ccu">CCU</option>
                <option value="emergency">Emergency</option>
              </select>
              <select
                value={bedForm.department}
                onChange={(e) => setBedForm({ ...bedForm, department: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="general">General</option>
                <option value="icu">ICU</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="emergency">Emergency</option>
              </select>
              <select
                value={bedForm.status}
                onChange={(e) => setBedForm({ ...bedForm, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
                <option value="cleaning">Cleaning</option>
              </select>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBedManagementModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Bed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOS Chart Modal */}
      {showSOSChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Real-time SOS Analytics</h3>
              <button
                onClick={() => setShowSOSChart(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* SOS Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <div className="flex items-center space-x-3">
                  <Siren className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold text-red-900">{stats.activeSOS}</div>
                    <div className="text-sm text-red-700">Active SOS</div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-900">{stats.sosToday - stats.activeSOS}</div>
                    <div className="text-sm text-blue-700">Resolved Today</div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-900">{stats.sosToday}</div>
                    <div className="text-sm text-green-700">Total Today</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Simple Chart Representation */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">SOS Requests Throughout the Day</h4>
              <div className="space-y-3">
                {sosData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium text-gray-600">{data.time}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 rounded-full h-4 flex-1 relative overflow-hidden">
                          <div
                            className={`h-full rounded-full ${data.status === 'active' ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${(data.count / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{data.count}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          data.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent SOS Messages */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent SOS Messages</h4>
              <div className="space-y-3">
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-red-900">Emergency at Location A</div>
                      <div className="text-sm text-red-700">Patient: John Doe, Age: 45, Condition: Heart Attack</div>
                      <div className="text-xs text-red-600">2 minutes ago</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                        Respond
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-yellow-900">Urgent Request at Location B</div>
                      <div className="text-sm text-yellow-700">Patient: Sarah Smith, Age: 32, Condition: Accident</div>
                      <div className="text-xs text-yellow-600">5 minutes ago</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                        Respond
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-green-900">Resolved - Emergency at Location C</div>
                      <div className="text-sm text-green-700">Patient: Mike Johnson, Age: 28, Condition: Fracture</div>
                      <div className="text-xs text-green-600">15 minutes ago - Resolved</div>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-600 text-white text-sm rounded">
                        ✓ Resolved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;