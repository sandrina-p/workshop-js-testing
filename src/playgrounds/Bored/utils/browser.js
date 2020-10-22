const removeNullish = obj => {
  const result = {}

  for (const key in obj) {
    const val = obj[key]
    if (val !== undefined && val !== null) {
      result[key] = val
    }
  }

  return result
}

/**
 * Convert object to query string
 * @param {Object} params
 * @return {String} Query in string
 * @example
 * { name: 'john', age: 25 } -> '?name=john&age=25'
 */
export const toQueryString = params => '?' + new URLSearchParams(removeNullish(params)).toString()
