const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    extend: {
      height: {
        "30vh": "30vh",
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addComponents }) {
      const credits = {
        ".credit-text": {
          fontSize: "0.75rem",
          color: "gray",
        },
        ".credit-link": {
          fontSize: "0.75rem",
          textDecoration: "underline",
          "&:hover": {
            color: "black",
          },
        },
      };
      addComponents(credits);
    }),
  ],
};
