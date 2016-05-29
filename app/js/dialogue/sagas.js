import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as API from '../shared/services/api'
import * as actions from './actionTypes'
import { getMessagesByUser, hasVisited } from './selectors'

function* pushBotMessage(action) {

  const { collapse, delay, message: body } = action.payload.incoming
  const sender = 'bot'

  yield put({ type: actions.PUSH_MESSAGE, payload: { sender, body, collapse, delay } })

}

function* fetchBotGreeting(action) {

  try {

    const visited = yield select(hasVisited)
    const res = yield call(API.get, `bot/greeting/${visited}`)
    const data = yield res.json()
    const greeting = data.greeting

    yield put({ type: actions.FETCH_GREETING_SUCCESS, payload: { incoming: greeting, requesting: false } })

  } catch (e) {

    yield put({ type: actions.FETCH_GREETING_FAILURE, payload: new Error(e.message) })

  }

}

export function* greeting() {

  // start fetchBotGreeting saga on dispatched FETCH_GREETING_REQUEST action
  yield* takeLatest(actions.FETCH_GREETING_REQUEST, fetchBotGreeting)

}

export function* watchGreeting() {

  // start pushBotMessage saga on dispatched FETCH_GREETING_SUCCESS action
  yield* takeLatest(actions.FETCH_GREETING_SUCCESS, pushBotMessage)

}

// export the root saga containing forks of all the sagas
export default function* root() {

  yield fork(greeting)
  yield fork(watchGreeting)

}
