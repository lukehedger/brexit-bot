import React from 'react'
import * as Components from './'
// import styles from 'css/components/user.css';

const Component = ({ messages, time, username }) => {

  return (
    <div>
      <Components.avatar username={username} />
      <Components.time time={time} />
      {messages.map( (message, i) => <Components.message key={i} {...message} /> )}
    </div>
  );

}

export default Component;
