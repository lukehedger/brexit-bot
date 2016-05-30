import { takeEvery, takeLatest, delay } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as API from '../shared/services/api'
import * as actions from './actionTypes'
import { hasBeenPolled, hasVisited, isTheEnd } from './selectors'

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
// FETCH TOPIC
// -----

export function* topic() {

  yield* takeLatest(actions.FETCH_TOPIC_REQUEST, fetchBotTopic)

}

export function* watchTopic() {

  yield* takeLatest(actions.FETCH_TOPIC_SUCCESS, pushMessage, 'bot')

  yield delay(5000)
  yield put({ type: actions.FETCH_CHECKIN_REQUEST, payload: { requesting: true, error: null } })

}

function* fetchBotTopic(action) {

  try {

    const { name } = action.payload.incoming
    const res = yield call(API.get, `bot/topic/${name}`)
    const data = yield res.json()
    const topic = data.topic

    yield put({ type: actions.FETCH_TOPIC_SUCCESS, payload: { incoming: topic, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_TOPIC_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// FETCH SPURIOUS
// -----

export function* spurious() {

  yield* takeLatest(actions.FETCH_SPURIOUS_REQUEST, fetchBotSpurious)

}

export function* watchSpurious() {

  yield* takeLatest(actions.FETCH_SPURIOUS_SUCCESS, pushMessage, 'bot')

}

function* fetchBotSpurious(action) {

  try {

    const res = yield call(API.get, 'bot/topic')
    const data = yield res.json()
    const spurious = data.spurious

    yield put({ type: actions.FETCH_SPURIOUS_SUCCESS, payload: { incoming: spurious, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_SPURIOUS_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// FETCH CHECKIN
// -----

export function* checkIn() {

  yield* takeLatest(actions.FETCH_CHECKIN_REQUEST, fetchBotCheckIn)

}

export function* watchCheckIn() {

  yield* takeLatest(actions.FETCH_CHECKIN_SUCCESS, pushMessage, 'bot')

}

function* fetchBotCheckIn(action) {

  try {

    const res = yield call(API.get, 'bot/checkin')
    const data = yield res.json()
    const checkIn = data.checkIn

    yield put({ type: actions.FETCH_CHECKIN_SUCCESS, payload: { incoming: checkIn, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_CHECKIN_FAILURE, payload: new Error(e.message) })

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

    const { id, brexit } = action.payload.incoming
    const res = yield call(API.put, `/update/${id}`, { brexit })
    const data = yield res.json()
    const poll = data.poll

    yield put({ type: actions.SET_POLL_SUCCESS, payload: { incoming: poll, polled: true, requesting: false, error: null } })

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

  yield delay(3000)

  // could be response to poll, might not be though...
  const polled = yield select(hasBeenPolled)

  if (polled) {
    yield put({ type: actions.FETCH_POLL_REQUEST, payload: { requesting: true, error: null } })
  } else {
    yield put({ type: actions.FETCH_CHECKIN_REQUEST, payload: { requesting: true, error: null } })
  }

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

// -----
// END CONVO
// -----

export function* endConvo() {

  yield* takeLatest(actions.END_CONVO, fetchBotPoll)

}

// export the root saga containing forks of all the sagas
export default function* root() {

  yield fork(greeting)
  yield fork(watchGreeting)
  yield fork(poll)
  yield fork(watchPoll)
  yield fork(choice)
  yield fork(watchChoice)
  yield fork(topic)
  yield fork(watchTopic)
  yield fork(spurious)
  yield fork(watchSpurious)
  yield fork(checkIn)
  yield fork(watchCheckIn)
  yield fork(setPoll)
  yield fork(watchSetPoll)
  yield fork(response)
  yield fork(watchResponse)
  yield fork(endConvo)

}
