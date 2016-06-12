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

export function fetchGreeting(incoming) {
  return {
    type: actions.FETCH_GREETING_REQUEST,
    payload: {
      incoming,
      requesting: true,
      error: null
    }
  }
}

export function fetchTopic(incoming) {
  return {
    type: actions.FETCH_TOPIC_REQUEST,
    payload: {
      incoming,
      requesting: true,
      error: null
    },
    meta: {
      analytics: {
        type: 'topic',
        payload: {
          name: incoming.name
        }
      }
    }
  }
}

export function fetchSpurious(incoming) {
  return {
    type: actions.FETCH_SPURIOUS_REQUEST,
    payload: {
      incoming,
      requesting: true,
      error: null
    }
  }
}

export function fetchChoice(incoming) {
  return {
    type: actions.FETCH_CHOICE_REQUEST,
    payload: {
      incoming,
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
    },
    meta: {
      analytics: {
        type: 'response',
        payload: {
          name: incoming.message.text
        }
      }
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
