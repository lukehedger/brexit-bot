import React from 'react'
import classNames from 'classnames/bind'
import styles from 'css/components/dialogue/radio.css'

const cx = classNames.bind(styles)

const Component = ({ callback, next, name, text }) => {

  Component.callback = callback

  const handleClick = e => Component.callback(next, { name, text })

  let className = cx({
    base: true
  })

  const labelName = text.replace(/\s/g, '')

  return (
    <div className={className} onClick={handleClick}>
      <input type='radio' id={labelName} />
      <label htmlFor={labelName}>{text}</label>
    </div>
  )

}

export default Component
