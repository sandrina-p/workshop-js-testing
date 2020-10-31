import { sendTrack, getPreferences } from './metrics'

/**
 * Calls an API with the given values. When values is an array
 * it calls the API multiple times with arg { type: 'family' }
 * @param {String | Array} value
 * @param {Function} APICallback
 * @returns {*} the API call response
 */
export function petsGuard(value, APICallback) {
  if (typeof APICallback !== 'function') {
    throw Error('2nd parameter is required as a function')
  }

  if (Array.isArray(value)) {
    const results = []

    for (const item of value) {
      const result = APICallback(item, { type: 'family' })

      if (!result) {
        return `petsGuard: "${item}" failed!`
      } else {
        results.push(result)
      }
    }
    return results
  }

  return APICallback(value)
}

/**
 * It will store the pet id if it's bigger than 100
 * before it goes to another (dummy) page
 * @param {Objcect} e - click Event
 * @param {Number} id - Pet id
 */
export function verifyPetBeforeAdopt(e, id) {
  e.preventDefault()

  if (id > 100) {
    window.localStorage.setItem(
      'superPet',
      JSON.stringify({ id, timestamp: Date.now() })
    )
  }

  window.location.assign(`//animals.com/pets/${id}`)
}

/**
 * Dummy function do search for a pet
 * @param {String} type - Pet type
 * @param {Number} age - Pet age, in months.
 */
export function searchPet(type, age) {
  console.log(`:: searchPet - Searching ${type}...`)

  if (typeof age !== 'number') {
    console.warn(':: searchPet - Age must be a number')
    return
  }

  // ... code to search for a pet ...

  return 'not found!'
}

/**
 * Save given pet as favorite
 * @param {String} id - Pet id (eg 221)
 */
export function saveAsFavorite(petId) {
  const { markting } = getPreferences()

  if (markting) {
    sendTrack('favorite', petId)
  }

  return `pet-${petId}-saved`
}
