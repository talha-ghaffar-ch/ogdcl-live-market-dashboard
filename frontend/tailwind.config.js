/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ogdcBrand: '#F58220', // OGDCL Orange
        ogdcBlue: '#002D62', // OGDCL Deep Blue
        ogdcLight: '#E8EDF2',
        psxGreen: '#00E676',
        psxRed: '#FF3B30',
        psxDark: '#0B132B',
        psxCard: '#131F3D',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      animation: {
        'glow-pulse-green': 'glowGreen 2s infinite',
        'glow-pulse-red': 'glowRed 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        glowGreen: {
          '0%, 100%': { boxShadow: '0 0 5px #00E676, 0 0 10px #00E676', backgroundColor: '#00E676' },
          '50%': { boxShadow: '0 0 2px #00E676, 0 0 4px #00E676', backgroundColor: '#00C853' },
        },
        glowRed: {
          '0%, 100%': { boxShadow: '0 0 5px #FF3B30, 0 0 10px #FF3B30', backgroundColor: '#FF3B30' },
          '50%': { boxShadow: '0 0 2px #FF3B30, 0 0 4px #FF3B30', backgroundColor: '#D50000' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
