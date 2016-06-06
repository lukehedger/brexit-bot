import React from 'react'
import styles from 'css/components/dialogue/chat.css'

import Message from './message'

const Component = ({ messages, latestMessage, actions }) => {

  return (
    <div className={styles.base}>

      {messages.map( (message, i) => <Message key={i} {...message.toJS()} actions={actions} latestMessage={latestMessage} /> )}

    </div>
  )

}

export default Component
