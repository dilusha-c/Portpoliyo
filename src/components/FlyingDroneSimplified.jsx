import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const FlyingDrone = ({ theme }) => {
  // Simple detection toggle
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    const detectionInterval = setInterval(() => {
      setDetecting(prev => !prev);
    }, 5000);

    return () => clearInterval(detectionInterval);
  }, []);

  const colors = {
    bodyFill: theme === 'dark' ? '#334155' : '#e2e8f0',
    bodyStroke: theme === 'dark' ? '#0ea5e9' : '#0284c7',
    propeller: theme === 'dark' ? '#06b6d4' : '#38bdf8',
    light: theme === 'dark' ? '#06b6d4' : '#0ea5e9'
  };

  return (
    <motion.div
      className="absolute top-10 left-0 z-10 pointer-events-none"
      animate={{
        x: [0, 300, 0],
        y: [0, -20, 5, -15, 0],
        rotate: [0, 5, -3, 2, 0]
      }}
      transition={{
        x: { duration: 15, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
        y: { duration: 8, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
        rotate: { duration: 10, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }
      }}
    >
      <svg width="60" height={detecting ? "80" : "30"} viewBox={`0 0 60 ${detecting ? 80 : 30}`}>
        {/* Drone Body */}
        <motion.rect
          x="22"
          y="12"
          width="16"
          height="10"
          rx="3"
          fill={colors.bodyFill}
          stroke={colors.bodyStroke}
          strokeWidth="1.5"
        />

        {/* Camera/Sensor */}
        <motion.circle
          cx="30"
          cy="17"
          r={3}
          fill={colors.camera || '#1e293b'}
          stroke={colors.bodyStroke}
          strokeWidth="0.75"
        />
        <motion.circle
          cx="30"
          cy="17"
          r={1}
          fill={colors.light}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
        />

        {/* Arms */}
        <line x1="22" y1="14" x2="12" y2="10" stroke={colors.bodyStroke} strokeWidth="1.5" />
        <line x1="22" y1="18" x2="12" y2="22" stroke={colors.bodyStroke} strokeWidth="1.5" />
        <line x1="38" y1="14" x2="48" y2="10" stroke={colors.bodyStroke} strokeWidth="1.5" />
        <line x1="38" y1="18" x2="48" y2="22" stroke={colors.bodyStroke} strokeWidth="1.5" />

        {/* Propeller Mounts */}
        <circle cx="12" cy="10" r={2} fill={colors.bodyFill} stroke={colors.bodyStroke} strokeWidth="1" />
        <circle cx="12" cy="22" r={2} fill={colors.bodyFill} stroke={colors.bodyStroke} strokeWidth="1" />
        <circle cx="48" cy="10" r={2} fill={colors.bodyFill} stroke={colors.bodyStroke} strokeWidth="1" />
        <circle cx="48" cy="22" r={2} fill={colors.bodyFill} stroke={colors.bodyStroke} strokeWidth="1" />

        {/* Propellers - simplified */}
        <motion.g
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
          style={{ transformOrigin: '12px 10px' }}
        >
          <line x1="6" y1="10" x2="18" y2="10" stroke={colors.propeller} strokeWidth="1.5" />
          <line x1="12" y1="4" x2="12" y2="16" stroke={colors.propeller} strokeWidth="1.5" />
        </motion.g>

        <motion.g
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
          style={{ transformOrigin: '12px 22px' }}
        >
          <line x1="6" y1="22" x2="18" y2="22" stroke={colors.propeller} strokeWidth="1.5" />
          <line x1="12" y1="16" x2="12" y2="28" stroke={colors.propeller} strokeWidth="1.5" />
        </motion.g>

        <motion.g
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
          style={{ transformOrigin: '48px 10px' }}
        >
          <line x1="42" y1="10" x2="54" y2="10" stroke={colors.propeller} strokeWidth="1.5" />
          <line x1="48" y1="4" x2="48" y2="16" stroke={colors.propeller} strokeWidth="1.5" />
        </motion.g>

        <motion.g
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
          style={{ transformOrigin: '48px 22px' }}
        >
          <line x1="42" y1="22" x2="54" y2="22" stroke={colors.propeller} strokeWidth="1.5" />
          <line x1="48" y1="16" x2="48" y2="28" stroke={colors.propeller} strokeWidth="1.5" />
        </motion.g>

        {/* Status Lights */}
        <motion.circle
          cx="24"
          cy="17"
          r={1}
          fill="red"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
        />

        <motion.circle
          cx="36"
          cy="17"
          r={1}
          fill="green"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'loop', delay: 0.5 }}
        />

        {/* Simple scanning beam */}
        <motion.path
          d="M30,20 L30,25"
          stroke={colors.light}
          strokeWidth="0.75"
          strokeDasharray="1 1"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        />

        {/* Detection Zone - simplified */}
        {detecting && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Simple detection cone */}
            <motion.path
              d="M15,20 L30,75 L45,20 Z"
              fill="rgba(6, 182, 212, 0.1)"
              stroke={colors.light}
              strokeWidth="0.5"
              strokeDasharray="2 2"
              animate={{ scaleY: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
            />

            {/* Simple scanning line */}
            <motion.path
              d="M30,20 L30,70"
              stroke={colors.light}
              strokeWidth="0.5"
              strokeDasharray="1 3"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
            />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
};

FlyingDrone.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default FlyingDrone;