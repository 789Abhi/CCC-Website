// GoogleAuthButton.jsx - Google OAuth login button component
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const GoogleAuthButton = ({ onSuccess, onError, text = "Continue with Google", className = "" }) => {
  const { loginWithGoogle } = useAuth();
  const googleButtonRef = useRef(null);
  const googleScriptRef = useRef(null);

  useEffect(() => {
    // Load Google Identity Services script
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleAuth();
        return;
      }

      if (googleScriptRef.current) {
        return; // Script already loading
      }

      googleScriptRef.current = document.createElement('script');
      googleScriptRef.current.src = 'https://accounts.google.com/gsi/client';
      googleScriptRef.current.async = true;
      googleScriptRef.current.defer = true;
      googleScriptRef.current.onload = initializeGoogleAuth;
      document.head.appendChild(googleScriptRef.current);
    };

    const initializeGoogleAuth = () => {
      if (!window.google || !googleButtonRef.current) {
        return;
      }

      // Get client ID from environment variables or use fallback
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '554881336153-8vli7m4l9ba74ikks27ct62qcg27vhjv.apps.googleusercontent.com';
      
      console.log('🔍 Environment variables:', {
        VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        clientId: clientId,
        allEnv: import.meta.env
      });
      
      if (!clientId) {
        console.error('❌ Google Client ID not configured');
        if (onError) {
          onError('Google authentication is not configured. Please contact support.');
        }
        return;
      }
      
      console.log('✅ Google Client ID loaded:', clientId);

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 300,
        });
      } catch (error) {
        console.error('❌ Google Auth initialization error:', error);
        if (onError) {
          onError('Failed to initialize Google authentication');
        }
      }
    };

    const handleCredentialResponse = async (response) => {
      try {
        console.log('🔐 Google credential received');
        
        const result = await loginWithGoogle(response.credential);
        
        if (result.success) {
          console.log('✅ Google authentication successful');
          if (onSuccess) {
            onSuccess(result.user);
          }
        } else {
          console.error('❌ Google authentication failed:', result.message);
          if (onError) {
            onError(result.message);
          }
        }
      } catch (error) {
        console.error('❌ Google authentication error:', error);
        if (onError) {
          onError('Google authentication failed');
        }
      }
    };

    loadGoogleScript();

    // Cleanup
    return () => {
      if (googleScriptRef.current) {
        document.head.removeChild(googleScriptRef.current);
        googleScriptRef.current = null;
      }
    };
  }, [loginWithGoogle, onSuccess, onError]);

  return (
    <div className={`google-auth-container ${className}`}>
      <div 
        ref={googleButtonRef}
        className="google-signin-button"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default GoogleAuthButton;
