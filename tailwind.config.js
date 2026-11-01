/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#4D9D41',
          green: '#4D9D41',
          'green-dark': '#3E8234',
          black: '#000000',
          white: '#FFFFFF',
          ink: '#111111',
          muted: '#111111',
        },
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.18)',
        'card-hover': '0 20px 40px -14px rgba(0, 0, 0, 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
