/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'ny':['Inter Tight', 'sans-serif'],
        'roboto':['Roboto', 'sans-serif'],
        'sans':['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}