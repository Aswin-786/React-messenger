/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'jost': ['jost', 'sans-serif']
      },
      screens: {
        xs: '300px'
      },
      colors: {
        navBar: "#1d1e25",
        primary: "#121316",
        textBase: "#8f9091",
        textLight: "#aeafaf",
        bg: '#111112',
        x: '#252529',
        screen: '#292933',
      },
    },
  },
  plugins: [],
}

