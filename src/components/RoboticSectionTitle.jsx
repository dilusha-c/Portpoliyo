import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';
import PropTypes from 'prop-types';

const RoboticSectionTitle = ({ children }) => {
  const { roboticMode } = useContext(ThemeContext);
  
  if (!roboticMode) {
    return (
      <motion.h2 
        className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h2>
    );
  }
  
  return (
    <motion.div
      className="relative mb-16 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Top decorative line */}
      <div className="flex items-center w-full max-w-xs mb-4">
        <motion.div 
          className="h-[2px] bg-cyan-500 flex-grow"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
        />
        <motion.div 
          className="w-4 h-4 mx-2 bg-cyberpunk-background border-2 border-cyan-500 rotate-45"
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="h-[2px] bg-cyan-500 flex-grow"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
        />
      </div>
      
      {/* Title with robotic effect */}
      <motion.h2 
        data-text={children}
        className="robot-glitch-text text-3xl font-orbitron font-bold text-cyan-500 text-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.h2>
      
      {/* Digital circuit indicator */}
      <div className="mt-4 flex items-center justify-center">
        <motion.div 
          className="w-2 h-2 rounded-full bg-cyan-500"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="h-[1px] w-12 bg-cyan-500 mx-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
        <motion.div 
          className="w-3 h-3 rounded-full border border-cyan-500"
          animate={{ borderWidth: ["1px", "2px", "1px"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="h-[1px] w-12 bg-cyan-500 mx-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-cyan-500"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

RoboticSectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoboticSectionTitle;