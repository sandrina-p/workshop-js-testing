import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack, getPreferences } from '../../playgrounds/snippets/metrics'
import { preferencesStubs } from '../../playgrounds/snippets/__doubles__/metricsStubs'
// 💡 Import the metrics fake module
import {
  sendTrackFake,
  getPreferencesFakeReturn,
} from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')

// 💡 Use sendTrackFake as mocked implementation of sendTrack.
sendTrack.mockImplementation(sendTrackFake)

describe('pets - (1.6 - MetricsFake)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack when marketing metric is enabled', () => {
      const id = 678

      // 💡 Pass getPreferencesFakeReturn to the mocked return
      // Once done, the test should still pass.
      // getPreferences.mockReturnValue({
      //   ...preferencesStubs.allOff,
      //   marketing: true,
      // })

      // 🍀 It's always a good idea to see a test failing to
      // ensure it really works. Try passing a new key to
      // getPreferences mock. The test should fail
      const result = saveAsFavorite(id)

      expect(result).toBe(`pet-${id}-saved`)

      expect(sendTrack).toHaveBeenCalledTimes(1)
      expect(sendTrack).toHaveBeenCalledWith('favorite', { data: { id } })
    })
  })
})
