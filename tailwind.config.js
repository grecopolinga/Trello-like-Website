const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "c-teal-light": "#80FFFF",
        "c-teal-dark": "#6C969D",
        "c-purple-light": "#645E9D",
        "c-purple-dark": "#B19CD9",
        "c-purple-darker": "#6E65C4",
        "c-whitesmoke": "#F5F5F5",
        webcolor: {
          "light-1": "#F8F7F7",
          "light-2": "#84ADC5",
          "base-color": "#63BBE2",
          "dark-1": "#7DA5BE",
          "dark-2": "#1F81C4",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
