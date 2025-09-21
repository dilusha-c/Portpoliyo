import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Sun, Moon, Cpu } from 'lucide-react'
import PropTypes from 'prop-types'
import BinaryMatrix from '../components/BinaryMatrix'
import CircuitPaths from '../components/CircuitPaths'
import LeftRobotDecoration from '../components/LeftRobotDecoration'

const HeroSection = ({ theme, roboticMode, scrollToSection, smoothScrollToSection, toggleTheme, toggleRoboticMode }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Toggle buttons for robotic theme and dark mode - moved down to avoid menu overlap */}
      <motion.button
        onClick={toggleRoboticMode}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`absolute top-12 left-4 md:top-12 md:left-8 z-30 flex items-center gap-2 py-2.5 px-5 rounded-lg ${
          theme === 'dark'
            ? roboticMode
              ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-cyan-200 border border-cyan-500'
              : 'bg-slate-800 text-gray-400 border border-slate-700'
            : roboticMode
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border border-blue-500'
              : 'bg-slate-200 text-gray-600 border border-slate-300'
        } transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50`}
        whileHover={{
          scale: 1.05,
          boxShadow: roboticMode ? '0 0 20px rgba(8, 145, 178, 0.5)' : '0 0 10px rgba(100, 116, 139, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
        title="Toggle Robotic Theme"
      >
        <div className="relative">
          <Cpu
            size={20}
            className={roboticMode
              ? `${theme === 'dark' ? 'text-cyan-300' : 'text-white'} animate-pulse`
              : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
            }
          />
          {roboticMode && (
            <div className="absolute -inset-1 rounded-full bg-cyan-400 opacity-30 blur-sm -z-10"></div>
          )}
        </div>
        <span className={`text-sm font-bold ${
          roboticMode
            ? theme === 'dark' ? 'text-cyan-300' : 'text-white'
            : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {roboticMode ? 'Robotic: ON' : 'Robotic: OFF'}
        </span>
        {roboticMode && (
          <motion.div
            className="absolute inset-0 border border-cyan-400/50 rounded-lg"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.2, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        )}
      </motion.button>

      <motion.button
        onClick={toggleTheme}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`absolute top-12 right-4 md:top-12 md:right-8 z-30 flex items-center gap-2 py-2.5 px-5 rounded-lg ${
          theme === 'dark'
            ? 'bg-slate-800 text-gray-400 border border-slate-700'
            : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border border-blue-500'
        } transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50`}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
        whileTap={{ scale: 0.95 }}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <div className="relative">
          {theme === 'dark' ? (
            <Sun size={20} className="text-white animate-pulse" />
          ) : (
            <Moon size={20} className="text-white" />
          )}
          <div className={`absolute -inset-1 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-indigo-400'} opacity-30 blur-sm -z-10`}></div>
        </div>
        <span className="text-sm font-bold text-white">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </motion.button>

      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300'
      } animate-gradient-x -z-10`} />

      {/* Grid pattern background */}
      {roboticMode && (
        <div
          className="absolute inset-0 animate-grid-pulse"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: 'center center'
          }}
        />
      )}

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Binary Matrix Background */}
      {roboticMode && <BinaryMatrix />}

      {/* Circuit Paths */}
      {roboticMode && <CircuitPaths theme={theme} />}

      {/* Left Side Robot Decoration - Only in Hero Section */}
      {roboticMode && <LeftRobotDecoration theme={theme} />}

      <motion.div
        className="container mx-auto text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
          animate={{
            textShadow: ["0 0 0px rgba(79, 209, 197, 0)", "0 0 20px rgba(79, 209, 197, 0.5)", "0 0 0px rgba(79, 209, 197, 0)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Animated words for "Hello, I'm Dilusha Chamika" */}
          <motion.div
            className="flex items-center space-x-3 intro-group"
            whileHover={{
              scale: 1.05,
              className: "flex items-center space-x-3 intro-group intro-group-active"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="intro-word animate-float-text animate-hello-color-shift"
              data-text="Hello,"
              style={{
                position: 'relative',
                display: 'inline-block',
                letterSpacing: '1px'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 }
              }}
            >
              Hello,
            </motion.span>

            <motion.span
              className="intro-word animate-pulse-glow animate-hello-color-shift"
              data-text="I'm"
              style={{
                position: 'relative',
                display: 'inline-block',
                letterSpacing: '1px'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 }
              }}
            >
              I&apos;m
            </motion.span>
          </motion.div>

          <motion.div
            className="inline-flex gap-4 name-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
            whileHover={{
              scale: 1.05,
              className: "inline-flex gap-4 name-group name-group-active"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className={`hero-text-word inline-block cursor-default relative font-bold name-glow-effect`}
              data-text="Dilusha"
              style={{
                letterSpacing: '2px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.7,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200
                }
              }}
            >
              <span className={roboticMode ? 'animate-robotic-text-glow' : 'animate-name-color-shift'}>Dilusha</span>
            </motion.span>

            <motion.span
              className={`hero-text-word inline-block cursor-default relative font-bold name-glow-effect animate-letter-spacing`}
              data-text="Chamika"
              style={{
                letterSpacing: '2px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.7,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200
                }
              }}
            >
              <span className={roboticMode ? 'animate-robotic-text-glow' : 'animate-name-color-shift'}>Chamika</span>

              {/* Digital circuit layer that appears on hover */}
              <motion.span
                className="absolute inset-0 z-0 opacity-0"
                whileHover={{ opacity: 0.3 }}
              />
            </motion.span>
          </motion.div>
        </motion.h2>
        <div className={`text-xl md:text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-semibold'} mb-8 h-10`}>
          <TypeAnimation
            sequence={[
              'Software Developer',
              1000,
              'AI Enthusiast',
              1000,
              'Drone Developer',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            onClick={() => smoothScrollToSection('certificates')}
            className={`${
              theme === 'dark'
                ? roboticMode
                  ? 'bg-gradient-to-r from-cyan-800 to-blue-900 text-cyan-200 border border-cyan-700'
                  : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
                : roboticMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-blue-400'
                  : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white'
            } font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 relative z-20`}
            whileHover={{
              scale: 1.05,
              boxShadow: roboticMode
                ? "0 0 15px rgba(6, 182, 212, 0.5)"
                : "0 0 15px rgba(100, 116, 139, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: 'auto' }}
          >
            {roboticMode ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                My Certificates
              </span>
            ) : (
              "My Certificates"
            )}
          </motion.button>
          <motion.button
            onClick={() => smoothScrollToSection('projects')}
            className={`${
              theme === 'dark'
                ? roboticMode
                  ? 'bg-gradient-to-r from-blue-800 to-indigo-900 text-blue-200 border border-blue-700'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                : roboticMode
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border border-indigo-400'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
            } font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 relative z-20`}
            whileHover={{
              scale: 1.05,
              boxShadow: roboticMode
                ? "0 0 15px rgba(37, 99, 235, 0.5)"
                : "0 0 15px rgba(107, 114, 128, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: 'auto' }}
          >
            {roboticMode ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                My Projects
              </span>
            ) : (
              "My Projects"
            )}
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <button
            onClick={() => scrollToSection('about')}
            className={`${theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-slate-700 hover:text-slate-900'} cursor-pointer`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="m6 9 6 6 6-6"></path></svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

HeroSection.propTypes = {
  theme: PropTypes.string.isRequired,
  roboticMode: PropTypes.bool.isRequired,
  scrollToSection: PropTypes.func.isRequired,
  smoothScrollToSection: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  toggleRoboticMode: PropTypes.func.isRequired
}

export default HeroSection