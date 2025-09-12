import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../main';

const RoboticModeToggle = () => {
  const { roboticMode, toggleRoboticMode, theme } = useContext(ThemeContext);
  
  return (
    <motion.div
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 p-2 pl-3 pr-3 rounded-full shadow-lg cursor-pointer
        ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'}
        ${roboticMode ? 'robot-border tech-panel' : ''}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleRoboticMode}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
    >
      <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'} ${roboticMode ? 'font-mono' : ''}`}>
        {roboticMode ? 'SYS_MODE: ROBOTIC' : 'Robotic Mode'}
      </span>
      
      <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 
        ${roboticMode ? 'bg-cyan-500' : 'bg-gray-300'}`}>
        <motion.div
          className={`absolute top-0.5 ${roboticMode ? 'right-0.5' : 'left-0.5'} w-5 h-5 rounded-full bg-white shadow-md grid place-items-center`}
          initial={false}
          animate={{ 
            x: roboticMode ? '0%' : '0%',
            left: roboticMode ? 'auto' : '0.125rem',
            right: roboticMode ? '0.125rem' : 'auto',
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {roboticMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#0891b2" viewBox="0 0 24 24">
              <path d="M22,11h-4.2c-0.3-3-2.8-5.5-5.8-5.9V2h-1v3.1c-3,0.4-5.5,2.9-5.8,5.9H1v1h4.2c0.3,3,2.8,5.5,5.8,5.9V21h1v-3.1 c3-0.4,5.5-2.9,5.8-5.9H22V11z M12,16c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S14.8,16,12,16z"/>
              <circle cx="12" cy="11" r="3" fill="#0891b2"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#64748b" viewBox="0 0 24 24">
              <path d="M20,9h-4V4H8v5H4v6h4v5h8v-5h4V9z M18,14h-4v5h-4v-5H6v-4h4V5h4v5h4V14z"/>
            </svg>
          )}
        </motion.div>
      </div>

      {roboticMode && (
        <div className="absolute -inset-1 rounded-full robot-glow opacity-70 -z-10"></div>
      )}
    </motion.div>
  );
};

export default RoboticModeToggle;