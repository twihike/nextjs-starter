module.exports = {
  root: true,
  extends: ['@twihike'],
  parserOptions: {
    project: ['./tsconfig.json', './tests/e2e/tsconfig.json'],
  },
};
