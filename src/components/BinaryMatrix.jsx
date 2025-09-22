import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BinaryMatrix = ({ heroSection = false }) => {
  const [matrix, setMatrix] = useState([]);
  
  // Create the initial binary matrix - optimized for performance
  useEffect(() => {
    // Reduce density for better performance - larger spacing
    const columns = Math.floor(window.innerWidth / 40); // 40px spacing instead of 20px
    const rows = Math.floor(window.innerHeight / 50); // 50px spacing instead of 30px
    
    const newMatrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        // Each cell has a random binary digit and opacity
        row.push({
          value: Math.random() > 0.5 ? '1' : '0',
          opacity: Math.random() * 0.5 + 0.1, // Between 0.1 and 0.6
          key: `${i}-${j}`
        });
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
    
    // Handle window resize - throttled for performance
    const handleResize = () => {
      const columns = Math.floor(window.innerWidth / 40);
      const rows = Math.floor(window.innerHeight / 50);
      
      const newMatrix = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          row.push({
            value: Math.random() > 0.5 ? '1' : '0',
            opacity: Math.random() * 0.5 + 0.1,
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
  
  // Change random digits periodically - REMOVED: No more animations
  // useEffect(() => {
  //   if (heroSection) return; // Skip animation for hero section
  //   
  //   const intervalId = setInterval(() => {
  //     setMatrix(prevMatrix => 
  //       prevMatrix.map(row => 
  //         row.map(cell => ({
  //           ...cell,
  //           value: Math.random() > 0.8 ? (cell.value === '1' ? '0' : '1') : cell.value // 20% chance to flip
  //         }))
  //       )
  //     );
  //   }, 1000);
  //   
  //   return () => clearInterval(intervalId);
  // }, [heroSection]);

  return (
    <div className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden ${heroSection ? 'opacity-50' : 'opacity-30'}`}>
      {matrix.map((row, i) => (
        <div key={`row-${i}`} className="flex justify-center">
          {row.map((cell) => (
            <div
              key={cell.key}
              className="text-cyan-400 font-mono text-sm sm:text-base md:text-lg select-none"
              style={{
                opacity: heroSection ? cell.opacity * 2 : cell.opacity * 1.5,
                margin: '0 10px',
                textShadow: heroSection ? '0 0 12px rgba(6, 182, 212, 0.9)' : '0 0 8px rgba(6, 182, 212, 0.9)'
              }}
            >
              {cell.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

BinaryMatrix.propTypes = {
  heroSection: PropTypes.bool
};

export default BinaryMatrix;