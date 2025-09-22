import { motion } from 'framer-motion'
import RoboticSectionTitle from '../components/RoboticSectionTitle'
import { Github, ExternalLink } from 'lucide-react'
const animalRecognizerImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527960/kdvukqbd7wuwjrgfs9ir.jpg'
const gymSyncImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527966/somuuyhlbef1gaqlwmn5.jpg'
const zaveImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527972/wcjr4d6lvz6jj1lv4kol.jpg'
const landmineRobotImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527969/xtenkluxsdvbt3k1uupy.jpg'
import PropTypes from 'prop-types'

const ProjectsSection = ({ theme }) => {
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

  return (
    <section id="projects" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300 relative overflow-hidden`}>
      {/* No hardware decorations for projects section */}
      <div className="container mx-auto relative z-10">
        <RoboticSectionTitle>
          My Projects
        </RoboticSectionTitle>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Project Cards */}
          {/* Animal Recognizer Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={animalRecognizerImg}
                  alt="Animal Recognizer Interface"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.a
                      href="https://github.com/it23782518/animal-recognizer"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Animal Recognizer</h3>
                <span className="text-sm text-gray-400">Jun 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                AI-powered animal image classification web application that identifies 64 different animal species using a custom CNN model.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Real-time animal recognition with TensorFlow</li>
                  <li>Next.js (TypeScript) frontend with Tailwind CSS</li>
                  <li>Python backend for ML model inference</li>
                  <li>Custom CNN model trained with Keras</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>TensorFlow</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Next.js</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>TypeScript</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Python</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>CNN</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Keras</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/it23782518/animal-recognizer"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  GitHub Repository <Github size={14} />
                </motion.a>
                <motion.a
                  href="https://colab.research.google.com/drive/1Lxqs1Xpi1tqzfvkwWuF34jLmgaItbC2m?usp=sharing"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Colab Notebook <ExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* GymSync Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={gymSyncImg}
                  alt="GymSync Dashboard"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.a
                      href="https://mansa-brown.vercel.app/"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </motion.a>
                    <motion.a
                      href="https://github.com/SLIIT-FacultyOfComputing/group-project-group-5"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">GymSync</h3>
                <span className="text-sm text-gray-400">Feb - May 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Advanced Gym Management System developed for SLIIT&apos;s Object-Oriented Analysis & Design module.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Real-time equipment tracking & status management</li>
                  <li>Staff management with role-based access control</li>
                  <li>Appointment booking system for trainers & members</li>
                  <li>QR code integration for quick access</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>React.js</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Spring Boot</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Tailwind CSS</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>MySQL</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>RESTful APIs</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="https://mansa-brown.vercel.app/"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Live Demo <ExternalLink size={14} />
                </motion.a>
                <motion.a
                  href="https://github.com/SLIIT-FacultyOfComputing/group-project-group-5"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  GitHub Repository <Github size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Zave Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={zaveImg}
                  alt="Zave Financial Literacy App UI Design"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.a
                      href="https://www.figma.com/proto/elgBua5RuTE8fNkz6IZGh7/zave?node-id=0-1&t=uhsAeFJEduhZJXO6-1"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Zave - Financial Literacy App</h3>
                <span className="text-sm text-gray-400">Mar 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                UI design for a gamified financial literacy app tailored for GenZ users, built for InterfaceX design competition.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Budget & Expense Manager with analytics</li>
                  <li>Financial Quizzes with interactive modules</li>
                  <li>Leaderboards for competitive learning</li>
                  <li>Goal Tracker with progress visualization</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>UI/UX Design</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Figma</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Prototype</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.figma.com/proto/elgBua5RuTE8fNkz6IZGh7/zave?node-id=0-1&t=uhsAeFJEduhZJXO6-1"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  View Prototype <ExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Landmine Detection Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={landmineRobotImg}
                  alt="Autonomous Landmine Detection Robot"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    {/* No links available for this project */}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Autonomous Landmine Detection System</h3>
                <span className="text-sm text-gray-400">Nov 2023 - Mar 2024</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                A foundational landmine detection system utilizing magnetic field sensing technology and a 4WD Arduino-based robot.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Magnetic sensor integration for metallic landmine detection</li>
                  <li>4WD Arduino-based robot with rotating sensor arm</li>
                  <li>Real-time data visualization and alerts</li>
                  <li>Presented at Idea Spark 2 competition (SLIIT)</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Arduino</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Robotics</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>IoT</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Sensors</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

ProjectsSection.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
}

export default ProjectsSection