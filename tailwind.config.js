const mytheme = require('./theme.config');

module.exports = {
  theme: {},
  variants: {},
  plugins: [mytheme],
  purge: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
};
