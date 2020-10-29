import { captureError } from './catcher'

export function getAnimal(type) {
  if (typeof type !== 'string') {
    captureError(`getAnimal - invalid type! ${typeof type}`)

    throw Error('type is required as string')
  }

  // .... code ....

  return 'animal-placeholder'
}
