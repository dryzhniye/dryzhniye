import s from './TextArea.module.scss'
import React from 'react'

type Props = {
  title?: string
  error?: string
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  width?: string
  height?: string
  value?: string
  onChange?: (value: string) => void
}

export default function TextArea({ error, value, placeholder, label, required, disabled, width, height, onChange, ...rest }: Props) {

  return (
    <div>
      {label && <label className={s.label}>{label}
        {required && <span className={s.required}>*</span>}</label>}
          <textarea value={value || ''}
                    placeholder={placeholder}
                    className={`${error ? s.error : ''} ${s.textArea}`}
                    disabled={disabled}
                    style={{ width, height }}
                    onChange={(e) => onChange && onChange(e.currentTarget.value)}
                    {...rest}
          />
      {error && <div style={{position: 'relative'}}><span className={s.errorMessage}>{error}</span></div>}
    </div>

  )
}
