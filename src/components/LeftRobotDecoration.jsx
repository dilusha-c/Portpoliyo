import { motion } from 'framer-motion';

const LeftRobotDecoration = ({ theme }) => {
  return (
    <motion.div
      className="fixed left-0 top-1/4 h-1/2 w-32 md:w-48 lg:w-64 pointer-events-none z-0"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 0.4 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      {/* Robot head */}
      <svg 
        viewBox="0 0 100 200" 
        className="w-full h-full"
        style={{ 
          filter: `drop-shadow(0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.6)' : 'rgba(59, 130, 246, 0.6)'})`
        }}
      >
        {/* Robot body structure */}
        <motion.path
          d="M30,70 L30,140 L70,140 L70,70 Z"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />

        {/* Robot head */}
        <motion.rect
          x="35" y="40" width="30" height="30"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />

        {/* Robot neck */}
        <motion.path
          d="M45,70 L45,75 L55,75 L55,70"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2 }}
        />
        
        {/* Robot eyes */}
        <motion.circle
          cx="43" cy="55" r="3"
          fill={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1] }}
          transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 5 }}
        />
        
        <motion.circle
          cx="57" cy="55" r="3"
          fill={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1] }}
          transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 5 }}
        />
        
        {/* Robot arms */}
        <motion.path
          d="M30,85 L15,100 L15,120"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        />
        
        <motion.path
          d="M70,85 L85,100 L85,120"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        />
        
        {/* Robot legs */}
        <motion.path
          d="M40,140 L40,170 L30,180"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
        />
        
        <motion.path
          d="M60,140 L60,170 L70,180"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
        />
        
        {/* Circuit patterns */}
        <motion.path
          d="M40,100 L60,100 M40,110 L60,110 M40,120 L60,120"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 3.5 }}
        />
        
        {/* Scanning effect */}
        <motion.rect
          x="35" y="40" width="30" height="100"
          fill={theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 140, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </svg>
    </motion.div>
  );
};

export default LeftRobotDecoration;