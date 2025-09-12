import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run on home page
    if (location.pathname === '/') {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        const hash = location.hash;
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            // Scroll to element with offset for header
            const headerHeight = 80; // Approximate header height
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToSection;
