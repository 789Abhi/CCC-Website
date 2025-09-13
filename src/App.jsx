import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import Comparison from "./components/Comparison";
import AboutCreator from "./components/AboutCreator";
import ModalContainer from "./components/ModalContainer";
import SuccessMessage from "./components/SuccessMessage";
import HomePricing from "./components/HomePricing";

// Auth Components
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import UserDashboard from "./components/dashboard/UserDashboard";
import PricingPlans from "./components/pricing/PricingPlans";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PricingPage from "./pages/PricingPage";
import CheckoutPage from "./pages/CheckoutPage";
import PricingList from './components/PricingList';
import { useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <>
          <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
            <Header />
            <Hero />
            <Benefits />
            <Roadmap/>
            <Comparison />
            <HomePricing />
            <AboutCreator />
            <Footer />
          </div>
          <ButtonGradient />
          <ModalContainer />
          <SuccessMessage />
        </>
      } />
      
      {/* Auth Routes */}
      <Route path="/login" element={
        <>
          <LoginPage />
          <SuccessMessage />
        </>
      } />
      <Route path="/register" element={
        <>
          <RegisterPage />
          <SuccessMessage />
        </>
      } />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <UserDashboard />
          <SuccessMessage />
        </ProtectedRoute>
      } />
      <Route path="/pricing" element={
        <>
          <PricingPage />
          <SuccessMessage />
        </>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
