import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'emailjs': ['@emailjs/browser'],
          'lucide-icons': ['lucide-react'],
          'type-animation': ['react-type-animation'],
          'vercel-analytics': ['@vercel/analytics/react', '@vercel/speed-insights/react'],

          // UI library chunks
          'ui-components': [
            './src/components/BinaryMatrix',
            './src/components/CircuitPaths',
            './src/components/FlyingDrone',
            './src/components/HumanoidRobot',
            './src/components/HumanRobotDecoration',
            './src/components/LeftRobotDecoration',
            './src/components/RobotBackgroundDecoration',
            './src/components/RobotDecorator',
            './src/components/RoboticSectionTitle',
            './src/components/RobotTextDisplay'
          ],

          // Animation chunks
          'animations': [
            './src/components/BootScreen'
          ]
        }
      }
    }
  }
})
