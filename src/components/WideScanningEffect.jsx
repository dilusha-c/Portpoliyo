import { motion } from 'framer-motion';

const WideScanningEffect = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Horizontal scanning effect */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full"
        style={{
          background: `linear-gradient(90deg, 
            transparent, 
            ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.2)'}, 
            ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.1)'},
            transparent
          )`,
          backgroundSize: '200% 100%',
          backgroundPosition: '-100% 0'
        }}
        animate={{
          backgroundPosition: ['200% 0', '-100% 0']
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 8
        }}
      />
      
      {/* Wide horizontal scanning line */}
      <motion.div
        className="absolute h-24 w-full"
        style={{
          background: `linear-gradient(
            180deg,
            transparent,
            ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.4)'},
            transparent
          )`,
          boxShadow: `0 0 20px 5px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
          opacity: 0.6
        }}
        animate={{
          top: ['-24px', '100%']
        }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      
      {/* Secondary scanning line (smaller and faster) */}
      <motion.div
        className="absolute h-10 w-full"
        style={{
          background: `linear-gradient(
            180deg,
            transparent,
            ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.3)'},
            transparent
          )`,
          boxShadow: `0 0 15px 3px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
          opacity: 0.4
        }}
        animate={{
          top: ['100%', '-10px']
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 2
        }}
      />
    </div>
  );
};

export default WideScanningEffect;