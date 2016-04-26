import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as bot from '../../bot'

export default combineReducers({
  routing: routerReducer,
  [bot.name]: bot.reducer
})
