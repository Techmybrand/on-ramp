import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import IMask from 'imask'
import styles from './CardInputField.module.scss'
import Image from 'next/legacy/image'

interface Props {
  cardNumberRef: any
  expirationDateRef: any
  securityCodeRef: any
  ccIconRef: any
}

const CardInputField = ({ cardNumberRef, expirationDateRef, securityCodeRef, ccIconRef }: Props) => {
  const [cardIcon, setCardIcon] = useState<string>('/svgs/credit-card.svg')

  useEffect(() => {
    //Mask the Credit Card Number Input
    const cardNumberMask = new IMask(cardNumberRef.current, {
      mask: [
        {
          mask: '0000 000000 00000',
          regex: '^3[47]\\d{0,13}',
          cardtype: 'american express',
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
          cardtype: 'discover',
        },
        {
          mask: '0000 000000 0000',
          regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
          cardtype: 'diners',
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
          cardtype: 'mastercard',
        },
        {
          mask: '0000-0000-0000-0000',
          regex: '^(5019|4175|4571)\\d{0,12}',
          cardtype: 'dankort',
        },
        {
          mask: '0000-0000-0000-0000',
          regex: '^63[7-9]\\d{0,13}',
          cardtype: 'instapayment',
        },
        {
          mask: '0000 000000 00000',
          regex: '^(?:2131|1800)\\d{0,11}',
          cardtype: 'jcb15',
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(?:35\\d{0,2})\\d{0,12}',
          cardtype: 'jcb',
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
          cardtype: 'maestro',
        },
        {
          mask: '0000-0000-0000-0000',
          regex: '^220[0-4]\\d{0,12}',
          cardtype: 'mir',
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^4\\d{0,15}',
          cardtype: 'visa',
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^62\\d{0,14}',
          cardtype: 'unionpay',
        },
        {
          mask: '0000 0000 0000 0000',
          cardtype: 'Unknown',
        },
      ],
      dispatch: function (appended: any, dynamicMasked: any) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '')

        for (let i = 0; i < dynamicMasked.compiledMasks.length; i++) {
          const re = new RegExp(dynamicMasked.compiledMasks[i].regex)
          if (number.match(re) !== null) {
            return dynamicMasked.compiledMasks[i]
          }
        }
      },
    })

    //Mask the Expiration Date
    const expirationDateMask = new IMask(expirationDateRef.current, {
      mask: 'MM{/}YY',
      //   blocks: {
      //     YY: new IMask.MaskedPattern.Group.Range([0, 99]),
      //     MM: new IMask.MaskedPattern.Group.Range([1, 12]),
      //   },
    })

    //Mask the security code
    const securityCodeMask = new IMask(securityCodeRef.current, {
      mask: '000',
    })

    //pop in the appropriate card icon when detected
    cardNumberMask.on('accept', function () {
      switch (cardNumberMask.masked.currentMask.cardtype) {
        case 'american express':
          ccIconRef.current = 'amex'
          setCardIcon('/svgs/logo-amex.svg')
          break
        case 'visa':
          ccIconRef.current = 'visa'
          setCardIcon('/svgs/logo-visa.svg')
          break
        case 'diners':
          ccIconRef.current = 'diners'
          setCardIcon('/svgs/logo-diners.svg')
          break
        case 'discover':
          ccIconRef.current = 'discover'
          setCardIcon('/svgs/logo-discover.svg')
          break
        case 'jcb' || 'jcb15':
          ccIconRef.current = 'jcb'
          setCardIcon('/svgs/logo-jcb.svg')
          break
        case 'maestro':
          ccIconRef.current = 'maestro'
          setCardIcon('/svgs/logo-maestro.svg')
          break
        case 'mastercard':
          ccIconRef.current = 'mastercard'
          setCardIcon('/svgs/logo-master.svg')
          break
        case 'unionpay':
          ccIconRef.current = 'unionpay'
          setCardIcon('/svgs/logo-union-pay.svg')
          break
        default:
          ccIconRef.current = 'default'
          setCardIcon('/svgs/credit-card.svg')
          break
      }
    })
  }, [cardNumberRef, expirationDateRef, securityCodeRef, ccIconRef])

  return (
    <div className={styles.card}>
      <label className={styles.input_label}>Card Details</label>
      <div className={styles.container}>
        <div className={styles.input_wrapper}>
          <figure className={styles.input_icon}>
            <Image src={cardIcon} layout="fill" alt="" />
          </figure>
          <input className={styles.input_field} ref={cardNumberRef} />
        </div>
        <div className={styles.input_wrapper}>
          <input className={styles.input_field} ref={expirationDateRef} placeholder="MM/YY" />
        </div>
        <div className={`${styles.input_wrapper} ${styles.input}`}>
          <input className={styles.input_field} ref={securityCodeRef} placeholder="CVV" />
        </div>
      </div>
    </div>
  )
}

export default CardInputField
