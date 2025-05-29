/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  arrowParens: "avoid",
  singleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn"],
};

export default config;
