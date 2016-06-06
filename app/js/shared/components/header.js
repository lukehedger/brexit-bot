import React from 'react'
import styles from 'css/components/header.css'

const Component = ({ text }) => {

  return (
    <header className={styles.base}>
      <div className={styles.logo}></div>
    </header>
  );

}

export default Component;
