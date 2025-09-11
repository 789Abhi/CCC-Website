// PricingPlans.jsx - Pricing component for public website
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const PricingPlans = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 29.99,
      description: 'Perfect for small projects',
      features: [
        '1000 AI generations',
        'Basic support',
        '1 year license',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 99.99,
      description: 'Great for growing businesses',
      features: [
        '10000 AI generations',
        'Priority support',
        '1 year license',
        '24/7 email support',
        'Advanced features'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 299.99,
      description: 'For large organizations',
      features: [
        '100000 AI generations',
        '24/7 support',
        '1 year license',
        'Phone support',
        'Custom integrations',
        'Dedicated account manager'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = async (plan) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    setSelectedPlan(plan.id);

    try {
      // Create payment intent
      const response = await axios.post('/payments/create-intent', { plan: plan.id });
      
      if (response.data.success) {
        // Here you would integrate with Stripe Checkout
        // For now, we'll just generate a license directly
        const licenseResponse = await axios.post('/licenses/generate', { plan: plan.id });
        
        if (licenseResponse.data.success) {
          alert(`License generated successfully for ${plan.name}!`);
          // Redirect to dashboard
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Error selecting plan:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get access to Custom Craft Component with AI-powered component generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-indigo-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/year</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={loading && selectedPlan === plan.id}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading && selectedPlan === plan.id ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  isAuthenticated ? 'Get Started' : 'Sign Up to Get Started'
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
