/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb', // blue-600
        primaryDark: '#1d4ed8', // blue-700
        accent: '#f59e0b', // amber-500
      }
    },
  },
  plugins: [],
};
