import {
  verifyPetBeforeAdopt,
  searchPet,
} from '../../playgrounds/snippets/pets'

describe('pets - (1.3 spy)', () => {
  beforeEach(jest.clearAllMocks)

  describe('verifyPetBeforeAdopt()', () => {
    // Reassigning window in JSDOM +14
    // Ref: https://remarkablemark.org/blog/2018/11/17/mock-window-location/
    const locationOriginal = window.location

    beforeAll(() => {
      delete window.location
      global.window.location = { assign: jest.fn() }

      jest.spyOn(global.Date, 'now').mockReturnValue('time_123456')
    })

    afterAll(() => {
      window.location = locationOriginal

      jest.spyOn(global.Date, 'now').mockRestore()
    })

    it('given a id smaller than 100, it prevents the default event and goes to pets page', () => {
      // Arrange
      const mockEvent = {
        preventDefault: jest.fn(),
      }
      const spyStorageSetItem = jest.spyOn(global.Storage.prototype, 'setItem')
      const spyWindowLocationAssign = jest.spyOn(
        global.window.location,
        'assign'
      )

      // Act
      verifyPetBeforeAdopt(mockEvent, 10)

      // Assert
      // Assert preventDefault was called
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)

      // Assert localStorage usage #sanity-test
      expect(spyStorageSetItem).toHaveBeenCalledTimes(0)

      // Assert window usage
      expect(spyWindowLocationAssign).toHaveBeenCalledTimes(1)
      expect(spyWindowLocationAssign).toHaveBeenCalledWith(
        '//animals.com/pets/10'
      )
    })

    it('given an id bigger than 100, it also stores the pet as "superPet"', () => {
      // Arrange
      const mockEvent = {
        preventDefault: jest.fn(),
      }
      const spyStorageSetItem = jest.spyOn(global.Storage.prototype, 'setItem')
      const spyWindowLocationAssign = jest.spyOn(
        global.window.location,
        'assign'
      )
      // Created the Date mock at beforeAll for
      // better visibility between mock itself and restor

      // Act
      verifyPetBeforeAdopt(mockEvent, 101)

      // Assert

      // Assert preventDefault was called
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)

      // Assert localStorage usage
      expect(spyStorageSetItem).toHaveBeenCalledTimes(1)

      // Option A: With direct string:
      expect(spyStorageSetItem).toHaveBeenCalledWith(
        'superPet',
        '{"id":101,"timestamp":"time_123456"}'
      )

      // Option B: Using inline snapshot
      expect(spyStorageSetItem.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "superPet",
          "{\\"id\\":101,\\"timestamp\\":\\"time_123456\\"}",
        ]
      `)

      // 🍀 Option C: Assert directly the item goth indeed stored
      const superPet = global.localStorage.getItem('superPet')
      expect(superPet).toBe('{"id":101,"timestamp":"time_123456"}')

      // Assert window usage
      expect(spyWindowLocationAssign).toHaveBeenCalledTimes(1)
      expect(spyWindowLocationAssign).toHaveBeenCalledWith(
        '//animals.com/pets/101'
      )
    })
  })

  describe('searchPet()', () => {
    describe('Option A: Mocking console', () => {
      const consoleOriginal = global.console
      beforeAll(() => {
        global.console = {
          log: jest.fn(),
          error: jest.fn(),
          warn: jest.fn(),
          dev: consoleOriginal.log,
        }
      })
      afterAll(() => {
        global.console = consoleOriginal
      })

      it('logs the search', () => {
        const result = searchPet('john', 5)

        // console.dev('This shows in the console!')

        expect(global.console.log).toHaveBeenCalledWith(
          ':: searchPet - Searching john...'
        )

        expect(result).toBe('not found!')
      })

      it('warns when the age is not a number', () => {
        const result = searchPet('john', '5')

        expect(global.console.warn).toHaveBeenCalledWith(
          ':: searchPet - Age must be a number'
        )

        expect(result).toBeUndefined()
      })
    })

    describe('Option B: Spying console', () => {
      // We can spy the console, but the logs will still
      // apear in the tests output
      it('logs the search', () => {
        const consoleLogSpy = jest
          .spyOn(global.console, 'log')
          .mockImplementation() // 🍀 This keeps the logs clean
        const result = searchPet('john', 5)

        expect(consoleLogSpy).toHaveBeenCalledWith(
          ':: searchPet - Searching john...'
        )

        expect(result).toBe('not found!')
      })

      it('warns when the age is not a number', () => {
        const consoleWarnSpy = jest
          .spyOn(global.console, 'warn')
          .mockImplementation() // 🍀 This keeps the logs clean
        const result = searchPet('john', 'five')

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          ':: searchPet - Age must be a number'
        )

        expect(result).toBeUndefined()
      })
    })

    // Go to jest.setup.js and uncomment the global.console
    describe('Option C: Globally mocking the console', () => {
      it('logs the search', () => {
        const result = searchPet('john', 5)

        expect(global.console.log).toHaveBeenCalledWith(
          ':: searchPet - Searching john...'
        )

        // console.dev('debugging result:', result)

        expect(result).toBe('not found!')
      })
    })
  })
})
