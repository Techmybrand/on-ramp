import { formatLargeNum, formatNumber } from '@/utils'
import { formatLargeOrSmallNum } from '@/utils/formatLargeNum'
import Image from 'next/legacy/image'
import React from 'react'
import styles from './DetailContainer.module.scss'

interface Props {
  title?: string
  value?: string | number
  prefix?: string
  suffix?: string
  description?: string
  className?: string
}

const DetailContainer = ({ title, value, description, prefix, suffix, className }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.text}>
          <p>{title}:</p>
        </div>
        {description && (
          <div className={styles.icon}>
            <Image src="/svgs/info.svg" layout="fill" alt="" />
            <div className={styles.info_container}>
              <div className={styles.text}>
                <h6>{description}</h6>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.text} ${className}`}>
        <h3>
          {prefix}
          {typeof value === 'number' ? formatLargeOrSmallNum(value) : value}
          {suffix}
        </h3>
      </div>
    </div>
  )
}

export default DetailContainer
