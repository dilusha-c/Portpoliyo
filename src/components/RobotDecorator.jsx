import React from 'react';
import { motion } from 'framer-motion';

const RobotDecorator = ({ type = 'default' }) => {
  // Different types of robotic decorators
  const decorators = {
    'default': (
      <motion.div className="absolute -right-4 top-0 w-8 h-full flex flex-col justify-between items-center pointer-events-none opacity-70">
        <motion.div 
          className="w-2 h-2 bg-cyan-500 rounded-full" 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div className="w-[1px] h-full bg-cyan-500/30" />
        <motion.div 
          className="w-2 h-2 bg-cyan-500 rounded-full" 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    ),
    'corner': (
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left corner */}
        <motion.div 
          className="absolute top-0 left-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute top-0 left-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
        
        {/* Top-right corner */}
        <motion.div 
          className="absolute top-0 right-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute top-0 right-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute top-0 right-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
        
        {/* Bottom-left corner */}
        <motion.div 
          className="absolute bottom-0 left-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute bottom-0 left-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute bottom-0 left-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
        
        {/* Bottom-right corner */}
        <motion.div 
          className="absolute bottom-0 right-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="absolute bottom-0 right-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute bottom-0 right-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
      </div>
    ),
    'circuit': (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
          <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="0" cy="50" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="100" cy="50" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="50" cy="0" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="50" cy="100" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <line x1="50" y1="50" x2="100" y2="50" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
            </line>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>
    ),
    'grid': (
      <div className="absolute inset-0 robot-grid pointer-events-none"></div>
    ),
    'scanner': (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"
          animate={{ top: ['-5%', '105%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        />
      </div>
    ),
    'binary': (
      <div className="absolute inset-0 binary-bg pointer-events-none"></div>
    ),
    'digital-rain': (
      <div className="absolute inset-0 digital-rain pointer-events-none"></div>
    )
  };
  
  return decorators[type] || decorators.default;
};

export default RobotDecorator;