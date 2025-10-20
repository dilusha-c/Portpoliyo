import { motion } from 'framer-motion'
import RoboticSectionTitle from '../components/RoboticSectionTitle'
import { Mail, Github, Linkedin } from 'lucide-react'
import PropTypes from 'prop-types'
import RobotDecorator from '../components/RobotDecorator'

const ContactSection = ({ theme, roboticMode, contactFormData, setContactFormData, handleContactSubmit, formStatus }) => {
  return (
    <section id="contact" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative overflow-hidden`}>
      {/* CPU and Hardware Components Background - Only visible in robotic theme */}
      {roboticMode && <RobotDecorator type="hardware" section="contact" />}

      {/* Additional Robotic Pattern Background - Only shown in robotic theme */}
      {roboticMode && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Main circuit board grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}></div>

          {/* Circuit paths - horizontal */}
          <div className="absolute top-1/3 left-0 right-0 h-[1px]"
            style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>
          <div className="absolute top-2/3 left-0 right-0 h-[1px]"
            style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>

          {/* Circuit paths - vertical */}
          <div className="absolute top-0 bottom-0 w-[1px] left-1/3"
            style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>
          <div className="absolute top-0 bottom-0 w-[1px] right-1/3"
            style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`}}>
          </div>

          {/* Circuit nodes */}
          <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-full"
            style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
          </div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full"
            style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
          </div>
          <div className="absolute top-2/3 left-1/3 w-3 h-3 rounded-full"
            style={{background: theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)', boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`}}>
          </div>
          <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full"
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
          Contact Me
        </RoboticSectionTitle>

        {/* Robot decoration removed as requested */}

        <div className="max-w-3xl mx-auto">
          <motion.div
            className={`${
              theme === 'dark'
                ? 'bg-slate-900'
                : 'bg-white'
            } p-8 rounded-lg shadow-lg ${roboticMode ? 'border border-cyan-500 relative' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {roboticMode && (
              <>
                {/* Corner robot circuit decorations */}
                <div className="absolute top-0 left-0 w-5 h-5">
                  <div className="w-3 h-[1px] bg-cyan-500 absolute top-0 left-0"></div>
                  <div className="w-[1px] h-3 bg-cyan-500 absolute top-0 left-0"></div>
                </div>
                <div className="absolute top-0 right-0 w-5 h-5">
                  <div className="w-3 h-[1px] bg-cyan-500 absolute top-0 right-0"></div>
                  <div className="w-[1px] h-3 bg-cyan-500 absolute top-0 right-0"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-5 h-5">
                  <div className="w-3 h-[1px] bg-cyan-500 absolute bottom-0 left-0"></div>
                  <div className="w-[1px] h-3 bg-cyan-500 absolute bottom-0 left-0"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5">
                  <div className="w-3 h-[1px] bg-cyan-500 absolute bottom-0 right-0"></div>
                  <div className="w-[1px] h-3 bg-cyan-500 absolute bottom-0 right-0"></div>
                </div>

                {/* Top communication node */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-cyan-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  </div>
                </div>
              </>
            )}
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              {/* Status message */}
              {formStatus.error && (
                <motion.div
                  className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-red-900/30 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-700'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    {formStatus.error}
                  </div>
                </motion.div>
              )}

              {formStatus.submitted && (
                <motion.div
                  className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-green-900/30 border-green-800 text-green-200' : 'bg-green-50 border-green-200 text-green-700'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Your message has been sent successfully! I&apos;ll get back to you soon.
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                    {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                    {roboticMode ? 'USER_NAME' : 'Name'} *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    required
                    className={`w-full ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                      theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                    } ${roboticMode ? 'font-mono border-cyan-500' : ''}`}
                    placeholder="Your name"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                    {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                    {roboticMode ? 'USER_EMAIL' : 'Email'} *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    required
                    className={`w-full ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                      theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                    } ${roboticMode ? 'font-mono border-cyan-500' : ''}`}
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                  {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                  {roboticMode ? 'MESSAGE_SUBJECT' : 'Subject'}
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  value={contactFormData.subject}
                  onChange={(e) => setContactFormData({...contactFormData, subject: e.target.value})}
                  className={`w-full ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                  } ${roboticMode ? 'font-mono border-cyan-500' : ''}`}
                  placeholder="Subject of your message"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label htmlFor="message" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 ${roboticMode ? 'font-mono flex items-center' : ''}`}>
                  {roboticMode && <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>}
                  {roboticMode ? 'MESSAGE_CONTENT' : 'Message'} *
                </label>
                <motion.textarea
                  id="message"
                  rows="5"
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                  required
                  className={`w-full ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    theme === 'dark' ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                  } ${roboticMode ? 'font-mono border-cyan-500 relative' : ''}`}
                  placeholder={roboticMode ? "ENTER_MESSAGE_HERE..." : "Your message here..."}
                  whileFocus={{ scale: 1.01 }}
                ></motion.textarea>
              </div>

              <motion.button
                type="submit"
                disabled={formStatus.submitting}
                className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all ${
                  roboticMode ? 'border border-cyan-400 relative overflow-hidden' : ''
                } ${formStatus.submitting ? 'opacity-70' : ''}`}
                whileHover={!formStatus.submitting ? { scale: 1.02, boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)" } : {}}
                whileTap={!formStatus.submitting ? { scale: 0.98 } : {}}
              >
                {formStatus.submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {roboticMode ? "PROCESSING..." : "Sending..."}
                  </div>
                ) : (
                  <>
                    {roboticMode && (
                      <>
                        {/* Circuit pattern overlay */}
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '10px 10px'
                        }}></div>

                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

                        <span className="flex items-center justify-center gap-2 relative z-10">
                          <span className="inline-block w-2 h-2 rounded-full bg-cyan-200 animate-pulse"></span>
                          SEND_MESSAGE
                          <span className="inline-block w-2 h-2 rounded-full bg-cyan-200 animate-pulse"></span>
                        </span>
                      </>
                    )}
                    {!roboticMode && "Send Message"}
                  </>
                )}
              </motion.button>
            </form>

            <div className={`mt-10 pt-8 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} ${roboticMode ? 'relative' : ''}`}>
              {roboticMode && (
                <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-slate-900 px-3 py-1 border border-cyan-500 rounded-md">
                  <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                    CONTACT_OPTIONS
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  </span>
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-8">
                <motion.a
                  href="https://www.linkedin.com/in/dilusha-chamika/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                  } transition-colors ${roboticMode ? 'border border-cyan-500 px-3 py-2 rounded-md relative' : ''}`}
                  whileHover={{
                    scale: roboticMode ? 1.05 : 1.1,
                    boxShadow: roboticMode ? "0 0 10px rgba(6, 182, 212, 0.5)" : "none"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {roboticMode && (
                    <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-500"></span>
                  )}
                  <Linkedin size={20} className={roboticMode ? 'text-cyan-400' : ''} />
                  <span className={roboticMode ? 'font-mono text-cyan-400' : ''}>
                    {roboticMode ? 'LINKEDIN_PROFILE' : 'LinkedIn'}
                  </span>
                </motion.a>

                <motion.a
                  href="https://github.com/dilusha-c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                  } transition-colors ${roboticMode ? 'border border-cyan-500 px-3 py-2 rounded-md relative' : ''}`}
                  whileHover={{
                    scale: roboticMode ? 1.05 : 1.1,
                    boxShadow: roboticMode ? "0 0 10px rgba(6, 182, 212, 0.5)" : "none"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {roboticMode && (
                    <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-500"></span>
                  )}
                  <Github size={20} className={roboticMode ? 'text-cyan-400' : ''} />
                  <span className={roboticMode ? 'font-mono text-cyan-400' : ''}>
                    {roboticMode ? 'GITHUB_REPO' : 'GitHub'}
                  </span>
                </motion.a>

                <motion.a
                  href="mailto:dilushachamika@gmail.com"
                  className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-500'
                  } transition-colors ${roboticMode ? 'border border-cyan-500 px-3 py-2 rounded-md relative' : ''}`}
                  whileHover={{
                    scale: roboticMode ? 1.05 : 1.1,
                    boxShadow: roboticMode ? "0 0 10px rgba(6, 182, 212, 0.5)" : "none"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {roboticMode && (
                    <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-500"></span>
                  )}
                  <Mail size={20} className={roboticMode ? 'text-cyan-400' : ''} />
                  <span className={roboticMode ? 'font-mono text-cyan-400' : ''}>
                    {roboticMode ? 'EMAIL_COM' : 'Email'}
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

ContactSection.propTypes = {
  theme: PropTypes.string.isRequired,
  roboticMode: PropTypes.bool.isRequired,
  contactFormData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subject: PropTypes.string,
    message: PropTypes.string.isRequired
  }).isRequired,
  setContactFormData: PropTypes.func.isRequired,
  handleContactSubmit: PropTypes.func.isRequired,
  formStatus: PropTypes.shape({
    submitting: PropTypes.bool.isRequired,
    submitted: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired
}

export default ContactSection