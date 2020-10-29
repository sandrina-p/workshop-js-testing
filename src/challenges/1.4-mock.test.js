import { getAnimal } from '../playgrounds/snippets/1.4'

import { captureError } from '../playgrounds/snippets/catcher'
// 🍀 Mock the entire catcher module

describe('1.4 - Imported modules (Mock)', () => {
  it('calls captureError given invalid animal type', () => {
    expect.assertions(3)

    // Act
    expect(() => {
      getAnimal()
    }).toThrow(Error('type is required as string'))

    // 🍀 Assert that captureError was called correctly
  })
})
