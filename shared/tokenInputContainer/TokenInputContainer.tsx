import React, { useState, useEffect, useCallback } from 'react'
import { Button, InputField, Modal } from '@/shared'
import styles from './TokenInputContainer.module.scss'
import Image from 'next/legacy/image'
import { formatLargeNum, formatNumber } from '@/utils'
import { Currencies, TokenInputValue } from '@/types'

interface Props {
  label?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  value: TokenInputValue
  setValue: (e?: any) => void
  options: Currencies[]
  convertedValue?: number
  disabled?: boolean
  usdAmount?: number
}

const TokenInputContainer = ({
  label,
  onChange,
  onBlur,
  onFocus,
  value,
  setValue,
  options,
  convertedValue,
  usdAmount,
  disabled = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [tokenList, setTokenList] = useState<any[]>(options)
  
  const searchResult = useCallback(
    (e: any) => {
      setSearchTerm(e.target.value)
      const results = options.filter((currency) => currency.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setTokenList(results)
    },
    [searchTerm, options],
  )
  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    // setValue!(tokenList[selectedIndex].callingCode)
    setIsOpen(false)
  }
  useEffect(() => {
    if (tokenList[selectedOptionIndex]) {
      setValue!({...value, name: tokenList[selectedOptionIndex].name, symbol: tokenList[selectedOptionIndex].symbol})
    }
  }, [selectedOptionIndex, setValue, tokenList])

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <div className={styles.select}>
      {label && (
        <div className={styles.label}>
          <p>{label}</p>
        </div>
      )}
      <div className={styles.select_head}>
        <div className={`${styles.input}`}>
          <div className={styles.input_wrapper}>
            <div className={styles.input_container}>
              {disabled ? (
                <div className={styles.input_text}>
                  <h4>{formatNumber(convertedValue!)}</h4>
                </div>
              ) : (
                <input
                  className={styles.input_field}
                  type={'number'}
                  onChange={(e: any) => setValue({ ...value, amount: e.target.value })}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  value={value.amount}
                  placeholder="1000"
                />
              )}
            </div>
            {
              !disabled && <div className={styles.input_text}>
              <p>
                {tokenList[selectedOptionIndex] ? tokenList[selectedOptionIndex].name : ''}{' '}
                {value.amount && <span>(${formatLargeNum(usdAmount)})</span>}
              </p>
            </div>
            }
            
          </div>
        </div>
        <div className={styles.container}>
          <Button
            className={styles.select_header}
            buttonType="transparent"
            onClick={(e: any) => {
              setIsOpen(true)
              e.stopPropagation()
            }}
          >
            <div className={styles.select_smallRow}>
              <div className={styles.icon}>
                {tokenList[selectedOptionIndex] && (
                  <Image src={tokenList[selectedOptionIndex].icon} alt="" layout="fill" />
                )}
              </div>
              <p style={{ textTransform: 'uppercase' }}>
                {tokenList[selectedOptionIndex] ? tokenList[selectedOptionIndex].symbol : ''}
              </p>
            </div>
            <div className={styles.select_icon}>
              <Image src="/svgs/drop-down.svg" layout="fill" alt="" />
            </div>
          </Button>
          {isOpen && tokenList.length > 1 && (
            <Modal close={() => setIsOpen(false)}>
              <div className={styles.select_body}>
                <div className={styles.input_container} onClick={(e: any) => e.stopPropagation()}>
                  <InputField
                    className={styles.search}
                    icon="/svgs/icon-search.svg"
                    value={searchTerm}
                    onChange={(e) => searchResult(e)}
                  />
                </div>
                <ul className={styles.select_listContainer}>
                  {tokenList.map(({ symbol, icon }: any, index: number) => {
                    return index !== selectedOptionIndex ? (
                      <li onClick={onOptionClicked(index)} key={index} className={styles.select_listItem}>
                        <Button buttonType="transparent" className={styles.select_row}>
                          <div className={styles.icon}>
                            <Image src={icon} alt="" layout="fill" />
                          </div>
                          <p>{symbol}</p>
                        </Button>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenInputContainer
