import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'

export const initialState = Immutable.fromJS({
  messagesByUser: [],
  requesting: false,
  visited: false,
  error: null
})

export default createReducer(initialState, {

  [actions.FETCH_HUMAN_REQUEST]: (state, action) => state.merge({ ...action.payload }),

  [actions.FETCH_GREETING_REQUEST]: (state, action) => state.merge({ ...action.payload }),

  [actions.FETCH_POLL_REQUEST]: (state, action) => state.merge({ ...action.payload }),

  [actions.FETCH_TOPIC_REQUEST]: (state, action) => state.merge({ ...action.payload }),

  [actions.FETCH_SPURIOUS_REQUEST]: (state, action) => state.merge({ ...action.payload }),

  [actions.SET_VISIT]: (state, action) => state.merge({ ...action.payload }),

  [actions.SET_POLL_REQUEST]: (state, action) => state.merge({ ...action.payload }),

  [actions.SET_RESPONSE_REQUEST]: (state, action) => state.merge({ ...action.payload }),

})
