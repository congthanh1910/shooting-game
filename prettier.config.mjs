/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn"],
};

export default config;
