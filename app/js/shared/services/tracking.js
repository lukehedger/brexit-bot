// Analytics tracking service (Keen)

function hasAnalyticsLoaded() {

  return window.Keen && window.keenClient

}

export function track(action, payload) {

  // wait for analytics script to load
  if (!hasAnalyticsLoaded()) {
    return setTimeout( () => {
      // try again
      track(action, payload)
    }, 500)
  }

  // fire the custom event
  return keenClient.addEvent(action, { ...payload })

}
