import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HardwareAnimations.css';

const RobotDecorator = ({ type = 'default', section = '' }) => {
  // State for CPU and hardware animations
  const [dataFlows, setDataFlows] = useState([]);
  
  // Generate random data flows for CPU hardware animation
  useEffect(() => {
    if (type === 'hardware') {
      const flows = [];
      // Generate more data flows for contact section
      const flowCount = section === 'contact' ? 40 : 15;
      
      // For contact section, create more directed flows between components
      if (section === 'contact') {
        // Set up left and right side component positions for contact section
        const leftSideX = 20; // Left side components
        const rightSideX = 80; // Right side components
        
        // Flows from CPU to other components - LEFT SIDE
        for (let i = 0; i < 10; i++) {
          const startComponent = Math.floor(Math.random() * 3); // 0 = CPU, 1 = RAM, 2 = GPU
          const endComponent = Math.floor(Math.random() * 3);
          
          let startX, startY, endX, endY;
          
          // Set start coordinates based on component - LEFT SIDE
          if (startComponent === 0) { // CPU
            startX = leftSideX;
            startY = 30;
          } else if (startComponent === 1) { // RAM area
            startX = leftSideX - 5 + Math.random() * 10;
            startY = 60;
          } else { // GPU area
            startX = leftSideX - 5 + Math.random() * 10;
            startY = 45 + Math.random() * 20;
          }
          
          // Set end coordinates based on component - LEFT SIDE
          if (endComponent === 0) { // CPU
            endX = leftSideX;
            endY = 30;
          } else if (endComponent === 1) { // RAM area
            endX = leftSideX - 5 + Math.random() * 10;
            endY = 60;
          } else { // GPU area
            endX = leftSideX - 5 + Math.random() * 10;
            endY = 45 + Math.random() * 20;
          }
          
          flows.push({
            id: i,
            startX,
            startY,
            endX,
            endY,
            duration: 1.5 + Math.random() * 2,
            delay: Math.random() * 2
          });
        }
        
        // Flows from CPU to other components - RIGHT SIDE
        for (let i = 10; i < 20; i++) {
          const startComponent = Math.floor(Math.random() * 3); // 0 = CPU, 1 = RAM, 2 = GPU
          const endComponent = Math.floor(Math.random() * 3);
          
          let startX, startY, endX, endY;
          
          // Set start coordinates based on component - RIGHT SIDE
          if (startComponent === 0) { // CPU
            startX = rightSideX;
            startY = 30;
          } else if (startComponent === 1) { // RAM area
            startX = rightSideX - 5 + Math.random() * 10;
            startY = 60;
          } else { // GPU area
            startX = rightSideX - 5 + Math.random() * 10;
            startY = 45 + Math.random() * 20;
          }
          
          // Set end coordinates based on component - RIGHT SIDE
          if (endComponent === 0) { // CPU
            endX = rightSideX;
            endY = 30;
          } else if (endComponent === 1) { // RAM area
            endX = rightSideX - 5 + Math.random() * 10;
            endY = 60;
          } else { // GPU area
            endX = rightSideX - 5 + Math.random() * 10;
            endY = 45 + Math.random() * 20;
          }
          
          flows.push({
            id: i,
            startX,
            startY,
            endX,
            endY,
            duration: 1.5 + Math.random() * 2,
            delay: Math.random() * 2
          });
        }
        
        // Add some random flows across the sides
        for (let i = 20; i < flowCount; i++) {
          // Decide whether this flow should be on left or right side
          const isLeft = i % 2 === 0;
          const sideX = isLeft ? leftSideX : rightSideX;
          
          flows.push({
            id: i,
            startX: sideX - 10 + Math.random() * 20,
            startY: Math.random() * 100,
            endX: sideX - 10 + Math.random() * 20,
            endY: Math.random() * 100,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 5
          });
        }
      } else {
        // Default random flows for other sections
        for (let i = 0; i < flowCount; i++) {
          flows.push({
            id: i,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            endX: Math.random() * 100,
            endY: Math.random() * 100,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 5
          });
        }
      }
      
      setDataFlows(flows);
    }
  }, [type, section]);
  
  // Different types of robotic decorators
  const decorators = {
    'default': (
      <motion.div className="absolute -right-4 top-0 w-8 h-full flex flex-col justify-between items-center pointer-events-none opacity-70">
        <motion.div 
          className="w-2 h-2 bg-cyan-500 rounded-full" 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div className="w-[1px] h-full bg-cyan-500/30" />
        <motion.div 
          className="w-2 h-2 bg-cyan-500 rounded-full" 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    ),
    'corner': (
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left corner */}
        <motion.div 
          className="absolute top-0 left-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute top-0 left-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
        
        {/* Top-right corner */}
        <motion.div 
          className="absolute top-0 right-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute top-0 right-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute top-0 right-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
        
        {/* Bottom-left corner */}
        <motion.div 
          className="absolute bottom-0 left-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute bottom-0 left-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute bottom-0 left-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
        
        {/* Bottom-right corner */}
        <motion.div 
          className="absolute bottom-0 right-0 w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="absolute bottom-0 right-0 w-2 h-8 bg-cyan-500/70" />
          <div className="absolute bottom-0 right-0 w-8 h-2 bg-cyan-500/70" />
        </motion.div>
      </div>
    ),
    'circuit': (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
          <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="0" cy="50" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="100" cy="50" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="50" cy="0" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <circle cx="50" cy="100" r="2" fill="rgba(6, 182, 212, 0.5)" />
            <line x1="50" y1="50" x2="100" y2="50" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
            </line>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>
    ),
    'grid': (
      <div className="absolute inset-0 robot-grid pointer-events-none"></div>
    ),
    'scanner': (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"
          animate={{ top: ['-5%', '105%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        />
      </div>
    ),
    'binary': (
      <div className="absolute inset-0 binary-bg pointer-events-none"></div>
    ),
    'digital-rain': (
      <div className="absolute inset-0 digital-rain pointer-events-none"></div>
    ),
    'hardware': (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* CPU Grid Background */}
        <div className="cpu-grid"></div>
        
        {/* CPU Cores - Two for contact section (left and right), one for other sections */}
        {section === 'contact' ? (
          <>
            {/* Left side CPU */}
            <motion.div 
              className="cpu-core"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{
                left: '20%',
                top: '30%',
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-sm text-cyan-400 font-mono">CPU</div>
              </div>
            </motion.div>
            
            {/* Right side CPU */}
            <motion.div 
              className="cpu-core"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                left: '80%',
                top: '30%',
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-sm text-cyan-400 font-mono">CPU</div>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div 
            className="cpu-core"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs text-cyan-400 font-mono">CPU</div>
            </div>
          </motion.div>
        )}
        
        {/* Memory Modules */}
        {section === 'contact' ? (
          // Special layout for contact section - modules on left and right sides
          <>
            {/* Left side memory modules */}
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={`memory-left-${i}`}
                className="memory-module"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                style={{
                  left: '20%',
                  top: `${50 + (i * 15)}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '65px',
                  height: '25px'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-sm text-cyan-400 font-mono">RAM{i+1}</div>
                </div>
              </motion.div>
            ))}
            
            {/* Right side memory modules */}
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={`memory-right-${i}`}
                className="memory-module"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 + (i * 0.1) }}
                style={{
                  left: '80%',
                  top: `${50 + (i * 15)}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '65px',
                  height: '25px'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-sm text-cyan-400 font-mono">RAM{i+3}</div>
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          // Default layout for other sections
          <>
            <motion.div 
              className="memory-module"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                left: '30%',
                top: '30%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xs text-cyan-400 font-mono">RAM1</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="memory-module"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              style={{
                left: '30%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xs text-cyan-400 font-mono">RAM2</div>
              </div>
            </motion.div>
          </>
        )}
        
        {/* IC Chips */}
        {section === 'contact' ? (
          // Special layout for contact section - IC chips on left and right sides
          <>
            {/* Left side IC chips */}
            <motion.div 
              className="ic-chip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{
                left: '10%',
                top: '40%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px'
              }}
            >
              <div className="text-sm text-cyan-400 font-mono">GPU</div>
            </motion.div>
            
            <motion.div 
              className="ic-chip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              style={{
                left: '15%',
                top: '70%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px'
              }}
            >
              <div className="text-sm text-cyan-400 font-mono">I/O</div>
            </motion.div>
            
            {/* Right side IC chips */}
            <motion.div 
              className="ic-chip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              style={{
                left: '90%',
                top: '40%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px'
              }}
            >
              <div className="text-sm text-cyan-400 font-mono">NET</div>
            </motion.div>
            
            <motion.div 
              className="ic-chip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{
                left: '85%',
                top: '70%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px'
              }}
            >
              <div className="text-sm text-cyan-400 font-mono">SYS</div>
            </motion.div>
          </>
        ) : (
          // Default layout for other sections
          <>
            <motion.div 
              className="ic-chip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{
                right: '25%',
                top: '30%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-[8px] text-cyan-400 font-mono">GPU</div>
            </motion.div>
            
            <motion.div 
              className="ic-chip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              style={{
                right: '25%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-[8px] text-cyan-400 font-mono">I/O</div>
            </motion.div>
          </>
        )}
        
        {/* Connection Lines */}
        {section === 'contact' ? (
          // Special connection lines for contact section - left and right sides
          <>
            {/* Left side connections */}
            {/* Vertical connections on left side */}
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={`left-v-conn-${i}`}
                className="cpu-connection-line"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.3 + (i * 0.1) }}
                style={{
                  left: `${10 + (i * 10)}%`,
                  top: '30%',
                  width: '2px',
                  height: '40%',
                  transformOrigin: 'top'
                }}
              />
            ))}
            
            {/* Horizontal connections on left side */}
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={`left-h-conn-${i}`}
                className="cpu-connection-line"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.5 + (i * 0.1) }}
                style={{
                  left: '10%',
                  top: `${40 + (i * 20)}%`,
                  width: '20%',
                  height: '2px',
                  transformOrigin: 'left'
                }}
              />
            ))}
            
            {/* Diagonal connection on left side */}
            <motion.div 
              className="cpu-connection-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              style={{
                left: '10%',
                top: '40%',
                width: '15%',
                height: '2px',
                transform: 'rotate(45deg)',
                transformOrigin: 'left'
              }}
            />
            
            {/* Right side connections */}
            {/* Vertical connections on right side */}
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={`right-v-conn-${i}`}
                className="cpu-connection-line"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.9 + (i * 0.1) }}
                style={{
                  left: `${80 + (i * 10)}%`,
                  top: '30%',
                  width: '2px',
                  height: '40%',
                  transformOrigin: 'top'
                }}
              />
            ))}
            
            {/* Horizontal connections on right side */}
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={`right-h-conn-${i}`}
                className="cpu-connection-line"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 2.1 + (i * 0.1) }}
                style={{
                  left: '70%',
                  top: `${40 + (i * 20)}%`,
                  width: '20%',
                  height: '2px',
                  transformOrigin: 'left'
                }}
              />
            ))}
            
            {/* Diagonal connection on right side */}
            <motion.div 
              className="cpu-connection-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              style={{
                left: '75%',
                top: '40%',
                width: '15%',
                height: '2px',
                transform: 'rotate(45deg)',
                transformOrigin: 'left'
              }}
            />
          </>
        ) : (
          // Default connection lines for other sections
          <>
            <motion.div 
              className="cpu-connection-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              style={{
                left: '35%',
                top: '40%',
                width: '15%',
                height: '1px'
              }}
            />
            
            <motion.div 
              className="cpu-connection-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              style={{
                left: '30%',
                top: '32%',
                width: '1px',
                height: '16%'
              }}
            />
            
            <motion.div 
              className="cpu-connection-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              style={{
                left: '50%',
                top: '40%',
                width: '15%',
                height: '1px'
              }}
            />
            
            <motion.div 
              className="cpu-connection-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              style={{
                left: '70%',
                top: '32%',
                width: '1px',
                height: '16%'
              }}
            />
          </>
        )}
        
        {/* Data Flow Particles */}
        {dataFlows.map(flow => (
          <motion.div
            key={flow.id}
            className="data-flow"
            initial={{ 
              opacity: 0, 
              x: `${flow.startX}%`, 
              y: `${flow.startY}%`,
              scale: 0.5
            }}
            animate={{
              opacity: [0, 1, 0],
              x: [`${flow.startX}%`, `${flow.endX}%`],
              y: [`${flow.startY}%`, `${flow.endY}%`],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: flow.duration,
              repeat: Infinity,
              repeatDelay: flow.delay
            }}
          />
        ))}
      </div>
    )
  };
  
  return decorators[type] || decorators.default;
};

export default RobotDecorator;