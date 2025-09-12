// Payment button component for Stripe integration
import React, { useState } from 'react';
import { stripeService } from '../../services/stripeService';
import { useAuth } from '../../contexts/AuthContext';

const PaymentButton = ({ plan, price, className = '', children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      setError('Please log in to make a purchase');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create checkout session
      const sessionId = await stripeService.createCheckoutSession(plan, user.id);
      
      // Redirect to Stripe checkout
      await stripeService.redirectToCheckout(sessionId);
    } catch (error) {
      setError(error.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          children || `Buy ${plan} - ${price}`
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
