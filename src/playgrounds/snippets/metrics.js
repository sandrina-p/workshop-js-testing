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

export function catcher(message, log) {
  console.warn('TrackIt sendError()', message, log)

  // Just a dummy possible integrated tracker
  window.trackIt?.sendError(message, log)
}
