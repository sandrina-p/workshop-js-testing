import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack, getPreferences } from '../../playgrounds/snippets/metrics'

// 🍀 preferencesStubs imported for you
// import { preferencesStubs } from '../../playgrounds/snippets/__doubles__/metricsStubs'

jest.mock('../../playgrounds/snippets/metrics')

describe('pets - (1.5 - Stub)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack when marketing metric is enabled', () => {
      const id = 678

      // 🍀 Pass the preferencesStubs to the mocked value
      getPreferences.mockReturnValue({
        marketing: true,
      })

      const result = saveAsFavorite(id)

      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', { data: { id } })

      expect(result).toBe(`pet-${id}-saved`)
    })
  })
})
