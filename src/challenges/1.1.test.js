/* eslint-disable jest/no-commented-out-tests */
import {
  getCube,
  isBiggerThan10,
  filterBiggestNumbers,
  removeNullish,
} from '../playgrounds/snippets/1.1.js'

describe('1.1 Math Methods', () => {
  // 🍀 Suggestion: Group each method into a describe().

  // 🍀 getCube - 1 test needed
  // describe(...)

  // 🍀 isBiggerThan10 - 2 tests needed
  // describe(...)

  // 🍀 filterBiggestNumbers - 3 tests needed
  // 💡 When asserting arrays, toBe() won't work. Try .toEqual() instead.
  // describe(...)

  // ...

  // 🍀 Done? Go make bonus #1!

  // ...

  // 🍀 Bonus #2
  describe('removeNullish', () => {
    const profile = {
      name: 'Sandrina',
      age: 25,
      country: 'Portugal',
      hobbie: 'piano',
      pet: null,
      siblings: undefined,
    }
    const result = removeNullish(profile)

    it('toBe vs toEqual', () => {
      const expected = {
        name: 'Sandrina',
        country: 'Portugal',
        city: 'Porto',
        age: 25,
        hobbie: 'piano',
        siblings: undefined, // Hum... does it passes?
      }

      // - doesn't work
      // expect(result).toBe(expected)
      // - Ups! It passes, but is a false positive. "siblings"
      // was removed but it's on expected object.
      expect(result).toEqual(expected)
    })

    it.todo('using snapshots')

    it.todo('using schemas')
  })
})
