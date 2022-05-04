const path = require('path')

module.exports = {
  webpackFinal: async (config) => {
    // scss
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src/assets'),
    });
    // alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, '../src'),
    }
    return config
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3"
}