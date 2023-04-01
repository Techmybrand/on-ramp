import { currencies, tokens } from '@/mock'
import { Button, CardInputField, DetailContainer, InputField, TokenInputContainer } from '@/shared'
import { TokenInputValue } from '@/types'
import { formatNumber } from '@/utils'
import { truncateAddress } from '@/utils/truncateAddress'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/legacy/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './BuyCryptoCard.module.scss'
import isEmpty from 'lodash/isEmpty'
import { FLW_PUBKEY, MAX_AMOUNT, MIN_AMOUNT } from '@/config'
import { API } from '@/utils/axios'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import getTokenUsdRate from '@/utils/getTokenUsdRate'
import { toast } from 'react-toastify'

enum View {
  HOME = 'home',
  DETAILS = 'details',
  CONFIRM = 'confirm',
}

let total: number = 0
const BuyCryptoCard = () => {
  const { account } = useWeb3React()
  const cardNumberRef: any = useRef(null)
  const expirationDateRef: any = useRef(null)
  const securityCodeRef: any = useRef(null)
  const ccIconRef: any = useRef<any>('')
  const [view, setView] = useState<View>(View.HOME)
  const [buttonText, setButtonText] = useState<string>('Continue')
  const [title, setTitle] = useState<string>('Buy crypto')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentSuccessful, setPaymentSuccessful] = useState<string>('')
  const [ethValue, setEthValue] = useState<number>(0)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [name, setName] = useState<string>('John Doe')
  const [email, setEmail] = useState<string>('')
  const [transactionRef, setTransactionRef] = useState<string>('')
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
    symbol: 'USD',
    name: 'USD',
    amount: '',
  })
  const [buyToken, setBuyToken] = useState<TokenInputValue>({
    symbol: 'RUSD',
    name: 'Ramp USD',
    amount: '',
  })

  const paymentConfig = useMemo(() => ({
    public_key: FLW_PUBKEY,
    tx_ref: transactionRef,
    amount: +sellToken.amount,
    currency: 'USD',
    payment_options: 'card,ussd',
    customer: {
      email,
      name,
      phone_number: ''
    },
    customizations: {
      title: 'On-Ramp',
      description: `you are buying ${formatNumber(ethValue)} ${buyToken.symbol} for ${formatNumber(+sellToken.amount)} ${sellToken.symbol} `,
      logo: '/svgs/logo.svg'
    },
  }), [buyToken.symbol, email, ethValue, name, sellToken.amount, transactionRef]);

  const handleFlutterPayment = useFlutterwave(paymentConfig);

  useEffect(() => {
    if (account) {
      setWalletAddress(account)
    } else {
      setWalletAddress('')
    }
  }, [account])

  useEffect(() => {
    if (view === View.HOME) {
      setTitle('Buy Crypto')
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
    // validations
    if (!sellToken.amount || parseInt(String(sellToken.amount)) < MIN_AMOUNT) {
      setErrorMsg(`Amount cannot be less than ${MIN_AMOUNT}.`)
      return;
    }

    if (sellToken.amount && parseInt(String(sellToken.amount)) > MAX_AMOUNT) {
      setErrorMsg(`Amount cannot be more than ${MAX_AMOUNT}.`)
      return;
    }

    setErrorMsg('')
    setView(View.DETAILS)
  }

  const handleDetailsSubmit = () => {
    // validations
    if (isEmpty(walletAddress)) {
      setErrorMsg(`Enter the wallet address to receive the ${buyToken.symbol}.`)
      return;
    }

    if (isEmpty(name)) {
      setErrorMsg(`Name is a required field.`)
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
      const response = await API.post('/ramp/initiatePayment', {
        currency: buyToken.symbol,
        amount: +total,
        walletAddress,
        email,
        name
      })

      if (response?.data) {
        const { transactionRef: ref } = response?.data?.result
        setTransactionRef(ref)
      }
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
      setIsLoading(false)
      setTransactionRef('')
    }
  }

  useEffect(() => {
    if (transactionRef) {
      setTransactionRef('');
      handleFlutterPayment({
        callback: async (response) => {
          try {
            closePaymentModal(); // this will close the modal programmatically
            setIsLoading(true);
            const resp = await API.post('/ramp/verifyPayment', {
              transactionId: String(response.transaction_id),
              transactionRef: response.tx_ref,
              flw_ref: response.flw_ref
            })
            if (resp?.data) {
              setPaymentSuccessful(`Your ${sellToken.amount} ${sellToken.symbol} payment has been processed. TransactionHash: ${resp.data.result.receipt.transactionHash}`)
            }else{
              setPaymentSuccessful(`Your ${sellToken.amount} ${sellToken.symbol} payment has been received. Expect your funds in a few minutes`)
            }
            setSellToken({...sellToken, amount: ''})
            setEthValue(0)
            setView(View.HOME)
          } catch (error: any) {
            if(error.response.data){
              toast.error(error.response.data.meesage || 'request failed')
            }else{
              toast.error(error.message)
            }
          }
          setIsLoading(false)
          setTransactionRef('')
        },
        onClose: () => {
          setIsLoading(false)
          setTransactionRef('')
        },
      });
    }

  }, [transactionRef])

  useEffect(() => {
    if (sellToken.amount) {
      const amount = +sellToken.amount //assumes naira
      const convertedAmount = getTokenUsdRate(buyToken.symbol, amount);
      const [fee, processingFee] = [convertedAmount * 0.01, convertedAmount * 0.02]
      setEthValue(convertedAmount)
      setTransactionDetails({
        amount: amount,
        networkFee: fee,
        processingFee: processingFee,
      })
      total = convertedAmount - (fee + processingFee)
    }else{
      setEthValue(0)
    }
  }, [sellToken.amount, sellToken.symbol, buyToken.symbol])

  return (
    <div className={styles.wrapper}>
      {paymentSuccessful && <div style={{ display: 'flex', justifyContent: 'center', width: 'min-content', background: '#D4EDD9', padding: 20, marginBottom: 20 }}>
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
                options={currencies}
                label="I want to Spend"
                value={sellToken}
                usdAmount={+sellToken.amount}
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
                {!account &&
                  <div className={styles.text}>
                    <h5>
                      <span>Or</span> Connect your wallet to add the address
                    </h5>
                  </div>
                }
              </div>
              {/* <div className={styles.input_container}>
              <CardInputField
                cardNumberRef={cardNumberRef}
                expirationDateRef={expirationDateRef}
                securityCodeRef={securityCodeRef}
                ccIconRef={ccIconRef}
              />
            </div> */}
              {/* <div className={styles.input_container}>
                <InputField type="name" label="Payee Name" placeholder="John Doe" onChange={(e: any) => setName(e.target.value)} icon="/svgs/user.svg" />
              </div> */}
              <div className={styles.input_container}>
                <InputField type="email" label="Email address" placeholder="name@domain.com" onChange={(e: any) => setEmail(e.target.value)} icon="/svgs/user.svg" />
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
                    Your payment will take 2-10 mins and {formatNumber(ethValue)} {buyToken.symbol} will be paid to{' '}
                    {truncateAddress(walletAddress)}{' '}
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
                description="gas fee"
                value={transactionDetails.networkFee}
                suffix={buyToken.symbol}
              />
              <DetailContainer
                title="Processing Fee"
                description="processing fee"
                value={transactionDetails.processingFee}
                suffix={buyToken.symbol}
              />
              <DetailContainer title="Estimated Processing Time" value={'2-10'} suffix=" mins" />
              <div className={styles.divider}></div>
              <DetailContainer title="total" value={total} suffix={buyToken.symbol} />
            </div>
          )}
          <Button
            buttonType="transparent"
            className={styles.button}
            disabled={view === View.CONFIRM && isLoading}
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
    </div>
  )
}

export default BuyCryptoCard
