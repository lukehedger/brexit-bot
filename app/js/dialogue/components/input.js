import React from 'react'
import styles from 'css/components/dialogue/input.css'

const Component = ({ onSubmit }) => {

  Component.onSubmit = onSubmit

  // handle onKeyUp
  const onKeyUp = (e) => {

    if (e.keyCode !== 13) return

    let text = Component._input.value

    if (!text) return

    // dispatch action
    Component.onSubmit({ message: { text } })

    // clear input
    Component._input.value = ''

  }

  return (
    <input className={styles.base} type="text" placeholder="Répondez s'il vous plaît" onKeyUp={onKeyUp} ref={ ref => Component._input = ref } autoFocus tabIndex="1" />
  )

}

export default Component
