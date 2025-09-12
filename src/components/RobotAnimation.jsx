import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import robotAnimation from '../assets/robot-animation.json';

const RobotAnimation = () => {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        repeatType: "reverse" 
      }}
    >
      {/* The Lottie animation */}
      <div className="w-72 h-72">
        <Player
          autoplay
          loop
          src={robotAnimation}
          className="w-full h-full"
        />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scanline h-full w-full"></div>
      </div>

      {/* Glowing circle underneath */}
      <motion.div 
        className="absolute bottom-0 left-1/2 w-40 h-8 bg-cyberpunk-cyan/20 rounded-full blur-xl -z-10"
        style={{ translateX: "-50%" }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </motion.div>
  );
};

export default RobotAnimation;
