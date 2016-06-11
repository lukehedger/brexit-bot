import React from 'react'
import { VictoryPie } from 'victory'

const Component = ({ chart }) => {

  let data = []

  for (var point in chart) {
    if (chart.hasOwnProperty(point)) {
      let x = point.charAt(0).toUpperCase() + point.slice(1)
      let y = chart[point]
      data.push({ x, y })
    }
  }

  let style = {
    labels: {
      fontSize: 20
    }
  }

  return <VictoryPie data={data} style={style} />

}

export default Component
