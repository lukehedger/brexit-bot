import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// containers
import App from './containers/App'
import NotFound from './containers/NotFound'
import * as Dialogue from '../dialogue';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Dialogue.Container} />
    <Route path="*" component={NotFound} />
  </Route>
)
