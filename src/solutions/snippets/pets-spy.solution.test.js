import { verifyPetBeforeAdopt, searchPet } from '../playgrounds/snippets/1.3'

describe('1.3 methods', () => {
  beforeEach(jest.clearAllMocks)

  describe('verifyPetBeforeAdopt()', () => {
    // Reassigning window in JSDOM +14
    // Ref: https://remarkablemark.org/blog/2018/11/17/mock-window-location/
    const locationOriginal = window.location
    const dateOriginal = Date

    beforeAll(() => {
      delete window.location
      global.window.location = { assign: jest.fn() }
      global.Date = {
        now: jest.fn().mockReturnValue('time_123456'),
      }
    })

    afterAll(() => {
      window.location = locationOriginal
      global.Date = dateOriginal
    })

    it('given a id smaller than 100, it prevents the default event and goes to movies page', () => {
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

      // Assert localStorage usage
      expect(spyStorageSetItem).toHaveBeenCalledTimes(0)

      // Assert window usage
      expect(spyWindowLocationAssign).toHaveBeenCalledTimes(1)
      expect(spyWindowLocationAssign).toHaveBeenCalledWith(
        '//animals.com/pets/10'
      )
    })

    it('given an id bigger than 100, it also stores the movie as "super-movie"', () => {
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
      // We can spy the console, but the logs will still apear in the tests output
      it('logs the search', () => {
        const consoleLogSpy = jest.spyOn(global.console, 'log')
        const result = searchPet('john', 5)

        expect(consoleLogSpy).toHaveBeenCalledWith(
          ':: searchPet - Searching john...'
        )

        expect(result).toBe('not found!')
      })

      it('warns when the age is not a number', () => {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn')
        const result = searchPet('john', 'five')

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          ':: searchPet - Age must be a number'
        )

        expect(result).toBeUndefined()
      })
    })

    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('Option C: Globally mocking the console', () => {
      // Go to jest.setup.js and uncomment the global.console

      it('logs the search', () => {
        const result = searchPet('john', 5)

        expect(global.console.log).toHaveBeenCalledWith(
          ':: searchPet - Searching john...'
        )

        console.dev('debuggin result:', result)

        expect(result).toBe('not found!')
      })
    })
  })
})
