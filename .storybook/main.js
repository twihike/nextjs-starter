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
    return config;
  },
};
