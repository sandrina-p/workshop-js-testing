export function sendTrack(name, data) {
  // Just a dummy possible integrated tracker
  console.log('TrackIt sendTrack()', name, data)

  const opts = { data }

  if (data.special) {
    console.warn('This one is special!')
    // ... Do special stuff ...
    opts.secret = true
  }

  window.trackIt?.sendEvent(name, opts)
}

/**
 * Returns an obj with tracking preferences
 */
export function getPreferences() {
  // A dummy set of tracking preferences
  return {
    performance: true,
    marketing: false,
    functional: false,
  }
}
