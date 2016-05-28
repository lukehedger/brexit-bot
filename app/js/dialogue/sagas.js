import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import * as API from '../shared/services/api'

import * as actions from './actionTypes'

function* fetchBotGreeting(action) {
   try {
      const res = yield call(API.get, 'bot/greeting');
      const data = yield res.json()
      yield put({ type: actions.FETCH_GREETING_SUCCESS, payload: { ...data } });
   } catch (err) {
      yield put({ type: actions.FETCH_GREETING_FAILURE, payload: new Error(err.message) });
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
