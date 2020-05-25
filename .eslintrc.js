module.exports = {
  root: true,
  extends: ['@tkhiking'],
  parserOptions: {
    project: ['./tsconfig.json', './tests/e2e/tsconfig.json'],
  },
};
