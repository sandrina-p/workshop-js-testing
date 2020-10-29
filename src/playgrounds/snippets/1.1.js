export function getCube(number) {
  return number * number * number
}

export function isBiggerThan10(number) {
  return number > 10 ? 'sure!' : 'not really...'
}

export function filterBiggestNumbers(numbers = [], min = 0) {
  if (!Array.isArray(numbers)) {
    throw Error('The first argument must be an array')
  }

  return numbers.filter(val => val > min)
}

/**
 * BONUS #2 - Asserting dynamic results
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
