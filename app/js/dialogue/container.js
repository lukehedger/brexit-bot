import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as Components from './components'
import { getAll, getMessages, hasVisited } from './selectors'

export class Container extends React.Component {

  componentWillMount() {

    const { fetchGreeting, setVisit, visited } = this.props

    // record new visit
    if (!visited) setVisit()

    // say hello :D
    fetchGreeting()

  }

  render() {

    const { messages } = this.props

    // console.log(messages.toJS())

    // TODO - no longer messagesByUser, just an massive array of messages
    // will need to rethink component structure (eg. message->avatar (display on condition?), time)

    return (
      <div>
        <h1>BrexitBot</h1>
        {/*
        {messages.map( (user, i) => <Components.user key={i} {...user} /> )}
        */}
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
  dispatch => bindActionCreators(actions, dispatch)
)(Container)
