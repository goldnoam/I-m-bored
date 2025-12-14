/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'Assistant', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#8b5cf6', // Violet 500
          dark: '#7c3aed', // Violet 600
        },
        secondary: {
          DEFAULT: '#f43f5e', // Rose 500
          dark: '#e11d48', // Rose 600
        }
      }
    },
  },
  plugins: [],
}