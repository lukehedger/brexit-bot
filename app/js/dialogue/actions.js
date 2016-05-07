import { REQUEST_DIALOGUE, NEW_VISIT } from './actionTypes';

export function requestBot() {
  return {
    type: REQUEST_DIALOGUE,
    payload: {
      request: true
    }
  }
}

export function recordVisit() {
  return {
    type: NEW_VISIT,
    payload: {
      visited: true
    }
  }
}
