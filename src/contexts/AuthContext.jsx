// AuthContext.jsx - Authentication context for public website
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// API base URL - Update this to your backend API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://custom-craft-component-backend-jf2lgn95v-789abhis-projects.vercel.app/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') === 'true');

  // Set up axios interceptor for token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            console.log('Auth check failed - removing invalid token');
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          console.error('Auth check error details:', error.response?.data);
          console.error('Auth check error status:', error.response?.status);
          
          // If token is invalid (401), remove it
          if (error.response?.status === 401) {
            console.log('Token is invalid or expired - removing from storage');
            localStorage.removeItem('token');
            setToken(null);
          }
        }
      }
      setLoading(false);
    };

    // Only check auth once on mount, not on every token change
    if (loading) {
      checkAuth();
    }
  }, []); // Remove token dependency to prevent multiple calls

  const login = async (email, password, rememberMeFlag = false) => {
    try {
      const response = await axios.post('/auth/login', { 
        email, 
        password, 
        rememberMe: rememberMeFlag 
      });
      
      if (response.data.success) {
        const { token: newToken, user: userData } = response.data;
        
        // Store token and remember me preference
        localStorage.setItem('token', newToken);
        localStorage.setItem('rememberMe', rememberMeFlag.toString());
        
        setToken(newToken);
        setUser(userData);
        setRememberMe(rememberMeFlag);
        
        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('❌ Frontend login error:', error);
      
      // Handle rate limiting specifically
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 60;
        return { 
          success: false, 
          message: `Too many login attempts. Please wait ${retryAfter} seconds before trying again.` 
        };
      }
      
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  const loginWithGoogle = async (credential) => {
    try {
      console.log('🔐 Frontend Google OAuth attempt');
      
      const response = await axios.post('/auth/google', { 
        credential 
      });
      
      if (response.data.success) {
        const { token: newToken, user: userData } = response.data;
        
        // Store token and remember me preference (Google OAuth always remembers)
        localStorage.setItem('token', newToken);
        localStorage.setItem('rememberMe', 'true');
        
        setToken(newToken);
        setUser(userData);
        setRememberMe(true);
        
        console.log('✅ Google OAuth successful:', userData.email);
        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('❌ Frontend Google OAuth error:', error);
      
      // Handle rate limiting specifically
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 60;
        return { 
          success: false, 
          message: `Too many requests. Please wait ${retryAfter} seconds before trying again.` 
        };
      }
      
      const message = error.response?.data?.message || 'Google authentication failed';
      return { success: false, message };
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      console.log('📝 Frontend registration attempt:', { firstName, lastName, email, passwordLength: password.length });
      
      const response = await axios.post('/auth/register', {
        firstName,
        lastName,
        email,
        password
      });
      
      console.log('📝 Registration response:', response.data);
      
      if (response.data.success) {
        const { token: newToken, user: userData } = response.data;
        
        // Store token and user data after successful registration
        localStorage.setItem('token', newToken);
        localStorage.setItem('rememberMe', 'false'); // Default to false for new registrations
        
        setToken(newToken);
        setUser(userData);
        setRememberMe(false);
        
        return { success: true, message: 'Registration successful!', user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('❌ Frontend registration error:', error);
      console.error('❌ Error response:', error.response?.data);
      
      // Handle rate limiting specifically
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 60;
        return { 
          success: false, 
          message: `Too many registration attempts. Please wait ${retryAfter} seconds before trying again.` 
        };
      }
      
      let message = 'Registration failed';
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 400) {
        message = 'Please check your information and try again';
      } else if (error.response?.status === 409) {
        message = 'An account with this email already exists. Please log in instead.';
      }
      
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    setToken(null);
    setUser(null);
    setRememberMe(false);
  };

  const refreshUser = async (forceRefresh = false) => {
    if (token) {
      try {
        // Add cache-busting parameter if force refresh is requested
        const url = forceRefresh ? `/auth/me?t=${Date.now()}` : '/auth/me';
        const response = await axios.get(url);
        if (response.data.success) {
          console.log('🔍 Frontend received user data:', response.data.user);
          console.log('🔍 User subscription:', response.data.user.subscription);
          setUser(response.data.user);
          return { success: true, user: response.data.user };
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
        
        // If token is invalid, remove it
        if (error.response?.status === 401) {
          console.log('Token expired during refresh - logging out');
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
        
        return { success: false, message: 'Failed to refresh user data' };
      }
    }
    return { success: false, message: 'No token available' };
  };

  // Add request throttling to prevent excessive API calls
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const REQUEST_THROTTLE_MS = 1000; // Minimum 1 second between requests

  const throttledRequest = async (requestFn) => {
    const now = Date.now();
    if (now - lastRequestTime < REQUEST_THROTTLE_MS) {
      console.log('Request throttled - too many requests');
      return { success: false, message: 'Request throttled - please wait' };
    }
    
    setLastRequestTime(now);
    return await requestFn();
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    refreshUser,
    setUser,
    loading,
    rememberMe,
    setRememberMe,
    isAuthenticated: !!user,
    throttledRequest
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
