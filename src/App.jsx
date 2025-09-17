import { useState, useEffect, useContext } from 'react'
import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Sun, Moon, ArrowUp, Github, Linkedin, Mail, ExternalLink, Cpu } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import BootScreen from './components/BootScreen'
import CertificationsDisplay from './components/CertificationsDisplay'
import RobotDecorator from './components/RobotDecorator'
import RoboticSectionTitle from './components/RoboticSectionTitle'
import BinaryMatrix from './components/BinaryMatrix'
import CircuitPaths from './components/CircuitPaths'
import LeftRobotDecoration from './components/LeftRobotDecoration'
import RobotBackgroundDecoration from './components/RobotBackgroundDecoration'
import HumanRobotDecoration from './components/HumanRobotDecoration'
import FlyingDrone from './components/FlyingDrone'
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
import { ThemeContext } from './main.jsx'

// Import project images
import animalRecognizerImg from './assets/animal.jpg'
import gymSyncImg from './assets/GymSync.jpg'
import zaveImg from './assets/Zave UI Design.jpg'
import landmineRobotImg from './assets/robo.jpg'
import profileImg from './assets/Profile.jpg'
import logoImg from './assets/logo.png'
import sliitImg from './assets/sliit.png'

// Import award images
import codefestAwardImg from './assets/award/CODEFEST.jpg'
import deansListAwardImg from './assets/award/Dean\'s List 1.jpg'
import sliitXtremeAwardImg from './assets/award/SliitXtreme 1.jpg'

// Import CV/Resume
import cvPdf from './assets/cv.pdf'

// EmailJS configuration
// Replace these with your actual EmailJS values
const EMAILJS_SERVICE_ID = "service_x1uwzug";
const EMAILJS_TEMPLATE_ID = "template_by258k9";
const EMAILJS_PUBLIC_KEY = "QKBnCihmn2DpuKPqt";

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
    imageSrc: '',
    title: ''
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const controls = useAnimation()
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  })
  
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
        const progress = window.scrollY / windowHeight
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
              setActiveSection(section);
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
  }, [imageModal.isOpen])
  
  // Cross-browser scroll function that works reliably
  const smoothScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    try {
      // Calculate position
      const yPosition = window.pageYOffset + section.getBoundingClientRect().top;
      const headerOffset = 80;
      
      // Try native smooth scrolling first - but don't change URL
      window.scrollTo({
        top: yPosition - headerOffset,
        behavior: 'smooth'
      });
      
      // Store the current section in sessionStorage without changing URL
      sessionStorage.setItem('currentSection', sectionId);
      
    } catch (error) {
      // Fallback for older browsers
      const yPosition = section.offsetTop;
      window.scrollTo(0, yPosition - 80);
    }
  }

  // Scroll to top function
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

  // Handle contact form input changes
  const handleContactInputChange = (e) => {
    const { id, value } = e.target;
    setContactFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

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
        from_name: contactFormData.name,
        from_email: contactFormData.email,
        subject: contactFormData.subject || 'Portfolio Contact Form',
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

  // Utility function to get current section from sessionStorage
  const getCurrentSection = () => {
    return sessionStorage.getItem('currentSection') || 'home';
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const skills = [
    
    { name: "Java", level: 85 },
    { name: "C", level: 83 },
    { name: "Python", level: 88 },
    { name: "React.js", level: 60 },
    { name: "TensorFlow", level: 82 },
    { name: "Spring Boot", level: 78 },
    { name: "MySQL", level: 85 },
    { name: "Machine Learning", level: 80 }
  ]

  const handleBootComplete = () => {
    setShowBootScreen(false);
    setPortfolioVisible(true);
  };
  
  // Function to open image modal with enhanced scroll prevention
  const openImageModal = (imageSrc, title) => {
    // Store the scroll position in a data attribute
    const scrollY = window.scrollY;
    document.body.setAttribute('data-scroll-position', scrollY);
    
    setImageModal({
      isOpen: true,
      imageSrc,
      title
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
  };

  // Function to handle escape key press
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeImageModal();
    }
  };
  
  // Function to handle clicks outside the modal content
  const handleModalOutsideClick = (e) => {
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
  };

  // Function to close image modal and restore scrolling while preserving position
  const closeImageModal = () => {
    setImageModal({
      ...imageModal,
      isOpen: false
    });
    
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
    
    // Remove all event listeners
    document.removeEventListener('keydown', handleEscapeKey);
    document.removeEventListener('mousedown', handleModalOutsideClick);
    document.removeEventListener('touchstart', handleModalOutsideClick);
  };
  
  return (
    <>
      {/* SafeMobileDetect ensures mobile display works correctly */}
      <SafeMobileDetect />
      
      {/* Static gear icon instead of animated cursor */}
      {/* Removed static gear icon at bottom left corner */}
      
      {/* Boot screen for first-time visitors */}
      {showBootScreen && <BootScreen onComplete={handleBootComplete} />}
      
      {/* Skills Modal - Top level for maximum z-index */}
      <AnimatePresence>
        {showSkillsModal && (
          <>
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              style={{ zIndex: 99999 }}
              onClick={() => setShowSkillsModal(false)}
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
                } max-w-4xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl ${
                  roboticMode ? 'robot-border' : ''
                }`}
                style={{ zIndex: 100000 }}
                onClick={e => e.stopPropagation()}
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
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Cloud & Infrastructure</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Virtualization & Cloud</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Docker & Containerization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>AWS Services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>CI/CD Pipelines</span>
                      </li>
                    </ul>
                  </div>
                  
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
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Artificial Neural Networks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>TensorFlow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Computer Vision</span>
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
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Algorithms & Data Structures</span>
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
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>TypeScript</span>
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
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Embedded Systems</span>
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
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>React.js</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Node.js</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>JUnit Testing</span>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9000] overflow-hidden touch-none modal-overlay"
            onClick={closeImageModal} 
            onWheel={(e) => e.stopPropagation()} 
            onTouchMove={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 100 
              }}
              className={`modal-content relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg touch-none pointer-events-auto gear-cursor-container ${
                roboticMode ? 'border border-cyan-500/30 shadow-cyan-500/20 shadow-lg' : ''
              }`}
              onClick={e => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Close button - positioned in the top right corner */}
              <button 
                onClick={closeImageModal}
                className={`close-button absolute top-0 right-0 ${
                  roboticMode 
                    ? 'bg-red-700 hover:bg-red-600 text-white' 
                    : 'bg-black/70 hover:bg-red-600 text-white'
                } rounded-tr-lg p-4 z-50 transition-all duration-300 ease-in-out shadow-lg`}
                aria-label="Close modal"
                style={{ 
                  transform: 'none', 
                  margin: '0',
                  position: 'absolute',
                  top: '0',
                  right: '0'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
                {roboticMode && (
                  <>
                    <span className="absolute -inset-1 border-2 border-red-400 opacity-75 rounded-tr-lg"></span>
                    <span className="absolute inset-0 bg-red-500/20 rounded-tr-lg animate-pulse"></span>
                  </>
                )}
              </button>
              
              {/* Image title - if available */}
              {imageModal.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-bold">{imageModal.title}</h3>
                </div>
              )}
              
              {/* Image */}
              <img 
                src={imageModal.imageSrc} 
                alt={imageModal.title || "Award Image"} 
                className="w-full h-auto object-contain max-h-[90vh] bg-black gear-cursor-visible"
              />
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
                    className={`mobile-menu md:hidden fixed inset-x-0 top-[70px] z-40 ${
                      theme === 'dark' 
                        ? 'bg-slate-900/95 backdrop-blur-lg text-white border-b border-slate-700/50' 
                        : 'bg-white/95 backdrop-blur-lg text-slate-900 border-b border-slate-200/50'
                    } shadow-xl`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
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
            <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
              {/* Toggle buttons for robotic theme and dark mode - moved down to avoid menu overlap */}
              <motion.button
                onClick={toggleRoboticMode}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`absolute top-12 left-4 md:top-12 md:left-8 z-30 flex items-center gap-2 py-2.5 px-5 rounded-lg ${
                  theme === 'dark' 
                    ? roboticMode 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-cyan-200 border border-cyan-500' 
                      : 'bg-slate-800 text-gray-400 border border-slate-700' 
                    : roboticMode 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border border-blue-500' 
                      : 'bg-slate-200 text-gray-600 border border-slate-300'
                } transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50`}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: roboticMode ? '0 0 20px rgba(8, 145, 178, 0.5)' : '0 0 10px rgba(100, 116, 139, 0.3)' 
                }}
                whileTap={{ scale: 0.95 }}
                title="Toggle Robotic Theme"
              >
                <div className="relative">
                  <Cpu 
                    size={20} 
                    className={roboticMode 
                      ? `${theme === 'dark' ? 'text-cyan-300' : 'text-white'} animate-pulse` 
                      : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                    } 
                  />
                  {roboticMode && (
                    <div className="absolute -inset-1 rounded-full bg-cyan-400 opacity-30 blur-sm -z-10"></div>
                  )}
                </div>
                <span className={`text-sm font-bold ${
                  roboticMode
                    ? theme === 'dark' ? 'text-cyan-300' : 'text-white'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {roboticMode ? 'Robotic: ON' : 'Robotic: OFF'}
                </span>
                {roboticMode && (
                  <motion.div 
                    className="absolute inset-0 border border-cyan-400/50 rounded-lg"
                    animate={{ 
                      scale: [1, 1.05, 1], 
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`absolute top-12 right-4 md:top-12 md:right-8 z-30 flex items-center gap-2 py-2.5 px-5 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-slate-800 text-gray-400 border border-slate-700' 
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border border-blue-500' 
                } transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50`}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <div className="relative">
                  {theme === 'dark' ? (
                    <Sun size={20} className="text-white animate-pulse" />
                  ) : (
                    <Moon size={20} className="text-white" />
                  )}
                  <div className={`absolute -inset-1 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-indigo-400'} opacity-30 blur-sm -z-10`}></div>
                </div>
                <span className="text-sm font-bold text-white">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </motion.button>

              <div className={`absolute inset-0 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                  : 'bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300'
              } animate-gradient-x -z-10`} />
              
              {/* Grid pattern background */}
              {roboticMode && (
                <div 
                  className="absolute inset-0 animate-grid-pulse" 
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: 'center center'
                  }}
                />
              )}
              
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Binary Matrix Background */}
              {roboticMode && <BinaryMatrix />}
              
              {/* Circuit Paths */}
              {roboticMode && <CircuitPaths theme={theme} />}
              
              {/* Left Side Robot Decoration - Only in Hero Section */}
              {roboticMode && <LeftRobotDecoration theme={theme} />}
              
              <motion.div 
                className="container mx-auto text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2 
                  className="text-5xl md:text-7xl font-bold mb-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
                  animate={{ 
                    textShadow: ["0 0 0px rgba(79, 209, 197, 0)", "0 0 20px rgba(79, 209, 197, 0.5)", "0 0 0px rgba(79, 209, 197, 0)"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Animated words for "Hello, I'm Dilusha Chamika" */}
                  <motion.div 
                    className="flex items-center space-x-3 intro-group"
                    whileHover={{ 
                      scale: 1.05,
                      className: "flex items-center space-x-3 intro-group intro-group-active" 
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span 
                      className="intro-word animate-float-text animate-hello-color-shift"
                      data-text="Hello,"
                      style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        letterSpacing: '1px'
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5, delay: 0.1 }
                      }}
                    >
                      Hello,
                    </motion.span>
                    
                    <motion.span 
                      className="intro-word animate-pulse-glow animate-hello-color-shift"
                      data-text="I'm"
                      style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        letterSpacing: '1px'
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5, delay: 0.2 }
                      }}
                    >
                      I'm
                    </motion.span>
                  </motion.div>
                  
                  <motion.div 
                    className="inline-flex gap-4 name-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
                    whileHover={{ 
                      scale: 1.05,
                      className: "inline-flex gap-4 name-group name-group-active"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span 
                      className={`hero-text-word inline-block cursor-default relative font-bold name-glow-effect`}
                      data-text="Dilusha"
                      style={{ 
                        letterSpacing: '2px'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          duration: 0.7, 
                          delay: 0.4,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                    >
                      <span className={roboticMode ? 'animate-robotic-text-glow' : 'animate-name-color-shift'}>Dilusha</span>
                    </motion.span>
                    
                    <motion.span 
                      className={`hero-text-word inline-block cursor-default relative font-bold name-glow-effect animate-letter-spacing`}
                      data-text="Chamika"
                      style={{ 
                        letterSpacing: '2px'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          duration: 0.7, 
                          delay: 0.5,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                    >
                      <span className={roboticMode ? 'animate-robotic-text-glow' : 'animate-name-color-shift'}>Chamika</span>
                      
                      {/* Digital circuit layer that appears on hover */}
                      <motion.span 
                        className="absolute inset-0 z-0 opacity-0"
                        whileHover={{ opacity: 0.3 }}
                      />
                    </motion.span>
                  </motion.div>
                </motion.h2>
                <div className={`text-xl md:text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-semibold'} mb-8 h-10`}>
                  <TypeAnimation
                    sequence={[
                      'Software Developer',
                      1000,
                      'AI Enthusiast',
                      1000,
                      'Drone Developer',
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <motion.button 
                    onClick={() => smoothScrollToSection('certificates')}
                    className={`${
                      theme === 'dark'
                        ? roboticMode
                          ? 'bg-gradient-to-r from-cyan-800 to-blue-900 text-cyan-200 border border-cyan-700'
                          : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
                        : roboticMode
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-blue-400'
                          : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white'
                    } font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all`}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: roboticMode 
                        ? "0 0 15px rgba(6, 182, 212, 0.5)" 
                        : "0 0 15px rgba(100, 116, 139, 0.5)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {roboticMode ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        My Certificates
                      </span>
                    ) : (
                      "My Certificates"
                    )}
                  </motion.button>
                  <motion.button 
                    onClick={() => smoothScrollToSection('projects')}
                    className={`${
                      theme === 'dark'
                        ? roboticMode
                          ? 'bg-gradient-to-r from-blue-800 to-indigo-900 text-blue-200 border border-blue-700'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                        : roboticMode
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border border-indigo-400'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                    } font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all`}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: roboticMode 
                        ? "0 0 15px rgba(37, 99, 235, 0.5)" 
                        : "0 0 15px rgba(107, 114, 128, 0.5)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {roboticMode ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        My Projects
                      </span>
                    ) : (
                      "My Projects"
                    )}
                  </motion.button>
                </div>
                
                <motion.div 
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className={`${theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-slate-700 hover:text-slate-900'} cursor-pointer`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="m6 9 6 6 6-6"></path></svg>
                  </button>
                </motion.div>
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300 relative overflow-hidden`}>
              {/* Circuit pattern background */}
              <div className="absolute inset-0 opacity-10">
                <div className="circuit-bg" style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    radial-gradient(circle at 10% 20%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 2px, transparent 2px),
                    radial-gradient(circle at 50% 70%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 3px, transparent 3px),
                    radial-gradient(circle at 80% 40%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 2px, transparent 2px)
                  `,
                  backgroundSize: '40px 40px, 60px 60px, 70px 70px'
                }}></div>
                <div className="cpu-lines" style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(90deg, transparent 98%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 98%),
                    linear-gradient(0deg, transparent 98%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 98%)
                  `,
                  backgroundSize: '50px 50px'
                }}></div>
                {/* CPU paths */}
                <div className="absolute left-0 right-0 h-[2px] top-1/3" 
                  style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
                </div>
                <div className="absolute left-0 right-0 h-[2px] top-2/3" 
                  style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
                </div>
                <div className="absolute top-0 bottom-0 w-[2px] left-1/4" 
                  style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
                </div>
                <div className="absolute top-0 bottom-0 w-[2px] left-3/4" 
                  style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
                </div>
              </div>
              {roboticMode && <RobotDecorator type="circuit" />}
              {roboticMode && <RobotBackgroundDecoration theme={theme} />}
              {roboticMode && <HumanRobotDecoration theme={theme} />}
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  About Me
                </RoboticSectionTitle>
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <motion.div 
                    className="md:w-1/3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className={`relative rounded-full w-64 h-64 mx-auto overflow-hidden border-4 ${theme === 'dark' ? 'border-cyan-500/30' : 'border-blue-500/30'} p-1`}
                    >
                      <img 
                        src={profileImg}
                        alt="Dilusha Chamika Profile Photo" 
                        className="w-full h-full object-cover rounded-full"
                      />
                      
                      {roboticMode && (
                        <>
                          {/* Static gradient effect instead of animated scanning */}
                          <div 
                            className="absolute inset-0 opacity-70"
                            style={{
                              background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.2), transparent)'
                            }}
                          />
                          
                          {/* Robot targeting elements */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-8 h-8">
                              <div className="w-4 h-[1px] bg-cyan-400"></div>
                              <div className="w-[1px] h-4 bg-cyan-400"></div>
                            </div>
                            <div className="absolute top-0 right-0 w-8 h-8 flex justify-end">
                              <div className="w-4 h-[1px] bg-cyan-400"></div>
                              <div className="w-[1px] h-4 bg-cyan-400 ml-3"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 flex items-end">
                              <div className="w-4 h-[1px] bg-cyan-400"></div>
                              <div className="w-[1px] h-4 bg-cyan-400 -mb-3"></div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 flex items-end justify-end">
                              <div className="w-4 h-[1px] bg-cyan-400"></div>
                              <div className="w-[1px] h-4 bg-cyan-400 ml-3 -mb-3"></div>
                            </div>
                          </div>
                          
                          {/* Static border instead of animated scanning */}
                          <div 
                            className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                          />
                        </>
                      )}
                    </div>
                    
                    {roboticMode && (
                      <div className="mt-4 text-center">
                        <div className="inline-block terminal-typing text-xs">
                          HUMAN.ID:DC_01010
                        </div>
                      </div>
                    )}
                  </motion.div>
                  <motion.div 
                    className="md:w-2/3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.p 
                      className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 text-lg`}
                    >
                      I'm Dilusha Chamika, a Computer Systems Engineering undergraduate at SLIIT with a passion for AI, robotics, and full-stack development.
                    </motion.p>
                    
                    <motion.p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                      I've built several innovative projects connecting theory with practice, including:
                    </motion.p>
                    
                    <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 list-disc pl-6`}>
                      <li className="mb-2">
                        <strong>Animal Recognizer:</strong> An AI-powered image classification system that identifies 64 different animal species
                      </li>
                      <li className="mb-2">
                        <strong>GymSync:</strong> A comprehensive gym management system with real-time equipment tracking and scheduling
                      </li>
                    </ul>
                    
                    <motion.p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                      With certifications from Stanford/DeepLearning.AI in Machine Learning and Cisco in Endpoint Security, plus published research on UAV technologies and AI accelerators, I'm committed to creating impactful solutions that make a real difference.
                    </motion.p>
                    
                    <div className="flex flex-wrap gap-4">
                      <motion.a 
                        href={cvPdf}
                        download="Dilusha_Chamika_CV.pdf"
                        className={`border-2 ${theme === 'dark' ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400' : 'border-blue-500 text-blue-500 hover:bg-blue-500'} hover:text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2`}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download CV
                      </motion.a>
                      <motion.button 
                        onClick={() => scrollToSection('contact')}
                        className={`${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} text-inherit font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        Contact Me
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
            
            {/* Education Section */}
            <section id="education" className={`py-10 px-4 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white'} transition-colors duration-300 relative overflow-hidden border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              {/* Flying Drones - only visible in robotic mode */}
              {roboticMode && (
                <>
                  <FlyingDrone theme={theme} />
                  <div className="absolute top-20 right-0 z-10">
                    <motion.div
                      animate={{
                        x: [0, -300, 0],
                        y: [0, -15, 10, -5, 0],
                        rotate: [0, -3, 2, -1, 0],
                      }}
                      transition={{
                        x: { 
                          duration: 18, 
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'easeInOut'
                        },
                        y: { 
                          duration: 7, 
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'easeInOut'
                        },
                        rotate: { 
                          duration: 9, 
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'easeInOut'
                        }
                      }}
                      className="pointer-events-none"
                    >
                      <FlyingDrone theme={theme} />
                    </motion.div>
                  </div>
                </>
              )}
              
              <div className="container mx-auto relative z-10 max-w-4xl">
                {roboticMode && (
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="grid-pattern" style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `
                        linear-gradient(to right, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 1px, transparent 1px),
                        linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                )}
                
                <motion.div 
                  className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-2xl bg-opacity-50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{
                    backgroundColor: theme === 'dark' 
                      ? roboticMode ? 'rgba(15, 23, 42, 0.7)' : 'rgba(30, 41, 59, 0.7)'
                      : roboticMode ? 'rgba(241, 245, 249, 0.7)' : 'rgba(248, 250, 252, 0.7)',
                    border: `1px solid ${theme === 'dark' 
                      ? roboticMode ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'
                      : roboticMode ? 'rgba(14, 165, 233, 0.3)' : 'rgba(226, 232, 240, 0.8)'}`
                  }}
                >
                  {/* SLIIT Logo */}
                  <motion.div 
                    className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={sliitImg} 
                      alt="SLIIT Logo" 
                      className={`w-full h-full object-contain ${theme === 'dark' ? 'filter brightness-110' : ''}`}
                    />
                    {roboticMode && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full pulse-border"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1/2 h-1/2 rounded-full bg-cyan-400/10 animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Education Info */}
                  <div className={`flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <h3 className={`text-xl md:text-2xl font-bold mb-1 ${roboticMode ? 'text-cyan-400' : theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Sri Lanka Institute of Information Technology
                    </h3>
                    <p className="mb-1 font-medium">BSc (Hons), Computer Systems Engineering</p>
                    <p className="mb-2 text-sm opacity-80">Nov 2023 - Nov 2027</p>
                    <div className="flex items-center">
                      <div className={`mr-2 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center ${
                        theme === 'dark' 
                          ? roboticMode ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-700' : 'bg-slate-700 text-cyan-400'
                          : roboticMode ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-blue-100 text-blue-700'
                      }`}>
                        <span className="mr-1">GPA:</span> 3.65
                      </div>
                      
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
            
            {/* Skills Section */}
            <section id="skills" className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative overflow-hidden`}>
              {/* Circuit pattern background - only shown in robotic theme */}
              {roboticMode && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Main circuit board grid */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(to right, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
                      linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}></div>
                  
                  {/* Circuit paths - horizontal */}
                  <div className="absolute top-1/4 left-0 right-0 h-[1px]" 
                    style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  <div className="absolute top-3/4 left-0 right-0 h-[1px]" 
                    style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  
                  {/* Circuit paths - vertical */}
                  <div className="absolute top-0 bottom-0 w-[1px] left-1/4" 
                    style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  <div className="absolute top-0 bottom-0 w-[1px] right-1/4" 
                    style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  
                  {/* Circuit nodes */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  <div className="absolute top-3/4 left-1/4 w-4 h-4 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  <div className="absolute top-3/4 right-1/4 w-4 h-4 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  
                  {/* Diagonal circuit traces */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    {/* Fixed SVG path format using lines instead of paths with percentage values */}
                    <line x1="0" y1="0" x2="100%" y2="100%" 
                      stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.1)'} 
                      strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" 
                      stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.1)'} 
                      strokeWidth="1" />
                  </svg>
                </div>
              )}
              
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  My Skills
                </RoboticSectionTitle>
                
                <div className="max-w-3xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className={`relative ${theme === 'dark' ? 'bg-slate-700/80' : 'bg-slate-200/80'} p-3 mb-6 rounded-md ${roboticMode ? `border-l-4 ${theme === 'dark' ? 'border-cyan-400' : 'border-blue-500'}` : ''}`}>
                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center whitespace-nowrap`}>
                          {roboticMode && (
                            <span className={`inline-block w-3 h-3 mr-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                          )}
                          {roboticMode ? 'Programming' : 'Programming & Development'}
                        </h3>
                        {/* Circuit decoration - only in robotic mode */}
                        {roboticMode && (
                          <div className="absolute top-0 right-0 w-8 h-8">
                            <div className={`w-4 h-[1px] ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                            <div className={`w-[1px] h-4 ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                          </div>
                        )}
                      </div>
                      <motion.div 
                        className="space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {skills.slice(0, 4).map((skill, index) => (
                          <motion.div 
                            key={index} 
                            variants={fadeInUp} 
                            className={`mb-4 p-3 rounded-md relative ${theme === 'dark' ? 'bg-slate-700/60' : 'bg-slate-200/60'}`}
                            whileHover={{
                              boxShadow: theme === 'dark' 
                                ? '0 0 12px rgba(6, 182, 212, 0.3)' 
                                : '0 0 12px rgba(59, 130, 246, 0.2)'
                            }}
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium flex items-center gap-2">
                                {/* Small circuit node icon */}
                                <span className={`inline-block w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-400'}`}></span>
                                {skill.name}
                              </span>
                              <span className={`${theme === 'dark' ? 'text-cyan-300' : 'text-blue-500'} font-mono`}>{skill.level}%</span>
                            </div>
                            <div className={`w-full h-3 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'} p-0.5`}>
                              <motion.div 
                                className={`h-full rounded-full bg-gradient-to-r ${
                                  theme === 'dark' ? 'from-cyan-600 to-cyan-400' : 'from-blue-600 to-blue-400'
                                } relative`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 * index }}
                              >
                                {/* Small light dots along the progress bar */}
                                {[...Array(Math.floor(skill.level / 20))].map((_, i) => (
                                  <span 
                                    key={i}
                                    className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                                      theme === 'dark' ? 'bg-cyan-200' : 'bg-white'
                                    }`}
                                    style={{ left: `${(i + 1) * 20}%` }}
                                  ></span>
                                ))}
                              </motion.div>
                            </div>
                            
                            {/* Circuit corners for the tech feel */}
                            <div className="absolute top-0 left-0 w-2 h-2">
                              <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-current opacity-30"></div>
                              <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                            </div>
                            <div className="absolute top-0 right-0 w-2 h-2">
                              <div className="w-full h-[1px] bg-gradient-to-l from-transparent to-current opacity-30"></div>
                              <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    
                    <div>
                      <div className={`relative ${theme === 'dark' ? 'bg-slate-700/80' : 'bg-slate-200/80'} p-3 mb-6 rounded-md ${roboticMode ? `border-l-4 ${theme === 'dark' ? 'border-cyan-400' : 'border-blue-500'}` : ''}`}>
                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center`}>
                          {roboticMode && (
                            <span className={`inline-block w-3 h-3 mr-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                          )}
                          AI & Tools
                        </h3>
                        {/* Circuit decoration - only in robotic mode */}
                        {roboticMode && (
                          <div className="absolute top-0 right-0 w-8 h-8">
                            <div className={`w-4 h-[1px] ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                            <div className={`w-[1px] h-4 ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                          </div>
                        )}
                      </div>
                      <motion.div 
                        className="space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {skills.slice(4).map((skill, index) => (
                          <motion.div 
                            key={index} 
                            variants={fadeInUp} 
                            className={`mb-4 p-3 rounded-md relative ${theme === 'dark' ? 'bg-slate-700/60' : 'bg-slate-200/60'}`}
                            whileHover={{
                              boxShadow: theme === 'dark' 
                                ? '0 0 12px rgba(6, 182, 212, 0.3)' 
                                : '0 0 12px rgba(59, 130, 246, 0.2)'
                            }}
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium flex items-center gap-2">
                                {/* Small circuit node icon */}
                                <span className={`inline-block w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-400'}`}></span>
                                {skill.name}
                              </span>
                              <span className={`${theme === 'dark' ? 'text-cyan-300' : 'text-blue-500'} font-mono`}>{skill.level}%</span>
                            </div>
                            <div className={`w-full h-3 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'} p-0.5`}>
                              <motion.div 
                                className={`h-full rounded-full bg-gradient-to-r ${
                                  theme === 'dark' ? 'from-cyan-600 to-cyan-400' : 'from-blue-600 to-blue-400'
                                } relative`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 * index }}
                              >
                                {/* Small light dots along the progress bar */}
                                {[...Array(Math.floor(skill.level / 20))].map((_, i) => (
                                  <span 
                                    key={i}
                                    className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                                      theme === 'dark' ? 'bg-cyan-200' : 'bg-white'
                                    }`}
                                    style={{ left: `${(i + 1) * 20}%` }}
                                  ></span>
                                ))}
                              </motion.div>
                            </div>
                            
                            {/* Circuit corners for the tech feel */}
                            <div className="absolute top-0 left-0 w-2 h-2">
                              <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-current opacity-30"></div>
                              <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                            </div>
                            <div className="absolute top-0 right-0 w-2 h-2">
                              <div className="w-full h-[1px] bg-gradient-to-l from-transparent to-current opacity-30"></div>
                              <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="mt-12 flex justify-center"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div className="relative">
                      {/* Circuit connection lines to button - only in robotic mode */}
                      {roboticMode && (
                        <>
                          <div className={`absolute left-1/2 -top-10 w-[1px] h-10 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>
                          <div className={`absolute left-1/2 top-full w-[1px] h-4 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>
                          <div className={`absolute top-1/2 -left-10 h-[1px] w-10 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>
                          <div className={`absolute top-1/2 -right-10 h-[1px] w-10 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>
                          
                          {/* Circuit nodes */}
                          <div className={`absolute left-1/2 -top-10 w-3 h-3 rounded-full transform -translate-x-1/2 ${theme === 'dark' ? 'bg-cyan-500/40' : 'bg-blue-500/40'}`}></div>
                          <div className={`absolute -left-10 top-1/2 w-3 h-3 rounded-full transform -translate-y-1/2 ${theme === 'dark' ? 'bg-cyan-500/40' : 'bg-blue-500/40'}`}></div>
                          <div className={`absolute -right-10 top-1/2 w-3 h-3 rounded-full transform -translate-y-1/2 ${theme === 'dark' ? 'bg-cyan-500/40' : 'bg-blue-500/40'}`}></div>
                        </>
                      )}
                      
                      <motion.button
                        onClick={() => setShowSkillsModal(true)}
                        className={`px-10 py-4 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400'
                        } text-white font-semibold shadow-lg transition-all relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: theme === 'dark' 
                            ? "0 0 20px rgba(34, 211, 238, 0.6)" 
                            : "0 0 20px rgba(59, 130, 246, 0.6)" 
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Circuit pattern overlay */}
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '10px 10px'
                        }}></div>
                        
                        {/* Corner circuit decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4">
                          <div className="w-3 h-[1px] bg-white/40 absolute top-0 left-0"></div>
                          <div className="w-[1px] h-3 bg-white/40 absolute top-0 left-0"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-4 h-4">
                          <div className="w-3 h-[1px] bg-white/40 absolute top-0 right-0"></div>
                          <div className="w-[1px] h-3 bg-white/40 absolute top-0 right-0"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-4 h-4">
                          <div className="w-3 h-[1px] bg-white/40 absolute bottom-0 left-0"></div>
                          <div className="w-[1px] h-3 bg-white/40 absolute bottom-0 left-0"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-4 h-4">
                          <div className="w-3 h-[1px] bg-white/40 absolute bottom-0 right-0"></div>
                          <div className="w-[1px] h-3 bg-white/40 absolute bottom-0 right-0"></div>
                        </div>
                        
                        {/* Button content */}
                        <span className="flex items-center gap-3 relative z-10">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                          </svg>
                          {roboticMode ? 'VIEW_SKILL.DATA' : 'View Detailed Skills'}
                          
                          <span className={`inline-block w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-300' : 'bg-white'} animate-pulse`}></span>
                        </span>
                        
                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>
            
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
            
            {/* Projects Section */}
            <section id="projects" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300 relative overflow-hidden`}>
              {/* No hardware decorations for projects section */}
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  My Projects
                </RoboticSectionTitle>
                
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Project Cards */}
                  {/* Animal Recognizer Project */}
                  <motion.div 
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: theme === 'dark' 
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                    }}
                    className={`rounded-lg overflow-hidden shadow-lg transition-all ${
                      theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
                    }`}
                  >
                    <div className="relative">
                      <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                        <motion.img 
                          src={animalRecognizerImg} 
                          alt="Animal Recognizer Interface" 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex gap-2 justify-end">
                            <motion.a 
                              href="https://github.com/it23782518/animal-recognizer" 
                              target="_blank"
                              className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              <Github size={16} className="text-white" />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">Animal Recognizer</h3>
                        <span className="text-sm text-gray-400">Jun 2025</span>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        AI-powered animal image classification web application that identifies 64 different animal species using a custom CNN model.
                      </p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                          <li>Real-time animal recognition with TensorFlow</li>
                          <li>Next.js (TypeScript) frontend with Tailwind CSS</li>
                          <li>Python backend for ML model inference</li>
                          <li>Custom CNN model trained with Keras</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>TensorFlow</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Next.js</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>TypeScript</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Python</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>CNN</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Keras</span>
                      </div>
                      <div className="flex gap-4">
                        <motion.a 
                          href="https://github.com/it23782518/animal-recognizer" 
                          target="_blank"
                          className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                          whileHover={{ x: 5 }}
                        >
                          GitHub Repository <Github size={14} />
                        </motion.a>
                        <motion.a 
                          href="https://colab.research.google.com/drive/1Lxqs1Xpi1tqzfvkwWuF34jLmgaItbC2m?usp=sharing" 
                          target="_blank"
                          className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                          whileHover={{ x: 5 }}
                        >
                          Colab Notebook <ExternalLink size={14} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  {/* GymSync Project */}
                  <motion.div 
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: theme === 'dark' 
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                    }}
                    className={`rounded-lg overflow-hidden shadow-lg transition-all ${
                      theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
                    }`}
                  >
                    <div className="relative">
                      <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                        <motion.img 
                          src={gymSyncImg} 
                          alt="GymSync Dashboard" 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex gap-2 justify-end">
                            <motion.a 
                              href="https://mansa-brown.vercel.app/" 
                              target="_blank"
                              className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              <ExternalLink size={16} className="text-white" />
                            </motion.a>
                            <motion.a 
                              href="https://github.com/SLIIT-FacultyOfComputing/group-project-group-5" 
                              target="_blank"
                              className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              <Github size={16} className="text-white" />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">GymSync</h3>
                        <span className="text-sm text-gray-400">Feb - May 2025</span>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        Advanced Gym Management System developed for SLIIT's Object-Oriented Analysis & Design module.
                      </p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                          <li>Real-time equipment tracking & status management</li>
                          <li>Staff management with role-based access control</li>
                          <li>Appointment booking system for trainers & members</li>
                          <li>QR code integration for quick access</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>React.js</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Spring Boot</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Tailwind CSS</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>MySQL</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>RESTful APIs</span>
                      </div>
                      <div className="flex gap-4">
                        <motion.a 
                          href="https://mansa-brown.vercel.app/" 
                          target="_blank"
                          className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                          whileHover={{ x: 5 }}
                        >
                          Live Demo <ExternalLink size={14} />
                        </motion.a>
                        <motion.a 
                          href="https://github.com/SLIIT-FacultyOfComputing/group-project-group-5" 
                          target="_blank"
                          className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                          whileHover={{ x: 5 }}
                        >
                          GitHub Repository <Github size={14} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Zave Project */}
                  <motion.div 
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: theme === 'dark' 
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                    }}
                    className={`rounded-lg overflow-hidden shadow-lg transition-all ${
                      theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
                    }`}
                  >
                    <div className="relative">
                      <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                        <motion.img 
                          src={zaveImg} 
                          alt="Zave Financial Literacy App UI Design" 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex gap-2 justify-end">
                            <motion.a 
                              href="https://www.figma.com/proto/elgBua5RuTE8fNkz6IZGh7/zave?node-id=0-1&t=uhsAeFJEduhZJXO6-1" 
                              target="_blank"
                              className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              <ExternalLink size={16} className="text-white" />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">Zave - Financial Literacy App</h3>
                        <span className="text-sm text-gray-400">Mar 2025</span>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        UI design for a gamified financial literacy app tailored for GenZ users, built for InterfaceX design competition.
                      </p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                          <li>Budget & Expense Manager with analytics</li>
                          <li>Financial Quizzes with interactive modules</li>
                          <li>Leaderboards for competitive learning</li>
                          <li>Goal Tracker with progress visualization</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>UI/UX Design</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Figma</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Prototype</span>
                      </div>
                      <div className="flex gap-4">
                        <motion.a 
                          href="https://www.figma.com/proto/elgBua5RuTE8fNkz6IZGh7/zave?node-id=0-1&t=uhsAeFJEduhZJXO6-1" 
                          target="_blank"
                          className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                          whileHover={{ x: 5 }}
                        >
                          View Prototype <ExternalLink size={14} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Landmine Detection Project */}
                  <motion.div 
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: theme === 'dark' 
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                    }}
                    className={`rounded-lg overflow-hidden shadow-lg transition-all ${
                      theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
                    }`}
                  >
                    <div className="relative">
                      <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                        <motion.img 
                          src={landmineRobotImg} 
                          alt="Autonomous Landmine Detection Robot" 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex gap-2 justify-end">
                            {/* No links available for this project */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">Autonomous Landmine Detection System</h3>
                        <span className="text-sm text-gray-400">Nov 2023 - Mar 2024</span>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        A foundational landmine detection system utilizing magnetic field sensing technology and a 4WD Arduino-based robot.
                      </p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                          <li>Magnetic sensor integration for metallic landmine detection</li>
                          <li>4WD Arduino-based robot with rotating sensor arm</li>
                          <li>Real-time data visualization and alerts</li>
                          <li>Presented at Idea Spark 2 competition (SLIIT)</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Arduino</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Robotics</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>IoT</span>
                        <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Sensors</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Publications Section */}
            <section id="publications" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative`}>
              {roboticMode && <RobotDecorator type="digital-rain" />}
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  My Publications
                </RoboticSectionTitle>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Publication Items */}
                  {[
                    {
                      title: "Advancing Agriculture: A Review of UAV Technologies and Their Impact on Sustainable Farming",
                      desc: "This publication presents a comprehensive review of Unmanned Aerial Vehicle (UAV) technologies and their transformative impact on sustainable agriculture. The study explores applications in precision farming and evaluates UAV platforms, sensor integrations, and data analysis techniques.",
                      journal: "2025 International Research Conference on Smart Computing and Systems Engineering (SCSE)",
                      link: "https://ieeexplore.ieee.org/document/11031065"
                    },
                    {
                      title: "Architecture of AI Accelerators",
                      desc: "This article reviews the state of the art in AI accelerator architectures, focusing on core components like TPUs, GPUs, FPGAs, and custom ASICs. It explores architectural principles, challenges, and emerging technologies like neuromorphic computing.",
                      journal: "Researchgate, January 2025",
                      link: "https://www.researchgate.net/publication/388498081_Architecture_of_AI_Accelerators"
                    }
                  ].map((pub, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: theme === 'dark' 
                          ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                      }}
                      className={`p-6 rounded-lg shadow-md relative ${
                        theme === 'dark' ? 'bg-slate-900' : 'bg-white'
                      } ${roboticMode ? 'pulse-animation academic-glow border border-blue-500' : ''}`}
                    >
                      {roboticMode && (
                        <>
                          <div className="citation-top-left"></div>
                          <div className="citation-top-right"></div>
                          <div className="citation-bottom-left"></div>
                          <div className="citation-bottom-right"></div>
                          <div className="pulse-effect"></div>
                          <div className="highlight-line"></div>
                          <div className="citation-markers"></div>
                          <div className="citation-indicator">
                            <span className="dot"></span>
                            <span>ANALYZING RESEARCH</span>
                          </div>
                        </>
                      )}
                      <h3 className={`text-xl font-bold mb-3 ${
                        theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
                      }`}>
                        {pub.title}
                      </h3>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        {pub.desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {pub.journal}
                        </span>
                        <motion.a 
                          href={pub.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm ${
                            theme === 'dark' 
                              ? 'text-cyan-400 hover:text-cyan-300' 
                              : 'text-blue-500 hover:text-blue-700'
                          } flex items-center gap-1`}
                          whileHover={{ x: 5 }}
                        >
                          Read Paper
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
            
            {/* Certificates Section */}
            <section id="certificates" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300 relative`}>
              {roboticMode && <RobotDecorator type="binary" />}
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  Certifications
                </RoboticSectionTitle>
                
                <CertificationsDisplay theme={theme} />
              </div>
            </section>

            {/* Honors & Awards Section */}
            <section id="awards" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} transition-colors duration-300 relative`}>
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  Honors & Awards
                </RoboticSectionTitle>
                
                <div className="relative mt-10 px-4">
                  {/* Left Arrow */}
                  <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full md:hidden"
                    onClick={() => {
                      const container = document.querySelector('#awards-container');
                      container.scrollBy({ left: -300, behavior: 'smooth' });
                    }}
                    aria-label="Scroll left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  
                  {/* Right Arrow */}
                  <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/50 hover:bg-gray-800/70 text-white p-2 rounded-full md:hidden"
                    onClick={() => {
                      const container = document.querySelector('#awards-container');
                      container.scrollBy({ left: 300, behavior: 'smooth' });
                    }}
                    aria-label="Scroll right"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>

                  {/* Cards Container with Horizontal Scrolling */}
                  <div 
                    id="awards-container"
                    className="flex gap-6 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-6"
                  >
                    {/* Card 1 - CODEFEST 2024 */}
                    <motion.div 
                      className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex-shrink-0 w-full md:w-1/3 snap-center ${roboticMode ? 'robotic-card' : ''}`}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="relative h-48 cursor-pointer"
                        onClick={() => openImageModal(codefestAwardImg, 'CODEFEST 2024 Award')}
                      >
                        <img 
                          src={codefestAwardImg} 
                          alt="CODEFEST 2024 Award" 
                          className="w-full h-full object-cover object-center"
                        />
                        {roboticMode && (
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none scanner-overlay">
                            <div className="scan-line"></div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1 rounded-lg">
                            Click to view
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className={`text-2xl mr-2 ${roboticMode ? 'text-cyan-400' : theme === 'dark' ? 'text-yellow-500' : 'text-amber-500'}`}>🏆</span>
                          <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Finalist at CODEFEST 2024 – Algothon!</h3>
                        </div>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                          Issued by Sri Lanka Institute of Information Technology · Jan 2025
                        </p>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 text-sm`}>
                          Excited to share that Team ENIGMA—comprising Sandil Perera, Hesara Perera, and myself—emerged as Finalists in the Algothon under the Tertiary Category at CODEFEST 2024, organized by SLIIT, Faculty of Computing. It was an incredible experience tackling complex algorithmic challenges, collaborating as a team, and pushing our problem-solving skills to the next level.
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Card 2 - Dean's List */}
                    <motion.div 
                      className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex-shrink-0 w-full md:w-1/3 snap-center`}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <div 
                        className="relative h-48 cursor-pointer"
                        onClick={() => openImageModal(deansListAwardImg, "Dean's List Award")}
                      >
                        <img 
                          src={deansListAwardImg} 
                          alt="Dean's List Award" 
                          className="w-full h-full object-cover object-center"
                        />
                        {roboticMode && (
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none scanner-overlay">
                            <div className="scan-line"></div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1 rounded-lg">
                            Click to view
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className={`text-2xl mr-2 ${roboticMode ? 'text-cyan-400' : theme === 'dark' ? 'text-yellow-500' : 'text-amber-500'}`}>🏆</span>
                          <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Dean's List - Year 01 Semester 01 (3.7)</h3>
                        </div>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                          Issued by SLIIT · Oct 2024
                        </p>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 text-sm`}>
                          I am pleased to announce that I have been named to the Dean's List for Semester 1, achieving a GPA of 3.7 in my Computer Science program at SLIIT. This recognition reflects my commitment to academic rigor and pursuit of excellence.
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Card 3 - SliitXtreme 3.0 */}
                    <motion.div 
                      className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex-shrink-0 w-full md:w-1/3 snap-center ${roboticMode ? 'robotic-card' : ''}`}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div 
                        className="relative h-48 cursor-pointer"
                        onClick={() => openImageModal(sliitXtremeAwardImg, "SliitXtreme 3.0 Award")}
                      >
                        <img 
                          src={sliitXtremeAwardImg} 
                          alt="SliitXtreme 3.0 Award" 
                          className="w-full h-full object-cover object-center"
                        />
                        {roboticMode && (
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none scanner-overlay">
                            <div className="scan-line"></div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1 rounded-lg">
                            Click to view
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className={`text-2xl mr-2 ${roboticMode ? 'text-cyan-400' : theme === 'dark' ? 'text-yellow-500' : 'text-amber-500'}`}>🏆</span>
                          <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>5th Place - SliitXtreme 3.0</h3>
                        </div>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                          Issued by IEEE Computer Society of SLIIT
                        </p>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 text-sm`}>
                          As part of Team ENIGMA, I contributed to securing the 5th position at SLIITXtreme 3.0. This collaborative effort highlighted our team's ability to work together and solve complex coding challenges.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative overflow-hidden`}>
              {/* CPU and Hardware Components Background - Only visible in robotic theme */}
              {roboticMode && <RobotDecorator type="hardware" section="contact" />}
              
              {/* Additional Robotic Pattern Background - Only shown in robotic theme */}
              {roboticMode && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Main circuit board grid */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(to right, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
                      linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                  }}></div>
                  
                  {/* Circuit paths - horizontal */}
                  <div className="absolute top-1/3 left-0 right-0 h-[1px]" 
                    style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  <div className="absolute top-2/3 left-0 right-0 h-[1px]" 
                    style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  
                  {/* Circuit paths - vertical */}
                  <div className="absolute top-0 bottom-0 w-[1px] left-1/3" 
                    style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  <div className="absolute top-0 bottom-0 w-[1px] right-1/3" 
                    style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
                  </div>
                  
                  {/* Circuit nodes */}
                  <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  <div className="absolute top-2/3 left-1/3 w-3 h-3 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full" 
                    style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
                  </div>
                  
                  {/* Diagonal circuit traces */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    {/* Fixed SVG path format using lines instead of paths with percentage values */}
                    <line x1="0" y1="0" x2="100%" y2="100%" 
                      stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.1)'} 
                      strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" 
                      stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.1)'} 
                      strokeWidth="1" />
                  </svg>
                </div>
              )}
              
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  Contact Me
                </RoboticSectionTitle>
                
                {/* Robot decoration - only in robotic mode */}
                {roboticMode && (
                  <div className="absolute right-0 -top-16 md:right-10 lg:right-20 z-10 w-40 h-40 opacity-70 pointer-events-none">
                    {/* Robot head */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-lg border-2 border-cyan-400 flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.8) 0%, rgba(6, 182, 212, 0.2) 100%)',
                          boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)'
                        }}
                      >
                        {/* Robot eyes */}
                        <div className="flex gap-3">
                          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" 
                            style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        
                        {/* Robot antenna */}
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-1 h-5 bg-cyan-400">
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Robot body */}
                      <div className="w-16 h-8 mt-1 mx-auto border-2 border-cyan-400 rounded"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(8, 47, 73, 0.8) 0%, rgba(6, 182, 212, 0.2) 100%)',
                        }}
                      >
                        {/* Body lights */}
                        <div className="flex justify-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-blink"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                        </div>
                      </div>
                      
                      {/* Speech bubble with binary */}
                      <div className="absolute -left-24 top-2 w-24 h-16 bg-slate-800 border border-cyan-500 rounded p-2 flex items-center justify-center">
                        <div className="text-xs text-cyan-400 font-mono overflow-hidden">
                          <div className="animate-typing whitespace-nowrap">
                            01001000 01101001
                          </div>
                          <div className="animate-typing whitespace-nowrap" style={{ animationDelay: '1s' }}>
                            01001101 01110011 01100111
                          </div>
                        </div>
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-3 h-3 bg-slate-800 border-r border-t border-cyan-500"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="max-w-3xl mx-auto">
                  <motion.div 
                    className={`${
                      theme === 'dark' 
                        ? 'bg-slate-900' 
                        : 'bg-white'
                    } p-8 rounded-lg shadow-lg ${roboticMode ? 'border border-cyan-500 relative' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {roboticMode && (
                      <>
                        {/* Corner robot circuit decorations */}
                        <div className="absolute top-0 left-0 w-5 h-5">
                          <div className="w-3 h-[1px] bg-cyan-500 absolute top-0 left-0"></div>
                          <div className="w-[1px] h-3 bg-cyan-500 absolute top-0 left-0"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-5 h-5">
                          <div className="w-3 h-[1px] bg-cyan-500 absolute top-0 right-0"></div>
                          <div className="w-[1px] h-3 bg-cyan-500 absolute top-0 right-0"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-5 h-5">
                          <div className="w-3 h-[1px] bg-cyan-500 absolute bottom-0 left-0"></div>
                          <div className="w-[1px] h-3 bg-cyan-500 absolute bottom-0 left-0"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-5 h-5">
                          <div className="w-3 h-[1px] bg-cyan-500 absolute bottom-0 right-0"></div>
                          <div className="w-[1px] h-3 bg-cyan-500 absolute bottom-0 right-0"></div>
                        </div>
                        
                        {/* Top communication node */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="w-6 h-6 rounded-full bg-slate-900 border border-cyan-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                          </div>
                        </div>
                      </>
                    )}
                    <form className="space-y-6" onSubmit={handleContactSubmit}>
                      {/* Status message */}
                      {formStatus.error && (
                        <motion.div 
                          className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-red-900/30 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-700'}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                            </svg>
                            {formStatus.error}
                          </div>
                        </motion.div>
                      )}

                      {formStatus.submitted && (
                        <motion.div 
                          className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-green-900/30 border-green-800 text-green-200' : 'bg-green-50 border-green-200 text-green-700'}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                            Your message has been sent successfully! I'll get back to you soon.
                          </div>
                        </motion.div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                            {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                            {roboticMode ? 'USER_NAME' : 'Name'} *
                          </label>
                          <motion.input 
                            type="text" 
                            id="name" 
                            value={contactFormData.name}
                            onChange={handleContactInputChange}
                            required
                            className={`w-full ${
                              theme === 'dark' 
                                ? 'bg-slate-800 border-slate-700 text-white' 
                                : 'bg-slate-50 border-slate-200 text-slate-900'
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                              theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                            } ${roboticMode ? 'font-mono border-cyan-500' : ''}`}
                            placeholder="Your name" 
                            whileFocus={{ scale: 1.01 }}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                            {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                            {roboticMode ? 'USER_EMAIL' : 'Email'} *
                          </label>
                          <motion.input 
                            type="email" 
                            id="email" 
                            value={contactFormData.email}
                            onChange={handleContactInputChange}
                            required
                            className={`w-full ${
                              theme === 'dark' 
                                ? 'bg-slate-800 border-slate-700 text-white' 
                                : 'bg-slate-50 border-slate-200 text-slate-900'
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                              theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                            } ${roboticMode ? 'font-mono border-cyan-500' : ''}`}
                            placeholder="your.email@example.com"
                            whileFocus={{ scale: 1.01 }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                          {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                          {roboticMode ? 'MESSAGE_SUBJECT' : 'Subject'}
                        </label>
                        <motion.input 
                          type="text" 
                          id="subject" 
                          value={contactFormData.subject}
                          onChange={handleContactInputChange}
                          className={`w-full ${
                            theme === 'dark' 
                              ? 'bg-slate-800 border-slate-700 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                          } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                            theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                          } ${roboticMode ? 'font-mono border-cyan-500' : ''}`}
                          placeholder="Subject of your message"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                          {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                          {roboticMode ? 'MESSAGE_CONTENT' : 'Message'} *
                        </label>
                        <motion.textarea 
                          id="message" 
                          rows="5" 
                          value={contactFormData.message}
                          onChange={handleContactInputChange}
                          required
                          className={`w-full ${
                            theme === 'dark' 
                              ? 'bg-slate-800 border-slate-700 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                          } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                            theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                          } ${roboticMode ? 'font-mono border-cyan-500 relative' : ''}`}
                          placeholder={roboticMode ? "ENTER_MESSAGE_HERE..." : "Your message here..."}
                          whileFocus={{ scale: 1.01 }}
                        ></motion.textarea>
                      </div>
                      
                      <motion.button 
                        type="submit" 
                        disabled={formStatus.submitting}
                        className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all ${
                          roboticMode ? 'border border-cyan-400 relative overflow-hidden' : ''
                        } ${formStatus.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        whileHover={!formStatus.submitting ? { scale: 1.02, boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)" } : {}}
                        whileTap={!formStatus.submitting ? { scale: 0.98 } : {}}
                      >
                        {formStatus.submitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {roboticMode ? "PROCESSING..." : "Sending..."}
                          </div>
                        ) : (
                          <>
                            {roboticMode && (
                              <>
                                {/* Circuit pattern overlay */}
                                <div className="absolute inset-0 opacity-20" style={{
                                  backgroundImage: `
                                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                                  `,
                                  backgroundSize: '10px 10px'
                                }}></div>
                                
                                {/* Animated shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                
                                <span className="flex items-center justify-center gap-2 relative z-10">
                                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-200 animate-pulse"></span>
                                  SEND_MESSAGE
                                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-200 animate-pulse"></span>
                                </span>
                              </>
                            )}
                            {!roboticMode && "Send Message"}
                          </>
                        )}
                      </motion.button>
                    </form>
                    
                    <div className={`mt-10 pt-8 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} ${roboticMode ? 'relative' : ''}`}>
                      {roboticMode && (
                        <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-slate-900 px-3 py-1 border border-cyan-500 rounded-md">
                          <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            CONTACT_OPTIONS
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap justify-center gap-8">
                        <motion.a 
                          href="https://www.linkedin.com/in/dilusha-chamika/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                          } transition-colors ${
                            roboticMode ? 'border border-cyan-500 px-3 py-2 rounded-md relative' : ''
                          }`}
                          whileHover={{ 
                            scale: roboticMode ? 1.05 : 1.1,
                            boxShadow: roboticMode ? "0 0 10px rgba(6, 182, 212, 0.5)" : "none"
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {roboticMode && (
                            <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-500"></span>
                          )}
                          <Linkedin size={20} className={roboticMode ? 'text-cyan-400' : ''} />
                          <span className={roboticMode ? 'font-mono text-cyan-400' : ''}>
                            {roboticMode ? 'LINKEDIN_PROFILE' : 'LinkedIn'}
                          </span>
                        </motion.a>
                        
                        <motion.a 
                          href="https://github.com/it23782518"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                          } transition-colors ${
                            roboticMode ? 'border border-cyan-500 px-3 py-2 rounded-md relative' : ''
                          }`}
                          whileHover={{ 
                            scale: roboticMode ? 1.05 : 1.1,
                            boxShadow: roboticMode ? "0 0 10px rgba(6, 182, 212, 0.5)" : "none"
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {roboticMode && (
                            <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-500"></span>
                          )}
                          <Github size={20} className={roboticMode ? 'text-cyan-400' : ''} />
                          <span className={roboticMode ? 'font-mono text-cyan-400' : ''}>
                            {roboticMode ? 'GITHUB_REPO' : 'GitHub'}
                          </span>
                        </motion.a>
                        
                        <motion.a 
                          href="mailto:dilushachamika@gmail.com"
                          className={`flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                          } transition-colors ${
                            roboticMode ? 'border border-cyan-500 px-3 py-2 rounded-md relative' : ''
                          }`}
                          whileHover={{ 
                            scale: roboticMode ? 1.05 : 1.1,
                            boxShadow: roboticMode ? "0 0 10px rgba(6, 182, 212, 0.5)" : "none"
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {roboticMode && (
                            <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-500"></span>
                          )}
                          <Mail size={20} className={roboticMode ? 'text-cyan-400' : ''} />
                          <span className={roboticMode ? 'font-mono text-cyan-400' : ''}>
                            {roboticMode ? 'EMAIL_COM' : 'Email'}
                          </span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

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
