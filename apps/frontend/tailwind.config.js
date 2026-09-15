/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

module.exports = {
  darkMode: ['selector', '.app-dark'],
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      spacing: {
        navbar: '4rem',
      },
      maxWidth: {
        layout: '1920px',
      },
    },
  },
  plugins: [PrimeUI],
}
