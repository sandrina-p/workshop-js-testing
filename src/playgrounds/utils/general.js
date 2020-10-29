/**
 * Given a number, it returns the respective singular or plural word
 * @param {Number} count
 * @param {String} singular
 * @param {String} plural
 * @return {String}
 * @example
 * (1, 'woman', 'women') -> fruit
 * (2, 'person', 'people') -> people
 */
export function getSinguralOrPlural(count, singular, plural) {
  return count > 1 ? plural : singular
}

/**
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
