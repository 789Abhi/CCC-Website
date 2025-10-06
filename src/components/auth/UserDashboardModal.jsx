import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import Button from '../Button';

const UserDashboardModal = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { showSuccess } = useModal();
  const [licenses, setLicenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserLicenses();
    }
  }, [isOpen, user]);

  const fetchUserLicenses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/licenses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLicenses(data.licenses || []);
      }
    } catch (error) {
      console.error('Failed to fetch licenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    showSuccess('You have been successfully logged out.');
    onClose();
  };

  const copyLicenseKey = async (licenseKey) => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      showSuccess('License key copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy license key:', error);
      showSuccess('Failed to copy license key. Please copy manually.');
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="text-center">
        <div className="w-16 h-16 bg-color-1/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-color-1">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-n-1">
          Welcome, {user.firstName} {user.lastName}
        </h3>
        <p className="text-n-2 text-sm">{user.email}</p>
      </div>

      {/* Subscription Info */}
      <div className="bg-n-7 border border-n-6 rounded-lg p-4">
        <h4 className="font-semibold text-n-1 mb-2">Subscription</h4>
        <div className="flex justify-between items-center">
          <span className="text-n-2">Plan:</span>
          <span className="text-color-1 font-medium capitalize">
            {user.subscription?.plan || 'Basic'}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-n-2">Status:</span>
          <span className={`font-medium ${
            user.subscription?.status === 'active' ? 'text-green-400' : 'text-red-400'
          }`}>
            {user.subscription?.status || 'Active'}
          </span>
        </div>
      </div>

      {/* Licenses */}
      <div>
        <h4 className="font-semibold text-n-1 mb-3">Your License Keys</h4>
        {isLoading ? (
          <div className="text-center py-4">
            <div className="text-n-2">Loading licenses...</div>
          </div>
        ) : licenses.length > 0 ? (
          <div className="space-y-3">
            {licenses.map((license) => (
              <div key={license._id} className="bg-n-7 border border-n-6 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-n-1">{license.plan} License</div>
                    <div className="text-sm text-n-2">
                      Status: <span className={`${
                        license.status === 'active' ? 'text-green-400' : 'text-red-400'
                      }`}>{license.status}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyLicenseKey(license.licenseKey)}
                    className="text-color-1 hover:text-color-1/80 text-sm"
                  >
                    Copy Key
                  </button>
                </div>
                <div className="bg-n-8 border border-n-6 rounded p-2 font-mono text-sm text-n-1 break-all">
                  {license.licenseKey}
                </div>
                <div className="text-xs text-n-2 mt-2">
                  Usage: {license.usageCount}/{license.maxUsage} | 
                  Expires: {new Date(license.expiresAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-n-7 border border-n-6 rounded-lg">
            <div className="text-n-2 mb-4">No license keys found</div>
            <Button href="/pricing" className="text-sm">
              Get Your License
            </Button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button href="/pricing" className="flex-1" white>
          {user.subscription?.plan === 'free' ? 'Purchase Plan' : 'Upgrade Plan'}
        </Button>
        <Button onClick={handleLogout} className="flex-1">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserDashboardModal;
