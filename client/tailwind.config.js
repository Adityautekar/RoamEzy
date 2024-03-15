/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: '#1C5E95',
        primary_light : "#4E9CC9",
        backshade : "#F3F4F6",
        secondary : "#EF4444"
      }
    },
  },
  plugins: [],
}

