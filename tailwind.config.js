/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
    extend: {
      colors: {
        'blueT' : '#176B87',
        'navy' : '#053B50',
        'teal' : '#64CCC5',
        'greyT' : '#EEEEEE',
      },
      fontFamily: ['Roboto', "sans-serif"]
    },
  },
  plugins: [ require('@tailwindcss/forms') ],
}

