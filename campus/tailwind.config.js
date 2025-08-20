/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#b6d8ff',
          300: '#8bbdff',
          400: '#5a9aff',
          500: '#3377ff',
          600: '#225ae6',
          700: '#1a47b3',
          800: '#183f8c',
          900: '#17386f',
        }
      }
    },
  },
  plugins: [],
}



