/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#D5DAE1',
        },
        black: {
          DEFAULT: '#000',
          500: '#1D2235',
        },
        blue: {
          500: '#2b77e7',
        },
        'dark-pink': {
          500: '#BF6573',
        },
        'primary-grey': '#2C2E31',
        'primary-text': '#4f5c5e',
        'primary-text-dark': '#ffffff',
        'secondary-text-dark': '#aaabac',
      },
      fontFamily: {
        worksans: ['Work Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        amatic: ['Amatic SC', 'sans-serif'],
        inconsolata: ['Inconsolata', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        fade: 'transition-opacity duration-1000 ease-in ',
      },
    },
  },
  plugins: [],
};
