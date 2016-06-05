import React from 'react'
// import styles from 'css/components/input.css'

const Component = ({ disabled, onSubmit }) => {

  Component.onSubmit = onSubmit

  // handle onKeyUp
  const onKeyUp = (e) => {

    if (e.keyCode !== 13) return

    let text = e.target.value

    // dispatch action
    Component.onSubmit({ message: { text } })

  }

  return (
    <input type='text' onKeyUp={onKeyUp} disabled={disabled} />
  )

}

export default Component
