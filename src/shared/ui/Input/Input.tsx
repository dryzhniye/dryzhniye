import React, { useState, InputHTMLAttributes, KeyboardEvent, ChangeEvent } from 'react'
import s from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  onEnterPress?: (value: string) => void
}

const Input: React.FC<InputProps> = ({

  label,
  error: initialError,
  disabled,
  className,
  placeholder,
  icon,
  iconPosition,
  onEnterPress,
  onChange,
  value,
  ...res
}) => {

  const [error, setError] = useState(initialError)
  const [inputValue, setInputValue] = useState(value || '')

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

  return (
    <div


      className={`${s.inputContainer} ${className || ''} ${disabled ? s.disabled : ''} ${
        error ? s.error : ''
      }`}

    >
      {label && <label className={s.label}>{label}</label>}

      <div className={s.inputWrapper}>
        {icon && iconPosition === 'start' && (
          <div className={`${s.icon} ${s.iconStart}`}>{icon}</div>
        )}

        <input
          {...res}
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
        {icon && iconPosition === 'end' && <div className={`${s.icon} ${s.iconEnd}`}>{icon}</div>}
      </div>

      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}


export default Input

