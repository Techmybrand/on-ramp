import Image from 'next/legacy/image'
import React from 'react'
import styles from './DetailsInput.module.scss'

const DetailsInput = () => {
  return (
    <div className={styles.card}>
      <label className={styles.input_label}>Card Details</label>
      <div className={styles.container}>
        <div className={styles.input_wrapper}>
          <figure className={styles.input_icon}>{/* <Image src={cardIcon} layout="fill" alt="" /> */}</figure>
          <input className={styles.input_field} />
        </div>
        <div className={styles.input_wrapper}>
          <input className={styles.input_field} placeholder="MM/YY" />
        </div>
        <div className={`${styles.input_wrapper} ${styles.input}`}>
          <input className={styles.input_field} placeholder="CVV" />
        </div>
      </div>
    </div>
  )
}

export default DetailsInput
