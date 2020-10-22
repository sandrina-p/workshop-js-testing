import { toQueryString } from '../utils/browser'

/**
 * Get a random activity from Bored API
 * @arg {Object} params - interface ActivityParams
 * @return {Object} ActivityResponse
 */
export async function getActivity(params) {
  // Transform params where need
  const query = {
    type: params.type,
  }

  if (params.participants) {
    query.participants = +params.participants // Ensure it is a Number
  }

  if (params.price === 'free') {
    query.price = 0
  }

  if (params.price === 'paid') {
    query.minprice = 0.1
    query.maxprice = 999
  }

  const url = `https://www.boredapi.com/api/activity/${toQueryString(query)}`
  console.debug('ActivityAPI . fetch', url)

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

  let activity = null
  let attemptNr = 0
  const attemptsMax = 5

  do {
    console.debug(`:: Attempt nr ${attemptNr + 1}`)
    attemptNr++
    activity = await getActivity(params)
  } while (!activity.error && attemptNr <= attemptsMax && exclude.includes(activity.key))

  if (attemptNr > 3) {
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
