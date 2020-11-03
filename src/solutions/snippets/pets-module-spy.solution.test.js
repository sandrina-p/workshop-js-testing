import { saveAsFavorite } from '../../playgrounds/snippets/pets'

import * as metrics from '../../playgrounds/snippets/metrics'

describe('1.4 - (1.4 - Mock / Spy modules: Spy)', () => {
  describe('saveAsFavorite()', () => {
    // 🍀 The sendTrack is still the original, so the warn
    // message will show in the logs. Let's keep them clean...
    beforeEach(() => {
      jest.spyOn(global.console, 'log').mockImplementation()
    })

    afterEach(() => {
      jest.spyOn(global.console, 'log').mockRestore()
    })

    it('calls sendTrack when marketing metric is enabled', () => {
      const id = 678

      jest.spyOn(metrics, 'sendTrack')
      jest.spyOn(metrics, 'getPreferences').mockReturnValue({
        marketing: true,
      })

      const result = saveAsFavorite(id)

      expect(metrics.sendTrack).toHaveBeenCalledTimes(1)
      expect(metrics.sendTrack).toHaveBeenCalledWith('favorite', {
        data: { id },
      })

      expect(result).toBe(`pet-${id}-saved`)

      // 💡 We might be tempted to verify the log was called too.
      // Some may say this are implementation details...
      expect(global.console.log).toHaveBeenCalledTimes(1)
    })
  })
})
