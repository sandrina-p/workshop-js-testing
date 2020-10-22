import '@testing-library/jest-dom/extend-expect'

// 1.3 - Alternative to create global Mocks
/*
const consoleOriginal = global.console

global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  degub: jest.fn(),
  // Allows you to see logs during debugging
  // eg: console.dev('Hello!')
  dev: consoleOriginal.log,
}
*/
