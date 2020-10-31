import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import {
  sendTrack,
  getMetricsSettings,
} from '../../playgrounds/snippets/metrics'

jest.mock('../../playgrounds/snippets/metrics')

describe('pets - (1.4 - Mock / Spy modules: Mock)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack if markting metric is enabled', () => {
      const id = 678

      getMetricsSettings.mockReturnValue({
        markting: true,
      })

      const result = saveAsFavorite(678)

      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', id)

      expect(result).toBe(`pet-${678}-saved`)
    })
  })
})
