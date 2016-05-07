import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

// actionTypes
import { REQUEST_USER } from './actionTypes'

export const initialState = Immutable.Map({
  request: false
})

export default createReducer(initialState, {
  [REQUEST_USER]: (state, action) => state.merge({
    request: action.payload.request
  })
})
