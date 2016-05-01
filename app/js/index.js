import '../css/app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './shared/containers/Root'

const rootEl = document.getElementById('root')

let render = () => {
  ReactDOM.render(<Root />, rootEl)
}

// Support hot reloading of components
if (module.hot) {

  module.hot.accept('./shared/containers/Root', () => {
    setTimeout(render)
  })

}

render();
