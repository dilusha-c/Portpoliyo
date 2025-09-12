import React from 'react';
import { motion } from 'framer-motion';

const HumanRobotDecoration = ({ theme }) => {
  // Static SVG for better performance
  return (
    <div 
      className="absolute left-0 bottom-0 h-full w-60 md:w-80 overflow-hidden pointer-events-none"
    >
      {/* Fully Robotic Silhouette */}
      <svg 
        viewBox="0 0 200 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute bottom-0 left-0 h-4/5 opacity-10 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}
      >
        {/* Robot Head - Square with antennas */}
        <rect 
          x="75" 
          y="20" 
          width="50" 
          height="60" 
          rx="4" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        
        {/* Antennas */}
        <path 
          d="M85 20L85 10C85 10 85 5 90 5C95 5 95 10 95 10L95 20" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M115 20L115 10C115 10 115 5 110 5C105 5 105 10 105 10L105 20" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        
        {/* Robot Body - Rectangular with panels */}
        <rect 
          x="65" 
          y="90" 
          width="70" 
          height="110" 
          rx="5" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        
        {/* Neck connection */}
        <rect 
          x="85" 
          y="80" 
          width="30" 
          height="10" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        
        {/* Panel lines on body */}
        <rect 
          x="75" 
          y="110" 
          width="50" 
          height="25" 
          rx="2" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <rect 
          x="75" 
          y="145" 
          width="50" 
          height="25" 
          rx="2" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <rect 
          x="75" 
          y="180" 
          width="20" 
          height="10" 
          rx="2" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <rect 
          x="105" 
          y="180" 
          width="20" 
          height="10" 
          rx="2" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        
        {/* Robot Legs - Mechanical and jointed */}
        {/* Left Leg */}
        <path 
          d="M80 200L80 260" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="75" 
          y="260" 
          width="10" 
          height="30" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M80 290L80 350" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="70" 
          y="350" 
          width="20" 
          height="10" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        
        {/* Right Leg */}
        <path 
          d="M120 200L120 260" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="115" 
          y="260" 
          width="10" 
          height="30" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M120 290L120 350" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="110" 
          y="350" 
          width="20" 
          height="10" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        
        {/* Robot Arms - Angular and mechanical */}
        {/* Left Arm */}
        <path 
          d="M65 110L40 110" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="30" 
          y="105" 
          width="10" 
          height="40" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M35 145L35 180" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="30" 
          y="180" 
          width="10" 
          height="10" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M32 185H38" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        
        {/* Right Arm */}
        <path 
          d="M135 110L160 110" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="160" 
          y="105" 
          width="10" 
          height="40" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M165 145L165 180" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <rect 
          x="160" 
          y="180" 
          width="10" 
          height="10" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M162 185H168" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        
        {/* Circuit patterns */}
        <path 
          d="M85 125H115" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <path 
          d="M85 130H115" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <path 
          d="M85 160H115" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <path 
          d="M85 165H115" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <path 
          d="M100 110V130" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <path 
          d="M100 145V170" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        
        {/* Robot face elements */}
        <rect 
          x="85" 
          y="35" 
          width="30" 
          height="15" 
          rx="2" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        
        {/* Eyes (static instead of animated) */}
        <circle 
          cx="93" 
          cy="42" 
          r="4" 
          fill={theme === 'dark' ? '#06b6d4' : '#3b82f6'}
        />
        
        <circle 
          cx="107" 
          cy="42" 
          r="4" 
          fill={theme === 'dark' ? '#06b6d4' : '#3b82f6'}
        />
        
        {/* Control panel lights (static) */}
        <circle 
          cx="85" 
          cy="65" 
          r="3" 
          fill={theme === 'dark' ? '#06b6d4' : '#3b82f6'}
        />
        
        <circle 
          cx="100" 
          cy="65" 
          r="3" 
          fill={theme === 'dark' ? '#f43f5e' : '#ef4444'}
        />
        
        <circle 
          cx="115" 
          cy="65" 
          r="3" 
          fill={theme === 'dark' ? '#10b981' : '#22c55e'}
        />
        
        {/* Mechanical joint highlights */}
        <circle cx="80" cy="260" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="80" cy="290" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="120" cy="260" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="120" cy="290" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="40" cy="110" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="35" cy="145" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="160" cy="110" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="165" cy="145" r="3" fill="currentColor" fillOpacity="0.5" />
        
        {/* Static data points instead of animated ones */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={i}
            cx={70 + i * 8}
            cy={100 + (i % 3) * 40}
            r={1.5}
            fill={theme === 'dark' ? '#06b6d4' : '#3b82f6'}
          />
        ))}
      </svg>
      
      {/* Single simple scanning effect instead of multiple effects */}
      <div
        className={`absolute left-0 top-0 h-full w-full opacity-10 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-cyan-400 to-transparent' : 'bg-gradient-to-b from-transparent via-blue-500 to-transparent'}`}
        style={{
          backgroundSize: '100% 200%',
          backgroundPosition: 'center',
          animation: 'scanningEffect 4s infinite linear'
        }}
      />
      
      {/* Static circuit lines instead of animated ones */}
      {[30, 90, 150, 210, 270].map((top, i) => (
        <div
          key={`circuit-${i}`}
          className={`absolute h-[1px] ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}
          style={{
            left: '0',
            top: `${top}px`,
            width: `${30 + i * 10}px`
          }}
        />
      ))}
    </div>
  );
};

export default HumanRobotDecoration;