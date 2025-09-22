import React from 'react';
import { motion } from 'framer-motion';
import RobotTextDisplay from './RobotTextDisplay';
import './HumanoidRobot.css';

const HumanoidRobot = () => {
  return (
    <div className="relative w-72 h-robot mt-5 z-10">
      {/* Simplified background effects - reduced layers */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
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

      {/* Simplified binary pattern - single background */}
      <div className="absolute inset-0 w-full h-full opacity-10 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%']
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ctext x='10' y='15' font-family='monospace' fill='%2306b6d4' font-size='4'%3E01%3C/text%3E%3Ctext x='50' y='35' font-family='monospace' fill='%2306b6d4' font-size='10'%3E10%3C/text%3E%3Ctext x='30' y='65' font-family='monospace' fill='%2306b6d4' font-size='10'%3E11%3C/text%3E%3Ctext x='70' y='85' font-family='monospace' fill='%2306b6d4' font-size='10'%3E00%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Single scanning line */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      </div>

      {/* Reduced circuit nodes - 6 instead of 12 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/70"
            style={{
              left: `${15 + (i * 13)}%`,
              top: `${10 + ((i % 3) * 25)}%`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              boxShadow: [
                '0 0 2px 1px rgba(6, 182, 212, 0.2)',
                '0 0 4px 2px rgba(6, 182, 212, 0.6)',
                '0 0 2px 1px rgba(6, 182, 212, 0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Reduced particles - 8 instead of 18+ */}
      <div className="absolute w-full h-full overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={{left: `${10 + (i * 12)}%`, top: `${20 + ((i % 4) * 20)}%`}}
          />
        ))}
      </div>

      {/* Simplified name display */}
      <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-screen max-w-[250vw]">
        <motion.div
          className="text-center font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-cyan-500/40 filter blur-[3px] flex justify-center items-center"
          style={{ gap: "min(30vw, 16rem)" }}
          animate={{
            opacity: [0.25, 0.5, 0.25],
            scale: [0.98, 1, 0.98]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <span className="inline-block tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em]">DILUSHA</span>
          <span className="inline-block tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em]">CHAMIKA</span>
        </motion.div>
      </div>

      {/* Simplified circuit pattern */}
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
      </div>

      {/* Simplified corner brackets */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position, i) => {
          const isTop = position.includes('top');
          const isLeft = position.includes('left');
          return (
            <motion.div
              key={position}
              className={`absolute ${isTop ? 'top-[5%]' : 'bottom-[5%]'} ${isLeft ? 'left-[5%]' : 'right-[5%]'} w-[50px] h-[50px] border-${isLeft ? 'l' : 'r'}-2 border-t-2 border-cyan-500/30`}
              animate={{
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
            />
          );
        })}
      </div>

      {/* Simplified radar effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[250px] h-[250px] border border-cyan-400/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 w-[1px] h-[125px] bg-gradient-to-t from-transparent to-cyan-400/60 origin-bottom"
            style={{ transform: 'translateX(-50%) translateY(-100%)' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Single effect circle */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
        <motion.div
          className="w-60 h-60 rounded-full border border-cyan-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Robot Head - simplified */}
      <motion.div
        className="absolute w-28 h-28 bg-gray-800 rounded-t-2xl mx-auto left-0 right-0 top-0 overflow-hidden border-2 border-cyan-500"
        initial={{ y: -5 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
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

        {/* Simple circuit elements */}
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
        </div>
      </motion.div>

      {/* Robot Neck */}
      <div className="absolute w-10 h-5 bg-gray-700 mx-auto left-0 right-0 top-28 border-x-2 border-cyan-500"></div>

      {/* Robot Body/Torso - simplified */}
      <motion.div
        className="absolute w-48 h-32 bg-gray-800 rounded-md mx-auto left-0 right-0 top-32 border-2 border-cyan-500"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        {/* Simple chest core */}
        <div className="absolute w-24 h-24 rounded-full bg-gray-700 top-3 left-1/2 transform -translate-x-1/2 border-2 border-gray-600 overflow-hidden">
          <div
            className="w-12 h-12 rounded-full bg-cyan-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 robot-core"
          />
        </div>
      </motion.div>

      {/* Simplified Arms */}
      <motion.div
        className="absolute w-6 h-20 bg-gray-700 left-[10px] top-[150px] rounded-full border-2 border-cyan-500"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-6 h-20 bg-gray-700 right-[10px] top-[150px] rounded-full border-2 border-cyan-500"
        animate={{ rotate: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Simplified Legs */}
      <motion.div
        className="absolute w-12 h-40 left-[90px] top-[310px]"
        animate={{ rotate: [0, 1, 0, -1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute w-10 h-20 bg-gray-700 rounded-md border-2 border-cyan-500 top-0 left-1"></div>
        <div className="absolute w-6 h-6 rounded-full bg-gray-600 top-[105px] left-3 border border-cyan-500"></div>
        <div className="absolute w-8 h-22 bg-gray-700 rounded-md border-2 border-cyan-500 top-[85px] left-2"></div>
        <div className="absolute w-12 h-6 bg-gray-800 rounded-md border-2 border-cyan-500 bottom-1 left-0"></div>
      </motion.div>

      <motion.div
        className="absolute w-12 h-40 right-[90px] top-[310px]"
        animate={{ rotate: [0, -1, 0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="absolute w-10 h-20 bg-gray-700 rounded-md border-2 border-cyan-500 top-0 left-1"></div>
        <div className="absolute w-6 h-6 rounded-full bg-gray-600 top-[105px] left-3 border border-cyan-500"></div>
        <div className="absolute w-8 h-22 bg-gray-700 rounded-md border-2 border-cyan-500 top-[85px] left-2"></div>
        <div className="absolute w-12 h-6 bg-gray-800 rounded-md border-2 border-cyan-500 bottom-1 left-0"></div>
      </motion.div>

      {/* Hip Connection */}
      <div className="absolute w-32 h-8 bg-gray-800 rounded-md mx-auto left-0 right-0 top-[270px] border-2 border-cyan-500 overflow-hidden"></div>

      {/* Base glow effect */}
      <motion.div
        className="absolute w-52 h-8 rounded-full bg-cyan-500/40 blur-md bottom-0 left-1/2 transform -translate-x-1/2"
        animate={{
          opacity: [0.5, 0.9, 0.5],
          width: ['13rem', '14rem', '13rem']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default HumanoidRobot;