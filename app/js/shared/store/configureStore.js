import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import rootReducer from '../reducers';
import * as Storage from '../services/storage';
import { STATE_KEY } from '../constants';

// middleware
const router = routerMiddleware(browserHistory);
const saga = createSagaMiddleware()

let middleware = [
  router, saga
]

// logger middleware in development
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true });
  middleware.push(logger)
}

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// persist stored state
const persistState = Storage.getItem(STATE_KEY) || {}
const initialState = Immutable.fromJS(persistState)

export default function configureStore(state = initialState) {

  const store = finalCreateStore(rootReducer, initialState);

  // start sagas
  saga.run(rootSaga)

  // store state on change
  store.subscribe( () => {

    // remove routing and clear messages from state before storing
    let stateTrimmed = store.getState().delete('routing').setIn(['dialogue', 'messages'], Immutable.fromJS([]))

    Storage.setItem(STATE_KEY, stateTrimmed.toJS())

  });

  return store;

}
