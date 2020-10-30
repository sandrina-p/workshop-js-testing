import { saveAsFavorite } from '../../playgrounds/snippets/pets'

// 🍀 Refactor the import to get all the exports as one.
import { sendTrack } from '../../playgrounds/snippets/metrics'

describe('1.4 - (1.4 - Imported modules: Spy)', () => {
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
    const result = saveAsFavorite(678, 'snake')

    // Assert
    expect(result).toBe('pet-678-saved')

    // 🍀 Verify sendTrack was called correctly

    // 💡 The captureError is still the original, so the warn
    // message is shown in the logs. You can mock them too
    // to keep the logs clean!
  })
})
