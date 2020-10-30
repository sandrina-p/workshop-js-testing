import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import { sendTrack } from '../../playgrounds/snippets/metrics'
import { sendTrackFake } from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')

sendTrack.mockImplementation(sendTrackFake)

describe('pets - (1.6 - MetricsFake)', () => {
  describe('saveAsFavorite()', () => {
    it('calls sendTrack special given a type of snake', () => {
      const result = saveAsFavorite(678, 'snake')

      expect(result).toBe('pet-678-saved')
      expect(sendTrack).toHaveBeenCalledTimes(1)

      /*
        💡 This test solution only work once the saveAsFavorite()
        is updated. Go there and change "especial" to "special")
        Finally, uncomment the code bellow and run the tests again
      */
      // expect(sendTrack).toHaveBeenCalledWith('favorite', { special: true })
    })
  })
})
