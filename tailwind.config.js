export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
      colors: {
        cyberpunk: {
          background: '#0a0a0f',
          cyan: '#06b6d4',
          green: '#00ff9f',
          purple: '#8b5cf6',
        },
        primary: {
          50: '#edfaff',
          100: '#d6f3ff',
          200: '#b5ecff',
          300: '#83e2ff',
          400: '#4ad1ff',
          500: '#22b8ff',
          600: '#0095ff',
          700: '#007aec',
          800: '#0062c0',
          900: '#00539a',
          950: '#00325c',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'blink': 'blink 2s infinite',
        'flicker': 'flicker 3s linear infinite',
        'rotate-gear': '', /* Removed rotation animation for better performance */
        'boot-text': 'boot-text 3s steps(40, end)',
        'progress-dots': 'progress-dots 2s steps(4, end) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 5px rgba(6, 182, 212, 0.5), 0 0 25px rgba(6, 182, 212, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 25px rgba(6, 182, 212, 0.8), 0 0 50px rgba(6, 182, 212, 0.5)',
          },
        },
        'glitch': {
          '0%, 100%': {
            'clip-path': 'inset(50% 0 50% 0)',
            transform: 'skew(0deg)',
          },
          '20%': {
            'clip-path': 'inset(0% 0 80% 0)',
            transform: 'skew(0.5deg)',
          },
          '40%': {
            'clip-path': 'inset(30% 0 30% 0)',
            transform: 'skew(-0.5deg)',
          },
          '60%': {
            'clip-path': 'inset(10% 0 70% 0)',
            transform: 'skew(0.5deg)',
          },
          '80%': {
            'clip-path': 'inset(70% 0 10% 0)',
            transform: 'skew(-0.5deg)',
          },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        'flicker': {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter: 'drop-shadow(0 0 1px rgba(6, 182, 212, 0.9)) drop-shadow(0 0 5px rgba(6, 182, 212, 0.4))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        'rotate-gear': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'boot-text': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'progress-dots': {
          '0%': { content: '"."' },
          '25%': { content: '".."' },
          '50%': { content: '"..."' },
          '75%': { content: '"..."' },
          '100%': { content: '"."' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
