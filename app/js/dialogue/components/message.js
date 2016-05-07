import React from 'react'
import * as Components from './'
// import styles from 'css/components/message.css'

const Component = (props) => {

  // TODO - render components based on message type/content

  return (
    <div>
      <Components.text />
      <Components.options />
      <Components.input />
    </div>
  );

}

export default Component;
