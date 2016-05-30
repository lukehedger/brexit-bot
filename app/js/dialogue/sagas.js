import { takeEvery, takeLatest, delay } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as API from '../shared/services/api'
import * as actions from './actionTypes'
import { hasVisited, isTheEnd } from './selectors'

// -----
// PUSH MESSAGE
// -----

function* pushMessage(sender, action) {

  const { collapse, delay, message: body } = action.payload.incoming

  yield put({ type: actions.PUSH_MESSAGE, payload: { sender, body, collapse, delay } })

}

// -----
// FETCH GREETING
// -----

export function* greeting() {

  // start fetchBotGreeting saga on dispatched FETCH_GREETING_REQUEST action
  yield* takeLatest(actions.FETCH_GREETING_REQUEST, fetchBotGreeting)

}

export function* watchGreeting() {

  // start pushBotMessage saga on dispatched FETCH_GREETING_SUCCESS action
  yield* takeLatest(actions.FETCH_GREETING_SUCCESS, pushMessage, 'bot')

}

function* fetchBotGreeting(action) {

  try {

    const visited = yield select(hasVisited)
    const res = yield call(API.get, `bot/greeting/${visited}`)
    const data = yield res.json()
    const greeting = data.greeting

    yield put({ type: actions.FETCH_GREETING_SUCCESS, payload: { incoming: greeting, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_GREETING_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// FETCH POLL
// -----

export function* poll() {

  yield* takeLatest(actions.FETCH_POLL_REQUEST, fetchBotPoll)

}

export function* watchPoll() {

  yield* takeLatest(actions.FETCH_POLL_SUCCESS, pushMessage, 'bot')

}

function* fetchBotPoll(action) {

  try {

    const res = yield call(API.get, 'bot/poll')
    const data = yield res.json()
    const poll = data.poll

    yield put({ type: actions.FETCH_POLL_SUCCESS, payload: { incoming: poll, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_POLL_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// FETCH CHOICE
// -----

export function* choice() {

  yield* takeLatest(actions.FETCH_CHOICE_REQUEST, fetchBotChoice)

}

export function* watchChoice() {

  yield* takeLatest(actions.FETCH_CHOICE_SUCCESS, pushMessage, 'bot')

}

function* fetchBotChoice(action) {

  try {

    const res = yield call(API.get, 'bot/choice')
    const data = yield res.json()
    const choice = data.choice

    yield put({ type: actions.FETCH_CHOICE_SUCCESS, payload: { incoming: choice, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_CHOICE_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// SET POLL
// -----

export function* setPoll() {

  yield* takeLatest(actions.SET_POLL_REQUEST, setHumanPoll)

}

export function* watchSetPoll() {

  yield* takeLatest(actions.SET_POLL_SUCCESS, pushMessage, 'human')

  yield delay(1000)

  // could be opening poll, could be closing poll
  const end = yield select(isTheEnd)

  if (end) {
    yield put({ type: actions.FETCH_CHOICE_REQUEST, payload: { requesting: true, error: null } })
  } else {
    yield put({ type: actions.FETCH_FAREWELL_REQUEST, payload: { requesting: true, error: null } })
  }

}

function* setHumanPoll(action) {

  try {

    yield fork(pushMessage, ['human', action])

    const res = yield call(API.put, `/update/${id}`, { brexit })
    const data = yield res.json()
    const poll = data.poll

    yield put({ type: actions.SET_POLL_SUCCESS, payload: { incoming: poll, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.SET_POLL_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// SET RESPONSE
// -----

export function* response() {

  yield* takeLatest(actions.SET_RESPONSE_REQUEST, setHumanResponse)

}

export function* watchResponse() {

  yield* takeLatest(actions.SET_RESPONSE_SUCCESS, pushMessage, 'bot')

  // TODO - this is only applicable when response is to greeting (maybe set a flag in state `hasBeenPolled` then if false do the below else do a checkin)
  yield delay(3000)
  yield put({ type: actions.FETCH_POLL_REQUEST, payload: { requesting: true, error: null } })

}

function* setHumanResponse(action) {

  try {

    yield fork(pushMessage, ['human', action])

    const { message: text } = action.payload.incoming
    const res = yield call(API.get, `human/sentiment/${text}`)
    const data = yield res.json()
    const sentiment = data.sentiment

    yield put({ type: actions.SET_RESPONSE_SUCCESS, payload: { incoming: sentiment, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.SET_RESPONSE_FAILURE, payload: new Error(e.message) })

  }

}

// export the root saga containing forks of all the sagas
export default function* root() {

  yield fork(greeting)
  yield fork(watchGreeting)
  yield fork(poll)
  yield fork(watchPoll)
  yield fork(choice)
  yield fork(watchChoice)
  yield fork(setPoll)
  yield fork(watchSetPoll)
  yield fork(response)
  yield fork(watchResponse)

}
