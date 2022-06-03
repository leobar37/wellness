module.exports = {
  displayName: 'front-test',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/front-test',
  setupFilesAfterEnv: ['../../jest-setup-dom.ts'],
};
