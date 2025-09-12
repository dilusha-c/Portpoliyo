import { useState, useEffect, useContext } from 'react'
import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Sun, Moon, ArrowUp, Github, Linkedin, Mail, ExternalLink, Cpu } from 'lucide-react'
import BootScreen from './components/BootScreen'
import CertificationsDisplay from './components/CertificationsDisplay'
import RobotDecorator from './components/RobotDecorator'
import RoboticSectionTitle from './components/RoboticSectionTitle'
import RotatingGearsCursor from './components/RotatingGearsCursor'
import BinaryMatrix from './components/BinaryMatrix'
import CircuitPaths from './components/CircuitPaths'
import LeftRobotDecoration from './components/LeftRobotDecoration'
import RobotBackgroundDecoration from './components/RobotBackgroundDecoration'
import HumanRobotDecoration from './components/HumanRobotDecoration'

import './App.css'
import './components/PublicationsScanner.css'
import './components/FuturisticText.css'
import './components/keyframe-animations.css'
import './components/SectionDivider.css'
import './components/SkillsModal.css'
import { ThemeContext } from './main.jsx'

// Import project images
import animalRecognizerImg from './assets/animal.jpg'
import gymSyncImg from './assets/GymSync.jpg'
import zaveImg from './assets/Zave UI Design.jpg'
import landmineRobotImg from './assets/robo.jpg'
import profileImg from './assets/Profile.jpg'

function App() {
  const { theme, roboticMode, toggleTheme, toggleRoboticMode } = useContext(ThemeContext)
  const [scrollY, setScrollY] = useState(0)
  const [showBootScreen, setShowBootScreen] = useState(false)
  const [portfolioVisible, setPortfolioVisible] = useState(false)
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()
  
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

  // Detect scroll position for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
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

  // Animate skills when they come into view
  useEffect(() => {
    const animateSkills = async () => {
      await controls.start({ opacity: 1, y: 0 })
    }
    animateSkills()
  }, [controls])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
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
  
  return (
    <>
      {/* Custom rotating gears cursor */}
      {roboticMode && <RotatingGearsCursor />}
      
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
                    <h4 className="text-lg font-semibold mb-3 text-cyan-500">Cloud & Infrastructure</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Virtualization & Cloud</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Docker & Containerization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>AWS Services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>CI/CD Pipelines</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className="text-lg font-semibold mb-3 text-cyan-500">AI & Machine Learning</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Machine Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Deep Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Supervised Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Artificial Neural Networks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>TensorFlow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Computer Vision</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className="text-lg font-semibold mb-3 text-cyan-500">Development & Design</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>User Experience (UX)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Tailwind CSS</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>RESTful APIs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>MySQL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Spring Boot</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Algorithms & Data Structures</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className="text-lg font-semibold mb-3 text-cyan-500">Programming Languages</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Java</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Python</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>C</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>JavaScript</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>TypeScript</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className="text-lg font-semibold mb-3 text-cyan-500">Robotics & IoT</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Arduino Programming</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Sensor Integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Drone Technology</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Embedded Systems</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className="text-lg font-semibold mb-3 text-cyan-500">Tools & Frameworks</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Git & Version Control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>React.js</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>Node.js</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span>JUnit Testing</span>
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
      
      {/* Portfolio content */}
      <AnimatePresence>
        {portfolioVisible && (
          <motion.div 
            className={`${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-300`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Progress bar */}
            <motion.div 
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 z-50"
              style={{ scaleX: scrollYProgress }}
            />

            {/* Navigation */}
            <motion.nav 
              className={`fixed w-full z-40 transition-all duration-300 ${
                scrollY > 10 
                  ? 'bg-white/10 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg' 
                  : 'bg-transparent'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto flex justify-between items-center p-4">
                <motion.h1 
                  className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Dilusha Chamika
                </motion.h1>
                <div className="hidden md:flex space-x-8">
                  {['Home', 'About', 'Projects', 'Publications', 'Certificates', 'Contact'].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-cyan-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={toggleRoboticMode}
                    className={`p-2 rounded-full ${
                      theme === 'dark' 
                        ? roboticMode ? 'bg-cyan-900/50 text-cyan-400' : 'bg-slate-800 text-gray-400' 
                        : roboticMode ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-200 text-gray-600'
                    } hover:scale-110 transition-all relative ${
                      roboticMode ? 'robot-border' : ''
                    }`}
                    whileHover={{ scale: 1.1 }}
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
                    className={`p-2 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} hover:scale-110 transition-all`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.button>
                </div>
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient-x -z-10" />
              
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
              
              {/* Left Side Robot Decoration */}
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
                      className="intro-word animate-float-text"
                      data-text="Hello,"
                      style={{ 
                        color: '#fff',
                        position: 'relative',
                        display: 'inline-block',
                        textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
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
                      className="intro-word animate-pulse-glow"
                      data-text="I'm"
                      style={{ 
                        color: '#fff',
                        position: 'relative',
                        display: 'inline-block',
                        textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
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
                      className="hero-text-word inline-block cursor-default relative font-bold name-glow-effect animate-color-shift"
                      data-text="Dilusha"
                      style={{ 
                        color: '#06b6d4',
                        textShadow: '0 0 12px rgba(6, 182, 212, 0.7), 0 0 20px rgba(6, 182, 212, 0.3)',
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
                      <span>Dilusha</span>
                    </motion.span>
                    
                    <motion.span 
                      className="hero-text-word inline-block cursor-default relative font-bold name-glow-effect animate-letter-spacing animate-color-shift"
                      data-text="Chamika"
                      style={{ 
                        color: '#3b82f6',
                        textShadow: '0 0 12px rgba(59, 130, 246, 0.7), 0 0 20px rgba(59, 130, 246, 0.3)',
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
                      <span>Chamika</span>
                      
                      {/* Digital circuit layer that appears on hover */}
                      <motion.span 
                        className="absolute inset-0 z-0 opacity-0"
                        whileHover={{ opacity: 0.3 }}
                      />
                    </motion.span>
                  </motion.div>
                </motion.h2>
                <div className="text-xl md:text-2xl text-gray-300 mb-8 h-10">
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
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download Resume
                  </motion.button>
                  <motion.button 
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    My Projects
                  </motion.button>
                </div>
                
                <motion.div 
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <a href="#about" className="text-white/50 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="m6 9 6 6 6-6"></path></svg>
                  </a>
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
                        href="#"
                        className={`border-2 ${theme === 'dark' ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400' : 'border-blue-500 text-blue-500 hover:bg-blue-500'} hover:text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2`}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download CV
                      </motion.a>
                      <motion.a 
                        href="#contact"
                        className={`${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} text-inherit font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        Contact Me
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
            
            {/* Skills Section */}
            <section id="skills" className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative`}>
              {roboticMode && <RobotDecorator type="digital-rain" />}
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  My Skills
                </RoboticSectionTitle>
                
                <div className="max-w-3xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                        Programming & Development
                      </h3>
                      <motion.div 
                        className="space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {skills.slice(0, 4).map((skill, index) => (
                          <motion.div key={index} variants={fadeInUp} className="mb-2">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}>
                              <motion.div 
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 * index }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                        AI & Tools
                      </h3>
                      <motion.div 
                        className="space-y-4"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {skills.slice(4).map((skill, index) => (
                          <motion.div key={index} variants={fadeInUp} className="mb-2">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}>
                              <motion.div 
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 * index }}
                              />
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
                    <motion.button
                      onClick={() => setShowSkillsModal(true)}
                      className={`px-8 py-3 rounded-lg ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400'
                      } text-white font-semibold shadow-lg transition-all ${
                        roboticMode ? 'relative overflow-hidden border border-cyan-500' : ''
                      }`}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {roboticMode ? (
                        <>
                          <span className="flex items-center gap-2 relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <line x1="7" y1="12" x2="17" y2="12"/>
                              <line x1="12" y1="7" x2="12" y2="17"/>
                            </svg>
                            VIEW_SKILL.DATA
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                          <div className="absolute top-0 right-0 h-full w-1 bg-cyan-400/30"></div>
                          <div className="absolute bottom-0 left-0 h-1 w-full bg-cyan-400/30"></div>
                        </>
                      ) : (
                        "View Detailed Skills"
                      )}
                    </motion.button>
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
            <section id="projects" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300 relative`}>
              {roboticMode && <RobotDecorator type="circuit" />}
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

            {/* Contact Section */}
            <section id="contact" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative`}>
              {roboticMode && <RobotDecorator type="scanner" />}
              <div className="container mx-auto relative z-10">
                <RoboticSectionTitle>
                  Contact Me
                </RoboticSectionTitle>
                
                <div className="max-w-3xl mx-auto">
                  <motion.div 
                    className={`${
                      theme === 'dark' 
                        ? 'bg-slate-900' 
                        : 'bg-white'
                    } p-8 rounded-lg shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Name</label>
                          <motion.input 
                            type="text" 
                            id="name" 
                            className={`w-full ${
                              theme === 'dark' 
                                ? 'bg-slate-800 border-slate-700 text-white' 
                                : 'bg-slate-50 border-slate-200 text-slate-900'
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                              theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                            }`}
                            placeholder="Your name" 
                            whileFocus={{ scale: 1.01 }}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email</label>
                          <motion.input 
                            type="email" 
                            id="email" 
                            className={`w-full ${
                              theme === 'dark' 
                                ? 'bg-slate-800 border-slate-700 text-white' 
                                : 'bg-slate-50 border-slate-200 text-slate-900'
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                              theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                            }`}
                            placeholder="your.email@example.com"
                            whileFocus={{ scale: 1.01 }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Subject</label>
                        <motion.input 
                          type="text" 
                          id="subject" 
                          className={`w-full ${
                            theme === 'dark' 
                              ? 'bg-slate-800 border-slate-700 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                          } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                            theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                          }`}
                          placeholder="Subject of your message"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Message</label>
                        <motion.textarea 
                          id="message" 
                          rows="5" 
                          className={`w-full ${
                            theme === 'dark' 
                              ? 'bg-slate-800 border-slate-700 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                          } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                            theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                          }`}
                          placeholder="Your message here..."
                          whileFocus={{ scale: 1.01 }}
                        ></motion.textarea>
                      </div>
                      
                      <motion.button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
                        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </form>
                    
                    <div className="mt-10 pt-8 border-t border-slate-700">
                      <div className="flex flex-wrap justify-center gap-8">
                        <motion.a 
                          href="https://www.linkedin.com/in/dilusha-chamika/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                          } transition-colors`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Linkedin size={20} />
                          <span>LinkedIn</span>
                        </motion.a>
                        
                        <motion.a 
                          href="https://github.com/it23782518"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                          } transition-colors`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={20} />
                          <span>GitHub</span>
                        </motion.a>
                        
                        <motion.a 
                          href="mailto:contact@example.com"
                          className={`flex items-center gap-2 ${
                            theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                          } transition-colors`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Mail size={20} />
                          <span>Email</span>
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
    </>
  )
}

export default App
