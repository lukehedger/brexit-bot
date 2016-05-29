import { takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as API from '../shared/services/api'
import * as actions from './actionTypes'
import { hasVisited } from './selectors'

function* fetchBotGreeting(action) {
  try {
    const visited = yield select(hasVisited)
    const res = yield call(API.get, `bot/greeting/${visited}`)
    const data = yield res.json()

    // TODO - this greeting needs to be inserted into messagesByUser as `bot`, time, message, type (with expected response type eg. free-type)

    yield put({ type: actions.FETCH_GREETING_SUCCESS, payload: { ...data, requesting: false } })
  } catch (err) {
    yield put({ type: actions.FETCH_GREETING_FAILURE, payload: new Error(err.message) })
  }
}

export function* greeting() {

  // starts fetchBotGreeting saga on dispatched FETCH_GREETING_REQUEST action
  yield* takeLatest(actions.FETCH_GREETING_REQUEST, fetchBotGreeting)

}

// export the root saga containing forks of all the sagas
export default function* root() {

  yield fork(greeting)

}
