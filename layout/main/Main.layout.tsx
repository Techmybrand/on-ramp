import React, { ReactNode, ReactElement } from 'react'
import { Header } from '@/shared'
import styles from './styles.module.scss'

interface Props {
  children?: ReactNode
}

const Main = ({ children }: Props): ReactElement => {
  return (
    <div className={styles.layout} data-scroll-container id="container">
      <Header />
      <main className={styles.layout_content}>{children}</main>
    </div>
  )
}

export default Main
