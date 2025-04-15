'use client'

import Image from 'next/image'
import React, { useState, InputHTMLAttributes, KeyboardEvent, ChangeEvent } from 'react'
import s from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'search' | 'password'
  label?: string
  required?: boolean
  placeholder?: string
  value?: string
  disabled?: boolean
  error?: string
  iconPosition?: 'start' | 'end'
  width?: string
  onEnterPress?: (value: string) => void
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  required,
  error,
  disabled,
  className,
  placeholder,
  iconPosition,
  onEnterPress,
  onChange,
  value,
  width,
  ...res
}) => {
  const [inputValue, setInputValue] = useState(value || '')
  const [showPassword, setShowPassword] = useState(false)

  const getIconSrc = (): string | null => {
    if (type === 'password') {
      return showPassword ? '/eye-off-outline.svg' : '/eye-outline.svg'
    } else if (type === 'search') {
      return '/search-outline.svg'
    }
    return null
  }

  const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(inputValue)
      setInputValue('')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange?.(e)
  }

  const handleIconClick = () => {
    if (type === 'password') {
      setShowPassword(prev => !prev)
    }
  }

  return (
    <div
      className={`${s.inputContainer} ${className || ''} ${disabled ? s.disabled : ''} ${
        error ? s.error : ''
      }`}
      style={{ width }}
    >
      {label && <label className={s.label}>{label}
        {required && <span className={s.required}>*</span>}</label>}

      <div className={s.inputWrapper}>
        {type === 'search' && getIconSrc() && (
          <button type="button" className={`${s.icon} ${s.iconStart}`} onClick={handleIconClick}>
            <Image src={getIconSrc()!} alt="icon" width={24} height={24} />
          </button>
        )}

        <input
          {...res}
          type={type === 'search' ? 'search' : showPassword ? 'text' : type}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={onPressHandler}
          onChange={onChangeHandler}
          className={`${s.input}
            ${error ? s.inputError : ''}
            ${disabled ? s.inputDisabled : ''}
            ${getIconSrc() && iconPosition === 'start' ? s.withIconStart : ''}
            ${getIconSrc() && iconPosition === 'end' ? s.withIconEnd : ''}`}
          style={{ backgroundColor: 'inherit' }}
        />

        {type === 'password' && getIconSrc() && (
          <button type="button" className={`${s.icon} ${s.iconEnd}`} onClick={handleIconClick}>
            <Image src={getIconSrc()!} alt="icon" width={24} height={24} />
          </button>
        )}
      </div>
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}

export default Input
