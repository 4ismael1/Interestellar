/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse-slow 15s linear infinite',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [],
};