import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import * as metrics from '../../playgrounds/snippets/metrics'

describe('1.4 - (1.4 - Mock / Spy modules: Spy)', () => {
  describe('saveAsFavorite()', () => {
    // 💡 The sendTrack is still the original, so the warn
    // message will show in the logs. Let's keep them clean...
    const originalWarn = global.console.warn
    const warnMock = jest.fn()

    beforeEach(() => {
      global.console.warn = warnMock
    })

    afterEach(() => {
      global.console.warn = originalWarn
    })

    it('calls sendTrack special given a type of snake', () => {
      jest.spyOn(metrics, 'sendTrack')

      const result = saveAsFavorite(678, 'snake')
      expect(result).toBe('pet-678-saved')

      expect(metrics.sendTrack).toHaveBeenCalledTimes(1)
      expect(metrics.sendTrack).toHaveBeenCalledWith('favorite', {
        especial: true,
      })

      // 🍀 We might be tempted to verify the log was called too.
      // But isn't that too much? Implementation details here.
      // expect(warnMock).toHaveBeenCalledTimes(1)
    })
  })
})
