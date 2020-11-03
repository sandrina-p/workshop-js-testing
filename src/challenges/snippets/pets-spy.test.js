import {
  verifyPetBeforeAdopt,
  searchPet, // BONUS #1
} from '../../playgrounds/snippets/pets'

describe('pets - (1.3 spy)', () => {
  describe('verifyPetBeforeAdopt()', () => {
    // 🍀 A little help: In Jest, window.location is not implemented
    // so we need to "mock" it, before spying it. This is how it's done:
    // 1/3 Save a backup of original implementation
    const locationOriginal = window.location

    // 2/3 Mock it before all tests in this group (describe)
    beforeAll(() => {
      delete window.location
      global.window.location = { assign: jest.fn() }
    })

    // 3/3 Restore window.location after all tests
    afterAll(() => {
      window.location = locationOriginal
    })
    // Learn more at: https://remarkablemark.org/blog/2018/11/17/mock-window-location/
    // ------

    // 🍀 Some hints:
    // - You need a test double for Date.now(). It can be a mock jest.fn() or a spy
    it('given a id smaller than 100, it prevents the default event and goes to pets page', () => {
      expect.assertions(4)

      // Arrange
      // 💡 Create a mock for the event with preventDefault

      // 💡 Spy both the Localstorage and window
      // 🍀 How to spy localStorage: jest.spyOn(global.Storage.prototype, 'setItem')
      // 🍀 How to spy window: jest.spyOn(global.window.location, 'assign')

      // Act
      // 💡 Call verifyPetBeforeAdopt
      // verifyPetBeforeAdopt(mockEvent, 10)

      // Assert
      // 💡 Verity preventDefault was called
      // ...

      // 💡 Verity window was called correctly
      // ...

      // 💡 Sanity check: Verity localStorage was not called
      // ...
    })

    it('given an id bigger than 100, it also stores the movie as "super-movie"', () => {
      expect.assertions(4)
      // Arrange
      // 💡 Similar mocks as the previous test

      // 🍀 This time we need to mock Date too. A spy can also mock!
      // jest.spyOn(/*...*/).mockReturnValueOnce('123')
      // 🍀 Don't forget to restore the mock at afterAll()

      // Act
      // 💡 Call verifyPetBeforeAdopt
      // verifyPetBeforeAdopt(mockEvent, 101)

      // Assert

      // 💡 Assert preventDefault was called
      // ...

      // 💡  Assert localStorage usage
      // ...

      // 💡  Assert window usage
      // ...
    })
  })

  // 💡 BONUS #1
  describe('searchPet()', () => {
    describe('Option A: Mocking console', () => {
      // 💡 Write globals beforeAll and afterAll inside
      // this describe() to mock the console,
      // similar how it was done with window.location
      it.todo('logs the search')

      it.todo('warns when the age is not a number')
    })

    describe('Option B: Spying console', () => {
      // 💡 Let's try another aproach, without mocks.
      // This time use only spyOn()
      // 🍀 When using spyOn, the logs will still apear in the tests output.
      it.todo('logs the search')

      it.todo('warns when the age is not a number')
    })

    // eslint-disable-next-line jest/no-disabled-tests
    describe('Option C: Globally mocking the console', () => {
      // 💡 Go to jest.setup.js and uncomment the global.console.
      // Then try to write the tests again, using spyOn
      // the logs won't appear in the tests output anymore.
      it.todo('logs the search')

      it.todo('warns when the age is not a number')
      // 🚨 After you are finish, revert the comments,
      // so it doesn't affect other future tests
    })
  })
})
