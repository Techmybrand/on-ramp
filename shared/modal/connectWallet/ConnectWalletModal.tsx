import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { wallets } from '@/mock'
import { Wallet } from '@/mock/wallets'
import { connectors } from '@/config/constants/connectors'
import styles from './ConnectWalletModal.module.scss'
import { toast } from 'react-toastify'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  NoBitkeepProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorBitkeep,
} from '@/bitkeep-connector/src'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { setupNetwork } from '@/utils/wallet'
import { useGlobalContext } from '@/context/Global.context'

const ConnectWalletModal = ({ close }) => {
  const { activate, account } = useWeb3React()
  const { setConnectorName} = useGlobalContext()

  const setProvider = (connectorId: string) => {
    window.localStorage.setItem('provider', connectorId)
  }

  const handleWallet = useCallback(
    async (e: any, connectorName: string) => {
      try {
        const connector = connectors[connectorName]
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const provider = await connector.getProvider()
            const hasSetup = await setupNetwork(provider)
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window?.localStorage?.removeItem('provider')
            if (error instanceof NoEthereumProviderError || error instanceof NoBitkeepProviderError) {
              toast.error('No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorBitkeep ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              toast.error('Please authorize to access your account')
            } else {
              toast.error(error.message)
            }
          }
        })
        setProvider(connectorName)
        setConnectorName(connectorName)
        close()
      } catch (error) {
        console.log("error...");
        
      }
    },
    [activate, close],
  )

  useEffect(() => {
    const handleClickOutside = () => {
      close()
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [close])
  return (
    <div className={styles.modal_container}>
      <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h3>Connect Wallet</h3>
          </div>
          <div className={styles.close_container} onClick={close}>
            <div className={styles.close} onClick={close}>
              <Image src={'/svgs/close.svg'} fill alt="" />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          {wallets.map((data, index) => {
            return <WalletCard data={data} key={index} onClick={(e) => handleWallet(e, data.connector)} />
          })}
        </div>
        <div className={styles.footer}>
          <div className={styles.text}>
            <h6>
              By connecting to on-ramp. You agree to our {" "}
              <a href="#">
                Terms of Service
              </a> and{' '}
              <a href="#">Privacy Policy</a>.
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal

interface CardProps {
  data: Wallet
  onClick?: (e?: any) => void
}

const WalletCard = ({ data, onClick }: CardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.icon}>
        <Image src={data.icon} alt="" layout="fill" />
      </div>
      <div className={styles.text}>
        <p>{data.wallet}</p>
      </div>
    </div>
  )
}
