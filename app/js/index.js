import '../css/app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Keen from 'keen-js'
import Root from './shared/containers/Root'
import { KEEN_PROJECT_ID, KEEN_WRITE_KEY } from './shared/constants'

const rootEl = document.getElementById('root')

// analytics
window.keenClient = new Keen({ projectId: KEEN_PROJECT_ID, writeKey: KEEN_WRITE_KEY })

// render!
ReactDOM.render(<Root />, rootEl)
