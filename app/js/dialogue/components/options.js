import React from 'react'
import styles from 'css/components/dialogue/options.css'

import Radio from './radio'

const Component = ({ actions, options, disabled }) => {

  const { fetchChoice, fetchSpurious, fetchTopic, setPoll, endConvo } = actions

  Component.fetchChoice = fetchChoice
  Component.fetchSpurious = fetchSpurious
  Component.fetchTopic = fetchTopic
  Component.setPoll = setPoll
  Component.endConvo = endConvo

  const optionSubmit = (fn, args) => Component[fn](args)

  return (
    <div className={styles.base}>
      {options.map( (o, i) => <Radio key={i} callback={optionSubmit} { ...o } disabled={disabled}  />)}
    </div>
  )

}

export default Component
