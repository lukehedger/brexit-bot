import * as actions from './actionTypes'

export function fetchHuman() {
  return {
    type: actions.FETCH_HUMAN_REQUEST,
    payload: {
      requesting: true
    }
  }
}

export function fetchGreeting() {
  return {
    type: actions.FETCH_GREETING_REQUEST,
    payload: {
      requesting: true
    }
  }
}

export function fetchPoll() {
  return {
    type: actions.FETCH_POLL_REQUEST,
    payload: {
      requesting: true
    }
  }
}

export function fetchTopic() {
  return {
    type: actions.FETCH_TOPIC_REQUEST,
    payload: {
      requesting: true
    }
  }
}

export function fetchSpurious() {
  return {
    type: actions.FETCH_SPURIOUS_REQUEST,
    payload: {
      requesting: true
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
      requesting: true
    }
  }
}

export function setResponse() {
  return {
    type: actions.SET_RESPONSE_REQUEST,
    payload: {
      requesting: true
    }
  }
}
