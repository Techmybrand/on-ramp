import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from './Modal.module.scss'

interface Props {
  children?: React.ReactNode
  title?: string
  description?: string
  className?: string
  close: () => void
  shouldClose?: boolean
  isClose?: boolean
  externalClassName?: string
}

const Modal = ({
  title,
  className,
  children,
  close,
  shouldClose = true,
  isClose = true,
  description,
  externalClassName,
}: Props) => {
  useEffect(() => {
    const handleClickOutside = () => {
      if (!shouldClose) return
      close()
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [close, shouldClose])
  return (
    <div className={`${styles.modal_container} ${externalClassName && externalClassName}`}>
      <div className={`${styles.modal} ${className && className}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header} data-active={isClose}>
          <div className={styles.title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          {isClose && (
            <div
              className={styles.close}
              onClick={() => {
                if (!shouldClose) return
                close()
              }}
            >
              <Image src={'/svgs/close.svg'} fill alt="" />
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
