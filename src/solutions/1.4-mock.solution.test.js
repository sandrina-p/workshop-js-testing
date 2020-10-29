import { getAnimal } from '../playgrounds/snippets/1.4'

import { captureError } from '../playgrounds/snippets/catcher'
jest.mock('../playgrounds/snippets/catcher')

describe('1.4 - Modules - Spy', () => {
  it('calls captureError given invalid animal type', () => {
    expect(() => {
      getAnimal()
    }).toThrow(Error('type is required as string'))

    // 🍀 Assert that captureError was called
    expect(captureError).toHaveBeenCalledTimes(1)
    expect(captureError).toHaveBeenCalledWith(
      'getAnimal - invalid type! undefined'
    )
  })
})
