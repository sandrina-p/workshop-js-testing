import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack } from '../../playgrounds/snippets/metrics'
// 🍀 Import the metrics fake module
// import { sendTrackFake } from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')

// 🍀 Use sendTrackFake as mocked implementation of sendTrack.

describe('pets - (1.6 - MetricsFake)', () => {
  // 🍀 Once that's done, the test will fail. Go ahead and fix the bug!
  describe('saveAsFavorite()', () => {
    it('calls sendTrack special given a type of snake', () => {
      const result = saveAsFavorite(678, 'snake')

      expect(result).toBe('pet-678-saved')
      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', { especial: true })
    })
  })
})
