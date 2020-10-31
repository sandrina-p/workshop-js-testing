import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import {
  sendTrack,
  getMetricsSettings,
} from '../../playgrounds/snippets/metrics'
// 🍀 Mock the entire metrics module

describe('pets - (1.4 - Mock / Spy modules: Mock)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack if markting metric is enabled', () => {
      const id = 102

      expect.assertions(3)

      // Arrange
      // Mock getMetricsSettings

      // Act
      const result = saveAsFavorite(102)

      // Assert
      // 🍀 Verify sendTrack was called correctly
      // ...

      // Verify the returned result
      expect(result).toBe(`pet-${id}-saved`)
    })
  })
})
