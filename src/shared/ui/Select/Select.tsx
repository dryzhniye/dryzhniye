'use client'
import React, { useState } from 'react'
import styles from './Select.module.css'
import Image from 'next/image'

type Props = {
  placeholder?: string
  disabled?: boolean
  title?: string
  options: string[]
}

export const Select = ({ placeholder = 'Select-box', disabled, title, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(placeholder)

  const handleOptionClick = (option: string) => {
    if (!disabled) {
      setSelectedOption(option)
      setIsOpen(false)
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
      <div className={`${styles.selectBox} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}>
        <div
          className={styles.selectBoxHeader}
          onClick={toggleDropdown}>
          <span>{selectedOption}</span>
          <Image
            src={isOpen ? 'arrow2.svg' : 'arrow1.svg'}
            alt="arrow"
            width="15"
            height="8"
          />
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
    </>
  )
}