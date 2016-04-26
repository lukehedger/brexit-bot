import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

// actionTypes
import { REQUEST_BOT } from './actionTypes'

export const initialState = Immutable.Map({
  request: false
})

export default createReducer(initialState, {
  [REQUEST_BOT]: (state, action) => state.merge({
    request: action.payload.request
  })
})
