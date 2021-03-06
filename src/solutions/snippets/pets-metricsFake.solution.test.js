import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack, getPreferences } from '../../playgrounds/snippets/metrics'
import { preferencesStubs } from '../../playgrounds/snippets/__doubles__/metricsStubs'
import {
  sendTrackFake,
  getPreferencesFakeReturn,
} from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')

sendTrack.mockImplementation(sendTrackFake)

describe('pets - (1.6 - MetricsFake)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack when marketing metric is enabled', () => {
      const id = 678

      getPreferences.mockReturnValue(
        getPreferencesFakeReturn({
          ...preferencesStubs.allOff,
          marketing: true,
        })
      )

      const result = saveAsFavorite(id)

      expect(result).toBe(`pet-${id}-saved`)

      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', { data: { id } })
    })
  })
})
