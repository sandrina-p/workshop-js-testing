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
  describe('getSinguralOrPlural()', () => {
    it('returns first word, given Number 1', () => {
      const nr = 1
      const singular = 'wolf'
      const plural = 'wolves'

      const result = getSinguralOrPlural(nr, singular, plural)

      expect(result).toBe(singular)
    })

    it('returns second word, given Number bigger than 1', () => {
      const nr = 2
      const singular = 'wolf'
      const plural = 'wolves'

      const result = getSinguralOrPlural(nr, singular, plural)

      expect(result).toBe(plural)
    })
  })

  describe('getSinguralOrPlural() - each', () => {
    it.each([
      [1, 'wolf', 'wolves', 'wolf'],
      [2, 'wolf', 'wolves', 'wolves'],
    ])(
      'given the number %i, it returns %s',
      (nr, singular, plural, expected) => {
        const result = getSinguralOrPlural(nr, singular, plural)
        expect(result).toBe(expected)
      }
    )
  })

  describe('filterBiggestNumbers()', () => {
    const numbers = [-5, -2, 0, 2, 5, 10]

    it('by default, it returns all numbers bigger than 0', () => {
      const result = filterBiggestNumbers(numbers)

      expect(result).toEqual([2, 5, 10])
    })

    it('given a minimum, it returns all numbers bigger than it', () => {
      const minimum = 2
      const result = filterBiggestNumbers(numbers, minimum)

      expect(result).toEqual([5, 10])
      expect(result).toHaveLength(2)
    })

    it('given a invalid list of numbers, it throws an error', () => {
      expect(() => {
        filterBiggestNumbers('one')
      }).toThrow('The first argument must be an array')
    })
  })

  describe('asserting data objects', () => {
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
        age: 25,
        hobbie: 'piano',
        siblings: undefined, // uh!
      }

      // - doesn't work
      // expect(result).toBe(expected)
      // - Ups! It passes, but is a false positive. "siblings"
      // was removed but it's on expected object.
      expect(result).toEqual(expected)
    })

    it('using snapshots', () => {
      // Quick and specific assertion, but easily changed
      // Now we are implicitly maintaining an external file detatched
      // from the actual test code.
      expect(result).toMatchSnapshot()

      // Better: Now the test assertion is self-explanatory,
      // and when it changes the diffs can be spotted inline.
      expect(result).toMatchInlineSnapshot(`
        Object {
          "age": 25,
          "country": "Portugal",
          "hobbie": "piano",
          "name": "Sandrina",
        }
      `)
    })

    it('using schemas', () => {
      // Verbose but flexible
      expect(result).toEqual(
        expect.objectContaining({
          name: 'Sandrina',
          hobbie: expect.any(String),
        })
      )

      expect(result.age).toBeGreaterThanOrEqual(25)

      if (result.pet) {
        expect.objectContaining({
          pet: expect.any(String),
        })
      }
    })
  })
})
