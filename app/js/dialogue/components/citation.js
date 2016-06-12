import React from 'react'
import styles from 'css/components/dialogue/citation.css'

const Component = ({ citation }) => {

  return (
    <cite className={styles.base}>
      <a className={styles.link} href={citation} target='_blank'>{citation}</a>
    </cite>
  )

}

export default Component
