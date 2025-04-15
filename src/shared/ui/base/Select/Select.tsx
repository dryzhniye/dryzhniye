'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Select.module.scss'
import Image from 'next/image'
import s from '@/shared/ui/base/TextArea/TextArea.module.scss'

type Props = {
  selectedValue?: string
  disabled?: boolean
  label?: string
  required?: boolean
  title?: string
  options: string[]
  onChange: (value: string) => void
  isLanguage?: boolean
  width?: string
  placeholder?: string
}

export const Select = ({
  selectedValue,
  width,
  disabled,
  title,
  options,
  onChange,
  placeholder,
  label,
  required,
  isLanguage,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [language, setLanguage] = useState<string>('English')

  const [value, setValue] = useState<string>('')
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (option: string) => {
    debugger
    if (!disabled) {
      onChange(option)
      setIsOpen(false)
      setValue(option)
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
      <div ref={selectRef}
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
    ) : (<div style={{width: '100%'}} ref={selectRef}>
      <div>{label && <label className={s.label}>{label}
        {required && <span className={s.required}>*</span>}</label>}</div>
      <div
      className={`${styles.selectBox} ${isOpen ? styles.open : ''} ${
      disabled ? styles.disabled : ''
    }`}
    >
    <div className={styles.selectBoxHeader} onClick={toggleDropdown}>
      <span>{value ? value : <span style={placeholder ? {color: 'var(--light-900)'} : {color: ''}}>{placeholder}</span>}</span>
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
      </div>
  )
}
</>
)
}
