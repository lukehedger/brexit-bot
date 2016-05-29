import { combineReducers } from 'redux-immutablejs'
import routerReducer from './router'
import * as dialogue from '../../dialogue'

export default combineReducers({
  routing: routerReducer,
  [dialogue.name]: dialogue.reducer
})
