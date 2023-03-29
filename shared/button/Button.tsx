import React from 'react'
import styles from './Button.module.scss'

import Image from 'next/legacy/image'

interface Props {
  buttonType?: 'primary' | 'transparent'
  children: React.ReactNode
  iconPrefix?: string
  iconSuffix?: string
  className?: string
}

const Button = ({
  buttonType = 'primary',
  children,
  className,
  iconPrefix,
  iconSuffix,
  ...otherProps
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`${styles[buttonType]} ${className} ${styles.button}`} data-type={buttonType} {...otherProps}>
      {!!iconPrefix && (
        <figure className={styles.button_icon}>
          <Image src={iconPrefix} layout="fill" alt="" />
        </figure>
      )}
      {children}
      {!!iconSuffix && (
        <figure className={styles.button_icon}>
          <Image src={iconSuffix} layout="fill" alt="" />
        </figure>
      )}
    </button>
  )
}

export default Button
