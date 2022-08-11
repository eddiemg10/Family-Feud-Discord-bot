/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monts: ["Montserrat"],
      },
      colors: {
        dark: "#10003E",
        discord: "#7289DA",
      },
    },
  },
  plugins: [],
};
