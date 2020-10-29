import {
  verifyMovieBeforeNavigate,
  createProfile, // BONUS #1
} from '../playgrounds/snippets/1.3'

describe('1.3 - Spy', () => {
  describe('verifyMovieBeforeNavigate()', () => {
    // 🍀 A little help: In Jest, window.location is not implemented
    // so we need to "mock" it, before spying it. This is how it's done:

    // Save a backup of original implementation
    const locationOriginal = window.location

    // Mock it before all tests in this group (describe)
    beforeAll(() => {
      delete window.location
      global.window.location = { assign: jest.fn() }
    })

    // Before moving on, restore window.location
    afterAll(() => {
      window.location = locationOriginal
    })
    // Works with JSDOM +14. Learn more at: https://remarkablemark.org/blog/2018/11/17/mock-window-location/
    // ------

    // 💡 Some hints:
    // - How to spy localStorage: jest.spyOn(global.Storage.prototype, 'setItem')
    // - How to spy window: jest.spyOn(global.window.location, 'assign')
    // - You need a test double for Date.now(). It can be a mock jest.fn() or a spy
    it.todo('...')

    it.todo('....')
  })

  // 🍀 BONUS #1
  describe('createProfile()', () => {
    describe('Option A: Mocking console', () => {
      // 🍀 Use the globals beforeAll and afterAll to mock the console,
      // similar how it was done with window.location
    })

    describe('Option B: Spying console', () => {
      // 🍀 Let's try another aproach, without mocks.
      // This time use only spyOn()
      // 💡 When using spyOn, the logs will still apear in the tests output.
    })

    // eslint-disable-next-line jest/no-disabled-tests
    describe('Option C: Globally mocking the console', () => {
      // 🍀 Go to jest.setup.js and uncomment the global.console.
      // Then try to write the tests again, using spyOn
      // the logs won't appear in the tests output anymore.
    })
  })
})
