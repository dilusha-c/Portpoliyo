import React, { useState, useEffect } from 'react';

const RobotTextDisplay = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const bootPhrases = [
    "SYSTEMS ONLINE",
    "LOADING PORTFOLIO",
    "INITIALIZING UI",
    "CALIBRATING DISPLAY",
    "READY"
  ];
  
  useEffect(() => {
    // Text typing effect
    let currentText = "";
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < bootPhrases[currentPhase].length) {
        currentText += bootPhrases[currentPhase][index];
        setDisplayText(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        
        // After typing is complete, wait and move to next phase
        setTimeout(() => {
          if (currentPhase < bootPhrases.length - 1) {
            setCurrentPhase(currentPhase + 1);
          }
        }, 1000);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, [currentPhase]);
  
  return (
    <div className="absolute bottom-4 left-0 right-0 w-full text-center">
      <div className="font-mono text-xs text-cyan-400 bg-black/40 py-1 px-1 rounded backdrop-blur-sm">
        {displayText}
        <span className="inline-block w-1 h-3 ml-1 bg-cyan-400 animate-pulse"></span>
      </div>
    </div>
  );
};

export default RobotTextDisplay;
