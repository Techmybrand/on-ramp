import { currencies, tokens } from '@/mock'
import { Button, CardInputField, DetailContainer, InputField, TokenInputContainer } from '@/shared'
import { TokenInputValue } from '@/types'
import { formatNumber } from '@/utils'
import { truncateAddress } from '@/utils/truncateAddress'
import Image from 'next/legacy/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from './BuyCryptoCard.module.scss'

enum View {
  HOME = 'home',
  DETAILS = 'details',
  CONFIRM = 'confirm',
}

let total: number = 0
const BuyCryptoCard = () => {
  const cardNumberRef: any = useRef(null)
  const expirationDateRef: any = useRef(null)
  const securityCodeRef: any = useRef(null)
  const ccIconRef: any = useRef<any>('')
  const [view, setView] = useState<View>(View.HOME)
  const [buttonText, setButtonText] = useState<string>('Continue')
  const [title, setTitle] = useState<string>('Buy Ether')
  const [ethValue, setEthValue] = useState<number>(0)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [transactionDetails, setTransactionDetails] = useState<{
    amount: number
    networkFee: number
    processingFee: number
  }>({
    amount: 0,
    networkFee: 0,
    processingFee: 0,
  })
  const [sellToken, setSellToken] = useState<TokenInputValue>({
    name: '',
    symbol: '',
    amount: '',
  })
  const [buyToken, setBuyToken] = useState<TokenInputValue>({
    name: '',
    symbol: '',
    amount: '',
  })
  useEffect(() => {
    if (view === View.HOME) {
      setTitle('Buy Ether')
      setButtonText('Continue')
      return
    }
    if (view === View.DETAILS) {
      setTitle('Enter Payment Details')
      setButtonText('Proceed to Checkout')
      return
    }
    if (view === View.CONFIRM) {
      setButtonText('Pay Now')
      setTitle('Confirm Purchase Amount')
      return
    }
  }, [view])
  const handleHomeSubmit = () => {
    setView(View.DETAILS)
  }
  const handleDetailsSubmit = () => {
    setView(View.CONFIRM)
  }
  const handleFinalSubmit = () => {}
  useEffect(() => {
    if (sellToken.amount) {
      const convertedAmount = +sellToken.amount / 750
      setEthValue(convertedAmount / 1500)
      setTransactionDetails({
        amount: convertedAmount,
        networkFee: convertedAmount * 0.01,
        processingFee: convertedAmount * 0.02,
      })
      total = convertedAmount + convertedAmount * 0.01 + convertedAmount * 0.02
    }
  }, [sellToken.amount])
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.menu_container}>
          <div className={styles.menu}>
            <Image src="/svgs/hamburger.svg" layout="fill" alt="" />
          </div>
        </div>
        {view !== View.HOME && (
          <div
            className={styles.back_button}
            onClick={() => (view === View.DETAILS ? setView(View.HOME) : setView(View.DETAILS))}
          >
            <Image src="/svgs/drop-down.svg" layout="fill" alt="" />
          </div>
        )}
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
      </div>
      <div className={styles.body}>
        {view === View.HOME && (
          <>
            <TokenInputContainer
              options={currencies}
              label="I want to Spend"
              value={sellToken}
              setValue={setSellToken}
            />
            <div className={styles.swap_container}>
              <div className={styles.swap_icon}>
                <Image src="/svgs/swap.svg" layout="fill" alt="" />
              </div>
            </div>
            <TokenInputContainer
              options={tokens}
              label="To Buy (Estimate)"
              value={sellToken}
              setValue={setBuyToken}
              convertedValue={ethValue}
              disabled
            />
            {/* <div className={styles.paymentType_container}>
        <div className={styles.label}>
          <p>Choose Payment Method</p>
        </div>
      </div> */}
            {sellToken.amount && (
              <div className={styles.details_container}>
                <div className={styles.title}>
                  <h3>Transaction Summary</h3>
                </div>
                <div className={styles.divider}></div>
                <DetailContainer title="Amount" value={transactionDetails.amount} prefix="$" />
                <DetailContainer
                  title="Network Fee"
                  description="dskhljahfsldkjbvkjdhdsjh"
                  value={transactionDetails.networkFee}
                  prefix="$"
                />
                <DetailContainer
                  title="Processing Fee"
                  description="dskhljahfsldkjbvkjdhdsjh"
                  value={transactionDetails.processingFee}
                  prefix="$"
                />
                <DetailContainer title="Estimated Processing Time" value={'8-10'} suffix=" mins" />
                <div className={styles.divider}></div>
                <DetailContainer title="total" value={total} prefix="$" />
              </div>
            )}
          </>
        )}
        {view === View.DETAILS && (
          <>
            <div className={styles.input_container}>
              <InputField
                label="Enter Ethereum (ETH) address to receive Crypto"
                placeholder="0x35e158137a8ebA7d64c5d43edec524Bcd99CDCEb"
                onChange={(e: any) => setWalletAddress(e.target.value)}
                value={walletAddress}
              />
              <div className={styles.text}>
                <h5>
                  <span>Or</span> Connect your wallet to add the address
                </h5>
              </div>
            </div>
            <div className={styles.input_container}>
              <CardInputField
                cardNumberRef={cardNumberRef}
                expirationDateRef={expirationDateRef}
                securityCodeRef={securityCodeRef}
                ccIconRef={ccIconRef}
              />
            </div>
            <div className={styles.input_container}>
              <InputField label="Cardholder Name" placeholder="Amy Santiago" icon="/svgs/user.svg" />
            </div>
          </>
        )}
        {view === View.CONFIRM && (
          <>
            <div className={styles.center}>
              <div className={styles.confirm_image}>
                <Image src="/svgs/confirm.svg" layout="fill" alt="" />
              </div>
              <div className={styles.title}>
                <h3>
                  Buying {formatNumber(ethValue)} ETH for {formatNumber(+sellToken.amount)} Naira
                </h3>
              </div>
              <div className={styles.text}>
                <p>
                  Your payment will take 8-10 mins and {formatNumber(ethValue)} ETH will be paid to{' '}
                  {truncateAddress(walletAddress)}{' '}
                </p>
              </div>
            </div>
            <div className={styles.details_container}>
              <div className={styles.title}>
                <h3>Transaction Summary</h3>
              </div>
              <div className={styles.divider}></div>
              <DetailContainer title="Amount" value={transactionDetails.amount} prefix="$" />
              <DetailContainer
                title="Network Fee"
                description="dskhljahfsldkjbvkjdhdsjh"
                value={transactionDetails.networkFee}
                prefix="$"
              />
              <DetailContainer
                title="Processing Fee"
                description="dskhljahfsldkjbvkjdhdsjh"
                value={transactionDetails.processingFee}
                prefix="$"
              />
              <DetailContainer title="Estimated Processing Time" value={'8-10'} suffix=" mins" />
              <div className={styles.divider}></div>
              <DetailContainer title="total" value={total} prefix="$" />
            </div>
          </>
        )}
        <Button
          buttonType="transparent"
          className={styles.button}
          onClick={
            view === View.HOME ? handleHomeSubmit : view === View.DETAILS ? handleDetailsSubmit : handleFinalSubmit
          }
        >
          <div className={styles.text}>
            <p>{buttonText}</p>
          </div>
          <div className={styles.icon}>
            <Image src="/svgs/arrow.svg" layout="fill" alt="" />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default BuyCryptoCard
