import { currencies, tokens } from '@/mock'
import { Button, CardInputField, DetailContainer, InputField, TokenInputContainer } from '@/shared'
import { TokenInputValue } from '@/types'
import { formatNumber } from '@/utils'
import { truncateAddress } from '@/utils/truncateAddress'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/legacy/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './SellCryptoCard.module.scss'
import isEmpty from 'lodash/isEmpty'
import { API } from '@/utils/axios'
import getTokenUsdRate from '@/utils/getTokenUsdRate'

enum View {
  HOME = 'home',
  DETAILS = 'details',
  CONFIRM = 'confirm',
}

let total: number = 0
const SellCryptoCard = () => {
  const { account } = useWeb3React()
  const [view, setView] = useState<View>(View.HOME)
  const [buttonText, setButtonText] = useState<string>('Continue')
  const [title, setTitle] = useState<string>('Sell crypto')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentSuccessful, setPaymentSuccessful] = useState<string>('')
  const [ethValue, setEthValue] = useState<number>(0)
  const [accountName, setAccountName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [bankName, setBankName] = useState<string>('')
  const [transactionHash, setTransactionHash] = useState<string>('')
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
    symbol: 'RUSD',
    name: 'Ramp USD',
    amount: '',
  })
  const [buyToken, setBuyToken] = useState<TokenInputValue>({
    symbol: 'USD',
    name: 'USD',
    amount: '',
  })

  useEffect(() => {
    if (view === View.HOME) {
      setTitle('Sell Crypto')
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
    setErrorMsg('')
    setView(View.DETAILS)
  }

  const handleDetailsSubmit = () => {
    // validations
    if (isEmpty(accountName)) {
      setErrorMsg(`account name is a required field.`)
      return;
    }

    if (isEmpty(accountNumber)) {
      setErrorMsg(`account number is a required field.`)
      return;
    }

    if (isEmpty(bankName)) {
      setErrorMsg(`bank name is a required field.`)
      return;
    }

    if (isEmpty(email)) {
      setErrorMsg(`Email address is a required field.`)
      return;
    }

    setErrorMsg('')
    setView(View.CONFIRM)
  }

  const handleFinalSubmit = async () => {
    try {
      setErrorMsg('')
      setIsLoading(true)
      const response = await API.post('/ramp/performSale', {
        currency: sellToken.symbol,
        amount: total,
        accountName,
        accountNumber,
        bankName,
        email,
        walletAddress: account || ''
      })

      if (response?.data) {
        const { transactionHash: ref, message } = response?.data?.result
        setTransactionHash(ref)
        setPaymentSuccessful(message)
      }
      setView(View.HOME)
      setIsLoading(false)
      setSellToken({ ...sellToken, amount: '' })
      setEthValue(0)
    } catch (error: any) {
      if (error.response.data) {
        setErrorMsg(error.response.data.error)
      } else {
        setErrorMsg(error.message)
      }
      setIsLoading(false)
      setTransactionHash('')
    }
  }

  useEffect(() => {
    if (sellToken.amount) {
      const amount = +sellToken.amount //assumes naira
      const convertedAmount = getTokenUsdRate(sellToken.symbol, amount, 'sell');
      const [fee, processingFee] = [convertedAmount * 0.001, convertedAmount * 0.002]
      setEthValue(convertedAmount)
      setTransactionDetails({
        amount: amount,
        networkFee: fee,
        processingFee: processingFee,
      })
      total = convertedAmount + fee + processingFee
    } else {
      setEthValue(0)
    }
  }, [sellToken.amount, sellToken.symbol, buyToken.symbol])

  return (
    <div className={styles.wrapper}>
      {
        paymentSuccessful && <div style={{ display: 'flex', justifyContent: 'center', width: 'min-content', background: '#D4EDD9', padding: 20, marginBottom: 20 }}>
          <p style={{ textAlign: 'center', color: '#145724' }}> {paymentSuccessful} </p>
        </div>
      }
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
            {errorMsg && <p style={{ color: '#ff0000' }}>{errorMsg}</p>}
          </div>
        </div>
        <div className={styles.body}>
          {view === View.HOME && (
            <>
              <TokenInputContainer
                options={tokens}
                label="I want to sell"
                value={sellToken}
                setValue={setSellToken}
                usdAmount={ethValue}
              />
              <div className={styles.swap_container}>
                <div className={styles.swap_icon}>
                  <Image src="/svgs/swap.svg" layout="fill" alt="" />
                </div>
              </div>
              <TokenInputContainer
                options={currencies}
                label="To receive (estimate)"
                value={sellToken}
                setValue={setBuyToken}
                convertedValue={ethValue}
                disabled
              />
            </>
          )}
          {view === View.DETAILS && (
            <>
              <div className={styles.input_container}>
                <InputField type="email" label="Email address" placeholder="name@domain.com" onChange={(e: any) => setEmail(e.target.value)} icon="/svgs/user.svg" />
              </div>
              <div className={styles.input_container}>
                <InputField type="name" label="Account Name" placeholder="John Doe" onChange={(e: any) => setAccountName(e.target.value)} icon="/svgs/user.svg" />
              </div>
              <div className={styles.input_container}>
                <InputField type="text" label="Account number" placeholder="IBAN" onChange={(e: any) => setAccountNumber(e.target.value)} icon="/svgs/user.svg" />
              </div>
              <div className={styles.input_container}>
                <InputField type="text" label="Bank name" placeholder="First bank" onChange={(e: any) => setBankName(e.target.value)} icon="/svgs/user.svg" />
              </div>
            </>
          )}
          {view === View.CONFIRM && (
            <>
              <div className={styles.center}>
                <div className={styles.confirm_image}>
                  {isLoading ? <Image src="/svgs/spinner.svg" layout="fill" alt="" /> : <Image src="/svgs/confirm.svg" layout="fill" alt="" />}
                </div>
                <div className={styles.title}>
                  <h3>
                    Buying {formatNumber(ethValue)} {buyToken.symbol} for {formatNumber(+sellToken.amount)} {sellToken.symbol}
                  </h3>
                </div>
                <div className={styles.text}>
                  <p>
                    {formatNumber(ethValue)} {buyToken.symbol} will be withdrawned from your connected wallet. You will receive {formatNumber(+sellToken.amount)} {sellToken.symbol} once payment has been confirmed within 5 business days.
                  </p>
                </div>
              </div>

            </>
          )}
          {sellToken.amount && view != View.DETAILS && (
            <div className={styles.details_container}>
              <div className={styles.title}>
                <h3>Transaction Summary</h3>
              </div>
              <div className={styles.divider}></div>
              <DetailContainer title="Amount" value={transactionDetails.amount} prefix="$" />
              <DetailContainer
                title="Network Fee"
                description="network fee"
                value={transactionDetails.networkFee}
                prefix="$"
              />
              <DetailContainer
                title="Processing Fee"
                description="Free"
                value={transactionDetails.processingFee}
                prefix="$"
              />
              <DetailContainer title="Estimated Processing Time" value={'3-10'} suffix=" mins" />
              <div className={styles.divider}></div>
              <DetailContainer title="total" value={total} prefix="$" />
            </div>
          )}
          {
            view === View.CONFIRM ? (
              <Button
                buttonType="transparent"
                className={styles.button}
                // disabled={!isLoading}
                onClick={account ? handleFinalSubmit : null}
              >
                {
                  account ? (
                    <>
                      <div className={styles.text}>
                        <p>{buttonText}</p>
                      </div>
                      <div className={styles.icon}>
                        <Image src="/svgs/arrow.svg" layout="fill" alt="" />
                      </div>
                    </>
                  ) : (
                    <div className={styles.text}>
                      <p>Connect Wallet</p>
                    </div>
                  )
                }
              </Button>
            ) : (
              <Button
                buttonType="transparent"
                className={styles.button}
                // disabled={!isLoading}
                onClick={
                  view === View.HOME ? handleHomeSubmit : handleDetailsSubmit
                }
              >
                <div className={styles.text}>
                  <p>{buttonText}</p>
                </div>
                <div className={styles.icon}>
                  <Image src="/svgs/arrow.svg" layout="fill" alt="" />
                </div>
              </Button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SellCryptoCard
