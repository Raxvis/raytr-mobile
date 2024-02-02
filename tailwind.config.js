/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#181818',
      },
      fontFamily: {
        poppins: ['Poppins_400Regular'],
      },
    },
  },
  plugins: [],
};
