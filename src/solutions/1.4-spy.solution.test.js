import { getAnimal } from '../playgrounds/snippets/1.4'

import * as catcher from '../playgrounds/snippets/catcher'

describe('1.4 - Imported modules (Spy)', () => {
  // 💡 The captureError is still the original, so the warn
  // message will show in the logs. Let's keep them clean...
  const originalWarn = global.console.warn
  const warnMock = jest.fn()

  beforeEach(() => {
    global.console.warn = warnMock
  })

  afterEach(() => {
    global.console.warn = originalWarn
  })

  it('calls captureError given invalid animal type', () => {
    jest.spyOn(catcher, 'captureError')

    expect(() => {
      getAnimal()
    }).toThrow(Error('type is required as string'))

    expect(catcher.captureError).toHaveBeenCalledTimes(1)
    expect(catcher.captureError).toHaveBeenCalledWith(
      'getAnimal - invalid type! undefined'
    )

    // 🍀 We might be tempted to verify the warn was called too..
    // But isn't that too much? Implementation details here.
    // expect(warnMock).toHaveBeenCalledTimes(1)
  })
})
