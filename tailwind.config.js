/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#f5f4ff',
        surface: '#ffffff',
        'surface-2': '#ede9fe',
        purple: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'fade-in':    'fadeIn 0.7s ease-out forwards',
        'slide-up':   'slideUp 0.6s ease-out forwards',
        'spin-slow':  'spin 20s linear infinite',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      boxShadow: {
        'glass':    '0 2px 12px rgba(139,92,246,0.07)',
        'glass-lg': '0 20px 60px rgba(139,92,246,0.14)',
        'purple':   '0 0 0 1px rgba(124,58,237,0.15), 0 8px 32px rgba(124,58,237,0.10)',
      },
    },
  },
  plugins: [],
}
