import { motion } from 'framer-motion'
import RoboticSectionTitle from '../components/RoboticSectionTitle'
import CertificationsDisplay from '../components/CertificationsDisplay'
import PropTypes from 'prop-types'

const CertificatesSection = ({ theme, roboticMode }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="certificates" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300 relative overflow-hidden`}>
      {/* No hardware decorations for certificates section */}
      <div className="container mx-auto relative z-10">
        <RoboticSectionTitle>
          Certifications
        </RoboticSectionTitle>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <CertificationsDisplay theme={theme} roboticMode={roboticMode} />
        </motion.div>
      </div>
    </section>
  )
}

CertificatesSection.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  roboticMode: PropTypes.bool.isRequired,
}

export default CertificatesSection