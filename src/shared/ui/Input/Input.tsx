'use client'
import React, { useState, InputHTMLAttributes, KeyboardEvent, ChangeEvent } from 'react'
import s from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'search' | 'password'
  label?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  toggleIcon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  width?: string
  onEnterPress?: (value: string) => void
  onIconClick?: () => void
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  error: initialError,
  disabled,
  className,
  placeholder,
  icon,
  iconPosition,
  toggleIcon,
  onEnterPress,
  onIconClick,
  onChange,
  value,
  width,
  ...res
}) => {
  const [error, setError] = useState(initialError)
  const [inputValue, setInputValue] = useState(value || '')
  const [showPassword, setShowPassword] = useState(false)

  const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(inputValue)
      setInputValue('')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setError('')
    onChange?.(e)
  }

  const handleIconClick = () => {
    if (type === 'password') {
      setShowPassword(prev => !prev)
    }
    onIconClick?.()
  }

  return (
    <div
      className={`${s.inputContainer} ${className || ''} ${disabled ? s.disabled : ''} ${
        error ? s.error : ''
      }`} style={{width: width}}
    >
      {label && <label className={s.label}>{label}</label>}

      <div className={s.inputWrapper}>
        {icon && iconPosition === 'start' && (
          <button type="button" className={`${s.icon} ${s.iconStart}`} onClick={handleIconClick}>
            {icon}
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
            ${icon && iconPosition === 'start' ? s.withIconStart : ''} 
            ${icon && iconPosition === 'end' ? s.withIconEnd : ''}`}
        />

        {icon && iconPosition === 'end' && (
          <button type="button" className={`${s.icon} ${s.iconEnd}`} onClick={handleIconClick}>
            {showPassword && toggleIcon ? toggleIcon : icon}
          </button>
        )}
      </div>
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}

export default Input
