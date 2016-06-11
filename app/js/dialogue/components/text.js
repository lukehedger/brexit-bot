import React from 'react'
import styles from 'css/components/dialogue/text.css'

const Component = ({ text }) => {

  return (
    <p className={styles.base}>
      {text}
    </p>
  )

}

export default Component
