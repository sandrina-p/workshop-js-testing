import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack, getPreferences } from '../../playgrounds/snippets/metrics'
import {
  sendTrackFake,
  getPreferencesFakeReturn,
} from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')

sendTrack.mockImplementation(sendTrackFake)

describe('pets - (1.5 - MetricsFake)', () => {
  describe('saveAsFavorite()', () => {
    // 💡 This test solution only works after the saveAsFavorite()
    // is updated. Go there and change "markting" to "marketing")
    it.skip('calls sendTrack if marketing metric is enabled', () => {
      const id = 678

      getPreferences.mockReturnValue(
        getPreferencesFakeReturn({
          markting: true,
        })
      )

      const result = saveAsFavorite(id)

      expect(result).toBe(`pet-${id}-saved`)

      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', id)
    })
  })
})
