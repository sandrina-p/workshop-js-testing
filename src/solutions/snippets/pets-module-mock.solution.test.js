import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack } from '../../playgrounds/snippets/metrics'

jest.mock('../../playgrounds/snippets/metrics')

describe('pets - (1.4 - Mock / Spy modules: Mock)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack special given a type of snake', () => {
      const result = saveAsFavorite(678, 'snake')

      expect(result).toBe('pet-678-saved')
      // 🍀 Assert that sendTrack was called
      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', { especial: true })
    })
  })
})
