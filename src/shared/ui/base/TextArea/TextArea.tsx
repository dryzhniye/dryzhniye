import s from './TextArea.module.scss'
import React from 'react'

type Props = {
  title?: string
  error?: boolean
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  width?: string
  height?: string
  onChange: (value: string) => void
}

export default function TextArea({ title, error, placeholder, label, required, disabled, width, height, onChange }: Props) {

  return (
    <div>
      {label && <label className={s.label}>{label}
        {required && <span className={s.required}>*</span>}</label>}
          <textarea placeholder={placeholder} className={`${error ? s.error : ''} ${s.textArea}`} disabled={disabled} style={{ width, height }}
                    onChange={(e) => onChange(e.currentTarget.value)}>
            {title}
          </textarea>
      {error && <div className={s.errorMessage}>Error text</div>}
    </div>

  )
}
