/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        "bg-color": "#FDFBF7",
        "card-bg": "#FFFFFF",
        "border-color": "#000000",
        "text-main": "#1A1A1A",
        "shadow-color": "#000000",
        urgent: "#EF4444",
        important: "#F59E0B",
        work: "#3B82F6",
        personal: "#10B981",
      },
      fontFamily: {
        sans: ['"Signika Negative"', "sans-serif"],
      },
      boxShadow: {
        neo: "5px 5px 0px 0px #000000",
        "neo-sm": "3px 3px 0px 0px #000000",
        "neo-hover": "3px 3px 0px 0px #000000",
        "neo-active": "0px 0px 0px 0px #000000",
        "neo-tag": "2px 2px 0px 0px #000000",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
