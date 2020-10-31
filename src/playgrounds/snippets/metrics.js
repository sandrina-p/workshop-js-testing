export function sendTrack(name, opts = {}) {
  console.log('TrackIt sendTrack()', name, opts.meta)

  if (opts.special) {
    console.warn('This one is special!')
    // ... Do special stuff ...
    opts.meta = {
      ...opts.meta,
      secret: 'token',
    }
  }

  // Just a dummy possible integrated tracker
  window.trackIt?.sendEvent(name, opts.meta)
}

/**
 * Returns an obj with tracking preferences
 */
export function getMetricsSettings() {
  // A dummy set of tracking preferences
  return {
    performance: true,
    marketing: false,
    functional: false,
  }
}
