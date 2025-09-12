// Stripe service for handling payments
import { stripePromise } from '../config/stripe';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://custom-craft-component-backend.vercel.app/api';

export const stripeService = {
  // Create a payment session
  async createCheckoutSession(plan, userId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/stripe/create-checkout-session`, {
        plan,
        userId,
        successUrl: `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/pricing?payment=cancelled`
      });

      if (response.data.success) {
        return response.data.sessionId;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  // Redirect to Stripe checkout
  async redirectToCheckout(sessionId) {
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  },

  // Handle payment success
  async handlePaymentSuccess(sessionId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/stripe/payment-success`, {
        sessionId
      });

      return response.data;
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw error;
    }
  },

  // Get user's subscription status
  async getSubscriptionStatus(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/stripe/subscription/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw error;
    }
  }
};
