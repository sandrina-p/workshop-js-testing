/**
 * Returns the sum of all given values
 * @param  {...Number} numbers
 * @retun {Number}
 * @example
 * (3, 5, 2) ->  10
 */
export function sumAll(...numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0)
}

/**
 * Given a number, it returns the respective singular or plural word
 * @param {Number} count
 * @param {String} singular
 * @param {String} plural
 * @return {String}
 * @example
 * (1, 'woman', 'women') -> woman
 * (2, 'person', 'people') -> people
 */
export function getSinguralOrPlural(count, singular, plural) {
  if (count > 1) {
    return plural
  }
  return singular
  // return count > 1 ? plural : singular
}

/**
 * Given an array it returns the numbers bigger than a given minimum
 * @param {Array} numbers
 * @param {Number} min
 * @return {Array}
 * @example
 * ([1, -3, 8, 7]) -> [1, 8, 7]
 * ([3, 5, 9], 4) -> [5, 9]
 */
export function filterBiggestNumbers(numbers = [], min = 0) {
  if (!Array.isArray(numbers)) {
    throw Error('The first argument must be an array')
  }

  return numbers.filter(val => val > min)
}

/**
 * 1.1 BONUS #2 - Asserting dynamic results
 * Gets an object and returns a new similar one without nullish values
 * @param {Object} obj - Object to be analyzed
 * @returns {Object}
 * @example
 * { a: 1, b: null } -> { a: 1 }
 */
export function removeNullish(obj) {
  const result = {}

  for (const key in obj) {
    const val = obj[key]
    if (val !== undefined && val !== null) {
      result[key] = val
    }
  }

  return result
}
