import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as Components from './components'
import { getAll, getMessagesByUser } from './selectors'

export class Container extends React.Component {

  componentWillMount() {

    console.log('dialogue mounted')

    // TODO - returning or new?
    // TODO - get greeting

  }

  render() {

    const { messagesByUser } = this.props

    console.log(messagesByUser)

    return (
      <div>
        <h1>BrexitBot</h1>
        {messagesByUser.map( (user, i) => <Components.user key={i} {...user} /> )}
      </div>
    )

  }

}

export default connect(
  createStructuredSelector({
    dialogue: getAll,
    messagesByUser: getMessagesByUser
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Container)
