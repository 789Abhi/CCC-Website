import { Routes, Route } from 'react-router-dom';
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

// Auth Components
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import UserDashboard from "./components/dashboard/UserDashboard";
import PricingPlans from "./components/pricing/PricingPlans";

const App = () => {
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
            <AboutCreator />
            <Footer />
          </div>
          <ButtonGradient />
        </>
      } />
      
      {/* Auth Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/pricing" element={<PricingPlans />} />
    </Routes>
  );
};

export default App;
