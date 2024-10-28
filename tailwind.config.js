/** @type {import('tailwindcss').Config} */
import tailwindForms from "@tailwindcss/forms"
import lineClamp from "@tailwindcss/line-clamp"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xs: '375px'
      },
      colors: {
        'primary': '#235DFF'
      },
      fontFamily:{
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        zenDots: ['Zen Dots', 'sans-serif']
      },
      backgroundImage: {
        "share-image": "linear-gradient(269.23deg, #121414 13.82%, #171612 85.82%)"
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      }
    },
  },
  plugins: [
    tailwindForms(),
    lineClamp
  ],
}