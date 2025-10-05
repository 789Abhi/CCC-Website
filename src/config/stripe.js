// Stripe configuration for frontend
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Nq8RkSIy2qv9AVmW8zwkPLBnvYKDQYggbLUBNQd8bgo88IV48HtwfqmkmfivQkvD499AK6rhF67MTEEXwGIRe8V0098X96d7S';

// Validate the key before loading Stripe
if (!STRIPE_PUBLISHABLE_KEY || !STRIPE_PUBLISHABLE_KEY.startsWith('pk_')) {
  console.error('Invalid Stripe publishable key:', STRIPE_PUBLISHABLE_KEY);
  throw new Error('Stripe publishable key is missing or invalid');
}

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Stripe configuration
export const stripeConfig = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  // You can add more Stripe configuration here
};
