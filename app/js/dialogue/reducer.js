import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'

export const initialState = Immutable.fromJS({
  messages: [],
  requesting: false,
  visited: false,
  end: false,
  error: null
})

export default createReducer(initialState, {

  [actions.FETCH_HUMAN_REQUEST]: (state, action) => state.merge({ ...action.payload }),

  [actions.FETCH_GREETING_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_GREETING_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_GREETING_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.FETCH_POLL_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_POLL_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_POLL_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.FETCH_CHOICE_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_CHOICE_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_CHOICE_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.FETCH_TOPIC_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_TOPIC_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_TOPIC_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.FETCH_SPURIOUS_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_SPURIOUS_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_SPURIOUS_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.FETCH_FAREWELL_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_FAREWELL_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.FETCH_FAREWELL_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.SET_VISIT]: (state, action) => state.merge({ ...action.payload }),

  [actions.SET_POLL_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.SET_POLL_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.SET_POLL_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.SET_RESPONSE_REQUEST]: (state, action) => state.merge({ ...action.payload }),
  [actions.SET_RESPONSE_SUCCESS]: (state, action) => state.merge({ ...action.payload }),
  [actions.SET_RESPONSE_FAILURE]: (state, action) => state.merge({ error: action.payload }),

  [actions.PUSH_MESSAGE]: (state, action) => state.updateIn(['messages'], val => val.push({ ...action.payload })),

  [actions.END_CONVO]: (state, action) => state.merge({ ...action.payload }),

})
