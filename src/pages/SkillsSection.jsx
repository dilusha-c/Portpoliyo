import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import RoboticSectionTitle from '../components/RoboticSectionTitle'

const SkillsSection = ({ theme, roboticMode, setShowSkillsModal }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const skills = [
    { name: "Java", level: 100 },
    { name: "C", level: 100 },
    { name: "Python", level: 100 },
    { name: "React.js", level: 100 },
    { name: "TensorFlow", level: 100 },
    { name: "Spring Boot", level: 100 },
    { name: "MySQL", level: 100 },
    { name: "Machine Learning", level: 100 }
  ]

  return (
    <section id="skills" className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative overflow-hidden`}>
      {/* Circuit pattern background - only shown in robotic theme */}
      {roboticMode && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Main circuit board grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>

          {/* Circuit paths - horizontal */}
          <div className="absolute top-1/4 left-0 right-0 h-[1px]"
            style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>
          <div className="absolute top-3/4 left-0 right-0 h-[1px]"
            style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>

          {/* Circuit paths - vertical */}
          <div className="absolute top-0 bottom-0 w-[1px] left-1/4"
            style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>
          <div className="absolute top-0 bottom-0 w-[1px] right-1/4"
            style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>

          {/* Circuit nodes */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full"
            style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
          </div>
          <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full"
            style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
          </div>
          <div className="absolute top-3/4 left-1/4 w-4 h-4 rounded-full"
            style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
          </div>
          <div className="absolute top-3/4 right-1/4 w-4 h-4 rounded-full"
            style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
          </div>

          {/* Diagonal circuit traces */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Fixed SVG path format using lines instead of paths with percentage values */}
            <line x1="0" y1="0" x2="100%" y2="100%"
              stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.1)'}
              strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%"
              stroke={theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.1)'}
              strokeWidth="1" />
          </svg>
        </div>
      )}

      <div className="container mx-auto relative z-10">
        <RoboticSectionTitle>
          My Skills
        </RoboticSectionTitle>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className={`relative ${theme === 'dark' ? 'bg-slate-700/80' : 'bg-slate-200/80'} p-3 mb-6 rounded-md ${roboticMode ? `border-l-4 ${theme === 'dark' ? 'border-cyan-400' : 'border-blue-500'}` : ''}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center whitespace-nowrap`}>
                  {roboticMode && (
                    <span className={`inline-block w-3 h-3 mr-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                  )}
                  {roboticMode ? 'Programming' : 'Programming & Development'}
                </h3>
                {/* Circuit decoration - only in robotic mode */}
                {roboticMode && (
                  <div className="absolute top-0 right-0 w-8 h-8">
                    <div className={`w-4 h-[1px] ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                    <div className={`w-[1px] h-4 ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                  </div>
                )}
              </div>
              <motion.div
                className="space-y-4"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.slice(0, 4).map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`mb-4 p-3 rounded-md relative ${theme === 'dark' ? 'bg-slate-700/60' : 'bg-slate-200/60'}`}
                    whileHover={{
                      boxShadow: theme === 'dark'
                        ? '0 0 12px rgba(6, 182, 212, 0.3)'
                        : '0 0 12px rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    <div className="mb-2">
                      <span className="font-medium flex items-center gap-2">
                        {/* Small circuit node icon */}
                        <span className={`inline-block w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-400'}`}></span>
                        {skill.name}
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'} p-0.5`}>
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          theme === 'dark' ? 'from-cyan-600 to-cyan-400' : 'from-blue-600 to-blue-400'
                        } relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 * index }}
                      >
                        {/* Small light dots along the progress bar */}
                        {[...Array(Math.floor(skill.level / 20))].map((_, i) => (
                          <span
                            key={i}
                            className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                              theme === 'dark' ? 'bg-cyan-200' : 'bg-white'
                            }`}
                            style={{ left: `${(i + 1) * 20}%` }}
                          ></span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Circuit corners for the tech feel */}
                    <div className="absolute top-0 left-0 w-2 h-2">
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-current opacity-30"></div>
                      <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-2 h-2">
                      <div className="w-full h-[1px] bg-gradient-to-l from-transparent to-current opacity-30"></div>
                      <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <div className={`relative ${theme === 'dark' ? 'bg-slate-700/80' : 'bg-slate-200/80'} p-3 mb-6 rounded-md ${roboticMode ? `border-l-4 ${theme === 'dark' ? 'border-cyan-400' : 'border-blue-500'}` : ''}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center`}>
                  {roboticMode && (
                    <span className={`inline-block w-3 h-3 mr-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                  )}
                  AI & Tools
                </h3>
                {/* Circuit decoration - only in robotic mode */}
                {roboticMode && (
                  <div className="absolute top-0 right-0 w-8 h-8">
                    <div className={`w-4 h-[1px] ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                    <div className={`w-[1px] h-4 ${theme === 'dark' ? 'bg-cyan-400/50' : 'bg-blue-500/50'} absolute top-0 right-0`}></div>
                  </div>
                )}
              </div>
              <motion.div
                className="space-y-4"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills.slice(4).map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`mb-4 p-3 rounded-md relative ${theme === 'dark' ? 'bg-slate-700/60' : 'bg-slate-200/60'}`}
                    whileHover={{
                      boxShadow: theme === 'dark'
                        ? '0 0 12px rgba(6, 182, 212, 0.3)'
                        : '0 0 12px rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    <div className="mb-2">
                      <span className="font-medium flex items-center gap-2">
                        {/* Small circuit node icon */}
                        <span className={`inline-block w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-400'}`}></span>
                        {skill.name}
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'} p-0.5`}>
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          theme === 'dark' ? 'from-cyan-600 to-cyan-400' : 'from-blue-600 to-blue-400'
                        } relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 * index }}
                      >
                        {/* Small light dots along the progress bar */}
                        {[...Array(Math.floor(skill.level / 20))].map((_, i) => (
                          <span
                            key={i}
                            className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                              theme === 'dark' ? 'bg-cyan-200' : 'bg-white'
                            }`}
                            style={{ left: `${(i + 1) * 20}%` }}
                          ></span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Circuit corners for the tech feel */}
                    <div className="absolute top-0 left-0 w-2 h-2">
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-current opacity-30"></div>
                      <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-2 h-2">
                      <div className="w-full h-[1px] bg-gradient-to-l from-transparent to-current opacity-30"></div>
                      <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-current opacity-30"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-12 flex justify-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="relative">
              {/* Circuit connection lines to button - only in robotic mode */}
              {roboticMode && (
                <>
                  <div className={`absolute left-1/2 -top-10 w-[1px] h-10 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>
                  <div className={`absolute left-1/2 top-full w-[1px] h-4 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>
                  <div className={`absolute top-1/2 -left-10 h-[1px] w-10 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>
                  <div className={`absolute top-1/2 -right-10 h-[1px] w-10 ${theme === 'dark' ? 'bg-cyan-400/30' : 'bg-blue-400/30'}`}></div>

                  {/* Circuit nodes */}
                  <div className={`absolute left-1/2 -top-10 w-3 h-3 rounded-full transform -translate-x-1/2 ${theme === 'dark' ? 'bg-cyan-500/40' : 'bg-blue-500/40'}`}></div>
                  <div className={`absolute -left-10 top-1/2 w-3 h-3 rounded-full transform -translate-y-1/2 ${theme === 'dark' ? 'bg-cyan-500/40' : 'bg-blue-500/40'}`}></div>
                  <div className={`absolute -right-10 top-1/2 w-3 h-3 rounded-full transform -translate-y-1/2 ${theme === 'dark' ? 'bg-cyan-500/40' : 'bg-blue-500/40'}`}></div>
                </>
              )}

              <motion.button
                onClick={() => setShowSkillsModal(true)}
                className={`px-10 py-4 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400'
                } text-white font-semibold shadow-lg transition-all relative overflow-hidden`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: theme === 'dark'
                    ? "0 0 20px rgba(34, 211, 238, 0.6)"
                    : "0 0 20px rgba(59, 130, 246, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Circuit pattern overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '10px 10px'
                }}></div>

                {/* Corner circuit decorations */}
                <div className="absolute top-0 left-0 w-4 h-4">
                  <div className="w-3 h-[1px] bg-white/40 absolute top-0 left-0"></div>
                  <div className="w-[1px] h-3 bg-white/40 absolute top-0 left-0"></div>
                </div>
                <div className="absolute top-0 right-0 w-4 h-4">
                  <div className="w-3 h-[1px] bg-white/40 absolute top-0 right-0"></div>
                  <div className="w-[1px] h-3 bg-white/40 absolute top-0 right-0"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-4 h-4">
                  <div className="w-3 h-[1px] bg-white/40 absolute bottom-0 left-0"></div>
                  <div className="w-[1px] h-3 bg-white/40 absolute bottom-0 left-0"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4">
                  <div className="w-3 h-[1px] bg-white/40 absolute bottom-0 right-0"></div>
                  <div className="w-[1px] h-3 bg-white/40 absolute bottom-0 right-0"></div>
                </div>

                {/* Button content */}
                <span className="flex items-center gap-3 relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  {roboticMode ? 'VIEW_SKILL.DATA' : 'View Detailed Skills'}

                  <span className={`inline-block w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-300' : 'bg-white'} animate-pulse`}></span>
                </span>

                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

SkillsSection.propTypes = {
  theme: PropTypes.string.isRequired,
  roboticMode: PropTypes.bool.isRequired,
  setShowSkillsModal: PropTypes.func.isRequired
}

export default SkillsSection