import { BuyCryptoCard } from '@/components/buyCrypto'
import React from 'react'
import styles from './BuyCryptoView.module.scss'

const BuyCryptoView = () => {
  return (
    <section className={styles.section}>
      <BuyCryptoCard />
    </section>
  )
}

export default BuyCryptoView
