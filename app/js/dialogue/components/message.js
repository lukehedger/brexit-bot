import React from 'react'
import * as Components from './'
// import styles from 'css/components/message.css'

const Component = ({ actions, latestMessage, id, sender, time, type, body }) => {

  const { text, image, video, audio, chart, options, source } = body

  const hasOptions = options && options.length > 0 || false
  const isLatest = latestMessage.get('id') === id
  // TODO - feed to classNames
  const disabled = hasOptions && !isLatest

  const renderText = text ? <Components.text text={text} /> : null
  const renderImage = image ? <Components.image image={image} /> : null
  const renderVideo = video ? <Components.video video={video} /> : null
  const renderAudio = audio ? <Components.audio audio={audio} /> : null
  const renderChart = chart ? <Components.chart chart={chart} /> : null
  const renderOptions = hasOptions ? <Components.options options={options} actions={actions} /> : null
  const renderCitation = source ? <Components.citation citation={source} /> : null

  return (
    <div>
      <Components.avatar username={sender} />
      <Components.time time={time} />
      {renderText}
      {renderImage}
      {renderVideo}
      {renderAudio}
      {renderChart}
      {renderOptions}
      {renderCitation}
    </div>
  )

}

export default Component
