/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#fdf2f8',
          dark: '#160913',
          card: '#23101e',
          purple: '#db2777', // pink brand accent
          purpleLight: '#f472b6',
          coral: '#f43f5e', // rose secondary accent
          coralHover: '#e11d48',
          teal: '#00f0ff',
          safe: '#10b981',
          warning: '#f59e0b',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 2s infinite ease-out',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
