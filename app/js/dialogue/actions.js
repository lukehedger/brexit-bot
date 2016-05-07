import { REQUEST_DIALOGUE } from './actionTypes';

export function requestBot() {
  return {
    type: REQUEST_DIALOGUE,
    payload: {
      request: true
    }
  }
}
