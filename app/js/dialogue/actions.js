import * as actions from './actionTypes'

export function fetchHuman() {
  return {
    type: actions.FETCH_HUMAN_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function fetchGreeting() {
  return {
    type: actions.FETCH_GREETING_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function fetchPoll() {
  return {
    type: actions.FETCH_POLL_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function fetchTopic() {
  return {
    type: actions.FETCH_TOPIC_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function fetchSpurious() {
  return {
    type: actions.FETCH_SPURIOUS_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function fetchFarewell() {
  return {
    type: actions.FETCH_FAREWELL_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function fetchCheckIn() {
  return {
    type: actions.FETCH_CHECKIN_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function fetchChoice() {
  return {
    type: actions.FETCH_CHOICE_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function setVisit(visited = true) {
  return {
    type: actions.SET_VISIT,
    payload: {
      visited
    }
  }
}

export function setPoll(incoming) {
  return {
    type: actions.SET_POLL_REQUEST,
    payload: {
      incoming,
      requesting: true,
      error: null
    }
  }
}

export function setResponse(incoming) {
  return {
    type: actions.SET_RESPONSE_REQUEST,
    payload: {
      incoming,
      requesting: true,
      error: null
    }
  }
}

export function endConvo() {
  return {
    type: actions.END_CONVO,
    payload: {
      end: true
    }
  }
}
