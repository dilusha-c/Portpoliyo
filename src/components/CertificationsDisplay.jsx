import { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { ThemeContext } from '../contexts/ThemeContext';
import { X, Filter } from 'lucide-react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import useScrollLock from '../hooks/useScrollLock';

const certifications = [
  {
    title: "Machine Learning Specialization",
    desc: "Comprehensive training in machine learning principles, algorithms, neural networks, and AI implementation for practical applications.",
    org: "DeepLearning.AI, Stanford University",
    year: "July 2025",
    featured: true,
    category: "Machine Learning & Artificial Intelligence",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516399/certificates/el7whw9rlpjhlopay2fc.png",
    verifyUrl: "https://www.coursera.org/account/accomplishments/specialization/RXZHOBN9VT3G",
    credentialId: "RXZHOBN9VT3G"
  },
  {
    title: "Network Technician Career Path",
    desc: "Expertise in installing, configuring, and managing computer networks with a focus on Cisco networking technologies.",
    org: "Cisco",
    year: "July 2025",
    featured: true,
    category: "Networking",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758517009/certificates/ul5jntgfx0a9t8wvdfwz.png",
    verifyUrl: "https://www.credly.com/badges/178fca33-76b1-4a37-8c7e-54c58632ce85/linked_in_profile"
  },
  {
    title: "Python Programming",
    desc: "Comprehensive training in Python programming language fundamentals, data structures, and application development.",
    org: "University of Moratuwa",
    year: "2025",
    featured: true,
    category: "Programming & Development",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516393/certificates/f8fmuqzwnhr5fx1nf9s1.png",
    verifyUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
    credentialId: "oMH9LB43vl"
  },
  {
    title: "Network Addressing and Basic Troubleshooting",
    desc: "Proficiency in configuring, managing, and troubleshooting computer networks and network addressing systems.",
    org: "Cisco",
    year: "July 2025",
    featured: true,
    category: "Networking",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516394/certificates/z0xjodeh8fwoxusexkqv.png",
    verifyUrl: "https://www.credly.com/badges/1f86229e-67e7-47ca-8e6b-35bd4ba4bcbd/linked_in_profile"
  },
  // Additional certificates (not featured - will only show in popup)
  {
    title: "Python for Beginners",
    desc: "Introduction to Python programming fundamentals and basic application development concepts.",
    org: "University of Moratuwa",
    year: "2025",
    featured: false,
    category: "Programming & Development",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758527396/certificates/jtmj9amxtsckz4cbfpou.jpg",
    verifyUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
    credentialId: "XZ5PzjiA8h"
  },
  {
    title: "Networking Basics",
    desc: "Introduction to fundamental networking concepts, protocols, and architectures.",
    org: "Cisco",
    year: "December 2024",
    featured: false,
    category: "Networking",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758517008/certificates/zaxcrwyldz9lmofnb4t7.png", // Using actual image
    verifyUrl: "https://www.credly.com/badges/34838485-265b-4bd2-89a9-ad801ebbfd54/linked_in_profile"
  },
  {
    title: "Introduction to Cybersecurity",
    desc: "Foundational knowledge of cybersecurity principles, threats, and protection mechanisms.",
    org: "Cisco",
    year: "December 2024",
    featured: false,
    category: "Cybersecurity",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516397/certificates/jlmpfbdpfqg9tw4zygzl.png", // Cloudinary image
    verifyUrl: "https://www.credly.com/badges/560680a1-6111-4d9d-981e-0e03393652b9/linked_in_profile"
  },
  {
    title: "Computer Hardware Basics",
    desc: "Understanding of computer hardware components, architecture, and basic troubleshooting.",
    org: "Cisco",
    year: "December 2024",
    featured: false,
    category: "Hardware & Systems",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516395/certificates/xumpodcvj3hqn4wviqwr.png", // Cloudinary image
    verifyUrl: "https://www.credly.com/badges/4eccea92-3f13-4a37-b3c8-d92bfcfeba0a/linked_in_profile"
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    desc: "Deep dive into regression and classification algorithms for supervised machine learning applications.",
    org: "DeepLearning.AI",
    year: "April 2025",
    featured: false,
    category: "Machine Learning & Artificial Intelligence",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758527152/certificates/z0qqppcaexoa72jvdbpv.png",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/I45GXQQBSC5Z",
    credentialId: "I45GXQQBSC5Z"
  },
  {
    title: "Advanced Learning Algorithms",
    desc: "Exploration of sophisticated learning algorithms and their implementation in complex AI systems.",
    org: "DeepLearning.AI, Stanford University",
    year: "June 2025",
    featured: false,
    category: "Machine Learning & Artificial Intelligence",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516022/certificates/q1lfwztttapesjgqixdo.png", // Cloudinary image
    verifyUrl: "https://www.coursera.org/account/accomplishments/records/EF66Q4ALMHWF",
    credentialId: "EF66Q4ALMHWF"
  },
  {
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    desc: "Advanced techniques in unsupervised learning, recommendation systems, and reinforcement learning strategies.",
    org: "DeepLearning.AI, Stanford University",
    year: "July 2025",
    featured: false,
    category: "Machine Learning & Artificial Intelligence",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758527295/certificates/ntj0dkomgzdc3unmcriu.png",
    verifyUrl: "https://www.coursera.org/account/accomplishments/records/6P89GUDLPVIZ",
    credentialId: "6P89GUDLPVIZ"
  },
  {
    title: "Networking Devices and Initial Configuration",
    desc: "Configuring and managing network devices with focus on initial setup and basic connectivity.",
    org: "Cisco",
    year: "July 2025",
    featured: false,
    category: "Networking",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758517010/certificates/cnsfawyod1rl0lnmz181.png", // Using actual image
    verifyUrl: "https://www.credly.com/badges/9f0a16a1-e2c5-4b12-b90e-1947ad035077/public_url"
  },
  {
    title: "Network Support and Security",
    desc: "Advanced techniques for network support, troubleshooting, and implementing security measures.",
    org: "Cisco",
    year: "July 2025",
    featured: false,
    category: "Networking",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516398/certificates/rtppm0cfbesv7blrb3lw.png", // Cloudinary image
    verifyUrl: "https://www.credly.com/badges/42c4c480-d55e-46df-ae89-7cd02c02a811/linked_in_profile"
  },
  {
    title: "Endpoint Security",
    desc: "Specialized training in securing endpoint devices and protecting against modern security threats.",
    org: "Cisco",
    year: "August 2025",
    featured: false,
    category: "Cybersecurity",
    imageUrl: "https://res.cloudinary.com/dgthdmczs/image/upload/v1758516396/certificates/np1oxw9m1bnhvlwushwq.png", // Cloudinary image
    verifyUrl: "https://www.credly.com/badges/3d6c192f-ed41-43f1-9418-4611a2005b04/linked_in_profile"
  }
];

const CertificationsDisplay = ({ theme }) => {
  const { roboticMode } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const modalContentRef = useRef(null);
  
  // For certificate image popup
  const [showCertImageModal, setShowCertImageModal] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState(null);
  const certImageModalRef = useRef(null);
  
  // Filter certifications based on selected category
  const filteredCerts = selectedCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);
  
  // Display only featured certificates (first 4)
  const displayedCerts = certifications.filter(cert => cert.featured);
  
  // Categories for filtering
  const categories = ['All', 'Machine Learning & Artificial Intelligence', 'Programming & Development', 'Networking', 'Cybersecurity', 'Hardware & Systems'];
  
  // Handle opening the full certificates modal
  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  // Handle viewing certificate image
  const handleViewCertificate = (cert, e) => {
    e?.stopPropagation();
    setSelectedCertImage(cert);
    setShowCertImageModal(true);
  };
  
  // Handle verifying certificate
  const handleVerifyCertificate = (cert, e) => {
    e?.stopPropagation();
    window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
  };
  
  // Use the custom hook to handle scroll locking for both modals
  // Only restore scroll position when both modals are closed
  useScrollLock(showModal || showCertImageModal);
  
  // Listen for Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showCertImageModal) {
          setShowCertImageModal(false);
        } else if (showModal) {
          setShowModal(false);
        }
      }
    };

    if (showModal || showCertImageModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, showCertImageModal]);
    
  // Animation variants
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Animation properties for modal are now defined inline

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="relative">
      {/* Robot animation */}
      <motion.div 
        className="absolute -top-16 -right-16 md:right-0 lg:right-0 z-10 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, duration: 1, delay: 0.5 }}
      >
        <Player
          autoplay
          loop
          src="/animations/robot-assistant.json"
          className="w-full h-full"
        />
      </motion.div>

      {/* Certification cards */}
      {/* Certification cards - static grid, animated cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {displayedCerts.map((cert, index) => (
          <motion.div 
            key={index}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -5 }}
            className={`p-6 rounded-lg shadow-md transition-all relative h-full flex flex-col ${
              theme === 'dark' 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-white border border-slate-200'
            } ${roboticMode ? 'border-2 border-blue-500' : ''}`}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap">
              <h3 className={`text-xl font-bold w-full mb-2 min-h-[3rem] flex items-start ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{cert.title}</h3>
              <motion.div 
                className={`${
                  theme === 'dark' ? 'bg-cyan-500/20' : 'bg-blue-500/20'
                } p-2 rounded-full`}
                whileHover={{ rotate: 15 }}
                whileTap={{ rotate: 45, scale: 0.9 }}
              >
                {cert.category === "Machine Learning & Artificial Intelligence" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : cert.category === "Programming & Development" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ) : cert.category === "Networking" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )}
              </motion.div>
            </div>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3 flex-grow min-h-[4.5rem] font-medium`}>{cert.desc}</p>
            <div className="flex justify-between items-center text-sm mb-4">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>{cert.org}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                  theme === 'dark' 
                    ? 'bg-slate-700 text-cyan-300' 
                    : 'bg-blue-100 text-blue-700'
                } ${roboticMode && cert.category === "Programming & Development" ? 'whitespace-nowrap' : ''}`}>
                  {roboticMode && cert.category === "Programming & Development" ? 'Programming&Dev' : cert.category}
                </span>
                <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} font-semibold`}>{cert.year}</span>
              </div>
            </div>
            
            {/* View and Verify buttons */}
            <div className="flex justify-between gap-2 mt-auto">
              <button
                onClick={(e) => handleViewCertificate(cert, e)}
                className={`flex items-center justify-center px-3 py-2 rounded text-sm font-semibold ${
                  theme === 'dark'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-900/30'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                } ${roboticMode ? 'border border-blue-500 font-mono' : ''} transition-colors flex-1`}
              >
                {roboticMode ? 'VIEW_CERT' : 'View Certificate'}
              </button>
              <button
                onClick={(e) => handleVerifyCertificate(cert, e)}
                className={`flex items-center justify-center px-3 py-2 rounded text-sm font-semibold ${
                  theme === 'dark'
                    ? 'bg-slate-700 hover:bg-slate-600 text-cyan-300 border border-cyan-600 shadow-md shadow-cyan-900/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-blue-700 border border-blue-500 shadow-md'
                } ${roboticMode ? 'border border-blue-500 font-mono' : ''} transition-colors flex-1`}
              >
                {roboticMode ? 'VERIFY' : 'Verify'}
              </button>
            </div>
          </motion.div>
        ))}

      </div>
      
      {/* View All button - only show if there are more certificates than displayed */}
      {certifications.length > 4 && (
        <div className="flex justify-center mt-12">
          <motion.button
            type="button"
            onClick={handleOpenModal}
            className={`flex items-center gap-2 py-2 px-6 rounded-lg ${
              theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700'
                : 'bg-white hover:bg-slate-100 text-blue-500 border border-slate-200'
            } ${roboticMode ? 'robot-border tech-panel relative overflow-hidden blue-tech-panel' : ''} transition-colors shadow-md`}
            whileHover={roboticMode ? {} : { scale: 1.05 }}
            whileTap={roboticMode ? {} : { scale: 0.95 }}
          >
            {roboticMode && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2">
                  <div className="w-1 h-[1px] bg-blue-500"></div>
                  <div className="w-[1px] h-1 bg-blue-500"></div>
                </div>
                <div className="absolute top-0 right-0 w-2 h-2">
                  <div className="w-1 h-[1px] bg-blue-500 ml-1"></div>
                  <div className="w-[1px] h-1 bg-blue-500 ml-1"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-2 h-2">
                  <div className="w-1 h-[1px] bg-blue-500 mt-1"></div>
                  <div className="w-[1px] h-1 bg-blue-500 mt-1"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-2 h-2">
                  <div className="w-1 h-[1px] bg-blue-500 ml-1 mt-1"></div>
                  <div className="w-[1px] h-1 bg-blue-500 ml-1 mt-1"></div>
                </div>
              </div>
            )}
            
            <span className={roboticMode ? 'font-mono' : ''}>
              {roboticMode ? 'VIEW_ALL_CERTIFICATES' : 'View All Certificates'}
            </span>
            {roboticMode ? (
              <span className="flex items-center justify-center w-5 h-5">
                <span className="animate-pulse">▶</span>
              </span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            
            {roboticMode && (
              <div className="absolute inset-y-0 right-0 w-1 bg-blue-500/20 overflow-hidden">
                <div className="h-full w-full relative">
                  <div className="absolute inset-0 data-lines"></div>
                </div>
              </div>
            )}
          </motion.button>
        </div>
      )}
      
      {/* Certificates Modal - Direct implementation without AnimatePresence + Portal combination */}
      {showModal && createPortal(
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center p-4 cert-modal-overlay" 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => {
              console.log("Modal backdrop clicked");
              setShowModal(false);
            }}
          >
            <motion.div 
              ref={modalContentRef}
              className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl ${
                theme === 'dark' ? 'bg-slate-900' : 'bg-white'
              } ${roboticMode ? 'border-2 border-blue-500' : 'border border-slate-300'} shadow-2xl`}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                className={`absolute top-4 right-4 p-3 rounded-full ${
                  theme === 'dark' ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                } hover:bg-red-500 hover:text-white transition-colors z-10`}
                onClick={() => setShowModal(false)}
                aria-label="Close certificates modal"
              >
                <X size={20} />
              </button>
              
              {/* Modal header */}
              <div className={`px-6 py-5 border-b ${
                theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
              } rounded-t-xl`}>
                <h2 className={`text-xl md:text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                } ${roboticMode ? 'font-mono' : ''}`}>
                  {roboticMode ? '[CERTIFICATE_INVENTORY]' : 'All Certificates'}
                </h2>
                <p className={`mt-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                } ${roboticMode ? 'font-mono text-sm' : ''}`}>
                  {roboticMode ? 'SELECT_CATEGORY_TO_FILTER' : 'Select a category to filter certificates'}
                </p>
              </div>
              
              {/* Category filters */}
              <div className={`flex flex-wrap gap-2 p-4 ${
                theme === 'dark' ? 'bg-slate-800 border-b border-slate-700' : 'bg-slate-50 border-b border-slate-200'
              }`}>
                {categories.map(category => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-full text-sm flex items-center gap-1 ${
                      selectedCategory === category 
                        ? (theme === 'dark' 
                            ? 'bg-cyan-500 text-white' 
                            : 'bg-blue-500 text-white')
                        : (theme === 'dark' 
                            ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                            : 'bg-slate-200 text-gray-700 hover:bg-slate-300')
                    } ${roboticMode ? 'font-mono' : ''}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {category === 'All' && (
                      <Filter size={14} className="inline-block" />
                    )}
                    {roboticMode && category === "Programming & Development" ? 'Programming&Dev' : category}
                    <span className={`text-xs ml-1 ${
                      selectedCategory === category 
                        ? (theme === 'dark' ? 'bg-cyan-600' : 'bg-blue-600')
                        : (theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300')
                    } px-1.5 rounded-full`}>
                      {category === 'All'
                        ? certifications.length
                        : certifications.filter(cert => cert.category === category).length
                      }
                    </span>
                  </motion.button>
                ))}
              </div>
              

              {/* Certificates grid */}
              <div className="p-6">
                {filteredCerts.length === 0 ? (
                  <div className={`p-10 text-center ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    No certificates in this category.
                  </div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredCerts.map((cert, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className={`p-5 rounded-lg shadow-md h-full flex flex-col ${
                          theme === 'dark' 
                            ? 'bg-slate-800 border border-slate-700' 
                            : 'bg-white border border-slate-200'
                        } ${roboticMode ? 'border-2 border-blue-500' : ''}`}
                      >
                        
                        <div className="flex items-center justify-between mb-3 flex-wrap">
                          <h3 className={`text-lg font-bold w-full mb-2 min-h-[3rem] flex items-start ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            {cert.title}
                          </h3>
                          <motion.div 
                            className={`${
                              theme === 'dark' ? 'bg-cyan-500/20' : 'bg-blue-500/20'
                            } p-1.5 rounded-full`}
                            whileHover={{ rotate: 15 }}
                            whileTap={{ rotate: 45, scale: 0.9 }}
                          >
                            {cert.category === "Machine Learning & Artificial Intelligence" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : cert.category === "Programming & Development" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  ) : cert.category === "Networking" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  ) : cert.category === "Cybersecurity" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ) : cert.category === "Hardware & Systems" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  )}
                          </motion.div>
                        </div>
                        
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3 text-sm flex-grow min-h-[4.5rem] font-medium`}>
                          {cert.desc}
                        </p>
                        
                        <div className="flex justify-between items-center text-sm mb-4">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                            {cert.org}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                              theme === 'dark' 
                                ? 'bg-slate-700 text-cyan-300' 
                                : 'bg-blue-100 text-blue-700'
                            } ${roboticMode && cert.category === "Programming & Development" ? 'whitespace-nowrap' : ''}`}>
                              {roboticMode && cert.category === "Programming & Development" ? 'Programming&Dev' : cert.category}
                            </span>
                            <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} font-semibold`}>
                              {cert.year}
                            </span>
                          </div>
                        </div>
                        
                        {/* View and Verify buttons */}
                        <div className="flex justify-between gap-2 mt-auto">
                          <button
                            onClick={() => handleViewCertificate(cert)}
                            className={`flex items-center justify-center px-3 py-2 rounded text-sm font-semibold ${
                              theme === 'dark'
                                ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-900/30'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                            } ${roboticMode ? 'border border-blue-500 font-mono' : ''} transition-colors flex-1`}
                          >
                            {roboticMode ? 'VIEW_CERT' : 'View Certificate'}
                          </button>
                          <button
                            onClick={() => handleVerifyCertificate(cert)}
                            className={`flex items-center justify-center px-3 py-2 rounded text-sm font-semibold ${
                              theme === 'dark'
                                ? 'bg-slate-700 hover:bg-slate-600 text-cyan-300 border border-cyan-600 shadow-md shadow-cyan-900/20'
                                : 'bg-slate-100 hover:bg-slate-200 text-blue-700 border border-blue-500 shadow-md'
                            } ${roboticMode ? 'border border-blue-500 font-mono' : ''} transition-colors flex-1`}
                          >
                            {roboticMode ? 'VERIFY' : 'Verify'}
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>,
          document.body
        )}
        
        {/* Certificate Image Modal */}
        {showCertImageModal && selectedCertImage && createPortal(
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center p-4" 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => {
              console.log("Certificate image modal backdrop clicked");
              setShowCertImageModal(false);
            }}
          >
            <motion.div 
              ref={certImageModalRef}
              className={`relative max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-4 ${
                theme === 'dark' ? 'bg-slate-900' : 'bg-white'
              } ${roboticMode ? 'border-2 border-blue-500' : 'border border-slate-300'} shadow-2xl`}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                className={`absolute top-4 right-4 p-3 rounded-full ${
                  theme === 'dark' ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                } hover:bg-red-500 hover:text-white transition-colors z-10`}
                onClick={() => setShowCertImageModal(false)}
                aria-label="Close certificate image modal"
              >
                <X size={20} />
              </button>
              
              <div className={`p-4 ${
                roboticMode ? 'tech-panel border border-blue-500' : ''
              }`}>
                <h3 className={`text-xl mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                } ${roboticMode ? 'font-mono text-blue-400' : 'font-bold'}`}>
                  {roboticMode ? '[CREDENTIAL_DETAIL]' : 'Certificate Preview'}
                </h3>
                
                {/* Certificate image */}
                <div className={`rounded-lg overflow-hidden mb-4 ${
                  roboticMode ? 'border border-blue-500' : 'border border-slate-300'
                } cert-image-container`}>
                  <img 
                    src={selectedCertImage.imageUrl} 
                    alt={`${selectedCertImage.title} Certificate`}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = machineLearningImg;
                      console.log("Certificate image failed to load, using fallback image");
                    }}
                  />
                </div>
                
                {/* Certificate details */}
                <div className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                } ${roboticMode ? 'font-mono text-sm' : ''}`}>
                  <h4 className={`text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  } ${roboticMode ? 'text-blue-400' : 'font-bold'}`}>
                    {selectedCertImage.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-y-2 mt-2">
                    <div className="flex items-center w-full sm:w-1/2">
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mr-2 font-semibold`}>
                        {roboticMode ? 'ISSUER:' : 'Issued by:'}
                      </span>
                      <span className="font-medium">{selectedCertImage.org}</span>
                    </div>
                    <div className="flex items-center w-full sm:w-1/2">
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mr-2 font-semibold`}>
                        {roboticMode ? 'DATE:' : 'Issued:'}
                      </span>
                      <span className="font-medium">{selectedCertImage.year}</span>
                    </div>
                    <div className="flex items-center w-full">
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mr-2 font-semibold`}>
                        {roboticMode ? 'CATEGORY:' : 'Category:'}
                      </span>
                      <span className={`${theme === 'dark' ? 'text-cyan-300' : 'text-blue-600'} font-medium`}>
                        {roboticMode && selectedCertImage.category === "Programming & Development" ? 'Programming&Dev' : selectedCertImage.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`mt-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{selectedCertImage.desc}</p>
                  
                  {/* Verification button */}
                  <div className="mt-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(selectedCertImage.verifyUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className={`flex items-center justify-center px-6 py-3 rounded-lg ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg'
                      } ${roboticMode ? 'font-mono' : 'font-semibold text-base'} transition-colors w-full sm:w-auto`}
                    >
                      {roboticMode ? (
                        <>
                          <span className="mr-2">VERIFY_CREDENTIAL</span>
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-4.438 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verify Certificate
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {roboticMode && (
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 left-0 w-3 h-3">
                      <div className="w-2 h-[1px] bg-blue-500"></div>
                      <div className="w-[1px] h-2 bg-blue-500"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-3 h-3">
                      <div className="w-2 h-[1px] bg-blue-500 ml-1"></div>
                      <div className="w-[1px] h-2 bg-blue-500 ml-2"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-3 h-3">
                      <div className="w-2 h-[1px] bg-blue-500 mt-2"></div>
                      <div className="w-[1px] h-2 bg-blue-500 mt-1"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3">
                      <div className="w-2 h-[1px] bg-blue-500 ml-1 mt-2"></div>
                      <div className="w-[1px] h-2 bg-blue-500 ml-2 mt-1"></div>
                    </div>
                    <div className="data-points"></div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  );
};

CertificationsDisplay.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default CertificationsDisplay;
