import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as Components from './components'
import { getAll, getMessages, getLatestMessage, hasVisited } from './selectors'
import { SHOW_INPUT_TYPES } from './constants'

export class Container extends React.Component {

  componentWillMount() {

    const { actions, visited } = this.props
    const { fetchGreeting, fetchHuman, setVisit } = actions

    // say hello :D
    fetchGreeting()

    // record new visit
    if (!visited) setVisit()

  }

  render() {

    const { actions, messages, latestMessage } = this.props
    const { setResponse } = actions

    const inputDisabled = latestMessage && SHOW_INPUT_TYPES.indexOf(latestMessage.get('type')) < 0

    return (
      <div>

        <h1>BrexitBot</h1>

        {messages.map( (message, i) => <Components.message key={i} {...message.toJS()} actions={actions} latestMessage={latestMessage} /> )}

        <Components.input disabled={inputDisabled} onSubmit={setResponse} />

      </div>
    )

  }

}

export default connect(
  createStructuredSelector({
    dialogue: getAll,
    messages: getMessages,
    latestMessage: getLatestMessage,
    visited: hasVisited
  }),
  dispatch => (
    {
      actions: bindActionCreators(actions, dispatch)
    }
  )
)(Container)
