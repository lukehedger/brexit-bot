import React, { Component } from 'react'

import * as Components from '../components'

export default class App extends Component {

  render() {

    return (
      <div>

        <Components.header text='BrexitBot' />

        {this.props.children}

      </div>
    )

  }

}
