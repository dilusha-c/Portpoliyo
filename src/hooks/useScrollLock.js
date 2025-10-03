import { useEffect } from 'react';

/**
 * Custom hook for locking and unlocking scrolling on the body element
 * @param {boolean} lock - Whether to lock scrolling
 * @param {boolean} restorePosition - Whether to restore scroll position when unlocked (default: true)
 */
const useScrollLock = (lock, restorePosition = true) => {
  useEffect(() => {
    if (lock) {
      // Store current scroll position
      const scrollY = window.scrollY || window.pageYOffset || 0;
      document.body.setAttribute('data-scroll-position', String(scrollY));
      
      // Apply styles to lock scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.paddingRight = '15px'; // compensate for scrollbar disappearance
    } else if (restorePosition) {
      // Restore scroll position when unlocking
      const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
      
      // Remove styles to unlock scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
    }

    // Cleanup in case component unmounts while scroll is locked
    return () => {
      if (lock && restorePosition) {
        const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollY);
      }
    };
  }, [lock, restorePosition]);
};

export default useScrollLock;