import { saveAsFavorite } from '../../playgrounds/snippets/pets'

// 🍀 Refactor the import to get all the exports as one.
import { sendTrack, getPreferences } from '../../playgrounds/snippets/metrics'

describe('1.4 - (1.4 - Mock / Spy modules: Spy)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack if markting metric is enabled', () => {
      const id = 101
      expect.assertions(3)

      // Arrange
      // 🍀 Spy the captureError to assert it after

      // Act
      // 🍀 Call saveAsFavorite

      // Assert
      // 🍀 Verify the assert is as expected

      // 🍀 Verify sendTrack was called correctly

      // 💡 The captureError is still the original, so the warn
      // message is shown in the logs. You can mock them too
      // to keep the logs clean!
      // 💡 When mocking just one of the console methods, you can
      // also use spy + mockImplementation:
      // jest.spyOn(global.console, 'log').mockImplementation()
      // 💡 And here's how to restore debug mock after all tests.
      // jest.spyOn(global.console, 'log').mockRestore()
    })
  })
})
