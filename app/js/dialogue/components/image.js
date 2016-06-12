import React from 'react'
import styles from 'css/components/dialogue/image.css'

const Component = ({ image }) => {

  return (
    <div className={styles.base}>
      <img src={image} />
    </div>
  )

}

export default Component
