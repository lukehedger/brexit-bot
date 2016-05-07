import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as dialogue from '../../dialogue'

export default combineReducers({
  routing: routerReducer,
  [dialogue.name]: dialogue.reducer
})
