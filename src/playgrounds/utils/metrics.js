export function sendTrack(name, opts = {}) {
  console.log('TrackIt sendTrack()', name, opts.meta)

  if (opts.special) {
    // ... Do special stuff ...
    console.warn('This one is special ^.^')
  }

  // Just a dummy possible integrated tracker
  window.trackIt?.sendEvent(name, opts.meta)
}
