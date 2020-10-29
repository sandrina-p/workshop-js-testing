import { captureError } from './catcher'

/**
 * Call a given API with the given values. When values is an array
 * it calls the API multiple times with arg { type: "list" }
 * @param {String | Array} value
 * @param {Function} APICallback
 * @returns {*} the API call response
 */
export function APIshell(value, APICallback) {
  if (typeof APICallback !== 'function') {
    // NOTE: Leave this commented until exercise 1.4
    captureError(
      `APIshell with invalid callback: ${JSON.stringify(APICallback)}`
    )

    throw Error('2nd parameter is required as a function')
  }

  if (Array.isArray(value)) {
    const results = []

    for (const item of value) {
      const result = APICallback(item, { type: 'list' })

      if (!result) {
        return `APIshell: "${item}" failed!`
      } else {
        results.push(result)
      }
    }
    return results
  }

  return APICallback(value)
}
