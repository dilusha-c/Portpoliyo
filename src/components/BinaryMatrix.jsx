import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BinaryMatrix = () => {
  const [matrix, setMatrix] = useState([]);
  
  // Create the initial binary matrix
  useEffect(() => {
    // Determine columns and rows based on window size
    const columns = Math.floor(window.innerWidth / 20); // 20px spacing
    const rows = Math.floor(window.innerHeight / 30); // 30px spacing
    
    const newMatrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        // Each cell has a random binary digit, opacity, and animation delay
        row.push({
          value: Math.random() > 0.5 ? '1' : '0',
          opacity: Math.random() * 0.5 + 0.1, // Between 0.1 and 0.6
          delay: Math.random() * 5, // Random delay for animation
          key: `${i}-${j}`
        });
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
    
    // Handle window resize
    const handleResize = () => {
      const columns = Math.floor(window.innerWidth / 20);
      const rows = Math.floor(window.innerHeight / 30);
      
      const newMatrix = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          row.push({
            value: Math.random() > 0.5 ? '1' : '0',
            opacity: Math.random() * 0.5 + 0.1,
            delay: Math.random() * 5,
            key: `${i}-${j}`
          });
        }
        newMatrix.push(row);
      }
      setMatrix(newMatrix);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Change random digits periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMatrix(prevMatrix => 
        prevMatrix.map(row => 
          row.map(cell => ({
            ...cell,
            value: Math.random() > 0.8 ? (cell.value === '1' ? '0' : '1') : cell.value // 20% chance to flip
          }))
        )
      );
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {matrix.map((row, i) => (
        <div key={`row-${i}`} className="flex justify-center">
          {row.map((cell) => (
            <motion.div
              key={cell.key}
              className="text-cyan-400 font-mono text-sm sm:text-base md:text-lg select-none"
              style={{ 
                opacity: cell.opacity * 1.5, // Increase opacity
                margin: '0 10px',
                textShadow: '0 0 8px rgba(6, 182, 212, 0.9)'
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [cell.opacity, cell.opacity * 1.5, cell.opacity], 
              }}
              transition={{ 
                duration: 2,
                delay: cell.delay,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            >
              {cell.value}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BinaryMatrix;