import React from 'react'
import styles from 'css/components/dialogue/embed.css'

const Component = ({ embed }) => {

  return (
    <div className={styles.base} dangerouslySetInnerHTML={{ __html: embed }}></div>
  )

}

export default Component
