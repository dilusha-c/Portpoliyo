import { motion } from 'framer-motion';
import robotImage from '../assets/robot-silhouette.png'; // You'll need to add this image to your assets

const RobotBackground = () => {
  return (
    <motion.div 
      className="fixed bottom-0 right-0 z-0 pointer-events-none opacity-40 md:opacity-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: [0.3, 0.5, 0.4, 0.5] }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
    >
      <motion.div
        animate={{
          filter: ['drop-shadow(0 0 10px rgba(6, 182, 212, 0.9))', 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.9))', 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.9))'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        <img 
          src={robotImage} 
          alt="Robot Silhouette" 
          className="h-[50vh] max-h-[500px] object-contain"
        />
      </motion.div>
      
      {/* Robot scanning effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
        style={{ height: '100%' }}
        animate={{
          top: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
      
      {/* Circuit paths */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ opacity: 0.3 }}
      >
        <motion.path 
          d="M10,30 Q30,10 50,30 T90,30"
          stroke="rgba(6, 182, 212, 0.7)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
        />
        <motion.path 
          d="M20,50 Q40,30 60,50 T80,50"
          stroke="rgba(59, 130, 246, 0.7)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', repeatDelay: 0.5 }}
        />
        <motion.path 
          d="M30,70 Q50,50 70,70 T90,70"
          stroke="rgba(6, 182, 212, 0.7)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', repeatDelay: 0.2 }}
        />
      </svg>
    </motion.div>
  );
};

export default RobotBackground;