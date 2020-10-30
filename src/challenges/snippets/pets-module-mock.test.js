import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack } from '../../playgrounds/snippets/metrics'
// 🍀 Mock the entire catcher module

describe('1.4 - (1.4 - Imported modules: Spy)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack special given a type of snake', () => {
      expect.assertions(3)

      // Act
      const result = saveAsFavorite(678, 'snake')

      // Assert
      expect(result).toBe('pet-678-saved')

      // 🍀 Verify sendTrack was called correctly
    })
  })
})
