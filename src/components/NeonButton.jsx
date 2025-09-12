import { motion } from 'framer-motion';

const NeonButton = ({ 
  children, 
  color = 'cyan', 
  onClick, 
  className = '',
  ...props 
}) => {
  const colorClasses = {
    cyan: 'bg-cyberpunk-cyan/10 text-cyberpunk-cyan border-cyberpunk-cyan hover:bg-cyberpunk-cyan/20 neon-cyan',
    purple: 'bg-cyberpunk-purple/10 text-cyberpunk-purple border-cyberpunk-purple hover:bg-cyberpunk-purple/20 neon-purple',
    green: 'bg-cyberpunk-green/10 text-cyberpunk-green border-cyberpunk-green hover:bg-cyberpunk-green/20 neon-green'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 font-exo border rounded-md transition-all duration-300 ${colorClasses[color]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default NeonButton;
