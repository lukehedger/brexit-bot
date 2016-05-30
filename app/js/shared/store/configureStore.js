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

const logger = createLogger({ collapsed: true });
const router = routerMiddleware(browserHistory);
const saga = createSagaMiddleware()

const finalCreateStore = compose(
  applyMiddleware(router, logger, saga),
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

    // remove routing from state before storing
    let stateWithoutRouting = store.getState().delete('routing')

    Storage.setItem(STATE_KEY, stateWithoutRouting.toJS())

  });

  return store;

}
