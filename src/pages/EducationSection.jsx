import React from 'react';
import { motion } from 'framer-motion';
import FlyingDrone from '../components/FlyingDroneSimplified';
const sliitImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527970/qr0n3bftmuubfmixhxjw.png';
import PropTypes from 'prop-types';

const EducationSection = ({ theme, roboticMode }) => {
  return (
    <section id="education" className={`py-10 px-4 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white'} transition-colors duration-300 relative overflow-hidden border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
      {/* Flying Drones - only visible in robotic mode */}
      {roboticMode && (
        <>
          <FlyingDrone theme={theme} />
          <div className="absolute top-20 right-0 z-10">
            <motion.div
              animate={{
                x: [0, -300, 0],
                y: [0, -15, 10, -5, 0],
                rotate: [0, -3, 2, -1, 0],
              }}
              transition={{
                x: {
                  duration: 18,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut'
                },
                y: {
                  duration: 7,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut'
                },
                rotate: {
                  duration: 9,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut'
                }
              }}
              className="pointer-events-none"
            >
              <FlyingDrone theme={theme} />
            </motion.div>
          </div>
        </>
      )}

      <div className="container mx-auto relative z-10 max-w-4xl">
        {roboticMode && (
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="grid-pattern" style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 1px, transparent 1px),
                linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        )}

        <motion.div
          className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-2xl bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: theme === 'dark'
              ? roboticMode ? 'rgba(15, 23, 42, 0.7)' : 'rgba(30, 41, 59, 0.7)'
              : roboticMode ? 'rgba(241, 245, 249, 0.7)' : 'rgba(248, 250, 252, 0.7)',
            border: `1px solid ${theme === 'dark'
              ? roboticMode ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'
              : roboticMode ? 'rgba(14, 165, 233, 0.3)' : 'rgba(226, 232, 240, 0.8)'}`
          }}
        >
          {/* SLIIT Logo */}
          <motion.div
            className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={sliitImg}
              alt="SLIIT Logo"
              className={`w-full h-full object-contain ${theme === 'dark' ? 'filter brightness-110' : ''}`}
              loading="lazy"
              width="96"
              height="96"
            />
            {roboticMode && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full pulse-border"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full bg-cyan-400/10 animate-pulse"></div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Education Info */}
          <div className={`flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <h3 className={`text-xl md:text-2xl font-bold mb-1 ${roboticMode ? 'text-cyan-400' : theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Sri Lanka Institute of Information Technology
            </h3>
            <p className="mb-1 font-medium">BSc (Hons), Computer Systems Engineering</p>
            <p className="mb-2 text-sm opacity-80">Nov 2023 - Nov 2027</p>
            <div className="flex items-center">
              <div className={`mr-2 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center ${
                theme === 'dark'
                  ? roboticMode ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-700' : 'bg-slate-700 text-cyan-400'
                  : roboticMode ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-blue-100 text-blue-700'
              }`}>
                <span className="mr-1">GPA:</span> 3.65
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

EducationSection.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  roboticMode: PropTypes.bool.isRequired,
};

export default EducationSection;