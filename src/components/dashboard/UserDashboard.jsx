// UserDashboard.jsx - User dashboard for public website
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const UserDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (user && user.id) {
      fetchLicenses();
    }
  }, [user]);

  const fetchLicenses = async () => {
    try {
      const response = await axios.get(`/licenses/user/${user.id}`);
      if (response.data.success) {
        setLicenses(response.data.licenses);
      }
    } catch (error) {
      setError('Failed to fetch licenses');
      console.error('Error fetching licenses:', error);
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border border-green-500/30';
      case 'expired': return 'text-red-400 bg-red-500/20 border border-red-500/30';
      case 'revoked': return 'text-n-3 bg-n-6 border border-n-5';
      default: return 'text-n-3 bg-n-6 border border-n-5';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'basic': return 'text-blue-400 bg-blue-500/20 border border-blue-500/30';
      case 'pro': return 'text-purple-400 bg-purple-500/20 border border-purple-500/30';
      case 'max': return 'text-yellow-400 bg-yellow-500/20 border border-yellow-500/30';
      default: return 'text-n-3 bg-n-6 border border-n-5';
    }
  };

  // Show loading state while auth is loading or user is not available
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-n-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-n-8 via-n-7 to-n-8"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-color-1 mx-auto mb-4"></div>
            <p className="text-n-2">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-n-8 via-n-7 to-n-8"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 py-[200px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-n-1 mb-4">
              Welcome back, {user.firstName || user.email}! 👋
            </h1>
            <p className="text-n-2 text-lg">
              Manage your Custom Craft Component licenses and subscription
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* User Info Card */}
          <div className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-2xl p-8 mb-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-n-1 mb-6">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-n-2 mb-2">Email</label>
                <p className="text-n-1 font-medium">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-n-2 mb-2">Name</label>
                <p className="text-n-1 font-medium">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.firstName || 'Not provided'
                  }
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-n-2 mb-2">Subscription Plan</label>
                <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${getPlanColor(user.subscription?.plan || 'basic')}`}>
                  {(user.subscription?.plan || 'basic').toUpperCase()}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-n-2 mb-2">Account Status</label>
                <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(user.subscription?.status || 'active')}`}>
                  {(user.subscription?.status || 'active').toUpperCase()}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-n-2 mb-2">Member Since</label>
                <p className="text-n-1 font-medium">{formatDate(user.createdAt)}</p>
              </div>
              <div className="flex items-end">
                <button
                  onClick={logout}
                  className="bg-color-1 text-n-8 px-6 py-2 rounded-lg hover:bg-color-1/80 transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Licenses Card */}
          <div className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-2xl shadow-2xl">
            <div className="px-8 py-6 border-b border-n-6">
              <h2 className="text-2xl font-semibold text-n-1">Your Licenses</h2>
              <p className="text-n-2 mt-2">Your license keys are automatically generated after successful payment</p>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-color-1 mx-auto"></div>
                <p className="mt-4 text-n-2">Loading licenses...</p>
              </div>
            ) : licenses.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🔑</div>
                <p className="text-n-2 text-lg mb-4">No licenses found yet</p>
                <p className="text-n-3">Your license will be automatically generated after successful payment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-n-7/50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-medium text-n-2 uppercase tracking-wider">
                        License Key
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-n-2 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-n-2 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-n-2 uppercase tracking-wider">
                        Usage
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-n-2 uppercase tracking-wider">
                        Expires
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-n-2 uppercase tracking-wider">
                        Last Used
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-n-6">
                    {licenses.map((license) => (
                      <tr key={license.id} className="hover:bg-n-7/30 transition-colors">
                        <td className="px-8 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <code className="text-sm font-mono text-color-1 bg-n-7 px-3 py-1 rounded">
                              {license.licenseKey}
                            </code>
                          </div>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPlanColor(license.plan)}`}>
                            {license.plan.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                            {license.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-n-1">
                          <span className="font-medium">{license.usageCount}</span>
                          <span className="text-n-3"> / {license.maxUsage}</span>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-n-1">
                          {formatDate(license.expiresAt)}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-n-1">
                          {license.lastUsed ? formatDate(license.lastUsed) : 'Never'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserDashboard;
