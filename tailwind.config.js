/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        rounded: ['"Baloo 2"', '"Comic Sans MS"', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      colors: {
        sunny: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        bubble: {
          50: '#eff9ff',
          100: '#dcf2ff',
          200: '#b6e6ff',
          300: '#7dd3ff',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        candy: {
          50: '#fef1f9',
          100: '#fee5f4',
          200: '#fecdea',
          300: '#fda4d8',
          400: '#fb6fbb',
          500: '#f0429c',
          600: '#d1257d',
        },
        leafy: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        grape: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '70%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        driftRight: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        driftLeft: {
          '0%': { transform: 'translateX(10%)' },
          '100%': { transform: 'translateX(-120vw)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0.3' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(251,191,36,0.6)' },
          '50%': { boxShadow: '0 0 24px rgba(251,191,36,0.9)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        floatSlow: 'floatSlow 7s ease-in-out infinite',
        wiggle: 'wiggle 1.2s ease-in-out infinite',
        popIn: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        driftRight: 'driftRight 40s linear infinite',
        driftLeft: 'driftLeft 55s linear infinite',
        sparkle: 'sparkle 2.4s ease-in-out infinite',
        confettiFall: 'confettiFall 3.2s linear forwards',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      },
      boxShadow: {
        chunky: '0 6px 0 rgba(0,0,0,0.15)',
        'chunky-sm': '0 4px 0 rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
