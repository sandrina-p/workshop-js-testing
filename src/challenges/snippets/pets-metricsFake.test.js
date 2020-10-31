import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack, getPreferences } from '../../playgrounds/snippets/metrics'
// 🍀 Import the metrics fake module
import {
  sendTrackFake,
  getPreferencesFakeReturn,
} from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')

// 🍀 Use sendTrackFake as mocked implementation of sendTrack.
sendTrack.mockImplementation(sendTrackFake)

describe('pets - (1.5 - MetricsFake)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack if marketing metric is enabled', () => {
      const id = 678

      // 🍀 Pass getPreferencesFakeReturn to the mocked return
      getPreferences.mockReturnValue({
        markting: true,
      })

      // 🍀 Once that's done, the test will fail. Go ahead and fix the bug!
      const result = saveAsFavorite(id)

      expect(result).toBe(`pet-${id}-saved`)

      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', id)
    })
  })
})
