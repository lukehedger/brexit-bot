import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as Components from './components'
import { getAll, getMessages, hasVisited } from './selectors'

export class Container extends React.Component {

  componentWillMount() {

    const { actions, visited } = this.props
    const { fetchGreeting, setVisit } = actions

    // record new visit
    if (!visited) setVisit()

    // say hello :D
    fetchGreeting()

  }

  render() {

    const { messages } = this.props

    return (
      <div>
        <h1>BrexitBot</h1>
        {messages.map( (message, i) => <Components.message key={i} {...message.toJS()} /> )}
      </div>
    )

  }

}

export default connect(
  createStructuredSelector({
    dialogue: getAll,
    messages: getMessages,
    visited: hasVisited
  }),
  dispatch => (
    {
      actions: bindActionCreators(actions, dispatch)
    }
  )
)(Container)
