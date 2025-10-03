import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const BinaryMatrix = ({ heroSection = false }) => {
  const [matrix, setMatrix] = useState([]);
  const containerRef = useRef(null);
  
  // Create the initial binary matrix - optimized for performance
  useEffect(() => {
    // Compute matrix dimensions based on the container size so it fits the hero section
    const computeMatrix = (width, height) => {
      // Choose spacing based on context (denser for hero)
      const cellSpacingX = heroSection ? 22 : 40; // px
      const cellSpacingY = heroSection ? 24 : 50; // px

      const columns = Math.max(1, Math.ceil(width / cellSpacingX));
      const rows = Math.max(1, Math.ceil(height / cellSpacingY));

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

    const update = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        computeMatrix(rect.width, rect.height);
      } else {
        // Fallback to viewport
        computeMatrix(window.innerWidth, window.innerHeight);
      }
    };

    // Use ResizeObserver when available to measure the container (precise fitting)
    let ro;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => update());
      ro.observe(containerRef.current);
    }

    // Initial compute
    update();

    // Fallback to window resize in case ResizeObserver isn't available
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      if (ro && containerRef.current) ro.unobserve(containerRef.current);
    };
  }, [heroSection]);
  

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden ${heroSection ? 'opacity-50' : 'opacity-30'}`}>
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