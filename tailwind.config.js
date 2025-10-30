/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9414FF',
        'primary-dark': '#7b0dd1',
        'bg-start': '#FFF6FF',
        'bg-end': '#E9ECF2',
        muted: '#62626B'
      },
      fontFamily: {
        sans: ['ABeeZee', 'sans-serif']
      }
    },
  },
  plugins: [],
}

