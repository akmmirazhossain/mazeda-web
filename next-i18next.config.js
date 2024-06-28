// next-i18next.config.js
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "bn"],
  },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json", // Correct path format
  },
  localePath: path.resolve("./public/locales"), // Ensure this points to your locale directory
};
