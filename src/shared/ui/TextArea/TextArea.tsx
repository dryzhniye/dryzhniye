import s from './TextArea.module.scss'

type Props = {
  title?: string
  error?: boolean
  disabled?: boolean
  width?: string
  height?: string
  onChange: (value: string) => void
}

export default function TextArea({ title, error, disabled, width, height, onChange }: Props) {

  return (
    <div>
          <textarea className={`${error ? s.error : ''} ${s.textArea}`} disabled={disabled} style={{ width, height }}
                    onChange={(e) => onChange(e.currentTarget.value)}>
            {title}
          </textarea>
      {error && <div className={s.errorMessage}>Error text</div>}
    </div>

  )
}
