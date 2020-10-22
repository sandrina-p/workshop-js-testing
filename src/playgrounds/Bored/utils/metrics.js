export function sendTrack(name, params) {
  // Just a dummy possible integrated tracker
  window?.trackIt?.sendEvent(name, params)
}
