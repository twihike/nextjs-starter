/* eslint-disable import/no-extraneous-dependencies */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  env: {
    APP_UI: 'mui',
    // APP_UI: 'tailwindcss',
    USE_GRAPHQL_MOCK: 'true',
    // USE_GRAPHQL_MOCK: process.env.NODE_ENV === 'test' ? 'true' : '',
  },
});

/* eslint-enable import/no-extraneous-dependencies */
