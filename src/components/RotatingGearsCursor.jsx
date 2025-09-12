import { useState, useEffect, useContext } from 'react';
import './RotatingGearsCursor.css';
import { ThemeContext } from '../main.jsx';
import useIsMobile from '../hooks/useIsMobile';

const RotatingGearsCursor = () => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // Start invisible and show after mount
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Don't render on mobile devices
  if (isMobile) return null;

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
    
    // Short delay before showing cursor to ensure proper positioning
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    // Add gear-cursor-active to the body when component mounts
    document.body.classList.add('gear-cursor-active');
    
    // Set initial position to wherever the mouse currently is, or center if no info
    if (typeof window !== 'undefined') {
      const initialX = position.x || window.innerWidth / 2;
      const initialY = position.y || window.innerHeight / 2;
      setPosition({ x: initialX, y: initialY });
    }
    
    const handleMouseMove = (e) => {
      // Only update if the values have changed significantly to prevent jitter
      if (Math.abs(e.clientX - position.x) > 0.1 || Math.abs(e.clientY - position.y) > 0.1) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
      
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over clickable elements
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const isClickable = 
          element.tagName === 'BUTTON' ||
          element.tagName === 'A' ||
          element.tagName === 'INPUT' ||
          element.tagName === 'SELECT' ||
          element.closest('button') ||
          element.closest('a') ||
          element.closest('[role="button"]') ||
          element.closest('.clickable');
        
        setIsHovering(isClickable);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Clean up event listeners
    return () => {
      document.body.classList.remove('gear-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, position.x, position.y, isMounted]);

  // Don't render if not visible
  if (!isVisible) return null;

  // Set theme-appropriate colors
  const fillColor = theme === 'dark' 
    ? 'rgba(6, 182, 212, 0.15)'   // Cyan in dark mode
    : 'rgba(59, 130, 246, 0.15)'; // Blue in light mode
  
  const strokeColor = theme === 'dark'
    ? 'rgba(6, 182, 212, 0.9)'    // Cyan in dark mode
    : 'rgba(59, 130, 246, 0.9)';  // Blue in light mode

  return (
    <div 
      className={`gear-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''} ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* Gear SVG - Only the rotating gear */}
      <svg 
        className="main-gear" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
      </svg>
      
      {/* Glowing effect under the gear */}
      <div className="gear-glow"></div>
    </div>
  );
};

export default RotatingGearsCursor;