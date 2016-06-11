import React, { Component } from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as Components from './components'
import { getAll, getMessages, getLatestMessage, hasVisited } from './selectors'
import { SHOW_INPUT_TYPES } from './constants'

// transitions
import transitions from 'css/transitions/slideup.css'

export class Container extends React.Component {

  componentWillMount() {

    const { actions, visited } = this.props
    const { fetchGreeting, fetchHuman, setVisit } = actions

    // say hello :D
    fetchGreeting()

    // record new visit
    if (!visited) setVisit()

  }

  componentDidUpdate() {

    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight)

  }

  render() {

    const { actions, messages, latestMessage } = this.props
    const { setResponse } = actions

    const inputDisabled = latestMessage && SHOW_INPUT_TYPES.indexOf(latestMessage.get('type')) < 0
    const renderInput = !inputDisabled ? <Components.input onSubmit={setResponse} /> : null

    return (
      <div className='dialogue' style={{paddingBottom: '40px'}}>

        <Components.chat messages={messages} latestMessage={latestMessage} actions={actions} />

        <CSSTransitionGroup transitionName={transitions} transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
          { renderInput }
        </CSSTransitionGroup>

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
