'use client'
import React, { useState } from 'react'
import styles from './Select.module.css'
import Image from 'next/image'

type Props = {
  placeholder?: string
  disabled?: boolean
  options: string[]
}

export const Select = ({placeholder = "Select-box", disabled, options}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectBox}>
      <div
        className={`${styles.selectBoxHeader} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption}</span>
        {isOpen ? <Image src={'arrow2.svg'} alt={'arrow'} width="15" height="8"/> : <Image src={'arrow1.svg'} alt={'arrow'} width="15" height="8"/>}
      </div>
      {isOpen && (
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
      )}
    </div>
  );
}