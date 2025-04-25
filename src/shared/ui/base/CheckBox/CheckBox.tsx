'use client'
import React from 'react'
import styles from './CheckBox.module.scss'

type Props = {
  title?: string
  disabled?: boolean
  onChange?: (value: boolean) => void
  checked?: boolean
}

export const CheckBox = ({ title, disabled, onChange, checked }: Props) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  return (
    <div className={`${styles.checkboxWrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.customCheckbox} ${checked ? styles.checked : ''}`}
        onClick={handleClick}
      >
        {checked && (
          <svg
            className={styles.checkIcon}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
      {title && (
        <span className={styles.checkboxTitle} onClick={handleClick}>
          {title}
        </span>
      )}
    </div>
  )
}
