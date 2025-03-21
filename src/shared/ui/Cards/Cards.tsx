import type { ComponentProps } from 'react'
import s from './Cards.module.scss'

type Type = ComponentProps<'div'>

/**
 * universal cards component, принимает в виде пропсов:
 * className для стилизации и children для внутренней структуры
 */
export default function Cards({ className, children, ...rest }: Type) {
  return (
    <div className={className ? className + ' ' + s.card : s.card} {...rest}>
      {children}
    </div>
  )
}
