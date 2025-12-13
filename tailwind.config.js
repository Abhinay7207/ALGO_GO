/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5722", // Orange
          hover: "#F4511E",
          light: "#FFCCBC",
        },
        secondary: {
          DEFAULT: "#FDD835", // Yellow
          hover: "#FBC02D",
          light: "#FFF9C4",
        },
        background: "#FFFFFF",
        surface: "#F5F5F5",
        accent: {
          blue: "#E3F2FD",
          pink: "#F8BBD0",
          purple: "#CE93D8",
          green: "#C8E6C9",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
