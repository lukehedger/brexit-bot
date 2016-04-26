import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(router, logger, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__ || {};

export default function configureStore(state = initialState) {

  const store = finalCreateStore(rootReducer, initialState);

  return store;

}
