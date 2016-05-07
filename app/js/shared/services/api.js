import fetch from 'whatwg-fetch'
import { API } from '../constants'

export function get(route) {

  return fetch(`${API}/${route}`)

}

export function post(route, data) {

  return fetch(`${API}/${route}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

}
