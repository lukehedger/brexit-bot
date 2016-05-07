import { REQUEST_USER } from './actionTypes';

export function requestBot() {
  return {
    type: REQUEST_USER,
    payload: {
      request: true
    }
  }
}
