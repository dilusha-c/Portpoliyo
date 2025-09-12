import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters to display (binary and select characters)
    const katakana = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const chars = nums + latin + katakana;

    // Sizing for the matrix effect
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    // Initialize drops
    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        // Initial y position for each column (negative to create staggered effect)
        drops[x] = Math.floor(Math.random() * -100);
      }
    };
    
    initDrops();
    window.addEventListener('resize', initDrops);

    // Drawing the matrix
    const matrix = () => {
      // Semi-transparent black to create fade effect
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Set the character style
      context.fillStyle = '#0fa'; // Matrix green
      context.font = fontSize + 'px monospace';

      // Loop through each column
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Draw the character
        context.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomize reset point
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move the drop down
        drops[i]++;
      }
    };

    // Animation interval
    const interval = setInterval(matrix, 35);

    // Clean up on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', initDrops);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 opacity-30 z-0 pointer-events-none"
      style={{ mixBlendMode: 'lighten' }}
    />
  );
};

export default MatrixBackground;