import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as Storage from '../services/storage';
import { STATE_KEY } from '../constants';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(router, logger, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// persist stored state
const initialState = Storage.getItem(STATE_KEY) || {};

export default function configureStore(state = initialState) {

  const store = finalCreateStore(rootReducer, initialState);

  // store state on change
  store.subscribe( () => {

    // TODO - how to store Immutable Maps? - https://github.com/elgerlambert/redux-localstorage
    // Storage.setItem(STATE_KEY, store.getState())

  });

  return store;

}
