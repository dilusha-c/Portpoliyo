import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.EMAILJS_SERVICE_ID': JSON.stringify(process.env.EMAILJS_SERVICE_ID || ''),
    'import.meta.env.EMAILJS_TEMPLATE_ID': JSON.stringify(process.env.EMAILJS_TEMPLATE_ID || ''),
    'import.meta.env.EMAILJS_PUBLIC_KEY': JSON.stringify(process.env.EMAILJS_PUBLIC_KEY || ''),
  },
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
            './src/components/FlyingDroneSimplified',
            './src/components/HumanoidRobotSimplified',
            './src/components/LeftRobotDecoration',
            './src/components/RobotTextDisplay',
            './src/components/RoboticSectionTitle'
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
