import React from 'react'
import classNames from 'classnames/bind'
import styles from 'css/components/dialogue/message.css'

import * as Components from './'

const cx = classNames.bind(styles)

const Component = ({ actions, latestMessage, id, sender, time, type, body }) => {

  const { text, image, video, audio, chart, options, source } = body

  const hasOptions = options && options.length > 0 || false
  const isLatest = latestMessage.get('id') === id
  const disabled = hasOptions && !isLatest

  const renderText = text ? <Components.text text={text} /> : null
  const renderImage = image ? <Components.image image={image} /> : null
  const renderVideo = video ? <Components.video video={video} /> : null
  const renderAudio = audio ? <Components.audio audio={audio} /> : null
  const renderChart = chart ? <Components.chart chart={chart} /> : null
  const renderOptions = hasOptions ? <Components.options options={options} actions={actions} disabled={disabled} /> : null
  const renderCitation = source ? <Components.citation citation={source} /> : null

  let className = cx({
    base: true,
    [`${sender}`]: sender
  })

  return (
    <div className={className}>
      {/* <Components.avatar username={sender} /> */}
      {renderText}
      {renderImage}
      {renderVideo}
      {renderAudio}
      {renderChart}
      {renderOptions}
      {renderCitation}
      <Components.time time={time} />
    </div>
  )

}

export default Component
