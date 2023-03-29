import React, { useEffect, useState } from 'react'
import Logo from '../logo/Logo'
import styles from './Preloader.module.scss'

const Preloader = () => {
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    let intervalId: any
    let increment = 0

    const startCounting = () => {
      intervalId = setInterval(() => {
        increment++
        setCount(increment)

        if (increment === 100) {
          clearInterval(intervalId)
        }
      }, 4000 / 125)
    }

    const delayId = setTimeout(() => {
      startCounting()
    }, 1000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(delayId)
    }
  }, [])

  return (
    <div className={styles.preloader}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.counter}>
        <h1>{count}%</h1>
      </div>
      {/* <div className={styles.line}>
        <svg width="100%" height="100%" viewBox="0 0 30 100">
          <path d="M208.09,0.00 C152.70,67.10 262.02,75.98 200.80,150.00 L0.00,150.00 L0.00,0.00 Z" fill="#FFF" />
          <path d="M208.09,-150.00 C152.70,-82.90 262.02,-74.02 200.80,0.00 L0.00,0.00 L0.00,-150.00 Z" fill="#FFF" />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="0 -200"
            dur="3s"
            repeatCount="indefinite"
          />
        </svg>
      </div> */}
    </div>
  )
}

export default Preloader
