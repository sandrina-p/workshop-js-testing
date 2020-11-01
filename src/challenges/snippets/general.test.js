import {
  sumAll,
  getSinguralOrPlural,
  filterBiggestNumbers,
  removeNullish,
} from '../../playgrounds/snippets/general'

describe('general - (1.1 Initial)', () => {
  describe('sumAll()', () => {
    it('sums correctly all given numbers #demo', () => {
      // Arrange
      const a = 1
      const b = 2
      const c = 3

      // Act
      const result = sumAll(a, b, c)

      // Assert
      expect(result).toBe(6)
    })
  })

  // 💡 Group each method into a describe()
  // 💡 Write the necessary tests for each method.
  // 🍀 Use it.only() to run one test at the time

  // 💡 getSinguralOrPlural

  // 💡 filterBiggestNumbers

  // 🍀 When asserting arrays, toBe() won't work. Try .toEqual()
  // describe(...)

  // ...

  // 💡 Done? Go to Bonus #1!

  // ...

  // 💡 Bonus #2
  describe('removeNullish', () => {
    const profile = {
      name: 'Sandrina',
      website: '//www.sandrina-p.net/',
      job: 'Frontend Engineer',
      country: 'Portugal',
      hobbie: 'piano',
      age: 25,
      pet: null,
      siblings: undefined,
    }
    const result = removeNullish(profile)

    it('toBe vs toEqual', () => {
      expect.assertions(1)

      const expected = {
        name: 'Sandrina',
        website: '//www.sandrina-p.net/',
        job: 'Frontend Engineer',
        country: 'Portugal',
        hobbie: 'piano',
        age: 25,
        siblings: undefined, // uh?!
      }

      // 💡 doesn't work
      // expect(result).toBe(expected)

      // 🍀 Ups! It passes, but is a false positive. "siblings"
      // was removed but it's on expected object.
      // expect(result).toEqual(expected)
    })

    it('using snapshots', () => {
      expect.assertions(1)
    })

    it('using schemas', () => {
      expect.assertions(1)
    })
  })
})
