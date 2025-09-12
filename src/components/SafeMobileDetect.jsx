import { useEffect } from 'react';

/**
 * Component that ensures mobile detection works correctly and fixes any issues
 * with cursors or other mobile-specific problems
 */
const SafeMobileDetect = () => {
  useEffect(() => {
    // Function to detect if device is mobile
    const detectMobile = () => {
      // Comprehensive mobile detection
      const hasTouchScreen = (
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) || 
        (navigator.msMaxTouchPoints > 0)
      );
      
      const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 768;
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      return hasTouchScreen || userAgentMobile || isSmallScreen || hasCoarsePointer;
    };
    
    const isMobile = detectMobile();
    
    if (isMobile) {
      // Apply all mobile fixes immediately
      document.body.classList.add('is-mobile-device');
      document.documentElement.setAttribute('data-mobile', 'true');
      
      // Force remove any cursor styling
      document.body.classList.remove('gear-cursor-active');
      document.body.style.cursor = '';
      
      // Apply inline style for safety
      document.head.insertAdjacentHTML('beforeend', `
        <style id="mobile-emergency-styles">
          @media (max-width: 767px), (pointer: coarse) {
            * { cursor: auto !important; }
            .gear-cursor, .cursor-element, .custom-cursor {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
            }
            body, html, #root {
              overflow-x: hidden !important;
              width: 100% !important;
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
            }
          }
        </style>
      `);
      
      // Reset any cursor elements that might be in the DOM
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.style && el.style.cursor === 'none') {
          el.style.cursor = '';
        }
      });
    }
    
    return () => {
      // Cleanup
      const style = document.getElementById('mobile-emergency-styles');
      if (style) {
        style.remove();
      }
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default SafeMobileDetect;