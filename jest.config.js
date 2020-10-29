// Learn more at https://jestjs.io/docs/en/configuration

module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  // Collect coverage from specific folders
  collectCoverageFrom: ['src/playgrounds/**/*.js', '!**/__doubles__/**'],
  // Use original CSS class names, igoring hash classes
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
}
