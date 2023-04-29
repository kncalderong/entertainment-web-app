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
      'semi-dark-blue': '#161D2F',
      'greyish-blue': '#5A698F',
      'grey':'#9ca3af',
      'white': '#FFF',
      'greyish-blue-opacity-50' : 'rgba(16, 20, 30, 1)'
    },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif']
      },
      fontSize: {
        'base-15': '15px'
      },      
    },
    
  },
  plugins: [],
}
