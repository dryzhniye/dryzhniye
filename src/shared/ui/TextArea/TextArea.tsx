import s from './TextArea.module.scss'

type Props = {
  title?: string
  error?: boolean
  disabled?: boolean
}

export default function TextArea({title, error, disabled}: Props) {

  return (
      <div>
          <textarea className={`${error ? s.error : ''} ${s.textArea}`} disabled={disabled}>
            {title}
          </textarea>
        {error && <div className={s.errorMessage}>Error text</div>}
      </div>

  )
}
