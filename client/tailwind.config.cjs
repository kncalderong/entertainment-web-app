/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'red': '#FC4747',
      'dark-blue': '#10141E',
      'semi-dark-blue': '#161DF2',
      'greyish-blue': '#5A698F',
      'white': '#FFF'
      },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}
