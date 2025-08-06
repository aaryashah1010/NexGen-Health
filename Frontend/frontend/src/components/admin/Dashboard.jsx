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
  MoreHorizontal
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');
  const [notifications, setNotifications] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Enhanced mock data
  const stats = {
    totalBeds: 150,
    availableBeds: 45,
    occupiedBeds: 105,
    totalPatients: 98,
    pendingRequests: 12,
    todayAdmissions: 8,
    occupancyRate: 70,
    avgStayDuration: 4.2,
    emergencyRequests: 3,
    dischargedToday: 5
  };

  const recentPatients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      bedNumber: 'ICU-101',
      admissionDate: '2024-01-15',
      admissionTime: '14:30',
      status: 'critical',
      condition: 'Heart Surgery',
      doctor: 'Dr. Smith',
      phone: '+91 98765 43210',
      priority: 'high',
      lastVitals: '2 hrs ago'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 32,
      bedNumber: 'GEN-203',
      admissionDate: '2024-01-14',
      admissionTime: '09:15',
      status: 'stable',
      condition: 'Pneumonia',
      doctor: 'Dr. Wilson',
      phone: '+91 98765 43211',
      priority: 'medium',
      lastVitals: '1 hr ago'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      age: 28,
      bedNumber: 'ORT-305',
      admissionDate: '2024-01-13',
      admissionTime: '16:45',
      status: 'recovering',
      condition: 'Fracture',
      doctor: 'Dr. Brown',
      phone: '+91 98765 43212',
      priority: 'low',
      lastVitals: '30 mins ago'
    },
    {
      id: 4,
      name: 'Emma Davis',
      age: 67,
      bedNumber: 'ICU-102',
      admissionDate: '2024-01-12',
      admissionTime: '11:20',
      status: 'critical',
      condition: 'Stroke',
      doctor: 'Dr. Johnson',
      phone: '+91 98765 43213',
      priority: 'high',
      lastVitals: '15 mins ago'
    }
  ];

  const bedStatuses = [
    { status: 'Available', count: 45, color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50' },
    { status: 'Occupied', count: 105, color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50' },
    { status: 'Maintenance', count: 8, color: 'bg-amber-500', textColor: 'text-amber-700', bgLight: 'bg-amber-50' },
    { status: 'Cleaning', count: 12, color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50' }
  ];

  const recentActivities = [
    { id: 1, type: 'admission', message: 'John Doe admitted to ICU-101', time: '2 mins ago', icon: UserPlus, color: 'text-green-600' },
    { id: 2, type: 'discharge', message: 'Patient discharged from GEN-205', time: '15 mins ago', icon: CheckCircle, color: 'text-blue-600' },
    { id: 3, type: 'emergency', message: 'Emergency request received', time: '23 mins ago', icon: AlertTriangle, color: 'text-red-600' },
    { id: 4, type: 'maintenance', message: 'Bed ICU-103 marked for maintenance', time: '1 hr ago', icon: Settings, color: 'text-amber-600' }
  ];

  const urgentNotifications = [
    { id: 1, message: 'ICU capacity at 95%', type: 'warning', time: '5 mins ago' },
    { id: 2, message: '3 emergency requests pending', type: 'urgent', time: '10 mins ago' },
    { id: 3, message: 'Bed maintenance overdue', type: 'info', time: '1 hr ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'stable': return 'bg-green-100 text-green-800 border-green-200';
      case 'recovering': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

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
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalBeds}</div>
            <div className="text-sm text-gray-600">Hospital Beds</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-xs text-emerald-600 font-medium">↗ 5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.availableBeds}</div>
            <div className="text-sm text-gray-600">Available Beds</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs text-purple-600 font-medium">↗ 12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalPatients}</div>
            <div className="text-sm text-gray-600">Active Patients</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-50 rounded-xl">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-xs text-red-600 font-medium">↑ 3</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingRequests}</div>
            <div className="text-sm text-gray-600">Pending Requests</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-xs text-red-600 font-medium">URGENT</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.emergencyRequests}</div>
            <div className="text-sm text-gray-600">Emergency Requests</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Bed Status Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Bed Status Overview</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {bedStatuses.map((item, index) => (
                  <div key={index} className={`${item.bgLight} rounded-xl p-4 text-center hover:shadow-md transition-shadow`}>
                    <div className={`w-6 h-6 ${item.color} rounded-full mx-auto mb-3`}></div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{item.count}</div>
                    <div className={`text-sm font-medium ${item.textColor}`}>{item.status}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round((item.count / stats.totalBeds) * 100)}% of total
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Occupancy Rate */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Occupancy Rate</span>
                  <span className="text-sm font-bold text-gray-900">{stats.occupancyRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stats.occupancyRate > 80 ? 'bg-red-500' : stats.occupancyRate > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${stats.occupancyRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Bed
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 rounded-lg transition-all duration-200 hover:bg-blue-50">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register Patient
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 hover:border-green-300 text-gray-700 rounded-lg transition-all duration-200 hover:bg-green-50">
                  <Search className="h-4 w-4 mr-2" />
                  Search Beds
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 rounded-lg transition-all duration-200 hover:bg-purple-50">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </button>
              </div>
            </div>

            {/* Urgent Notifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Urgent Alerts</h3>
              <div className="space-y-3">
                {urgentNotifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'urgent' ? 'bg-red-50 border-red-400' : 
                    notification.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="text-sm font-medium text-gray-900">{notification.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Patients</h3>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <Filter className="w-4 h-4 mr-2 inline" />
                Filter
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                <Download className="w-4 h-4 mr-2 inline" />
                Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Bed & Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Update
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(patient.priority)}`}></div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{patient.name}</div>
                          <div className="text-xs text-gray-500">Age: {patient.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{patient.bedNumber}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{patient.condition}</div>
                      <div className="text-xs text-gray-500">
                        Admitted: {patient.admissionDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{patient.doctor}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{patient.lastVitals}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-gray-800 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.message}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;