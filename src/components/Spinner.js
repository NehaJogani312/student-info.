import React from 'react'
import styles from '../styles/Spinner.module.css'

const Spinner = () => {
  return (
    <div>
      <div className={styles.spinnerContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
    </div>
  )
}

export default Spinner
