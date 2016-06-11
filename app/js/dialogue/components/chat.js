import React from 'react'
import styles from 'css/components/dialogue/chat.css'

import Loader from './loader'
import Message from './message'

const Component = ({ messages, latestMessage, isLoading, actions }) => {

  // TODO - loader component
  const renderLoader = isLoading ? <Loader /> : null

  return (
    <div className={styles.base}>

      {messages.map( (message, i) => <Message key={i} {...message.toJS()} actions={actions} latestMessage={latestMessage} /> )}

      {renderLoader}

    </div>
  )

}

export default Component
