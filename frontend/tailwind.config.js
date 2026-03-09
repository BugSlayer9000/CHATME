import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                 // the template
    "./src/**/*.{js,jsx,ts,tsx}",   // look in JS/JSX/TS/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};