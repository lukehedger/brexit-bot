import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

// actionTypes
import { REQUEST_DIALOGUE, NEW_VISIT } from './actionTypes'

export const initialState = Immutable.Map({
  messagesByUser: [
    {
      messages: [
        {
          sender: 'bot',
          body: 'Hello',
          collapse: false,
          delay: 0
        },
        {
          sender: 'bot',
          body: 'How are you?',
          collapse: false,
          delay: 500
        }
      ],
      time: 1462633051099,
      username: 'bot'
    }
  ],
  visited: false
})

export default createReducer(initialState, {

  [REQUEST_DIALOGUE]: (state, action) => state.merge({
    request: action.payload.request
  }),

  [NEW_VISIT]: (state, action) => state.merge({
    visited: action.payload.visited
  }),

})
