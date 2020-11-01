// jest-dom adds custom jest matchers related to the DOM
// expect(element).toHaveTextContent('Hello world')
import '@testing-library/jest-dom/extend-expect'

beforeEach(() => {
  jest.clearAllMocks()
})

// 1.3 - BONUS #1 Mock the console globally
/*
const consoleOriginal = global.console

global.console = {
  log: jest.fn(),
  degub: jest.fn(),

  // 🍀 DO NOT mock error and warn. This might hide
  // potential issues with the code being tests.
  error: consoleOriginal.error,
  warn: consoleOriginal.warn,

  // 🍀🍀 Extra TIP: Allows you to see logs during debugging
  // eg: console.dev('Hello!')
  dev: consoleOriginal.log,
}
*/
