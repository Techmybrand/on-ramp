import { SellCryptoCard } from '@/components/sellCrypto'
import React from 'react'
import styles from './SellCryptoView.module.scss'

const SellCryptoView = () => {
  return (
    <section className={styles.section}>
      <SellCryptoCard />
    </section>
  )
}

export default SellCryptoView