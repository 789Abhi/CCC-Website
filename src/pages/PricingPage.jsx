import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { stripeService } from '../services/stripeService';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePayment = async (planId, buttonConfig) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // If it's the Active button, navigate to dashboard
    if (buttonConfig.text === 'Active') {
      navigate('/dashboard');
      return;
    }

    // Navigate to checkout page instead of direct Stripe redirect
    navigate(`/checkout?plan=${planId}&yearly=${isYearly}`);
  };

  // Get user's current plan
  const currentPlan = user?.subscription?.plan || 'free';
  
  // Map backend plan names to frontend plan IDs
  const planMapping = {
    'basic': 'Personal',
    'pro': 'Freelancer', 
    'max': 'Agency'
  };
  
  // Convert current plan to frontend plan ID
  const currentPlanId = planMapping[currentPlan] || 'free';

  // Determine button text and style based on current plan
  const getButtonConfig = (planId) => {
    if (currentPlanId === planId) {
      return {
        text: 'Active',
        style: 'active',
        disabled: false,
        show: true
      };
    } else if (currentPlan === 'free' || canUpgrade(currentPlan, planId)) {
      return {
        text: currentPlan === 'free' ? 'Get Started' : 'Upgrade',
        style: 'white',
        disabled: false,
        show: true
      };
    } else {
      return {
        text: '',
        style: '',
        disabled: true,
        show: false // Don't show button for invalid plans
      };
    }
  };

  // Check if user can upgrade to a plan
  const canUpgrade = (currentPlan, targetPlan) => {
    const upgradePaths = {
      'free': ['Personal', 'Freelancer', 'Agency'],
      'basic': ['Freelancer', 'Agency'],
      'pro': ['Agency'],
      'max': []
    };
    
    // targetPlan is already a frontend plan ID (Personal, Freelancer, Agency)
    // currentPlan is a backend plan name (free, basic, pro, max)
    return upgradePaths[currentPlan]?.includes(targetPlan) || false;
  };

  // Determine plan tag (Most Popular, Subscribed, or none)
  const getPlanTag = (planId) => {
    if (currentPlanId === planId) {
      return {
        text: 'Subscribed',
        style: 'subscribed'
      };
    } else if (planId === 'Freelancer' && currentPlan === 'basic') {
      return {
        text: 'Most Popular',
        style: 'popular'
      };
    } else {
      return null; // No tag
    }
  };
  const plans = [
    {
      id: 'Personal',
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
      id: 'Freelancer',
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
      id: 'Agency',
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

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-n-8 via-n-8 to-n-7"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-color-1/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse delay-3000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 px-4 py-[200px]">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-n-1 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-n-2 max-w-2xl mx-auto mb-8">
              Select the perfect plan for your WordPress development needs. 
              All plans include our revolutionary AI-powered component generation.
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-n-1' : 'text-n-2'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-color-1 focus:ring-offset-2 focus:ring-offset-n-8 ${
                  isYearly ? 'bg-color-1' : 'bg-n-6'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-n-1' : 'text-n-2'}`}>
                Yearly
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-n-8/80 backdrop-blur-sm border rounded-2xl p-8 shadow-2xl transition-all duration-300 ${
                  getPlanTag(plan.id)?.style === 'popular'
                    ? 'border-color-1 ring-2 ring-color-1/20' 
                    : 'border-n-6'
                }`}
              >
                {/* Plan Tag (Most Popular or Subscribed) */}
                {(() => {
                  const tag = getPlanTag(plan.id);
                  if (!tag) return null;
                  
                  return (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        tag.style === 'popular' 
                          ? 'bg-color-1 text-n-8' 
                          : 'bg-green-500 text-white'
                      }`}>
                        {tag.text}
                      </div>
                    </div>
                  );
                })()}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-n-1 mb-2">{plan.name}</h3>
                  <p className="text-n-2 mb-4">{plan.description}</p>
                  <div className="flex flex-col items-center">
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold text-n-1">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-n-2 ml-1">
                        {isYearly ? '/year' : '/month'}
                      </span>
                    </div>
                    {isYearly && (
                      <div className="text-sm text-n-2">
                        {plan.monthlyPrice}/month billed yearly
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-color-1/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-color-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-n-1 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {(() => {
                  const buttonConfig = getButtonConfig(plan.id);
                  
                  // Only show button if show is true
                  if (!buttonConfig.show) {
                    return null;
                  }
                  
                  return (
                    <Button 
                      white={buttonConfig.style === 'white'}
                      className={`w-full ${
                        buttonConfig.style === 'active' 
                          ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer' 
                          : ''
                      }`}
                      onClick={() => handlePayment(plan.id, buttonConfig)}
                      disabled={buttonConfig.disabled}
                    >
                      {buttonConfig.text}
                    </Button>
                  );
                })()}
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-n-1 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-n-8/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-n-1 mb-3">
                  What's the difference between Manual and AI components?
                </h3>
                <p className="text-n-2 text-sm">
                  Manual components are unlimited and let you create custom components from scratch. 
                  AI components are generated automatically using our AI - you get a specific number per month based on your plan.
                </p>
              </div>

              <div className="bg-n-8/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-n-1 mb-3">
                  Can I upgrade my plan anytime?
                </h3>
                <p className="text-n-2 text-sm">
                  Yes! You can upgrade your plan at any time. Your billing will be prorated, 
                  and you'll immediately gain access to the new plan's features and AI generations.
                </p>
              </div>

              <div className="bg-n-8/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-n-1 mb-3">
                  What happens if I exceed my AI generations?
                </h3>
                <p className="text-n-2 text-sm">
                  You can still create unlimited manual components. If you need more AI generations, 
                  you can upgrade your plan or purchase additional AI credits.
                </p>
              </div>

              <div className="bg-n-8/50 backdrop-blur-sm border border-n-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-n-1 mb-3">
                  Is there a free trial?
                </h3>
                <p className="text-n-2 text-sm">
                  We offer a 14-day free trial for all plans. No credit card required. 
                  Try our AI component generation and manual tools risk-free.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link
              to="/"
              className="text-n-2 hover:text-n-1 transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
