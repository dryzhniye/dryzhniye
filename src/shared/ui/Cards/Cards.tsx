import type { ReactNode } from 'react'
import s from './Cards.module.scss'

type Type = {
/**
 * принимает стили
 */
  className?: string
  /**
 * принимает различные childrens для компонента
 */
  children: ReactNode
}

/**
* universal cards component
 */
export default function Cards({ className, children, ...rest }: Type) {
  return (
    <div className={className ? `${className}` : `${s.card}`} {...rest}>
      {children}
    </div>
  )
}
