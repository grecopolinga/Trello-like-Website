const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "c-teal-light": "#99D5C9",
        "c-teal-dark": "#6C969D",
        "c-purple-light": "#645E9D",
        "c-purple-dark": "#392B58",
        "c-purple-darker": "#2D0320",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
