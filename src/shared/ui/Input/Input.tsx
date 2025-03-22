import React, { InputHTMLAttributes } from 'react'
import s from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  placeholder?: string
  value?: string
  type?: 'search' | 'email'
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  onEnterPress?: () => void
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  className,
  placeholder,
  icon,
  iconPosition = 'start',
  // onEnterPress,
  ...res
}) => {
  // const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter' && onEnterPress) {
  //     onEnterPress()
  //   }
  // }
  return (
    <div
      className={
        s.inputContainer +
        (className ? ' ' + className : '') +
        (disabled ? ' ' + s.disabled : '') +
        (error ? ' ' + s.error : '')
      }
    >
      {label && <label className={s.label}>{label}</label>}

      <div className={s.inputWrapper}>
        {icon && iconPosition === 'start' && <div className={s.icon}>{icon}</div>}

        <input
          {...res}
          placeholder={placeholder}
          disabled={disabled}
          // onKeyDown={onPressHandler}
          className={
            s.input + (error ? ' ' + s.inputError : '') + (disabled ? ' ' + s.inputDisabled : '')
          }
        />

        {icon && iconPosition === 'end' && <div className={s.icon}>{icon}</div>}
      </div>

      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}

export default Input
