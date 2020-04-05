// For Jest
module.exports = function config(api) {
  api.cache(true);

  const presets = [['next/babel']];

  return {
    presets,
  };
};
