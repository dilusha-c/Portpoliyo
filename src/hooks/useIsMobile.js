import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile devices using media query
 * @returns {boolean} True if the device is a mobile device (pointer: coarse)
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Create media query for devices with coarse pointers (typically touch devices)
      const mediaQuery = window.matchMedia('(pointer: coarse)');
      
      // Set initial value
      setIsMobile(mediaQuery.matches);
      
      // Define callback for media query change
      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
      };
      
      // Add listener for changes
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      
      // Clean up the listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }
  }, []);

  return isMobile;
};

export default useIsMobile;