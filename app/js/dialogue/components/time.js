import React from 'react'
import moment from 'moment'

import styles from 'css/components/dialogue/time.css'

const Component = ({ time }) => {

  const hour = moment(time).format('h')
  const minutes = moment(time).format('mm')
  const period = moment(time).format('A')

  return (
    <div className={styles.base}>
      {hour}:{minutes} {period}
    </div>
  )

}

export default Component
