import React, { useState, useEffect, useCallback } from 'react'
import { Button, InputField, Modal } from '@/shared'
import styles from './TokenInputContainer.module.scss'
import Image from 'next/legacy/image'

interface Props {
  label?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  value?: string | number
  setCountryCode?: (e: string | number) => void
}

const countries = [
  {
    flag: '/svgs/ngn.svg',
    countryCode: 'ALA',
    callingCode: '+358',
    name: 'Åland Islands',
    currency: 'Naira',
  },
  {
    flag: 'https://flagcdn.com/al.svg',
    countryCode: 'ALB',
    callingCode: '+355',
    name: 'Albania',
    currency: 'ALL',
  },
  {
    flag: 'https://flagcdn.com/dz.svg',
    countryCode: 'DZA',
    callingCode: '+213',
    name: 'Algeria',
    currency: 'DZD',
  },
]

const TokenInputContainer = ({ label, onChange, onBlur, onFocus, value, setCountryCode }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0)
  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [countryList, setCountryList] = useState<any>(countries)

  const searchResult = useCallback(
    (e: any) => {
      setSearchTerm(e.target.value)
      const results = countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setCountryList(results)
    },
    [searchTerm],
  )
  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    // setCountryCode!(countryList[selectedIndex].callingCode)
    setIsOpen(false)
  }
  useEffect(() => {
    if (countryList[selectedOptionIndex]) {
      //   setCountryCode!(countryList[selectedOptionIndex].callingCode)
    }
  }, [selectedOptionIndex])

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
            <input
              className={styles.input_field}
              type={'number'}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              value={value}
              placeholder="1000"
            />
            <div className={styles.input_text}>
              <p>
                {countryList[selectedOptionIndex] ? countryList[selectedOptionIndex].currency : ''} <span>($793)</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <Button className={styles.select_header} buttonType="transparent" onClick={toggling}>
            <div className={styles.select_smallRow}>
              <div className={styles.icon}>
                {countryList[selectedOptionIndex] && (
                  <Image src={countryList[selectedOptionIndex].flag} alt="" layout="fill" />
                )}
              </div>
              <p>{countryList[selectedOptionIndex] ? countryList[selectedOptionIndex].countryCode : ''}</p>
            </div>
            <div className={styles.select_icon}>
              <Image src="/svgs/drop-down.svg" layout="fill" alt="" />
            </div>
          </Button>
          {isOpen && (
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
                  {countryList.map(({ countryCode, flag }: any, index: number) => {
                    return index !== selectedOptionIndex ? (
                      <li onClick={onOptionClicked(index)} key={index} className={styles.select_listItem}>
                        <Button buttonType="transparent" className={styles.select_row}>
                          <div className={styles.icon}>
                            <Image src={flag} alt="" layout="fill" />
                          </div>
                          <p>{countryCode}</p>
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
