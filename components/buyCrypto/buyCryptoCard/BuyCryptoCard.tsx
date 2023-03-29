import { Button, DetailContainer, TokenInputContainer } from '@/shared'
import Image from 'next/legacy/image'
import React from 'react'
import styles from './BuyCryptoCard.module.scss'

const BuyCryptoCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.menu_container}>
        <div className={styles.menu}>
          <Image src="/svgs/hamburger.svg" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.title}>
        <h1>title</h1>
      </div>
      <TokenInputContainer label="I want to Spend" />
      <div className={styles.swap_container}>
        <div className={styles.swap_icon}>
          <Image src="/svgs/swap.svg" layout="fill" alt="" />
        </div>
      </div>
      <TokenInputContainer label="To Buy (Estimate)" />
      {/* <div className={styles.paymentType_container}>
        <div className={styles.label}>
          <p>Choose Payment Method</p>
        </div>
      </div> */}
      <div className={styles.details_container}>
        <div className={styles.title}>
          <h3>Transaction Summary</h3>
        </div>
        <div className={styles.divider}></div>
        <DetailContainer title="Amount" value="$10" />
        <DetailContainer title="Network Fee" description="dskhljahfsldkjbvkjdhdsjh" value={10} prefix="$" />
        <DetailContainer title="Processing Fee" description="dskhljahfsldkjbvkjdhdsjh" value="$10" />
        <DetailContainer title="title" value="8-10" suffix=" mins" />
        <div className={styles.divider}></div>
        <DetailContainer title="total" value="10" prefix="$" />
      </div>
      <Button buttonType="transparent" className={styles.button}>
        <div className={styles.text}>
          <p>Continue</p>
        </div>
        <div className={styles.icon}>
          <Image src="/svgs/arrow.svg" layout="fill" alt="" />
        </div>
      </Button>
    </div>
  )
}

export default BuyCryptoCard
