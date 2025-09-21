import React from 'react';
import PropTypes from 'prop-types';

// Performance-optimized static decoration
const RobotBackgroundDecoration = ({ theme }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Robot silhouette in the background (static version) */}
      <div 
        className="absolute right-0 bottom-0 opacity-5 w-[600px] h-[600px]"
      >
        <svg 
          viewBox="0 0 500 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-600'}`}
        >
          <path 
            d="M250 80C211.34 80 180 111.34 180 150C180 188.66 211.34 220 250 220C288.66 220 320 188.66 320 150C320 111.34 288.66 80 250 80ZM250 200C222.36 200 200 177.64 200 150C200 122.36 222.36 100 250 100C277.64 100 300 122.36 300 150C300 177.64 277.64 200 250 200Z" 
            fill="currentColor"
          />
          <path 
            d="M370 240H130C124.48 240 120 244.48 120 250V390C120 395.52 124.48 400 130 400H370C375.52 400 380 395.52 380 390V250C380 244.48 375.52 240 370 240ZM360 380H140V260H360V380Z" 
            fill="currentColor"
          />
          <path 
            d="M240 280H260V300H240V280Z" 
            fill="currentColor"
          />
          <path 
            d="M240 320H260V340H240V320Z" 
            fill="currentColor"
          />
          <path 
            d="M280 280H300V300H280V280Z" 
            fill="currentColor"
          />
          <path 
            d="M280 320H300V340H280V320Z" 
            fill="currentColor"
          />
          <path 
            d="M200 280H220V300H200V280Z" 
            fill="currentColor"
          />
          <path 
            d="M200 320H220V340H200V320Z" 
            fill="currentColor"
          />
          <path 
            d="M250 220V240" 
            stroke="currentColor" 
            strokeWidth="10"
          />
          <path 
            d="M100 300L120 300" 
            stroke="currentColor" 
            strokeWidth="10"
          />
          <path 
            d="M400 300L380 300" 
            stroke="currentColor" 
            strokeWidth="10"
          />
          <path 
            d="M180 400V450" 
            stroke="currentColor" 
            strokeWidth="10"
          />
          <path 
            d="M320 400V450" 
            stroke="currentColor" 
            strokeWidth="10"
          />
          <circle 
            cx="250" 
            cy="150" 
            r="10" 
            fill={theme === 'dark' ? '#06b6d4' : '#3b82f6'}
          />
        </svg>
      </div>
      
      {/* Static circuit traces instead of animated ones */}
      <div className="absolute inset-0">
        {[15, 30, 45, 60, 75].map((top, i) => (
          <div
            key={i}
            className={`absolute h-[1px] ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}
            style={{
              left: `${10 + i * 20}%`,
              top: `${top}%`,
              width: `${30 + i * 10}%`
            }}
          />
        ))}
        {[20, 35, 50, 65, 80].map((left, i) => (
          <div
            key={i + 5}
            className={`absolute w-[1px] ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}
            style={{
              left: `${left}%`,
              top: '10%',
              height: `${20 + i * 15}%`
            }}
          />
        ))}
      </div>
      
      {/* Static glowing dots/nodes instead of animated ones */}
      {[
        { left: '20%', top: '30%', size: '5px' },
        { left: '45%', top: '15%', size: '6px' },
        { left: '70%', top: '25%', size: '4px' },
        { left: '85%', top: '45%', size: '7px' },
        { left: '60%', top: '60%', size: '5px' },
        { left: '30%', top: '75%', size: '6px' }
      ].map((dot, i) => (
        <div
          key={i + 10}
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-cyan-400/60' : 'bg-blue-500/60'}`}
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.left,
            top: dot.top,
            boxShadow: theme === 'dark' 
              ? '0 0 5px 1px rgba(6, 182, 212, 0.3)' 
              : '0 0 5px 1px rgba(59, 130, 246, 0.3)'
          }}
        />
      ))}
    </div>
  );
};

RobotBackgroundDecoration.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default RobotBackgroundDecoration;