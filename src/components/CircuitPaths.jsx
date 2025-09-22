import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const CircuitPaths = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg 
        className="absolute inset-0 w-full h-full" 
        style={{ opacity: 0.35 }}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {/* Horizontal lines */}
        <motion.line 
          x1="0%" y1="30%" x2="100%" y2="30%" 
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.9)' : 'rgba(59, 130, 246, 0.9)'} 
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 3 }}
        />
        <motion.line 
          x1="0%" y1="70%" x2="100%" y2="70%" 
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.9)' : 'rgba(59, 130, 246, 0.9)'} 
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 4 }}
        />
        
        {/* Vertical lines */}
        <motion.line 
          x1="20%" y1="0%" x2="20%" y2="100%" 
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.9)' : 'rgba(59, 130, 246, 0.9)'} 
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', repeatDelay: 5 }}
        />
        <motion.line 
          x1="80%" y1="0%" x2="80%" y2="100%" 
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.9)' : 'rgba(59, 130, 246, 0.9)'} 
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', repeatDelay: 2 }}
        />
        
        {/* Diagonal lines */}
        <motion.line 
          x1="0%" y1="0%" x2="100%" y2="100%" 
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'} 
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', repeatDelay: 6 }}
        />
        <motion.line 
          x1="100%" y1="0%" x2="0%" y2="100%" 
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'} 
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', repeatDelay: 7 }}
        />
        
        {/* Circuit nodes - reduced from 9 to 4 */}
        {[25, 75].map((x) => 
          [30, 70].map((y) => (
            <motion.circle
              key={`${x}-${y}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r={3}
              fill="none"
              stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: 'loop',
                delay: (x+y)/50, // stagger the animations
                repeatDelay: 1
              }}
            />
          ))
        )}
        
        {/* Curved connections - Using viewBox coordinates instead of percentages */}
        <motion.path 
          d="M 200 300 Q 400 100 600 300 T 800 300"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', repeatDelay: 2 }}
        />
        <motion.path 
          d="M 800 700 Q 600 900 400 700 T 200 700"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 3 }}
        />
      </svg>
    </div>
  );
};

CircuitPaths.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default CircuitPaths;