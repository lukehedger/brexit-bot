import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as actions from './actions'
// import * as Components from './components'
import { getAll } from './selectors'

export class Container extends React.Component {

  componentWillMount() {

    console.log('bot mounted');

  }

  render() {

    return (
      <div>
        <h1>BrexitBot</h1>
        {/*<Components.rating cheers={4} />*/}
      </div>
    )

  }

}

export default connect(
  createStructuredSelector({
    bot: getAll
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Container)
