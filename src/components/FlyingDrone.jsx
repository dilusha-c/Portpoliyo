import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlyingDrone = ({ theme }) => {
  // Add state for detection
  const [detecting, setDetecting] = useState(false);
  
  // Toggle detection mode periodically
  useEffect(() => {
    const detectionInterval = setInterval(() => {
      setDetecting(prev => !prev);
    }, 5000);
    
    return () => clearInterval(detectionInterval);
  }, []);
  // Colors based on theme
  const colors = {
    bodyFill: theme === 'dark' ? '#334155' : '#e2e8f0',
    bodyStroke: theme === 'dark' ? '#0ea5e9' : '#0284c7',
    propeller: theme === 'dark' ? '#06b6d4' : '#38bdf8',
    light: theme === 'dark' ? '#06b6d4' : '#0ea5e9',
    accent: theme === 'dark' ? '#06b6d4' : '#0ea5e9',
    camera: theme === 'dark' ? '#1e293b' : '#94a3b8'
  };

  // Animation variants for flying left to right and back
  const flyingAnimation = {
    animate: {
      x: [0, 300, 0],
      y: [0, -20, 5, -15, 0],
      rotate: [0, 5, -3, 2, 0],
      transition: {
        x: { 
          duration: 15, 
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        },
        y: { 
          duration: 8, 
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        },
        rotate: { 
          duration: 10, 
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        }
      }
    }
  };

  return (
    <motion.div 
      className="absolute top-10 left-0 z-10 pointer-events-none"
      variants={flyingAnimation}
      animate="animate"
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
          fill={colors.camera}
          stroke={colors.bodyStroke}
          strokeWidth="0.75"
        />
        <motion.circle
          cx="30"
          cy="17"
          r={1}
          fill={colors.light}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
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
        
        {/* Propellers - with animation */}
        <motion.g
          animate={{
            rotateZ: [0, 360]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
          style={{ transformOrigin: '12px 10px' }}
        >
          <line x1="6" y1="10" x2="18" y2="10" stroke={colors.propeller} strokeWidth="1.5" />
          <line x1="12" y1="4" x2="12" y2="16" stroke={colors.propeller} strokeWidth="1.5" />
        </motion.g>
        
        <motion.g
          animate={{
            rotateZ: [0, 360]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
          style={{ transformOrigin: '12px 22px' }}
        >
          <line x1="6" y1="22" x2="18" y2="22" stroke={colors.propeller} strokeWidth="1.5" />
          <line x1="12" y1="16" x2="12" y2="28" stroke={colors.propeller} strokeWidth="1.5" />
        </motion.g>
        
        <motion.g
          animate={{
            rotateZ: [0, 360]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
          style={{ transformOrigin: '48px 10px' }}
        >
          <line x1="42" y1="10" x2="54" y2="10" stroke={colors.propeller} strokeWidth="1.5" />
          <line x1="48" y1="4" x2="48" y2="16" stroke={colors.propeller} strokeWidth="1.5" />
        </motion.g>
        
        <motion.g
          animate={{
            rotateZ: [0, 360]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
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
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
        
        <motion.circle
          cx="36"
          cy="17"
          r={1}
          fill="green"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            repeatType: 'loop',
            delay: 0.5
          }}
        />
        
        {/* Scanning Beam */}
        <motion.path
          d="M30,20 L30,25"
          stroke={colors.light}
          strokeWidth="0.75"
          strokeDasharray="1 1"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            pathLength: [0, 1, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
        
        {/* Wide Scanning Beam */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: 'loop',
            delay: 1
          }}
        >
          <motion.path
            d="M30,19 L20,28"
            stroke={colors.light}
            strokeWidth="0.5"
            strokeDasharray="1 2"
            animate={{ x: [0, 10, 0, -10, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: 'loop' 
            }}
          />
          <motion.path
            d="M30,19 L40,28"
            stroke={colors.light}
            strokeWidth="0.5"
            strokeDasharray="1 2"
            animate={{ x: [0, -10, 0, 10, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: 'loop' 
            }}
          />
          <motion.ellipse
            cx="30"
            cy="28"
            rx={10}
            ry={2}
            fill="transparent"
            stroke={colors.light}
            strokeWidth="0.5"
            strokeOpacity="0.3"
            animate={{ 
              scaleX: [1, 1.5, 1, 0.5, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: 'loop' 
            }}
          />
        </motion.g>
        
        {/* Detection Zone - only visible when detecting */}
        {detecting && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Detection Cone */}
            <motion.path
              d="M15,20 L30,75 L45,20 Z"
              fill="rgba(6, 182, 212, 0.1)"
              stroke={colors.light}
              strokeWidth="0.5"
              strokeDasharray="2 2"
              animate={{ 
                scaleY: [1, 1.1, 1, 0.9, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: 'loop' 
              }}
            />
            
            {/* Scanning Lines */}
            <motion.path
              d="M30,20 L30,70"
              stroke={colors.light}
              strokeWidth="0.5"
              strokeDasharray="1 3"
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
                pathLength: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'loop' 
              }}
            />
            
            {/* Scanning Circles */}
            {[35, 50, 65].map((y, i) => (
              <motion.circle
                key={i}
                cx="30"
                cy={y}
                r={5}
                fill="transparent"
                stroke={colors.light}
                strokeWidth="0.5"
                strokeOpacity="0.3"
                animate={{ 
                  scale: [1, 3, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: 'loop',
                  delay: i * 0.5
                }}
              />
            ))}
            
            {/* Binary Data Points */}
            {Array(10).fill(0).map((_, i) => (
              <motion.text
                key={i}
                x={Math.random() * 20 + 20}
                y={Math.random() * 40 + 30}
                fontSize="3"
                fontFamily="monospace"
                fill={colors.light}
                opacity="0.7"
                animate={{ 
                  opacity: [0, 0.7, 0],
                  y: [(Math.random() * 40 + 30), (Math.random() * 40 + 40)]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: 'loop',
                  delay: Math.random() * 2
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </motion.text>
            ))}
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
};

export default FlyingDrone;