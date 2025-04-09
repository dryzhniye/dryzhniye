'use client'
import React, { useState } from 'react'
import styles from './Select.module.scss'
import Image from 'next/image'

type Props = {
  selectedValue?: string
  disabled?: boolean
  title?: string
  options: string[]
  onChange: (value: string) => void
  isLanguage?: boolean
  width?: string
}

export const Select = ({
  selectedValue,
  width,
  disabled,
  title,
  options,
  onChange,
  isLanguage,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [language, setLanguage] = useState<string>('English')

  const handleOptionClick = (option: string) => {
    if (!disabled) {
      onChange(option)
      setIsOpen(false)
      setLanguage(option)
    }
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <>
      {title && <span className={styles.title}>{title}</span>}
      {isLanguage ? (
        <div
          className={`${styles.selectBox} ${isOpen ? styles.open : ''} 
               ${disabled ? styles.disabled : ''}`}
          style={{ width: width }}
        >
          <div className={styles.selectBoxHeader} onClick={toggleDropdown}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Image
                src={language === 'English' ? '/flag.svg' : '/flagRussia.svg'}
                alt={'флаг'}
                width={'20'}
                height={'20'}
              />
              <span>{selectedValue}</span>
            </div>
            <Image src={isOpen ? '/arrow2.svg' : '/arrow1.svg'} alt="arrow" width="15" height="8" />
          </div>
          {isOpen && <div className={`${styles.selectBoxListWrapper} ${isOpen ? styles.open : ''}`}>
             <ul className={styles.selectBoxList}>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={styles.selectBoxItem}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>}
        </div>
      ) : (
        <div
          className={`${styles.selectBox} ${isOpen ? styles.open : ''} ${
            disabled ? styles.disabled : ''
          }`}
        >
          <div className={styles.selectBoxHeader} onClick={toggleDropdown}>
            <span>{selectedValue}</span>
            <Image src={isOpen ? '/arrow2.svg' : '/arrow1.svg'} alt="arrow" width="15" height="8" />
          </div>
          <div className={`${styles.selectBoxListWrapper} ${isOpen ? styles.open : ''}`}>
            <ul className={styles.selectBoxList}>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={styles.selectBoxItem}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
