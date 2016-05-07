import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as Components from './components'
import { getAll } from './selectors'

export class Container extends React.Component {

  componentWillMount() {

    console.log('user mounted');

  }

  render() {

    return (
      <div>
        <h1>User</h1>
        <Components.message>
          <Components.text />
          <Components.options />
          <Components.input />
        </Components.message>
      </div>
    )

  }

}

export default connect(
  createStructuredSelector({
    user: getAll
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Container)
