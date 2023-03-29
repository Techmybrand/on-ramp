import styles from './Logo.module.scss'
import React from 'react'
import Image from 'next/legacy/image'

interface Props {
  type?: 'footer' | 'default'
}

const Logo = ({ type }: Props) => {
  return (
    <div className={styles.logo}>
      <Image
        src={type === 'footer' ? '/svgs/logo.svg' : '/svgs/logo.svg'}
        // loading="eager"
        priority={true}
        alt="fusion xperience"
        layout="fill"
        // fill
        quality={100}
      />
    </div>
  )
}

export default Logo
