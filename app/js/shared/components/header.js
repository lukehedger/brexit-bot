import React from 'react'
import styles from 'css/components/header.css'

const Component = ({ text }) => {

  return (
    <header className={styles.base}>
      <div className={styles.logo}></div>
      <div className={styles.wtf}>Ask a robot about Brexit <i>#spurious</i></div>
      <div className={styles.who}>made with 🤖 by <a className={styles.link} href='https://github.com/lukehedger/brexit-bot' target='_blank'>lukehedger</a></div>
    </header>
  );

}

export default Component;
