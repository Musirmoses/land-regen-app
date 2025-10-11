/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          light: "#a7f3d0",
          DEFAULT: "#16a34a",
          dark: "#14532d",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(to right, #16a34a, #14532d)",
      },
    },
  },
  plugins: [],
}
