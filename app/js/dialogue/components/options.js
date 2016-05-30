import React from 'react'
// import styles from 'css/components/options.css'

const Component = ({ actions, options }) => {

  const { fetchChoice, fetchSpurious, fetchTopic, setPoll, endConvo } = actions

  Component.fetchChoice = fetchChoice
  Component.fetchSpurious = fetchSpurious
  Component.fetchTopic = fetchTopic
  Component.setPoll = setPoll
  Component.endConvo = endConvo

  const optionSubmit = (fn, args) => Component[fn](args)

  return (
    <div>
      {options.map( (o, i) => {
        const { next, text, name } = o
        return (
          <button key={i} onClick={ e => optionSubmit(next, { name }) }>{text}</button>
        )
      })}
    </div>
  )

}

export default Component
