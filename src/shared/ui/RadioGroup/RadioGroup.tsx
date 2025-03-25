'use client'
import React, { ChangeEvent } from 'react'
import styles from './RadioGroup.module.scss'

type Option = {
  value: string
  label: string
}

type Props = {
  options: Option[]
  selectedValue: string
  disabled?: boolean
  onChange: (value: string) => void
}

export const RadioGroup = ({ options, selectedValue, disabled, onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.value)
    }
  }

  return (
    <div className={`${styles.radioGroup} ${disabled ? styles.disabled : ''}`}>
      {options.map((option) => (
        <label key={option.value} className={styles.radioOption}>
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
            className={styles.radioInput}
            disabled={disabled}
          />
          <div className={styles.customRadio} />
          <span className={styles.label}>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
