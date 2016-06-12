import { takeEvery, takeLatest, delay } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import cuid from 'cuid'

import * as API from '../shared/services/api'
import * as actions from './actionTypes'
import { getHuman, hasBeenPolled, hasVisited, isTheEnd } from './selectors'

// -----
// PUSH MESSAGE
// -----

function* pushMessage(sender, type, action) {

  const id = cuid()
  const time = Date.now()
  const { message: body } = action.payload.incoming

  yield put({ type: actions.PUSH_MESSAGE, payload: { id, sender, time, type, body } })

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
  yield* takeLatest(actions.FETCH_GREETING_SUCCESS, pushMessage, 'bot', 'greeting')

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

  yield* takeLatest(actions.FETCH_POLL_SUCCESS, pushMessage, 'human', 'poll')

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

  yield* takeLatest(actions.FETCH_CHOICE_SUCCESS, pushMessage, 'human', 'choice')

}

function* fetchBotChoice(action) {

  try {

    const res = yield call(API.get, 'bot/choice')
    const data = yield res.json()
    const options = data.topics
    const text = 'Choose a topic you\'d like to explore:'

    yield put({ type: actions.FETCH_CHOICE_SUCCESS, payload: { incoming: { message: { options, text }}, requesting: false, error: null } })

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

  yield* takeLatest(actions.FETCH_TOPIC_SUCCESS, pushMessage, 'bot', 'topic')

}

function* fetchBotTopic(action) {

  try {

    const { name } = action.payload.incoming
    const res = yield call(API.get, `bot/topic/${name}`)
    const data = yield res.json()
    const topic = data.topic

    yield put({ type: actions.FETCH_TOPIC_SUCCESS, payload: { incoming: topic, requesting: false, error: null } })

    yield delay(7500)

    yield put({ type: actions.FETCH_CHECKIN_REQUEST, payload: { requesting: true, error: null } })

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

  yield* takeLatest(actions.FETCH_SPURIOUS_SUCCESS, pushMessage, 'bot', 'spurious')

}

function* fetchBotSpurious(action) {

  try {

    const res = yield call(API.get, 'bot/spurious')
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

  yield* takeLatest(actions.FETCH_CHECKIN_SUCCESS, pushMessage, 'human', 'checkin')

}

function* fetchBotCheckIn(action) {

  try {

    const res = yield call(API.get, 'bot/checkin')
    const data = yield res.json()
    const checkIn = data.checkin

    yield put({ type: actions.FETCH_CHECKIN_SUCCESS, payload: { incoming: checkIn, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_CHECKIN_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// FETCH FAREWELL
// -----

export function* farewell() {

  yield* takeLatest(actions.FETCH_FAREWELL_REQUEST, fetchBotFarewell)

}

export function* watchFarewell() {

  yield* takeLatest(actions.FETCH_FAREWELL_SUCCESS, pushMessage, 'bot', 'farewell')

}

function* fetchBotFarewell(action) {

  try {

    const res = yield call(API.get, 'bot/farewell')
    const data = yield res.json()
    const farewell = data.farewell

    yield put({ type: actions.FETCH_FAREWELL_SUCCESS, payload: { incoming: farewell, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_FAREWELL_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// SET POLL
// -----

export function* setPoll() {

  yield* takeLatest(actions.SET_POLL_REQUEST, setHumanPoll)

}

export function* watchSetPoll() {

  yield* takeLatest(actions.SET_POLL_SUCCESS, pushMessage, 'bot', 'chart')

}

function* setHumanPoll(action) {

  try {

    const human = yield select(getHuman)
    const { text } = action.payload.incoming
    let brexit = text === 'Brexit'

    const res = yield call(API.put, `human/update/${human.get('id')}`, { brexit })
    const data = yield res.json()
    const chart = data.poll
    const vote = `You voted for ${data.human.brexit ? 'Brexit' : 'Bremain'}. Here's the BrexitBot poll results so far:`

    yield put({ type: actions.SET_POLL_SUCCESS, payload: { incoming: { message: { chart, text: vote }}, polled: true, requesting: false, error: null } })

    yield delay(1000)

    // could be opening poll, could be closing poll
    const end = yield select(isTheEnd)

    if (end) {
      yield put({ type: actions.FETCH_FAREWELL_REQUEST, payload: { requesting: true, error: null } })
    } else {
      yield put({ type: actions.FETCH_CHOICE_REQUEST, payload: { requesting: true, error: null } })
    }

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

  yield* takeLatest(actions.SET_RESPONSE_SUCCESS, pushMessage, 'bot', 'sentiment')

}

function* setHumanResponse(action) {

  try {

    yield call(pushMessage, 'human', 'humanResponse', action)

    const { message: { text } } = action.payload.incoming
    const res = yield call(API.post, `human/sentiment/${text}`)
    const data = yield res.json()
    const sentiment = data.sentiment

    yield put({ type: actions.SET_RESPONSE_SUCCESS, payload: { incoming: sentiment, requesting: false, error: null } })

    yield delay(1000)

    // could be response to poll, might not be though...
    const polled = yield select(hasBeenPolled)

    if (polled) {
      yield put({ type: actions.FETCH_CHECKIN_REQUEST, payload: { requesting: true, error: null } })
    } else {
      yield put({ type: actions.FETCH_POLL_REQUEST, payload: { requesting: true, error: null } })
    }

  } catch (e) {

    yield put({ type: actions.SET_RESPONSE_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// SET VISIT
// -----

export function* visit() {

  yield* takeLatest(actions.SET_VISIT, setVisit)

}

function* setVisit(action) {

  yield put({ type: actions.CREATE_HUMAN_REQUEST, payload: { requesting: true, error: null } })

}

// -----
// FETCH HUMAN
// -----

export function* humanRead() {

  yield* takeLatest(actions.FETCH_HUMAN_REQUEST, fetchHuman)

}

function* fetchHuman(action) {

  try {

    const { id } = action.payload.incoming
    const res = yield call(API.post, `human/read/${id}`)
    const data = yield res.json()
    const human = data.human

    yield put({ type: actions.FETCH_HUMAN_SUCCESS, payload: { human, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.FETCH_HUMAN_FAILURE, payload: new Error(e.message) })

  }

}

// -----
// CREATE HUMAN
// -----

export function* humanCreate() {

  yield* takeLatest(actions.CREATE_HUMAN_REQUEST, createHuman)

}

function* createHuman(action) {

  try {

    const res = yield call(API.post, 'human/create')
    const data = yield res.json()
    const human = data.human

    yield put({ type: actions.CREATE_HUMAN_SUCCESS, payload: { human, requesting: false, error: null } })

  } catch (e) {

    yield put({ type: actions.CREATE_HUMAN_FAILURE, payload: new Error(e.message) })

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
  yield fork(farewell)
  yield fork(watchFarewell)
  yield fork(setPoll)
  yield fork(watchSetPoll)
  yield fork(response)
  yield fork(watchResponse)
  yield fork(visit)
  yield fork(humanRead)
  yield fork(humanCreate)
  yield fork(endConvo)

}
