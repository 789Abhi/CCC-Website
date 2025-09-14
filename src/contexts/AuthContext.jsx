// AuthContext.jsx - Authentication context for public website
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// API base URL - Update this to your backend API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://custom-craft-component-backend.vercel.app/api';

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
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          console.error('Auth check error details:', error.response?.data);
          console.error('Auth check error status:', error.response?.status);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

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
      const message = error.response?.data?.message || 'Login failed';
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

  const refreshUser = async () => {
    if (token) {
      try {
        const response = await axios.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
          return { success: true, user: response.data.user };
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
        return { success: false, message: 'Failed to refresh user data' };
      }
    }
    return { success: false, message: 'No token available' };
  };

  const value = {
    user,
    login,
    register,
    logout,
    refreshUser,
    loading,
    rememberMe,
    setRememberMe,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
