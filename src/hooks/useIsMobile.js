import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile devices using multiple approaches
 * @returns {boolean} True if the device is a mobile device
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Function to detect if device is mobile
      const checkMobile = () => {
        // Method 1: Check for touch screen capability
        const hasTouchScreen = (
          ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) || 
          ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0)
        );
        
        // Method 2: Check for mobile-specific user agent (not 100% reliable but helpful)
        const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Method 3: Check screen width
        const isSmallScreen = window.innerWidth < 768;
        
        // Method 4: Check for coarse pointer (touch screen)
        const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        
        // Consider device mobile if it has touch capability OR user agent indicates mobile OR screen is small
        return hasTouchScreen || userAgentMobile || isSmallScreen || hasCoarsePointer;
      };
      
      // Set initial value
      setIsMobile(checkMobile());
      
      // Update on resize for responsive design changes
      const handleResize = () => {
        setIsMobile(checkMobile());
      };
      
      // Add listener for changes
      window.addEventListener('resize', handleResize);
      
      // Clean up the listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return isMobile;
};

export default useIsMobile;