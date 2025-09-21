import { useState, useEffect, useContext, useCallback } from 'react'
import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Sun, Moon, ArrowUp, Github, Linkedin, Mail, ExternalLink, Cpu } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import BootScreen from './components/BootScreen'
import RobotDecorator from './components/RobotDecorator'
import RoboticSectionTitle from './components/RoboticSectionTitle'
import RobotBackgroundDecoration from './components/RobotBackgroundDecoration'
import HumanRobotDecoration from './components/HumanRobotDecoration'
import BinaryMatrix from './components/BinaryMatrix'
import useIsMobile from './hooks/useIsMobile'
import SafeMobileDetect from './components/SafeMobileDetect'

import './App.css'
import './components/PublicationsScanner.css'
import './components/FuturisticText.css'
import './components/keyframe-animations.css'
import './components/SectionDivider.css'
import './components/SkillsModal.css'
import './components/HardwareAnimations.css'
import './components/HonorsAwards.css'
import './components/Education.css'
import './components/overflow-fix.css'
import './components/mobile-fixes.css'
import './components/mobile-critical-fix.css'
import { ThemeContext } from './contexts/ThemeContext'

import HeroSection from './pages/HeroSection'
import AboutSection from './pages/AboutSection'
import SkillsSection from './pages/SkillsSection'
import ProjectsSection from './pages/ProjectsSection'
import PublicationsSection from './pages/PublicationsSection'
import CertificatesSection from './pages/CertificatesSection'
import AwardsSection from './pages/AwardsSection'
import ContactSection from './pages/ContactSection'
import EducationSection from './pages/EducationSection'

// Import project images
import logoImg from './assets/logo.png'

// EmailJS configuration
// Replace these with your actual EmailJS values
const EMAILJS_SERVICE_ID = "service_g2d5b5l";
const EMAILJS_TEMPLATE_ID = "template_lta7m59";
const EMAILJS_PUBLIC_KEY = "ZZAxpETQoSc-iQUf3";

// Initialize EmailJS - using a safer approach inside an effect hook instead of at the global level
// We'll do this in a useEffect hook inside the component

function App() {
  const { theme, roboticMode, toggleTheme, toggleRoboticMode } = useContext(ThemeContext)
  const [scrollY, setScrollY] = useState(0)
  const [showBootScreen, setShowBootScreen] = useState(false)
  const [portfolioVisible, setPortfolioVisible] = useState(false)
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    images: [],
    title: '',
    currentIndex: 0
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const controls = useAnimation()
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  })
  
  // Function to handle escape key press to close modal
  const handleEscapeKey = useCallback((e) => {
    if (e.key === 'Escape') {
      closeImageModal();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Function to open image modal with enhanced scroll prevention
  const openImageModal = useCallback((images, title, currentIndex = 0) => {
    // Store the scroll position in a data attribute
    const scrollY = window.scrollY;
    document.body.setAttribute('data-scroll-position', scrollY);
    
    setImageModal({
      isOpen: true,
      images: images,
      title: title,
      currentIndex: currentIndex
    });
    
    // Better approach to disable scrolling without jumping
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.paddingRight = '15px'; // Compensate for scrollbar disappearance
    
    // Add event listeners for escape key and clicks to close modal
    document.addEventListener('keydown', handleEscapeKey);
    
    // Small delay to avoid immediate trigger of the click event
    setTimeout(() => {
      document.addEventListener('mousedown', handleModalOutsideClick);
      document.addEventListener('touchstart', handleModalOutsideClick);
    }, 10);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Function to navigate images in modal
  const navigateImage = (direction) => {
    if (!imageModal.isOpen || !imageModal.images.length) return

    const newIndex = direction === 'next'
      ? (imageModal.currentIndex + 1) % imageModal.images.length
      : (imageModal.currentIndex - 1 + imageModal.images.length) % imageModal.images.length

    setImageModal(prev => ({
      ...prev,
      currentIndex: newIndex
    }))
  }
  
  // Function to handle clicks outside the modal content
  const handleModalOutsideClick = useCallback((e) => {
    // Get the modal content element
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close-button');
    
    // Check if the click was outside the modal content or on the overlay
    // We specifically check if it's not on the content and not on the close button
    if (modalContent && !modalContent.contains(e.target) || 
        (e.target.classList && e.target.classList.contains('modal-overlay'))) {
      closeImageModal();
    }
    
    // Also close if clicked directly on the close button
    if (closeButton && (closeButton === e.target || closeButton.contains(e.target))) {
      closeImageModal();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Function to close image modal and restore scrolling while preserving position
  const closeImageModal = useCallback(() => {
    setImageModal(prev => ({
      ...prev,
      isOpen: false
    }));
    
    // Get the scroll position from the data attribute
    const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
    
    // Restore scrolling and layout
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    
    // Important: restore the scroll position
    window.scrollTo(0, scrollY);
  }, []);
  
  // Always show boot screen on every page refresh
  useEffect(() => {
    setShowBootScreen(true);
    
    // Portfolio will be shown after boot sequence completes
    // via the handleBootComplete callback
  }, []);
  
  // Handle wheel events for modal auto-close
  useEffect(() => {
    if (showSkillsModal) {
      // Create handler to close modal when wheel event happens on document
      const handleWheel = (e) => {
        // Check if the event target is not inside the modal content
        const modalContent = document.querySelector('.skills-modal-content');
        if (modalContent && !modalContent.contains(e.target)) {
          setShowSkillsModal(false);
        }
      };
      
      // Add event listener for wheel events
      document.addEventListener('wheel', handleWheel, { passive: true });
      
      // Clean up event listener when component unmounts or modal closes
      return () => {
        document.removeEventListener('wheel', handleWheel);
      };
    }
  }, [showSkillsModal]);

  // Detect scroll position for navbar transparency and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
      
      // Manual progress calculation as a fallback for scrollYProgress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      if (windowHeight > 0) {
        // We don't need to set this manually if scrollYProgress from Framer Motion is working
        // This is just a fallback approach if needed
        
        // The progress is used by both left and right bars with origin-right and origin-left respectively
        // so they grow outward from the center
        
        // Track current visible section without changing URL
        const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];
        for (let section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Consider a section in view if it's top is in the top half of the screen
            if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
              sessionStorage.setItem('currentSection', section);
              break;
            }
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])
  
  // Close modal when user scrolls the page
  useEffect(() => {
    if (showSkillsModal) {
      const handleScrollForModal = () => {
        setShowSkillsModal(false);
      }
      window.addEventListener('scroll', handleScrollForModal)
      return () => window.removeEventListener('scroll', handleScrollForModal)
    }
  }, [showSkillsModal])
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = (event) => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        
        if (
          mobileMenu && 
          !mobileMenu.contains(event.target) && 
          mobileMenuButton && 
          !mobileMenuButton.contains(event.target)
        ) {
          setMobileMenuOpen(false);
        }
      }
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }
  }, [mobileMenuOpen])
  
  // URL management system - keep the base URL consistent
  useEffect(() => {
    // Handle initial URL hash if present, but then clean it
    const handleInitialURL = () => {
      // First try to get hash from URL
      const hash = window.location.hash.substring(1);
      
      // If hash exists in URL, use it
      if (hash) {
        // Store the hash as current section
        sessionStorage.setItem('currentSection', hash);
        
        // Scroll to the section without changing URL
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) {
            const yPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const headerOffset = 80;
            
            window.scrollTo({
              top: yPosition - headerOffset,
              behavior: 'smooth'
            });
          }
          
          // Clean the URL to base URL only
          window.history.replaceState(null, document.title, window.location.pathname);
        }, 100);
      } 
      // If no hash in URL, try to restore from session storage
      else {
        const savedSection = sessionStorage.getItem('currentSection');
        if (savedSection) {
          setTimeout(() => {
            const section = document.getElementById(savedSection);
            if (section) {
              const yPosition = section.getBoundingClientRect().top + window.pageYOffset;
              const headerOffset = 80;
              
              window.scrollTo({
                top: yPosition - headerOffset,
                behavior: 'auto' // Use 'auto' instead of 'smooth' to avoid visible scrolling on refresh
              });
            }
          }, 100);
        }
      }
    };
    
    // Handle browser back/forward buttons without changing URL
    const handlePopState = () => {
      // Don't allow URL changes with hash - redirect to base URL
      if (window.location.hash) {
        // Get the section from the hash before removing it
        const hash = window.location.hash.substring(1);
        if (hash) {
          sessionStorage.setItem('currentSection', hash);
        }
        
        // Clean the URL
        window.history.replaceState(null, document.title, window.location.pathname);
        
        // Scroll to the section if it exists
        if (hash) {
          const section = document.getElementById(hash);
          if (section) {
            const yPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const headerOffset = 80;
            
            window.scrollTo({
              top: yPosition - headerOffset,
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    // Handle page refreshes and navigation
    window.onbeforeunload = () => {
      // We don't need to do anything special here since sessionStorage persists across refreshes
      // But this ensures we have a hook if needed later
    };
    
    // Set up event listeners
    window.addEventListener('popstate', handlePopState);
    
    // Execute initial URL handling
    handleInitialURL();
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.onbeforeunload = null;
    };
  }, []);

  // Add a class to the body when image modal is open in robotic mode to keep cursor visible
  useEffect(() => {
    if (imageModal.isOpen && roboticMode) {
      document.body.classList.add('modal-open-robotic');
      
      // Add CSS for the close button glow in robotic mode
      const style = document.createElement('style');
      style.id = 'modal-close-button-style';
      style.innerHTML = `
        .modal-content .close-button {
          box-shadow: 0 0 15px 3px rgba(239, 68, 68, 0.8);
          animation: pulse-red 2s infinite;
        }
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8); }
          50% { box-shadow: 0 0 15px 5px rgba(239, 68, 68, 0.4); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        
        /* Make close button more visible in robotic mode */
        .modal-content {
          position: relative;
        }
        
        /* Ensure the close button is always at the top-right */
        .modal-content .close-button {
          position: absolute !important;
          top: 0 !important;
          right: 0 !important;
          z-index: 9999 !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.body.classList.remove('modal-open-robotic');
      const style = document.getElementById('modal-close-button-style');
      if (style) {
        document.head.removeChild(style);
      }
    }
    return () => {
      document.body.classList.remove('modal-open-robotic');
      const style = document.getElementById('modal-close-button-style');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, [imageModal.isOpen, roboticMode])

  // Animate skills when they come into view
  useEffect(() => {
    const animateSkills = async () => {
      await controls.start({ opacity: 1, y: 0 })
    }
    animateSkills()
  }, [controls])
  
  // Cleanup and navigation handling effect for modal
  useEffect(() => {
    // Function to handle browser back button while modal is open
    const handlePopState = () => {
      if (imageModal.isOpen) {
        closeImageModal();
      }
    };
    
    // Add popstate listener if modal is open
    if (imageModal.isOpen) {
      window.addEventListener('popstate', handlePopState);
    }
    
    return () => {
      // Remove popstate listener
      window.removeEventListener('popstate', handlePopState);
      
      // Ensure we clean up event listeners and restore scrolling if component unmounts with modal open
      if (imageModal.isOpen) {
        const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
        
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        
        window.scrollTo(0, scrollY);
        document.removeEventListener('keydown', handleEscapeKey);
      }
    }
  }, [imageModal.isOpen, handleEscapeKey]); // Removed closeImageModal from dependencies
  
  // Cross-browser scroll function that works reliably
  const smoothScrollToSection = (sectionId) => {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) {
        console.warn(`Section with id "${sectionId}" not found`);
        return;
      }

      try {
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          // Get the element's position relative to the document
          const elementRect = section.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;

          // Account for fixed header height
          const headerOffset = 80;

          // Calculate final scroll position
          const offsetPosition = absoluteElementTop - headerOffset;

          // Ensure position is not negative
          const finalPosition = Math.max(0, offsetPosition);

          // Use native smooth scrolling with better error handling
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });

          // Store the current section in sessionStorage without changing URL
          sessionStorage.setItem('currentSection', sectionId);
        });

      } catch (error) {
        console.error('Error in smoothScrollToSection:', error);
        // Fallback for older browsers or when smooth scrolling fails
        try {
          const yPosition = section.offsetTop;
          const finalPosition = Math.max(0, yPosition - 80);
          window.scrollTo(0, finalPosition);
        } catch (fallbackError) {
          console.error('Fallback scroll also failed:', fallbackError);
        }
      }
    }, 100); // Small delay to ensure DOM is ready
  }  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Navigation implementation that doesn't change URL
  const scrollToSection = (sectionId) => {
    try {
      // Find the target section
      const targetSection = document.getElementById(sectionId);
      
      if (targetSection) {
        // Get the y-position of the section
        const yPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
        
        // Adjust for header height
        const headerOffset = 80;
        const finalPosition = yPosition - headerOffset;
        
        // Perform the scroll
        window.scrollTo({
          top: finalPosition,
          behavior: 'smooth'
        });
        
        // Store current section in sessionStorage instead of changing URL
        sessionStorage.setItem('currentSection', sectionId);
        
        return true;
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
    return false;
  }

  // Contact form state
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
  // Initialize EmailJS
  useEffect(() => {
    try {
      // Initialize EmailJS with the proper options
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
        // Limited to a single email per session to avoid spam
        limitRate: {
          throttle: 2000 // wait 2 sec before trying again
        }
      });
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  }, []);
  
  // Add mobile class to body for mobile-specific styling with enhanced detection
  useEffect(() => {
    // Multiple checks for mobile detection
    const hasTouchScreen = (
      ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) || 
      ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0) ||
      ('ontouchstart' in window)
    );
    
    const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    // Consider device mobile if ANY of these conditions are true
    const isActuallyMobile = hasTouchScreen || userAgentMobile || isSmallScreen || hasCoarsePointer || isMobile;
    
    if (isActuallyMobile) {
      document.body.classList.add('is-mobile-device');
      
      // Force remove any cursor styling that might be applied
      document.body.classList.remove('gear-cursor-active');
      document.body.style.cursor = '';
      
      // Also add a data attribute for CSS targeting
      document.documentElement.setAttribute('data-mobile', 'true');
    } else {
      document.body.classList.remove('is-mobile-device');
      document.documentElement.removeAttribute('data-mobile');
    }
    
    return () => {
      document.body.classList.remove('is-mobile-device');
      document.documentElement.removeAttribute('data-mobile');
    };
  }, [isMobile]);

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!contactFormData.name || !contactFormData.email || !contactFormData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'Please fill in all required fields.'
      });
      return;
    }
    
    // Set loading state
    setFormStatus({
      submitting: true,
      submitted: false,
      error: null
    });
    
    try {
      console.log('Starting email submission process...');
      
      // Using Email.js to send emails
      const templateParams = {
        name: contactFormData.name,
        email: contactFormData.email,
        title: contactFormData.subject || 'Portfolio Contact Form',
        message: contactFormData.message,
        to_name: 'Portfolio Owner', // Add recipient name
        reply_to: contactFormData.email // Ensure replies go back to sender
      };
      
      console.log('Sending email with params:', templateParams);
      
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully!', response.status, response.text);
      
      // Success!
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Reset form
      setContactFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitting: false,
          submitted: false,
          error: null
        });
      }, 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Provide more specific error message based on the error type
      let errorMessage = 'Failed to send your message. Please try again later or contact me directly via email.';
      
      if (error.message) {
        console.log('Error message:', error.message);
        
        if (error.message.includes('Network Error')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('invalid service_id')) {
          errorMessage = 'Email service configuration error. Please contact me directly via email.';
          console.error('Invalid service ID being used');
        } else if (error.message.includes('invalid template_id')) {
          errorMessage = 'Email template configuration error. Please contact me directly via email.';
          console.error('Invalid template ID being used');
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Too many messages sent. Please try again in a few minutes.';
        }
      }
      
      if (error.status) {
        console.log('Error status:', error.status);
        if (error.status === 401 || error.status === 403) {
          errorMessage = 'Authentication error with email service. Please contact me directly via email.';
        } else if (error.status === 429) {
          errorMessage = 'Too many messages sent. Please try again in a few minutes.';
        }
      }
      
      setFormStatus({
        submitting: false,
        submitted: false,
        error: errorMessage
      });
    }
  };

  const handleBootComplete = () => {
    setShowBootScreen(false);
    setPortfolioVisible(true);
  };
  
  return (
    <>
      {/* SafeMobileDetect ensures mobile display works correctly */}
      <SafeMobileDetect />
      
      {/* Static gear icon instead of animated cursor */}
      {/* Removed static gear icon at bottom left corner */}
      
      {/* Boot screen for first-time visitors */}
      <AnimatePresence mode="wait">
        {showBootScreen && (
          <BootScreen onComplete={handleBootComplete} />
        )}
      </AnimatePresence>
      
      {/* Skills Modal - Top level for maximum z-index */}
      <AnimatePresence>
        {showSkillsModal && (
          <>
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="!fixed inset-0 bg-black backdrop-blur-md flex items-center justify-center p-4 modal-overlay overflow-hidden touch-none !z-[999999]"
              style={{ zIndex: 99999 }}
              onClick={() => setShowSkillsModal(false)}
              onTouchEnd={(e) => {
                // Only close if the touch ended on the overlay itself, not on modal content
                if (e.target === e.currentTarget) {
                  setShowSkillsModal(false);
                }
              }}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 100 
                }}
                className={`skills-modal-content ${
                  theme === 'dark'
                    ? 'bg-slate-900 border border-cyan-900'
                    : 'bg-white border border-slate-200'
                } max-w-sm sm:max-w-2xl md:max-w-4xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl ${
                  roboticMode ? 'robot-border' : ''
                } mx-4 sm:mx-6 md:mx-auto pointer-events-auto !bg-opacity-100 !z-[1000000]`}
                onClick={e => e.stopPropagation()}
                onTouchEnd={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-between items-center`}>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center gap-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Technical Skills
                  </h3>
                  <button 
                    onClick={() => setShowSkillsModal(false)}
                    className={`rounded-full p-1 ${
                      theme === 'dark'
                        ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                        : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                    } transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Skills Categories */}
                  
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>AI & Machine Learning</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Machine Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Deep Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Supervised Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Unsupervised Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Artificial Neural Networks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>TensorFlow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Algorithms & Data Structures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Model Deployment</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Development & Design</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>User Experience (UX)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>User Interface Design (UI)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Tailwind CSS</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>RESTful APIs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>MySQL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Spring Boot</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Node.js</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>React.js</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Programming Languages</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Java</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Python</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>C</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>JavaScript</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Robotics & IoT</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Arduino Programming</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Sensor Integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Drone Technology</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Internet of Things (IoT)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Robotics</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Cloud & Infrastructure</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Virtualization & Cloud Services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Networking (Configuration, Troubleshooting, Security)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Computer Hardware (Setup, Troubleshooting)</span>
                      </li>
                    </ul>
                  </div>

                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Tools & Frameworks</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Git & Version Control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Jupyter</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-end`}>
                  <motion.button
                    onClick={() => setShowSkillsModal(false)}
                    className={`px-5 py-2 rounded-md ${
                      theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    } font-medium transition-colors`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Close
                  </motion.button>
                </div>
                
                {/* Robotic Theme Decoration */}
                {roboticMode && (
                  <>
                    <div className="robot-corner robot-corner-tl"></div>
                    <div className="robot-corner robot-corner-tr"></div>
                    <div className="robot-corner robot-corner-bl"></div>
                    <div className="robot-corner robot-corner-br"></div>
                    <div className="scan-line"></div>
                    <div className="binary-dots"></div>
                    <div className="absolute top-1 right-4 text-[10px] text-cyan-400 font-mono opacity-70">SYS.MODAL.V1.4</div>
                    <div className="absolute bottom-1 left-4 text-[10px] text-cyan-400 font-mono opacity-70">[SKILLS.DAT]</div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Modal - For displaying full award images */}
      <AnimatePresence>
        {imageModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="!fixed inset-0 bg-black backdrop-blur-md flex items-center justify-center p-4 modal-overlay overflow-hidden touch-none !z-[999999]"
            style={{ zIndex: 99999 }}
            onClick={closeImageModal}
            onTouchEnd={(e) => {
              // Only close if the touch ended on the overlay itself, not on modal content
              if (e.target === e.currentTarget) {
                closeImageModal();
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100
              }}
              className={`modal-content relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg touch-none pointer-events-auto ${
                theme === 'dark'
                  ? 'bg-slate-900 border border-cyan-900'
                  : 'bg-white border border-slate-200'
              } ${roboticMode ? 'robot-border' : ''} !z-[1000000]`}
              onClick={e => e.stopPropagation()}
              onTouchEnd={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-between items-center`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center gap-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Award Image Gallery
                </h3>
                <button
                  onClick={closeImageModal}
                  className={`rounded-full p-1 ${
                    theme === 'dark'
                      ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                      : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  } transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Modal Body - Full Image Display */}
              <div className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  {/* Main Image Display - Full Size */}
                  <div className="relative w-full">
                    <motion.img
                      key={imageModal.currentIndex}
                      src={imageModal.images[imageModal.currentIndex]}
                      alt={`${imageModal.title} - Image ${imageModal.currentIndex + 1}`}
                      className="w-full h-auto object-contain max-h-[70vh]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Image Counter */}
                    {imageModal.images.length > 1 && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                        {imageModal.currentIndex + 1} / {imageModal.images.length}
                      </div>
                    )}

                    {/* Navigation Arrows */}
                    {imageModal.images.length > 1 && (
                      <>
                        <motion.button
                          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-20 ${
                            roboticMode
                              ? 'bg-cyan-500/90 hover:bg-cyan-400 text-white'
                              : 'bg-white/90 hover:bg-white text-gray-800'
                          } backdrop-blur-sm transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigateImage('prev')}
                          aria-label="Previous image"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6"/>
                          </svg>
                        </motion.button>

                        <motion.button
                          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-20 ${
                            roboticMode
                              ? 'bg-cyan-500/90 hover:bg-cyan-400 text-white'
                              : 'bg-white/90 hover:bg-white text-gray-800'
                          } backdrop-blur-sm transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigateImage('next')}
                          aria-label="Next image"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Award Title */}
                  <div className="w-full px-2 pb-2">
                    <h4 className={`text-lg font-semibold text-center ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      {imageModal.title}
                    </h4>
                    {imageModal.images.length > 1 && (
                      <p className={`text-center text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Image {imageModal.currentIndex + 1} of {imageModal.images.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-end`}>
                <motion.button
                  onClick={closeImageModal}
                  className={`px-5 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  } font-medium transition-colors`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Close
                </motion.button>
              </div>

              {/* Robotic Theme Decoration */}
              {roboticMode && (
                <>
                  <div className="robot-corner robot-corner-tl"></div>
                  <div className="robot-corner robot-corner-tr"></div>
                  <div className="robot-corner robot-corner-bl"></div>
                  <div className="robot-corner robot-corner-br"></div>
                  <div className="scan-line"></div>
                  <div className="binary-dots"></div>
                  <div className="absolute top-1 right-4 text-[10px] text-cyan-400 font-mono opacity-70">IMG.MODAL.V1.2</div>
                  <div className="absolute bottom-1 left-4 text-[10px] text-cyan-400 font-mono opacity-70">[AWARD.GALLERY]</div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Portfolio content */}
      <AnimatePresence>
        {portfolioVisible && (
          <motion.div 
            className={`${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-300`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Binary Matrix Background - Applied globally when robotic mode is active */}
            {roboticMode && <BinaryMatrix />}
            {/* Progress bar - grows from middle to edges */}
            <div className="fixed top-0 z-50 h-1.5 overflow-hidden left-0 right-0">
              {/* Subtle gradient overlay for the whole progress bar area */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
              
              {/* Center connection point - no visible dot */}
              <div className="absolute left-1/2 right-1/2 top-0 bottom-0"></div>
              
              {/* Left side progress bar - full width */}
              <motion.div 
                className="absolute top-0 right-1/2 bottom-0 w-1/2 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 origin-right shadow-md shadow-blue-500/20 progress-bar-glow"
                style={{ 
                  scaleX: scrollYProgress,
                  right: "50%"  // Ensure it's anchored to the center
                }}
                initial={{ scaleX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }}
              />
              
              {/* Right side progress bar - full width */}
              <motion.div 
                className="absolute top-0 left-1/2 bottom-0 w-1/2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 origin-left shadow-md shadow-blue-500/20 progress-bar-glow"
                style={{ 
                  scaleX: scrollYProgress,
                  left: "50%" // Ensure it's anchored to the center
                }}
                initial={{ scaleX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }}
              />
            </div>

            {/* Navigation */}
            <motion.nav 
              className={`fixed w-full z-40 transition-all duration-300 ${
                scrollY > 10 
                  ? 'bg-white/10 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl' 
                  : 'bg-transparent'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto flex items-center justify-between py-4 sm:py-5 px-4 md:px-8">
                {/* Logo and Name - Left on all screens */}
                <div className="flex items-center flex-shrink-0 md:mr-3">
                  <motion.img 
                    src={logoImg}
                    alt="Dilusha Chamika Logo" 
                    className="h-10 sm:h-12 lg:h-14 mr-3"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.h1 
                    className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    Dilusha Chamika
                  </motion.h1>
                </div>
                
                
                {/* Mobile menu button - Right side on mobile */}
                <div className="block md:hidden">
                  <motion.button 
                    className={`mobile-menu-button p-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white border border-slate-600' 
                        : 'bg-gradient-to-r from-slate-200 to-slate-100 text-slate-800 border border-slate-300'
                    } focus:outline-none shadow-md`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {!mobileMenuOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </motion.button>
                </div>
                
                {/* Desktop navigation */}
                <div className="hidden md:flex space-x-1 lg:space-x-4 xl:space-x-8 justify-center mx-auto">
                  {['Home', 'About', 'Projects', 'Publications', 'Certificates', 'Awards', 'Contact'].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`px-2 lg:px-3 py-1.5 rounded-lg text-sm lg:text-base hover:text-cyan-400 ${theme === 'dark' ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100/60'} transition-colors font-medium whitespace-nowrap`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
                
                {/* Desktop theme buttons - hidden on mobile */}
                <div className="hidden md:flex items-center space-x-2 md:space-x-3 md:ml-2">
                  <motion.button
                    onClick={toggleRoboticMode}
                    className={`p-1.5 md:p-2 rounded-full ${
                      theme === 'dark' 
                        ? roboticMode ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300 shadow-lg shadow-cyan-500/30' : 'bg-slate-800 text-gray-400' 
                        : roboticMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-200 text-gray-600'
                    } hover:scale-110 transition-all relative ${
                      roboticMode ? 'robot-border' : ''
                    }`}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: roboticMode ? '0 0 15px rgba(8, 145, 178, 0.5)' : '0 0 5px rgba(100, 116, 139, 0.3)' 
                    }}
                    whileTap={{ scale: 0.9 }}
                    title="Toggle Robotic Theme"
                  >
                    {roboticMode && (
                      <span className="absolute inset-0 robot-glow opacity-70 rounded-full -z-10"></span>
                    )}
                    <Cpu 
                      size={20} 
                      className={roboticMode ? 'animate-pulse' : ''}
                    />
                    {roboticMode && (
                      <motion.span 
                        className="absolute inset-0 border border-cyan-400/50 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1], 
                          opacity: [0.7, 0.2, 0.7] 
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={toggleTheme}
                    className={`p-1.5 md:p-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300 shadow-lg shadow-cyan-500/30' 
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                    } hover:scale-110 transition-all relative ${theme === 'dark' ? 'theme-border-dark' : 'theme-border-light'}`}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: '0 0 15px rgba(8, 145, 178, 0.5)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' && (
                      <span className="absolute inset-0 theme-glow opacity-70 rounded-full -z-10"></span>
                    )}
                    {theme === 'dark' ? <Sun size={20} className="text-cyan-300 animate-pulse" /> : <Moon size={20} />}
                    <motion.span 
                      className={`absolute inset-0 border rounded-full ${theme === 'dark' ? 'border-cyan-400/50' : 'border-blue-400/50'}`}
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [0.7, 0.2, 0.7] 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </motion.button>
                </div>
              </div>
              
              {/* Mobile menu */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div 
                    className={`mobile-menu md:hidden fixed inset-x-0 top-20 z-40 ${
                      theme === 'dark' 
                        ? 'bg-slate-900/95 backdrop-blur-lg text-white border-b border-slate-700/50' 
                        : 'bg-white/95 backdrop-blur-lg text-slate-900 border-b border-slate-200/50'
                    } shadow-xl overflow-hidden`}
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: '500px' }}
                    exit={{ opacity: 0, maxHeight: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="container mx-auto py-5 px-6">
                      <div className="flex flex-col space-y-1">
                        {['Home', 'About', 'Projects', 'Publications', 'Certificates', 'Awards', 'Contact'].map((item) => (
                          <motion.button
                            key={item}
                            onClick={() => {
                              scrollToSection(item.toLowerCase());
                              setMobileMenuOpen(false);
                            }}
                            className={`py-3 px-4 rounded-lg text-lg font-medium ${
                              theme === 'dark' 
                                ? 'hover:bg-slate-800 hover:text-cyan-400' 
                                : 'hover:bg-slate-100 hover:text-blue-600'
                            } transition-colors w-full text-left`}
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.05 * ['Home', 'About', 'Projects', 'Publications', 'Certificates', 'Awards', 'Contact'].indexOf(item)
                            }}
                          >
                            {item}
                          </motion.button>
                        ))}
                        
                        <div className={`h-px w-full my-2 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-200/50'}`}></div>
                        
                        <div className="flex items-center justify-between py-3 px-4">
                          <span className="font-medium">Theme Settings</span>
                          <div className="flex items-center space-x-4">
                            <motion.button
                              onClick={toggleRoboticMode}
                              className={`p-2 rounded-full ${
                                theme === 'dark' 
                                  ? roboticMode ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300' : 'bg-slate-800 text-gray-400' 
                                  : roboticMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'bg-slate-200 text-gray-600'
                              } relative ${roboticMode ? 'robot-border shadow-lg shadow-cyan-500/30' : ''}`}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Cpu size={20} className={roboticMode ? 'animate-pulse' : ''} />
                              {roboticMode && (
                                <motion.span 
                                  className="absolute inset-0 border border-cyan-400/50 rounded-full"
                                  animate={{ 
                                    scale: [1, 1.2, 1], 
                                    opacity: [0.7, 0.2, 0.7] 
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity
                                  }}
                                />
                              )}
                            </motion.button>
                            
                            <motion.button
                              onClick={toggleTheme}
                              className={`p-2 rounded-full ${
                                theme === 'dark' 
                                  ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300 shadow-lg shadow-cyan-500/30' 
                                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                              } relative ${theme === 'dark' ? 'theme-border-dark' : 'theme-border-light'}`}
                              whileTap={{ scale: 0.9 }}
                            >
                              {theme === 'dark' && (
                                <span className="absolute inset-0 theme-glow opacity-70 rounded-full -z-10"></span>
                              )}
                              {theme === 'dark' ? <Sun size={20} className="text-cyan-300 animate-pulse" /> : <Moon size={20} />}
                              <motion.span 
                                className={`absolute inset-0 border rounded-full ${theme === 'dark' ? 'border-cyan-400/50' : 'border-blue-400/50'}`}
                                animate={{ 
                                  scale: [1, 1.2, 1], 
                                  opacity: [0.7, 0.2, 0.7] 
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity
                                }}
                              />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {roboticMode && (
                      <>
                        <div className="absolute left-0 top-1/3 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                        <div className="absolute left-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <HeroSection theme={theme} roboticMode={roboticMode} toggleTheme={toggleTheme} toggleRoboticMode={toggleRoboticMode} smoothScrollToSection={smoothScrollToSection} scrollToSection={scrollToSection} />

            {/* About Section */}
            <AboutSection theme={theme} roboticMode={roboticMode} />
            
            <EducationSection theme={theme} roboticMode={roboticMode} />
            
            <SkillsSection theme={theme} roboticMode={roboticMode} setShowSkillsModal={setShowSkillsModal} />
            
            {/* Section Divider */}
            <div className={`w-full h-16 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-3xl mx-auto px-4 flex items-center">
                  <div className={`h-0.5 flex-grow ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'}`}></div>
                  <div className="mx-4">
                    {roboticMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`}>
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"/>
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`}>
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="8 12 12 16 16 12"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                      </svg>
                    )}
                  </div>
                  <div className={`h-0.5 flex-grow ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'}`}></div>
                </div>
              </div>
              {roboticMode && (
                <div className="absolute inset-0 opacity-10">
                  <div className="binary-scan-line"></div>
                </div>
              )}
            </div>
            
            <ProjectsSection theme={theme} roboticMode={roboticMode} />

            <PublicationsSection theme={theme} roboticMode={roboticMode} />
            
            <CertificatesSection theme={theme} roboticMode={roboticMode} />

            {/* Honors & Awards Section */}
            <AwardsSection theme={theme} roboticMode={roboticMode} openImageModal={openImageModal} />

            {/* Contact Section */}
            <ContactSection theme={theme} roboticMode={roboticMode} contactFormData={contactFormData} setContactFormData={setContactFormData} handleContactSubmit={handleContactSubmit} formStatus={formStatus} />

            {/* Footer */}
            <footer className={`${theme === 'dark' ? 'bg-slate-900 text-gray-400' : 'bg-white text-gray-600'} py-8 px-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} transition-colors duration-300`}>
              <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <motion.p 
                  className="mb-4 md:mb-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  © 2025 Dilusha Chamika. All rights reserved.
                </motion.p>
                <div className="flex space-x-6">
                  <motion.a 
                    href="https://github.com/dilushachamika" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-blue-500'} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/dilusha-chamika/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-blue-500'} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a 
                    href="https://twitter.com/dilushacg" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-blue-500'} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </motion.a>
                </div>
              </div>
            </footer>

            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              className={`fixed bottom-5 right-5 p-3 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg z-40 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: scrollY > 300 ? 1 : 0,
                scale: scrollY > 300 ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUp size={20} className={theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App

