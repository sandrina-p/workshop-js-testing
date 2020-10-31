// A fake is a simplified version of a original function.
// The main goal of this fake is to validate the arguments passed to the method.

// Fake to be used as mockImplementation
export function sendTrackFake(id, opts = {}) {
  // Validate the required id is a string.
  if (typeof id !== 'string') {
    throw Error(`metricsFake sendTrack · id ${id} must be a String`)
  }

  // Extract all the expected keys from arg opts
  // and thrown an error if some unexpected key was received
  const { name, meta, special, ...rest } = opts
  const unexpectedKeys = Object.keys(rest)

  if (unexpectedKeys.length > 0) {
    throw Error(
      `metricsFake sendTrack · The keys "${unexpectedKeys}" are unexpected.`
    )
  }
}

// Fake to be used as mockReturnValue
export function getPreferencesFakeReturn(mockedResult) {
  // Extract all the expected keys from arg opts
  // and thrown an error if some unexpected key was received
  const { performance, marketing, functional, ...rest } = mockedResult
  const unexpectedKeys = Object.keys(rest)

  if (unexpectedKeys.length > 0) {
    throw Error(
      `metricsFake getPreferencesFakeResult · The returned keys "${unexpectedKeys}" are unexpected.`
    )
  }

  return mockedResult
}
