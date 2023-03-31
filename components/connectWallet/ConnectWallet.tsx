import { connectors } from "@/config/constants/connectors";
import { Button } from "@/shared";
import ConnectWalletModal from "@/shared/modal/connectWallet/ConnectWalletModal";
import { truncateAddress } from "@/utils/truncateAddress";
import { useWeb3React } from "@web3-react/core";
import styles from './ConnectWallet.module.scss';
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "@/context/Global.context";

export default function ConnectWallet() {
    const { account, activate, deactivate } = useWeb3React()
    const [showConnectWallet, setShowConnectWallet] = useState<boolean>(false)
    const { connectorName, setConnectorName} = useGlobalContext()

    const walletIcon = useMemo(
        () => (connectorName || account ? `/svgs/${connectorName}.svg` : '/svgs/wallet-yellow.svg'),
        [connectorName],
    )

    const onClickConnectWalletBtn = useCallback(
        (e: any) => {
            if(account){
                deactivate()
                setConnectorName('')
            } else{
                setShowConnectWallet(true)
                e.stopPropagation()
            }
        },
        [account, setShowConnectWallet],
    )

    useEffect(() => {
        try {
          const provider = window.localStorage.getItem('provider')
          if (provider) {
            activate(connectors[provider])
            setConnectorName(provider.toLowerCase())
          }
        } catch (error) {
          console.log(error)
        }
      }, [activate])

    return <>
        <Button buttonType="primary" className={styles.button} onClick={onClickConnectWalletBtn}>
            <div className={styles.icon}>
                <Image src={walletIcon} fill alt="" />
            </div>
            <p>{account ? truncateAddress(account) : 'Connect Wallet'}</p>
        </Button>

        {showConnectWallet && <ConnectWalletModal close={() => setShowConnectWallet(false)} />}
    </>
}