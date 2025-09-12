import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { ThemeContext } from '../main';
import './CertificationsScanner.css';

const CertificationsDisplay = ({ theme }) => {
  const { roboticMode } = useContext(ThemeContext);
  const [showMore, setShowMore] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [robotAnimating, setRobotAnimating] = useState(false);
  
  // Certificate data array
  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      desc: "Advanced knowledge of AWS cloud architecture and best practices for designing secure and scalable systems.",
      org: "Amazon Web Services",
      year: "2023",
      featured: true
    },
    {
      title: "Certified Kubernetes Administrator",
      desc: "Expert-level knowledge in managing containerized applications using Kubernetes orchestration.",
      org: "Cloud Native Computing Foundation",
      year: "2022",
      featured: true
    },
    {
      title: "Full-Stack Web Development",
      desc: "Comprehensive training in frontend and backend technologies including React, Node.js, and database systems.",
      org: "Udacity",
      year: "2021",
      featured: true
    },
    {
      title: "Machine Learning Specialist",
      desc: "Advanced training in machine learning algorithms, data analysis, and AI implementation for practical applications.",
      org: "Coursera (Stanford University)",
      year: "2020",
      featured: true
    },
    {
      title: "Certified Scrum Master",
      desc: "Expertise in Agile methodologies and Scrum framework for effective project management and team leadership.",
      org: "Scrum Alliance",
      year: "2020",
      featured: false
    },
    {
      title: "Cybersecurity Specialist",
      desc: "Training in network security, threat detection, encryption techniques, and security best practices.",
      org: "CompTIA",
      year: "2019",
      featured: false
    },
    {
      title: "Google Cloud Associate Engineer",
      desc: "Proficiency in deploying applications, monitoring operations, and managing enterprise solutions on Google Cloud.",
      org: "Google Cloud",
      year: "2022",
      featured: false
    },
    {
      title: "TensorFlow Developer Certificate",
      desc: "Demonstrated ability to build and train neural network models using TensorFlow for various deep learning applications.",
      org: "Google",
      year: "2021",
      featured: false
    }
  ];
  
  // Filter certificates
  const displayedCerts = showMore 
    ? certifications 
    : certifications.filter(cert => cert.featured);
    
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Handle certificate selection
  const handleCertClick = (cert, index) => {
    setSelectedCert(cert);
    setRobotAnimating(true);
    
    // Reset robot animation after a delay
    setTimeout(() => {
      setRobotAnimating(false);
    }, 2000);
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
        
        {/* Speech bubble */}
        {selectedCert && (
          <motion.div 
            className={`absolute -left-56 md:-left-40 top-10 w-52 md:w-64 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-white'
            } shadow-lg ${roboticMode ? 'tech-panel border-blue-500 border' : ''}`}
            initial={{ opacity: 0, scale: 0.7, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <div className={`absolute top-5 right-[-10px] transform rotate-45 w-5 h-5 ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-white'
            } ${roboticMode ? 'border-r border-t border-cyan-500' : ''}`}></div>
            
            {roboticMode ? (
              <>
                <p className="text-sm text-blue-500 font-mono font-bold mb-2">
                  <span className="inline-block w-2 h-2 bg-blue-500 mr-1 animate-pulse rounded-full"></span>
                  CERT_ANALYSIS_COMPLETE
                </p>
                <p className="text-xs font-mono text-blue-300 leading-tight">
                  ID: {selectedCert.title.substring(0, 3)}{selectedCert.org.substring(0, 3)}{selectedCert.year}<br/>
                  AUTHORITY: {selectedCert.org}<br/>
                  VALIDATION: PASSED<br/>
                  STATUS: <span className="text-green-400">VERIFIED</span>
                </p>
              </>
            ) : (
              <>
                <p className={`text-sm ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-500'} font-bold`}>
                  Great choice!
                </p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedCert.title} from {selectedCert.org} is an impressive credential!
                </p>
              </>
            )}
          </motion.div>
        )}
        
        {/* Robot reaction */}
        {robotAnimating && (
          <motion.div 
            className={`absolute -top-8 -right-8 text-2xl`}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ duration: 0.5 }}
          >
            <span role="img" aria-label="thumbs up">👍</span>
          </motion.div>
        )}
      </motion.div>

      {/* Certification cards */}
      {/* Certification cards - static grid, animated cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCerts.map((cert, index) => (
          <motion.div 
            key={index}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -5 }}
            className={`p-6 rounded-lg shadow-md transition-all relative ${
              theme === 'dark' 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-white border border-slate-200'
            } ${roboticMode ? 'scanner-animation robotic-glow border-2 border-blue-500' : ''} cursor-pointer`}
            onClick={() => handleCertClick(cert, index)}
          >
            {roboticMode && (
              <>
                <div className="scan-data-top-left"></div>
                <div className="scan-data-top-right"></div>
                <div className="scan-data-bottom-left"></div>
                <div className="scan-data-bottom-right"></div>
                <div className="scan-effect"></div>
                <div className="scan-line"></div>
                <div className="data-points"></div>
              </>
            )}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{cert.title}</h3>
              <motion.div 
                className={`${
                  theme === 'dark' ? 'bg-cyan-500/20' : 'bg-blue-500/20'
                } p-2 rounded-full`}
                whileHover={{ rotate: 15 }}
                whileTap={{ rotate: 45, scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </motion.div>
            </div>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{cert.desc}</p>
            <div className="flex justify-between items-center text-sm">
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{cert.org}</span>
              <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`}>{cert.year}</span>
            </div>
            
            {/* Scanning indicator in robotic mode */}
            {roboticMode && (
              <div className="absolute bottom-2 right-2 text-xs text-blue-500 font-mono flex items-center opacity-80">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
                SCANNING
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* View More/Less button */}
      <div className="flex justify-center mt-12">
        <motion.button
          onClick={() => setShowMore(!showMore)}
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
          
          {showMore ? (
            <>
              <span className={roboticMode ? 'font-mono' : ''}>
                {roboticMode ? 'MINIMIZE_DATA' : 'View Less'}
              </span>
              {roboticMode ? (
                <span className="flex items-center justify-center w-5 h-5">
                  <span className="animate-pulse">▲</span>
                </span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              )}
            </>
          ) : (
            <>
              <span className={roboticMode ? 'font-mono' : ''}>
                {roboticMode ? 'EXPAND_DATA' : 'View More'}
              </span>
              {roboticMode ? (
                <span className="flex items-center justify-center w-5 h-5">
                  <span className="animate-pulse">▼</span>
                </span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </>
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
    </div>
  );
};

export default CertificationsDisplay;
