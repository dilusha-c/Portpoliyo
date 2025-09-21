import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from '../contexts/ThemeContext'

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  const [roboticMode, setRoboticMode] = useState(true) // Default to robotic mode enabled

  // Initialize theme from localStorage if available, otherwise use dark + robotic by default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedRoboticMode = localStorage.getItem('roboticMode')

    // Set dark theme by default or from localStorage if available
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.className = savedTheme
    } else {
      setTheme('dark')
      document.documentElement.className = 'dark'
      localStorage.setItem('theme', 'dark')
    }

    // Set robotic mode by default or from localStorage if available
    if (savedRoboticMode !== null) {
      const roboticEnabled = savedRoboticMode === 'true'
      setRoboticMode(roboticEnabled)
      if (roboticEnabled) {
        document.body.classList.add('robotic-theme')
      } else {
        document.body.classList.remove('robotic-theme')
      }
    } else {
      // Default to robotic mode if not set in localStorage
      document.body.classList.add('robotic-theme')
      localStorage.setItem('roboticMode', 'true')
    }

    // Ensure proper scrolling behavior
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'auto'
  }, [])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.className = newTheme
    localStorage.setItem('theme', newTheme)
  }

  // Toggle robotic theme
  const toggleRoboticMode = () => {
    const newRoboticMode = !roboticMode
    setRoboticMode(newRoboticMode)

    if (newRoboticMode) {
      document.body.classList.add('robotic-theme')
    } else {
      document.body.classList.remove('robotic-theme')
    }

    // Always ensure proper scrolling behavior when toggling modes
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = 'auto'

    localStorage.setItem('roboticMode', newRoboticMode)
  }

  return (
    <ThemeContext.Provider value={{ theme, roboticMode, toggleTheme, toggleRoboticMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ThemeProvider