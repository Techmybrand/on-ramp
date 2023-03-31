import { navLinks } from '@/mock'
import Link from 'next/link'
import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Logo, Button } from '@/shared'
import styles from './Header.module.scss'
import ConnectWallet from '@/components/connectWallet/ConnectWallet'

const Header = (): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.header_logoContainer} onClick={() => setCollapsed(true)}>
          <Logo />
        </div>
      </Link>
      <div className={styles[!collapsed ? 'header_wrapper' : 'header_wrapper__collapsed']}>
        <nav className={styles.header_nav}>
          <ul className={styles.header_navList}>
            {navLinks.map(({ name, external, url }, index) => {
              return (
                <li key={index} className={styles.header_navLink}>
                  {external ? (
                    <a href={url} rel="noreferrer" target="_blank">
                      {name}
                    </a>
                  ) : (
                    <Link href={url}>{name}</Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <ConnectWallet />
      </div>
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={styles[collapsed ? 'header_hamburger' : 'header_hamburger__open']}
      >
        <span className={styles.header_hamburgerBar}></span>
        <span className={styles.header_hamburgerBar}></span>
      </div>
    </header>
  )
}

export default Header
