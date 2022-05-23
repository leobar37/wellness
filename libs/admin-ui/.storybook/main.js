const rootMain = require('../../../.storybook/main');
const path = require('path');
console.log(path.join(process.cwd(), '../..', 'node_modules'));
const toPath = (_path) => path.join(process.cwd(), '../..', _path);
module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  features: {
    emotionAlias: true,
  },
  addons: ['@nrwl/react/plugins/storybook', ...rootMain.addons],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }
    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];

    // add your own webpack tweaks if needed
    return config;
  },
};
