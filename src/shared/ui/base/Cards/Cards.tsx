import type { ComponentProps, FormEvent, ReactNode } from 'react'
import s from './Cards.module.scss'

type Type = {
  children: ReactNode
  className?: string
  onSubmit: (value: FormEvent<HTMLFormElement>) => void
} & ComponentProps<'form'>

export default function Cards({ children, className, onSubmit }: Type) {
  return (
    <form className={`${className} ${s.card}`} onSubmit={event => onSubmit(event)}>
      {children}
    </form>
  )
}
