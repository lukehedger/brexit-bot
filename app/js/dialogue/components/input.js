import React from 'react'
import styles from 'css/components/dialogue/input.css'

const Component = ({ disabled, onSubmit }) => {

  Component.onSubmit = onSubmit

  // handle onKeyUp
  const onKeyUp = (e) => {

    if (e.keyCode !== 13) return

    let text = Component._input.value

    // dispatch action
    Component.onSubmit({ message: { text } })

    // clear input
    Component._input.value = ''

  }

  return (
    <input className={styles.base} type='text' onKeyUp={onKeyUp} disabled={disabled} ref={ ref => Component._input = ref } />
  )

}

export default Component
