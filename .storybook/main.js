const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['storycap/register'],
  // typescript: {
  //   reactDocgen: 'none',
  // },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['next/babel']],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias['@emotion/core'] = toPath('node_modules/@emotion/react');
    config.resolve.alias['@emotion-theming'] = toPath('node_modules/@emotion/react');
    return config;
  },
};
