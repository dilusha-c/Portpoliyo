import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/next';
import './index.css'
import './styles/roboticTheme.css'
import App from './App.jsx'

// Create a theme context provider
import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext({
  theme: 'dark',
  roboticMode: false,
  toggleTheme: () => {},
  toggleRoboticMode: () => {}
})

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

// Quick mobile check before rendering to prevent cursor issues
const detectMobile = () => {
  if (typeof window !== 'undefined') {
    return (
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) || 
      (navigator.msMaxTouchPoints > 0) ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }
  return false;
};

// Apply mobile class immediately if needed
if (detectMobile()) {
  document.body.classList.add('is-mobile-device');
  document.documentElement.setAttribute('data-mobile', 'true');
  // Ensure no cursor effects are applied
  document.body.classList.remove('gear-cursor-active');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  </StrictMode>,
)
