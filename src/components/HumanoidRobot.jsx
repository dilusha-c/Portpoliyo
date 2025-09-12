import React from 'react';
import { motion } from 'framer-motion';
import RobotTextDisplay from './RobotTextDisplay';
import './HumanoidRobot.css';

const HumanoidRobot = () => {
  return (
    <div className="relative w-72 h-robot mt-5">
      {/* Background grid pattern - enhanced */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30">
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '20px 20px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L0 0 0 20' fill='none' stroke='rgba(6,182,212,0.4)' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      {/* Binary code background effect - enhanced */}
      <div className="absolute inset-0 w-full h-full opacity-10 overflow-hidden">
        <div className="binary-rain"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%']
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ctext x='10' y='10' font-family='monospace' fill='%2306b6d4' font-size='4'%3E01%3C/text%3E%3Ctext x='30' y='20' font-family='monospace' fill='%2306b6d4' font-size='4'%3E10%3C/text%3E%3Ctext x='50' y='15' font-family='monospace' fill='%2306b6d4' font-size='5'%3E11%3C/text%3E%3Ctext x='70' y='25' font-family='monospace' fill='%2306b6d4' font-size='4'%3E00%3C/text%3E%3Ctext x='15' y='40' font-family='monospace' fill='%2306b6d4' font-size='5'%3E10%3C/text%3E%3Ctext x='35' y='35' font-family='monospace' fill='%2306b6d4' font-size='4'%3E01%3C/text%3E%3Ctext x='55' y='45' font-family='monospace' fill='%2306b6d4' font-size='5'%3E00%3C/text%3E%3Ctext x='75' y='30' font-family='monospace' fill='%2306b6d4' font-size='4'%3E11%3C/text%3E%3Ctext x='20' y='60' font-family='monospace' fill='%2306b6d4' font-size='4'%3E01%3C/text%3E%3Ctext x='40' y='55' font-family='monospace' fill='%2306b6d4' font-size='5'%3E10%3C/text%3E%3Ctext x='60' y='70' font-family='monospace' fill='%2306b6d4' font-size='4'%3E11%3C/text%3E%3Ctext x='80' y='65' font-family='monospace' fill='%2306b6d4' font-size='5'%3E00%3C/text%3E%3Ctext x='25' y='85' font-family='monospace' fill='%2306b6d4' font-size='4'%3E01%3C/text%3E%3Ctext x='45' y='80' font-family='monospace' fill='%2306b6d4' font-size='5'%3E11%3C/text%3E%3Ctext x='65' y='90' font-family='monospace' fill='%2306b6d4' font-size='4'%3E00%3C/text%3E%3Ctext x='85' y='75' font-family='monospace' fill='%2306b6d4' font-size='5'%3E10%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>
      
      {/* Waveform pattern overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
        <motion.svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 1000"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6,182,212,0)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.7)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </linearGradient>
          </defs>
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={`wave-${i}`}
              d={`M0,${400 + i * 30 + Math.random() * 20} Q${250},${380 + i * 30 + Math.random() * 40} ${500},${420 + i * 30} T${1000},${400 + i * 30 + Math.random() * 20}`}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: [0, 1],
                pathOffset: [0, 1]
              }}
              transition={{ 
                duration: 10 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            />
          ))}
        </motion.svg>
      </div>
      
      {/* Scanning grid lines */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
        <motion.div 
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 1, delay: 4 }}
        />
        <motion.div 
          className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
          animate={{ left: ['-10%', '110%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 3, delay: 1.5 }}
        />
        <motion.div 
          className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
          animate={{ left: ['-10%', '110%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 2, delay: 6 }}
        />
      </div>
      
      {/* Animated circuit nodes */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={`node-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/70"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${5 + ((i % 6) * 15)}%`
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              boxShadow: [
                '0 0 2px 1px rgba(6, 182, 212, 0.2)',
                '0 0 4px 2px rgba(6, 182, 212, 0.6)',
                '0 0 2px 1px rgba(6, 182, 212, 0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>
      
      {/* Hexagonal pattern overlay - enhanced */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-15">
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25,3.1l19.1,11v22l-19.1,11L5.9,36.1v-22L25,3.1z' fill='none' stroke='rgba(56,189,248,0.3)' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}
        />
        <motion.div
          className="w-full h-full"
          animate={{ 
            background: [
              'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Animated radar/sonar scan effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-cyan-400/30 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)'
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 w-[1px] h-[150px] bg-gradient-to-t from-transparent to-cyan-400/60 origin-bottom"
            style={{ transform: 'translateX(-50%) translateY(-100%)' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
      
      {/* Floating particles - enhanced */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="particle"></div>
        <div className="particle particle-medium"></div>
        <div className="particle particle-fast"></div>
        <div className="particle"></div>
        <div className="particle particle-medium"></div>
        <div className="particle particle-fast"></div>
        <div className="particle"></div>
        <div className="particle particle-medium"></div>
        <div className="particle particle-fast"></div>
        <div className="particle"></div>
        <div className="particle particle-medium"></div>
        <div className="particle particle-fast"></div>
        <div className="particle"></div>
        <div className="particle particle-medium"></div>
        <div className="particle particle-fast"></div>
        <div className="particle"></div>
        <div className="particle particle-medium"></div>
        <div className="particle particle-fast"></div>
        {/* Additional particles for a denser effect */}
        <div className="particle" style={{left: '22%', top: '35%'}}></div>
        <div className="particle particle-medium" style={{left: '38%', top: '18%'}}></div>
        <div className="particle particle-fast" style={{left: '67%', top: '42%'}}></div>
        <div className="particle" style={{left: '82%', top: '26%'}}></div>
        <div className="particle particle-medium" style={{left: '15%', top: '72%'}}></div>
        <div className="particle particle-fast" style={{left: '58%', top: '83%'}}></div>
      </div>
      
      {/* DILUSHA CHAMIKA name display - with consistent large spacing regardless of screen size */}
      <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-screen max-w-[250vw]">
        <motion.div
          className="text-center font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-cyan-500/40 filter blur-[3px] flex justify-center items-center"
          style={{ gap: "min(30vw, 16rem)" }}
          animate={{ 
            opacity: [0.25, 0.5, 0.25],
            scale: [0.98, 1, 0.98],
            textShadow: [
              '0 0 8px rgba(6, 182, 212, 0.3)',
              '0 0 15px rgba(6, 182, 212, 0.6)',
              '0 0 8px rgba(6, 182, 212, 0.3)'
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <span className="inline-block tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em]">DILUSHA</span>
          <span className="inline-block tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em]">CHAMIKA</span>
        </motion.div>
      </div>
      
      {/* Digital circuit board effect - enhanced */}
      <div className="absolute inset-0 w-full h-full opacity-15 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px']
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,10 h30 v30 h-30 z M50,50 h20 v20 h-20 z M20,60 h40 M60,20 v40' fill='none' stroke='rgba(6,182,212,0.5)' stroke-width='0.5'/%3E%3Ccircle cx='10' cy='10' r='2' fill='rgba(6,182,212,0.6)'/%3E%3Ccircle cx='50' cy='50' r='1' fill='rgba(56,189,248,0.6)'/%3E%3Ccircle cx='60' cy='60' r='1.5' fill='rgba(6,182,212,0.7)'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1.5\' fill=\'rgba(6,182,212,0.6)\'/%3E%3C/svg%3E")',
            backgroundSize: '100px 100px'
          }}
        />
      </div>
      
      {/* Data stream lines - enhanced */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`data-stream-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            style={{ 
              top: `${10 + (i * 11)}%`,
              width: '100%',
              left: i % 2 === 0 ? '-100%' : '100%'
            }}
            animate={{ 
              left: i % 2 === 0 ? ['100%', '-100%'] : ['-100%', '100%'],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 4 + (i * 0.5),
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 1 + (i * 0.2),
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Animated code matrix */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='15' font-family='monospace' fill='rgba(6,182,212,0.8)' font-size='10'%3E01%3C/text%3E%3Ctext x='50' y='35' font-family='monospace' fill='rgba(6,182,212,0.8)' font-size='10'%3E10%3C/text%3E%3Ctext x='30' y='65' font-family='monospace' fill='rgba(6,182,212,0.8)' font-size='10'%3E11%3C/text%3E%3Ctext x='70' y='85' font-family='monospace' fill='rgba(6,182,212,0.8)' font-size='10'%3E00%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '0px 100px'],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>
      
      {/* Technical grid pattern */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="tech-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="0.3" />
            <path d="M 40 20 L 0 20 M 20 0 L 20 40" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.2" />
            <circle cx="20" cy="20" r="1" fill="rgba(6,182,212,0.5)" />
          </pattern>
          <motion.rect 
            width="100%" 
            height="100%" 
            fill="url(#tech-grid)" 
            animate={{
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </svg>
      </div>
      
      {/* Corner brackets - enhanced with motion */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Top-left */}
        <motion.div 
          className="absolute top-[5%] left-[5%] w-[70px] h-[70px] border-l-2 border-t-2 border-cyan-500/30"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            width: ['70px', '80px', '70px'],
            height: ['70px', '80px', '70px']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Top-right */}
        <motion.div 
          className="absolute top-[5%] right-[5%] w-[70px] h-[70px] border-r-2 border-t-2 border-cyan-500/30"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            width: ['70px', '80px', '70px'],
            height: ['70px', '80px', '70px']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        {/* Bottom-left */}
        <motion.div 
          className="absolute bottom-[5%] left-[5%] w-[70px] h-[70px] border-l-2 border-b-2 border-cyan-500/30"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            width: ['70px', '80px', '70px'],
            height: ['70px', '80px', '70px']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        {/* Bottom-right */}
        <motion.div 
          className="absolute bottom-[5%] right-[5%] w-[70px] h-[70px] border-r-2 border-b-2 border-cyan-500/30"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            width: ['70px', '80px', '70px'],
            height: ['70px', '80px', '70px']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>
      
      {/* Digital target/focus rings */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border border-cyan-400/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            width: ['200px', '220px', '200px'],
            height: ['200px', '220px', '200px'],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] border border-cyan-400/40 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            width: ['300px', '320px', '300px'],
            height: ['300px', '320px', '300px'],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-cyan-400/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            width: ['400px', '420px', '400px'],
            height: ['400px', '420px', '400px'],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      {/* Digital effect circles - enhanced */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
        <motion.div 
          className="w-40 h-40 rounded-full border border-cyan-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="w-60 h-60 rounded-full border border-blue-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="w-80 h-80 rounded-full border border-cyan-500/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.12, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      
      {/* Robot Head */}
      <motion.div 
        className="absolute w-28 h-28 bg-gray-800 rounded-t-2xl mx-auto left-0 right-0 top-0 overflow-hidden border-2 border-cyan-500"
        initial={{ y: -5 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Decorative tech elements on head */}
        <motion.div 
          className="absolute -right-1 top-3 w-2 h-6 bg-cyan-400 opacity-80"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -left-1 top-3 w-2 h-6 bg-cyan-400 opacity-80"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        {/* Robot Face/Screen */}
        <div className="w-full h-full bg-black flex items-center justify-center p-2 relative flex-col">
          {/* Scanning line effect */}
          <div className="robot-scan"></div>
          
          {/* Eyes */}
          <div className="flex space-x-4 items-center absolute top-4 left-0 right-0 justify-center">
            <div className="w-8 h-4 bg-cyan-400 rounded-full robot-eye"></div>
            <div className="w-8 h-4 bg-cyan-400 rounded-full robot-eye"></div>
          </div>
          
          {/* Text display */}
          <RobotTextDisplay />
        </div>
        
        {/* Circuit patterns on face */}
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <motion.div 
            className="absolute top-3 left-3 w-1 h-1 bg-cyan-500"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-3 right-3 w-1 h-1 bg-cyan-500"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div 
            className="absolute bottom-3 left-5 w-1 h-1 bg-cyan-500"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <motion.div 
            className="absolute bottom-3 right-5 w-1 h-1 bg-cyan-500"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
          />
        </div>
      </motion.div>
      
      {/* Robot Neck */}
      <div className="absolute w-10 h-5 bg-gray-700 mx-auto left-0 right-0 top-28 border-x-2 border-cyan-500"></div>
      
      {/* Robot Body/Torso */}
      <motion.div 
        className="absolute w-48 h-32 bg-gray-800 rounded-md mx-auto left-0 right-0 top-32 border-2 border-cyan-500"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        {/* Decorative tech lines on shoulders */}
        <div className="absolute -left-2 top-4 w-2 h-8 bg-cyan-500 opacity-70"></div>
        <div className="absolute -right-2 top-4 w-2 h-8 bg-cyan-500 opacity-70"></div>
        
        {/* Digital meter on side */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              className="w-4 h-1 bg-cyan-400"
              animate={{ opacity: [0.3, 1, 0.3], backgroundColor: i > 2 ? ['#22d3ee', '#0891b2', '#22d3ee'] : undefined }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        
        {/* Digital meter on other side */}
        <div className="absolute right-2 top-2 flex flex-col gap-1">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={`right-${i}`}
              className="w-4 h-1 bg-blue-400"
              animate={{ opacity: [0.3, 1, 0.3], backgroundColor: i > 3 ? ['#60a5fa', '#3b82f6', '#60a5fa'] : undefined }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 + 0.5 }}
            />
          ))}
        </div>
        {/* Chest plate with glowing center */}
        <div className="absolute w-24 h-24 rounded-full bg-gray-700 top-3 left-1/2 transform -translate-x-1/2 border-2 border-gray-600 overflow-hidden">
          <div 
            className="w-12 h-12 rounded-full bg-cyan-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 robot-core"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-30"></div>
        </div>
        
        {/* Chest details */}
        <div className="absolute w-full bottom-2 flex justify-center">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="w-6 h-2 bg-cyan-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
        
        {/* Circuit patterns on body */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full circuit-glow">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <pattern id="bodyCircuit" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(0)">
                <rect width="100%" height="100%" fill="none" />
                <path d="M0,10 h10 M10,0 v10" stroke="rgba(6,182,212,0.8)" strokeWidth="0.5" />
                <circle cx="10" cy="10" r="1" fill="rgba(6,182,212,0.8)" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#bodyCircuit)" />
            </svg>
          </div>
        </div>
      </motion.div>
      
      {/* Robot Arms */}
      {/* Left Arm */}
      <motion.div 
        className="absolute w-6 h-20 bg-gray-700 left-[10px] top-[150px] rounded-full border-2 border-cyan-500"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-6 rounded-full bg-gray-600 absolute -bottom-2"></div>
        <div className="w-3 h-3 absolute top-3 left-1.5 bg-cyan-500 rounded-full opacity-80"></div>
      </motion.div>
      
      {/* Right Arm */}
      <motion.div 
        className="absolute w-6 h-20 bg-gray-700 right-[10px] top-[150px] rounded-full border-2 border-cyan-500"
        animate={{ rotate: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-6 rounded-full bg-gray-600 absolute -bottom-2"></div>
        <div className="w-3 h-3 absolute top-3 left-1.5 bg-cyan-500 rounded-full opacity-80"></div>
      </motion.div>
      
      {/* Robot Legs */}
      {/* Left Leg */}
      <motion.div 
        className="absolute w-12 h-40 left-[90px] top-[310px]"
        animate={{ rotate: [0, 1, 0, -1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Upper Leg */}
        <div className="absolute w-10 h-20 bg-gray-700 rounded-md border-2 border-cyan-500 top-0 left-1">
          <div className="w-8 h-1 bg-cyan-500/70 absolute top-3 left-1"></div>
          <div className="w-6 h-1 bg-cyan-500/70 absolute top-6 left-2"></div>
          <div className="w-6 h-3 bg-gray-800 absolute bottom-2 left-2 rounded-sm border border-cyan-500"></div>
        </div>
        
        {/* Knee Joint */}
        <div className="absolute w-6 h-6 rounded-full bg-gray-600 top-[105px] left-3 border border-cyan-500">
          <div className="w-3 h-3 bg-cyan-500 rounded-full absolute top-1.5 left-1.5 joint-pulse"></div>
        </div>
        
        {/* Lower Leg */}
        <div className="absolute w-8 h-22 bg-gray-700 rounded-md border-2 border-cyan-500 top-[85px] left-2">
          <div className="w-6 h-1 bg-cyan-500/70 absolute top-3 left-1"></div>
          <motion.div 
            className="w-4 h-1 bg-cyan-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          ></motion.div>
        </div>
        
        {/* Foot */}
        <div className="absolute w-12 h-6 bg-gray-800 rounded-md border-2 border-cyan-500 bottom-1 left-0">
          <div className="w-8 h-1 bg-cyan-500/70 absolute top-2 left-2"></div>
        </div>
      </motion.div>
      
      {/* Right Leg */}
      <motion.div 
        className="absolute w-12 h-40 right-[90px] top-[310px]"
        animate={{ rotate: [0, -1, 0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        {/* Upper Leg */}
        <div className="absolute w-10 h-20 bg-gray-700 rounded-md border-2 border-cyan-500 top-0 left-1">
          <div className="w-8 h-1 bg-cyan-500/70 absolute top-3 left-1"></div>
          <div className="w-6 h-1 bg-cyan-500/70 absolute top-6 left-2"></div>
          <div className="w-6 h-3 bg-gray-800 absolute bottom-2 left-2 rounded-sm border border-cyan-500"></div>
        </div>
        
        {/* Knee Joint */}
        <div className="absolute w-6 h-6 rounded-full bg-gray-600 top-[105px] left-3 border border-cyan-500">
          <div className="w-3 h-3 bg-cyan-500 rounded-full absolute top-1.5 left-1.5 joint-pulse"></div>
        </div>
        
        {/* Lower Leg */}
        <div className="absolute w-8 h-22 bg-gray-700 rounded-md border-2 border-cyan-500 top-[85px] left-2">
          <div className="w-6 h-1 bg-cyan-500/70 absolute top-3 left-1"></div>
          <motion.div 
            className="w-4 h-1 bg-cyan-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          ></motion.div>
        </div>
        
        {/* Foot */}
        <div className="absolute w-12 h-6 bg-gray-800 rounded-md border-2 border-cyan-500 bottom-1 left-0">
          <div className="w-8 h-1 bg-cyan-500/70 absolute top-2 left-2"></div>
        </div>
      </motion.div>
      
      {/* Hip Connection */}
      <div className="absolute w-32 h-8 bg-gray-800 rounded-md mx-auto left-0 right-0 top-[270px] border-2 border-cyan-500 overflow-hidden">
        <div className="flex justify-center items-center h-full">
          <motion.div 
            className="w-8 h-2 bg-cyan-500/70"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
        </div>
        
        {/* Circuit patterns on hips */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full circuit-glow">
            <svg width="100%" height="100%" viewBox="0 0 50 10" xmlns="http://www.w3.org/2000/svg">
              <pattern id="hipCircuit" patternUnits="userSpaceOnUse" width="10" height="10">
                <rect width="100%" height="100%" fill="none" />
                <path d="M0,5 h5 M5,0 v5" stroke="rgba(6,182,212,0.6)" strokeWidth="0.5" />
                <circle cx="5" cy="5" r="0.5" fill="rgba(6,182,212,0.8)" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hipCircuit)" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Enhanced Glowing Base Effect */}
      <motion.div 
        className="absolute w-52 h-8 rounded-full bg-cyan-500/40 blur-md bottom-0 left-1/2 transform -translate-x-1/2"
        animate={{ 
          opacity: [0.5, 0.9, 0.5],
          width: ['13rem', '14rem', '13rem'],
          boxShadow: [
            '0 0 15px 8px rgba(6, 182, 212, 0.3)',
            '0 0 25px 12px rgba(6, 182, 212, 0.5)',
            '0 0 15px 8px rgba(6, 182, 212, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Additional Pulsing Glow Rings */}
      <motion.div 
        className="absolute w-56 h-2 rounded-full bg-cyan-400/20 blur-sm bottom-1 left-1/2 transform -translate-x-1/2"
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 8px 2px rgba(6, 182, 212, 0.2)',
            '0 0 12px 4px rgba(6, 182, 212, 0.4)',
            '0 0 8px 2px rgba(6, 182, 212, 0.2)'
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </div>
  );
};

export default HumanoidRobot;
