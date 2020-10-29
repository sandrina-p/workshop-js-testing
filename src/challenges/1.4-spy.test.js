import { getAnimal } from '../playgrounds/snippets/1.4'

// 🍀 Refactor the import to get all the exports as one.
import { captureError } from '../playgrounds/snippets/catcher'

describe('1.4 - Imported modules (Spy)', () => {
  const originalWarn = global.console.warn
  const warnMock = jest.fn()

  beforeEach(() => {
    global.console.warn = warnMock
  })

  afterEach(() => {
    global.console.warn = originalWarn
  })

  it('calls captureError given invalid animal type', () => {
    expect.assertions(3)

    // Arrange
    // 🍀 Spy the captureError to assert it after

    // Act
    expect(() => {
      getAnimal()
    }).toThrow(Error('type is required as string'))

    // Assert
    // 🍀 verify that captureError was called correctly

    // 💡 The captureError is still the original, so the warn
    // message is shown in the logs. You can mock them too
    // to keep the logs clean!
  })
})
