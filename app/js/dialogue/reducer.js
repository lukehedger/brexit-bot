import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

// actionTypes
import { REQUEST_DIALOGUE } from './actionTypes'

export const initialState = Immutable.Map({
  request: false
})

export default createReducer(initialState, {
  [REQUEST_DIALOGUE]: (state, action) => state.merge({
    request: action.payload.request
  })
})
