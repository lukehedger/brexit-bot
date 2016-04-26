import { REQUEST_BOT } from './actionTypes';

export function requestBot() {
  return {
    type: REQUEST_BOT,
    payload: {
      request: true
    }
  }
}
