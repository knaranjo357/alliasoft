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
        background: '#030712',
        foreground: '#f9fafb',
        primary: '#38bdf8', // light blue
        primaryDark: '#0284c7', // dark blue
        accent: '#818cf8', // indigo
      }
    },
  },
  plugins: [],
};
