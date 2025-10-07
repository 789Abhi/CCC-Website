// UserDashboard.jsx - User dashboard for public website
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { stripeService } from '../../services/stripeService';
import Header from '../Header';
import Footer from '../Footer';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UserDashboard Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-n-8 relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
              <p className="text-n-2 mb-4">The dashboard encountered an error.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-color-1 text-n-8 px-6 py-2 rounded-lg hover:bg-color-1/80 transition-colors font-semibold"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const UserDashboard = () => {
  const { user, logout, loading: authLoading, refreshUser, setUser } = useAuth();
  const { showSuccess } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [planSynced, setPlanSynced] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check if user returned from successful payment
    const urlParams = new URLSearchParams(location.search);
    const paymentStatus = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');
    
    console.log('🔍 UserDashboard useEffect:', { 
      user: user ? { id: user.id, email: user.email } : null, 
      paymentStatus, 
      sessionId 
    });
    
    if (paymentStatus === 'success' && sessionId && user) {
      processPayment(sessionId);
    }
  }, [user?.id, location.search]); // Only depend on user.id and location.search, not entire user object

  // Separate effect for fetching licenses when user data is available
  useEffect(() => {
    if (user && user.id) {
      console.log('🔍 UserDashboard - User data available, checking if should fetch licenses...');
      console.log('🔍 User subscription plan:', user.subscription?.plan);
      
      // Only fetch licenses for paid users (not free users)
      if (user.subscription?.plan && user.subscription.plan !== 'free') {
        console.log('🔍 UserDashboard - Paid user detected, fetching licenses...');
        fetchLicenses();
      } else {
        console.log('🔍 UserDashboard - Free user detected, skipping license fetch');
        setLoading(false);
      }
    }
  }, [user?.id, user?.subscription?.plan]); // Depend on user.id and subscription plan

  const fetchLicenses = async () => {
    if (!user?.id) {
      console.log('No user ID available, skipping license fetch');
      setLoading(false);
      return;
    }

    console.log('🚀 Starting fetchLicenses for user:', user.id);
    setLoading(true); // Ensure loading state is set

    try {
      console.log('🔍 Fetching licenses for user:', user.id);
      console.log('🔍 User subscription data:', user.subscription);
      console.log('🔍 Making API call to:', `/licenses/user/${user.id}`);
      
      const response = await axios.get(`/licenses/user/${user.id}`);
      console.log('✅ Licenses response:', response.data);
      console.log('✅ Number of licenses found:', response.data.licenses?.length || 0);
      if (response.data.success) {
        setLicenses(response.data.licenses);
        
        // If user has a paid plan but no licenses, generate one automatically
        if (response.data.licenses.length === 0 && user.subscription?.plan && user.subscription.plan !== 'free') {
          console.log('🔄 No licenses found for paid user, generating license automatically...');
          try {
            const generateResponse = await axios.post('/licenses/generate', {
              isPro: user.subscription.plan === 'pro' || user.subscription.plan === 'max'
            });
            console.log('✅ License generated:', generateResponse.data);
            // Refresh licenses after generation by calling the API again
            const refreshResponse = await axios.get(`/licenses/user/${user.id}`);
            if (refreshResponse.data.success) {
              setLicenses(refreshResponse.data.licenses);
            }
          } catch (generateError) {
            console.error('❌ Failed to generate license:', generateError);
          }
        }
        
        // Check if there's a mismatch between license plan and user subscription plan
        if (response.data.licenses.length > 0) {
          const latestLicense = response.data.licenses[0];
          const licensePlan = latestLicense.plan;
          const userPlan = user.subscription?.plan;
          
          console.log('🔍 Plan comparison:', { licensePlan, userPlan, match: licensePlan === userPlan });
          
          if (licensePlan && licensePlan !== userPlan && !planSynced) {
            console.log('⚠️ Plan mismatch detected. License plan:', licensePlan, 'User plan:', userPlan);
            console.log('🔄 Using license plan as source of truth...');
            
            // Since the sync endpoint is not available, we'll use the license plan as the source of truth
            // Update the user object locally to reflect the correct plan
            const updatedUser = {
              ...user,
              subscription: {
                ...user.subscription,
                plan: licensePlan,
                isPro: licensePlan === 'basic' || licensePlan === 'pro' || licensePlan === 'max'
              }
            };
            
            // Update the user in the context
            setUser(updatedUser);
            setPlanSynced(true); // Prevent multiple syncs
            console.log('✅ User plan updated locally to:', licensePlan);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error fetching licenses:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      
      if (error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
        // Clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        setError('Access denied. You may not have permission to view licenses.');
      } else if (error.response?.status === 429) {
        setError('Too many requests. Please wait a moment and try again.');
      } else {
        setError('Failed to fetch licenses. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualSync = async () => {
    try {
      setProcessingPayment(true);
      console.log('🔄 Manual sync requested by user...');
      
      // Call sync endpoint to ensure backend data is correct
      let syncData = null;
      try {
        const syncResponse = await axios.post('/stripe/sync-user-subscription', {
          userId: user.id
        });
        console.log('✅ User subscription synced:', syncResponse.data);
        syncData = syncResponse.data;
        showSuccess('Subscription synced successfully!');
      } catch (syncError) {
        console.error('❌ Error syncing user subscription:', syncError);
        setError('Failed to sync subscription. Please try again.');
        return;
      }
      
      // Refresh user data
      const refreshResult = await refreshUser(true);
      let refreshedUser = refreshResult?.user;
      
      // If sync was successful but refresh didn't pick up the changes, update locally
      if (syncData && syncData.success && refreshedUser) {
        const expectedPlan = syncData.plan;
        const expectedIsPro = syncData.isPro;
        
        if (refreshedUser.subscription?.plan !== expectedPlan) {
          console.log('⚠️ Plan mismatch detected. Updating user data locally...');
          
          // Update user data locally
          const updatedUser = {
            ...refreshedUser,
            subscription: {
              ...refreshedUser.subscription,
              plan: expectedPlan,
              isPro: expectedIsPro
            }
          };
          
          setUser(updatedUser);
          console.log('✅ User data updated locally to:', expectedPlan);
          showSuccess(`Subscription updated to ${expectedPlan.toUpperCase()} plan!`);
        } else {
          showSuccess('Subscription is already up to date!');
        }
      }
      
      // Fetch licenses if user is on a paid plan
      if (refreshedUser?.subscription?.plan && refreshedUser.subscription.plan !== 'free') {
        await fetchLicenses();
      }
      
    } catch (error) {
      console.error('❌ Error in manual sync:', error);
      setError('Failed to sync subscription. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const processPayment = async (sessionId) => {
    try {
      setProcessingPayment(true);
      console.log('🔄 Processing payment for session:', sessionId);
      
      const result = await stripeService.processPayment(sessionId);
      
      if (result.success) {
        console.log('✅ Payment processed successfully');
        // Refresh user data and licenses instead of full page reload
        try {
          // Add a small delay to ensure backend has processed the payment
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // First, sync the user subscription to ensure backend data is correct
          console.log('🔄 Syncing user subscription after payment...');
          let syncData = null;
          try {
            const syncResponse = await axios.post('/stripe/sync-user-subscription', {
              userId: user.id
            });
            console.log('✅ User subscription synced:', syncResponse.data);
            syncData = syncResponse.data;
          } catch (syncError) {
            console.error('❌ Error syncing user subscription:', syncError);
            // Continue with refresh even if sync fails
          }
          
          const refreshResult = await refreshUser(true); // Force refresh with cache busting
          
          // Check the refreshed user data to determine if we should fetch licenses
          let refreshedUser = refreshResult?.user;
          console.log('🔍 Refreshed user data:', refreshedUser);
          console.log('🔍 Refreshed user subscription:', refreshedUser?.subscription);
          
          // If sync was successful but refresh didn't pick up the changes, update locally
          if (syncData && syncData.success && refreshedUser) {
            const expectedPlan = syncData.plan;
            const expectedIsPro = syncData.isPro;
            
            if (refreshedUser.subscription?.plan !== expectedPlan) {
              console.log('⚠️ Plan mismatch detected. Updating user data locally...');
              console.log('🔍 Expected plan:', expectedPlan, 'Actual plan:', refreshedUser.subscription?.plan);
              
              // Update user data locally
              const updatedUser = {
                ...refreshedUser,
                subscription: {
                  ...refreshedUser.subscription,
                  plan: expectedPlan,
                  isPro: expectedIsPro
                }
              };
              
              setUser(updatedUser);
              refreshedUser = updatedUser;
              console.log('✅ User data updated locally to:', expectedPlan);
            }
          }
          
          if (refreshedUser?.subscription?.plan && refreshedUser.subscription.plan !== 'free') {
            console.log('🔍 User is now on paid plan, fetching licenses...');
            await fetchLicenses();
            console.log('✅ User data and licenses refreshed');
          } else {
            console.log('🔍 User is still on free plan, no license fetch needed');
            console.log('✅ User data refreshed (no license fetch needed for free plan)');
          }
        } catch (refreshError) {
          console.error('❌ Error refreshing data:', refreshError);
          // Fallback to page reload if refresh fails
          window.location.reload();
        }
      } else {
        setError('Failed to process payment: ' + result.message);
      }
    } catch (error) {
      console.error('❌ Error processing payment:', error);
      setError('Failed to process payment. Please contact support.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid Date';
    }
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
            {!user && !authLoading && (
              <p className="text-n-3 text-sm mt-2">No user data available</p>
            )}
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

      {/* Payment Processing Indicator */}
      {processingPayment && (
        <div className="relative z-20 bg-gradient-to-r from-color-1 to-color-2 text-n-8 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-n-8 mr-3"></div>
              <span className="font-semibold">Processing your payment and upgrading your account...</span>
            </div>
          </div>
        </div>
      )}

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
                {console.log('🔍 UserDashboard - User subscription:', user?.subscription)}
                {console.log('🔍 UserDashboard - User subscription plan:', user?.subscription?.plan)}
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
              <div className="flex items-end gap-3">
                {(user.subscription?.plan === 'free' || user.subscription?.plan === 'basic') && (
                  <button
                    onClick={() => navigate('/pricing')}
                    className="bg-gradient-to-r from-color-1 to-color-2 text-n-8 px-6 py-2 rounded-lg hover:from-color-1/90 hover:to-color-2/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    {user.subscription?.plan === 'free' ? 'Purchase Plan' : 'Upgrade Plan'}
                  </button>
                )}
                <button
                  onClick={handleManualSync}
                  disabled={processingPayment}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                >
                  {processingPayment ? 'Syncing...' : 'Sync Subscription'}
                </button>
                <button
                  onClick={() => {
                    logout();
                    showSuccess('You have been successfully logged out.');
                    navigate('/');
                  }}
                  className="bg-color-1 text-n-8 px-6 py-2 rounded-lg hover:bg-color-1/80 transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Licenses Card - Only show for paid users */}
          {(user.subscription?.plan !== 'free' && user.subscription?.plan !== 'basic') && (
            <div className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-2xl shadow-2xl">
              <div className="px-8 py-6 border-b border-n-6">
                <h2 className="text-2xl font-semibold text-n-1">Your Licenses</h2>
                <p className="text-n-2 mt-2">
                  {licenses.length === 0 
                    ? "Licenses are generated when you purchase a paid plan"
                    : "Your license keys for paid plans"
                  }
                </p>
              </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-color-1 mx-auto"></div>
                <p className="mt-4 text-n-2">Loading licenses...</p>
              </div>
            ) : licenses.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-n-2 text-lg mb-4">Welcome to Custom Craft Components!</p>
                <p className="text-n-3 mb-6">You're currently on the FREE plan and can access basic features.</p>
                <div className="bg-n-7/50 rounded-lg p-4 mb-6">
                  <h3 className="text-n-1 font-semibold mb-2">Free Plan Features:</h3>
                  <ul className="text-n-2 text-sm space-y-1">
                    <li>• Access to basic component templates</li>
                    <li>• Manual component creation</li>
                    <li>• Community support</li>
                  </ul>
                </div>
                <p className="text-n-3 text-sm mb-6">Upgrade to a paid plan to get AI-powered component generation and premium features!</p>
                
                {/* Upgrade Plan Button */}
                <button
                  onClick={() => navigate('/pricing')}
                  className="bg-gradient-to-r from-color-1 to-color-2 text-n-8 px-8 py-3 rounded-lg hover:from-color-1/90 hover:to-color-2/90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🚀 Upgrade Your Plan
                </button>
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
                              {license.licenseKey || 'N/A'}
                            </code>
                          </div>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPlanColor(license.plan || 'basic')}`}>
                            {(license.plan || 'basic').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status || 'active')}`}>
                            {(license.status || 'active').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-n-1">
                          <span className="font-medium">{license.usageCount || 0}</span>
                          <span className="text-n-3"> / {license.maxUsage || 0}</span>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-n-1">
                          {license.expiresAt ? formatDate(license.expiresAt) : 'Never'}
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
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Wrap UserDashboard with ErrorBoundary
const UserDashboardWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <UserDashboard />
    </ErrorBoundary>
  );
};

export default UserDashboardWithErrorBoundary;
  