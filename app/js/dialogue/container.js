import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
import { getAll } from './selectors'

import * as User from '../user';

export class Container extends React.Component {

  componentWillMount() {

    console.log('dialogue mounted');

  }

  render() {

    return (
      <div>
        <h1>BrexitBot</h1>
        <User.Container />
      </div>
    )

  }

}

export default connect(
  createStructuredSelector({
    dialogue: getAll
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Container)
