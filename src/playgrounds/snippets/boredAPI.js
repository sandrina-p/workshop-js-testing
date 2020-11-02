import { removeNullish } from './general'

/**
 * Convert object to query string
 * @param {Object} params
 * @return {String} Query in string
 * @example
 * { name: 'john', age: 25 } -> '?name=john&age=25'
 */
const toQueryString = params =>
  '?' + new URLSearchParams(removeNullish(params)).toString()

function remodelParams(params) {
  // Transform params where needed to match API
  const result = {
    type: params.type,
    participants: params.participants,
  }

  if (params.price === 'free') {
    result.price = 0
  }

  if (params.price === 'paid') {
    result.minprice = 0.1
    result.maxprice = 999
  }

  return result
}

/**
 * Get a random activity from Bored API
 * @arg {Object} params - interface ActivityParams
 * @return {Object} ActivityResponse
 */
export async function getActivity(params = {}) {
  const finalParams = remodelParams(params)

  const url = `https://www.boredapi.com/api/activity/${toQueryString(
    finalParams
  )}`
  console.debug(`ActivityAPI . fetching ${url}`)

  const response = await window.fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw Error(`Request rejected with status ${response.status}`)
  }

  const activity = await response.json()

  return activity
}

/**
 * Look for a new activity never shown before,
 * If fails after 3 unsuccessful attempts
 * @arg {Object} params - interface ActivityParams
 * @arg {Array} exclude - A list of keys to ignore eg ['123', '771']
 * @return {Object} ActivityResponse
 */
export async function getNewActivity(params, exclude) {
  console.debug('Activity API . getNewActivity()', params, exclude)

  const attemptsMax = 5
  let attemptNr = 1
  let activity = null

  do {
    console.debug(`:: Attempt #${attemptNr}`)
    attemptNr++
    activity = await getActivity(params)
  } while (
    !activity.error &&
    attemptNr <= attemptsMax &&
    exclude.includes(activity.key)
  )

  if (attemptNr > attemptsMax) {
    throw Error('There are no new activities')
  }

  return activity
}

// ===============================

/*
For Typescript lovers:

interface @ActivityParams {
  type: string,
  participants: number | string,
  price?: 'free' | 'paid',
  key: string,
}

interface ActivityResponse {
  activity: string,
  accessibility?: number,
  type: string,
  participants: number,
  price?: number,
  link?: string,
  key: string,
}
*/
