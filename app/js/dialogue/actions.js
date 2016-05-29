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

export function setVisit() {
  return {
    type: actions.SET_VISIT,
    payload: {
      visited: true
    }
  }
}

export function setPoll() {
  return {
    type: actions.SET_POLL_REQUEST,
    payload: {
      requesting: true,
      error: null
    }
  }
}

export function setResponse() {
  return {
    type: actions.SET_RESPONSE_REQUEST,
    payload: {
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
