/** @type {import("prettier").Config} */
const config = {
  plugins: [
    require.resolve("@liene-putnina/eslint-config-lintmyride/src/prettier.js"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
