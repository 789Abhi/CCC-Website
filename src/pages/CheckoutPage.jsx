import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripeService } from '../services/stripeService';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://custom-craft-component-backend.vercel.app/api';

const CheckoutForm = ({ plan, isYearly, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Address form state
  const [billingAddress, setBillingAddress] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const handleAddressChange = (field, value) => {
    setBillingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment intent with billing address
      const response = await axios.post(`${API_BASE_URL}/stripe/create-payment-intent`, {
        plan: plan.id,
        isYearly: isYearly,
        userId: user.id,
        billingAddress: billingAddress
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create payment intent');
      }

      const { clientSecret } = response.data;

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${billingAddress.firstName} ${billingAddress.lastName}`,
            email: billingAddress.email,
            address: {
              line1: billingAddress.address,
              city: billingAddress.city,
              state: billingAddress.state,
              postal_code: billingAddress.zipCode,
              country: billingAddress.country,
            },
          },
        }
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        setLoading(false);
        
        // Manually process the payment to save to database
        try {
          console.log('🔄 Processing payment intent:', paymentIntent.id);
          const processResponse = await axios.post(`${API_BASE_URL}/stripe/process-payment-intent`, {
            paymentIntentId: paymentIntent.id
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (processResponse.data.success) {
            console.log('✅ Payment processed successfully:', processResponse.data);
          } else {
            console.error('❌ Payment processing failed:', processResponse.data.message);
          }
        } catch (processError) {
          console.error('❌ Error processing payment:', processError);
          // Don't show error to user as payment was successful
        }
        
        // Show success popup
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
          <p className="text-green-300">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <div className="bg-n-7/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Billing Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-n-3 mb-2">
              First Name *
            </label>
            <input
              type="text"
              required
              value={billingAddress.firstName}
              onChange={(e) => handleAddressChange('firstName', e.target.value)}
              className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
              placeholder="Enter your first name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-n-3 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={billingAddress.lastName}
              onChange={(e) => handleAddressChange('lastName', e.target.value)}
              className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-n-3 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={billingAddress.email}
            onChange={(e) => handleAddressChange('email', e.target.value)}
            className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
            placeholder="Enter your email address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-n-3 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            required
            value={billingAddress.address}
            onChange={(e) => handleAddressChange('address', e.target.value)}
            className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
            placeholder="Enter your street address"
          />
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-n-3 mb-2">
              City *
            </label>
            <input
              type="text"
              required
              value={billingAddress.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
              placeholder="Enter your city"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-n-3 mb-2">
              State/Province *
            </label>
            <input
              type="text"
              required
              value={billingAddress.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
              placeholder="Enter your state"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-n-3 mb-2">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              required
              value={billingAddress.zipCode}
              onChange={(e) => handleAddressChange('zipCode', e.target.value)}
              className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
              placeholder="Enter your ZIP code"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-n-3 mb-2">
            Country *
          </label>
          <select
            required
            value={billingAddress.country}
            onChange={(e) => handleAddressChange('country', e.target.value)}
            className="w-full bg-n-8 border border-n-6 rounded-lg px-4 py-3 text-white focus:border-color-1 focus:ring-1 focus:ring-color-1/20 transition-all duration-300"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="BR">Brazil</option>
            <option value="MX">Mexico</option>
          </select>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-n-7/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Details</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-n-3 mb-2">
              Card Information *
            </label>
            <div className="bg-n-8 border border-n-6 rounded-lg p-4 transition-all duration-300 focus-within:border-color-1 focus-within:ring-1 focus-within:ring-color-1/20">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                    },
                    invalid: {
                      color: '#ef4444',
                      iconColor: '#ef4444',
                    },
                    complete: {
                      color: '#10b981',
                      iconColor: '#10b981',
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>
          
          {/* Security Badge */}
          <div className="bg-n-8 border border-n-6 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-color-1 to-color-2 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Powered by Stripe</p>
                <p className="text-n-3 text-sm">Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-color-1 to-color-2 hover:from-color-1/90 hover:to-color-2/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay ${isYearly ? plan.yearlyPrice : plan.monthlyPrice} ${isYearly ? '/year' : '/month'}`
        )}
      </button>
    </form>
  );
};

const PaymentSuccessPopup = ({ isOpen, onClose, plan }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoToDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleCloseAndNavigate = () => {
    onClose();
    // Navigate to dashboard after a short delay to ensure popup closes smoothly
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Popup */}
      <div className="relative bg-gradient-to-br from-n-8 via-n-7 to-n-6 border border-n-5 rounded-2xl p-8 max-w-md w-full mx-4 transform animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Payment Successful! 🎉
          </h2>
          <p className="text-n-3 mb-4">
            Welcome to <span className="text-color-1 font-semibold">{plan?.name || 'your new plan'}</span>
          </p>
          <div className="bg-n-7/50 backdrop-blur-sm border border-n-6 rounded-lg p-4">
            <p className="text-sm text-n-3">
              Your license key has been generated and you can now access all premium features.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCloseAndNavigate}
            className="w-full bg-gradient-to-r from-color-1 to-color-2 hover:from-color-1/90 hover:to-color-2/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </button>
          <button
            onClick={onClose}
            className="w-full bg-n-6 hover:bg-n-5 text-n-2 font-medium py-3 px-6 rounded-xl transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Plan definitions (matching HomePricing)
  const plans = [
    {
      id: 'basic',
      name: 'Basic / Personal',
      monthlyPrice: '$3.25',
      yearlyPrice: '$39',
      description: 'Perfect for individual developers',
      features: [
        '1 website',
        'Unlimited Manual Component',
        'Unlimited Manual Fields',
        '50 component generations Through AI',
        'Basic Support'
      ]   
    },
    {
      id: 'pro',
      name: 'Pro / Freelancer',
      monthlyPrice: '$11.99',
      yearlyPrice: '$139',
      description: 'Best for small teams',
      features: [
        '15 Websites',
        'Unlimited Manual Component',
        'Unlimited Manual Fields',
        '800 component generations Through AI',
        'Priority Support',
        'All Pro Features Included'
      ]
    },
    {
      id: 'max',
      name: 'Max / Agency',
      monthlyPrice: '$19.99',
      yearlyPrice: '$239',
      description: 'For large organizations',
      features: [
        'Unlimited Website',
        'Unlimited Manual Component',
        'Unlimited Manual Fields',
        '3500 component generations Through AI',
        'Premium Support',
        'All Pro Features Included'
      ]
    }
  ];

  useEffect(() => {
    // Check for payment success parameters
    const urlParams = new URLSearchParams(location.search);
    const paymentSuccess = urlParams.get('payment') === 'success';
    const sessionId = urlParams.get('session_id');
    const planId = urlParams.get('plan');

    if (paymentSuccess && sessionId && planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
        setShowSuccessPopup(true);
        // Clean up URL
        navigate('/checkout', { replace: true });
      }
    }

    // Redirect if not logged in
    if (!user) {
      navigate('/login');
    }
  }, [location, navigate, user]);

  // Get plan from URL params or default to basic
  const planId = new URLSearchParams(location.search).get('plan') || 'basic';
  const isYearly = new URLSearchParams(location.search).get('yearly') === 'true';
  const plan = plans.find(p => p.id === planId) || plans[0];

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-n-8 via-n-7 to-n-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-color-1/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent"
            >
              Custom Craft Components
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="text-n-3 hover:text-white transition-colors"
            >
              ← Back to Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Your Purchase
            </h1>
            <p className="text-n-3 text-lg">
              Secure payment powered by Stripe
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Plan Summary */}
            <div className="space-y-6">
              <div className="bg-n-7/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-color-1 to-color-2 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {plan.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {plan.name} ({isYearly ? 'Yearly' : 'Monthly'})
                      </h3>
                      <p className="text-n-3 text-sm">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </p>
                      <p className="text-n-3 text-sm">
                        {isYearly ? '/year' : '/month'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-n-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-white">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div className="bg-n-7/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-color-1 to-color-2 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-n-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-n-7/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
              <Elements stripe={stripePromise}>
                <CheckoutForm 
                  plan={plan} 
                  isYearly={isYearly}
                  onSuccess={() => {
                    setSelectedPlan(plan);
                    setShowSuccessPopup(true);
                  }}
                />
              </Elements>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-n-3 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Success Popup */}
      <PaymentSuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        plan={selectedPlan}
      />
    </div>
  );
};

export default CheckoutPage;
