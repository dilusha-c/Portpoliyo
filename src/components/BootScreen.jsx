import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import HumanoidRobot from './HumanoidRobotSimplified';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const BootScreen = ({ onComplete }) => {
  
  // Call onComplete after boot sequence finishes (3.8s progress bar + small delay)
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4200); // 3.8s + 400ms delay for smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [onComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyberpunk-background min-h-screen overflow-hidden"
      style={{ isolation: 'isolate' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
      key="bootscreen-container"
    >
          {/* Grid background - contained within boot screen */}
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)]" 
            style={{ 
              backgroundSize: '40px 40px',
              opacity: 0.05,
              isolation: 'isolate'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          ></motion.div>
          
          {/* Enhanced glow effect */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.2)_0%,transparent_70%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          ></motion.div>
          
          {/* Digital particles */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0 
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: [0, 0.8, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3 + Math.random() * 3,
                  delay: Math.random() * 2 
                }}
              />
            ))}
          </motion.div>
          
          {/* Circuit board pattern */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="30" height="30" patternTransform="rotate(45)">
                <rect width="100%" height="100%" fill="none" />
                <path d="M0,15 h15 M15,0 v15" stroke="rgba(6,182,212,0.5)" strokeWidth="0.5" />
                <circle cx="15" cy="15" r="2" fill="rgba(6,182,212,0.7)" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#circuitPattern)" />
            </svg>
          </motion.div>
          
          {/* Robot animation section */}
          <div className="relative mb-4 md:mb-8 flex-1 flex items-center justify-center">
            {/* Humanoid Robot Animation */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <HumanoidRobot />
              
              {/* Secondary glow elements */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center space-x-12">
                <motion.div
                  className="w-6 h-6 bg-cyan-400/30 rounded-full blur-lg"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="w-6 h-6 bg-blue-400/30 rounded-full blur-lg"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Loading text with typing animation - moved higher */}
          <div className="text-center relative mt-2 md:mt-1 flex-shrink-0">
            <motion.h2 
              className="text-2xl md:text-3xl font-orbitron mb-6 text-cyan-400 typewriter" /* Increased margin-bottom from mb-4 to mb-6 */
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              Booting Portfolio of Dilusha Chamika
            </motion.h2>
            
            {/* Loading indicator with progress bar */}
            <div className="text-xl text-cyan-300 font-mono flex flex-col items-center justify-center gap-2">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading<span className="blinking-dots"></span>
              </motion.div>
              
              {/* Animated progress bar */}
              <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mt-2 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.8, ease: "easeInOut" }}
                />
                
                {/* Glowing dots on progress bar */}
                <motion.div
                  className="absolute top-0 h-full w-2 bg-white rounded-full opacity-70 blur-[1px]"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 3.8, ease: "easeInOut" }}
                />
              </div>
              
              {/* Fake loading status messages */}
              <motion.div 
                className="text-xs text-cyan-400/70 mt-1"
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, times: [0, 1], delay: 0.5 }}
              >
                Initializing systems... 
              </motion.div>
              <motion.div 
                className="text-xs text-cyan-400/70"
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, times: [0, 1], delay: 1.5 }}
              >
                Loading portfolio data...
              </motion.div>
              <motion.div 
                className="text-xs text-cyan-400/70"
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, times: [0, 1], delay: 2.5 }}
              >
                Rendering interface...
              </motion.div>
            </div>
          </div>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full scanline"></div>
          </div>
        </motion.div>
  );
};

BootScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default BootScreen;
