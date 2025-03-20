import React, {ComponentPropsWithoutRef, ElementType} from 'react'
import s from './Button.module.css'

export type Props<T extends ElementType = 'button'> = {
  asChild?: T
  variant?: "primary" | "secondary" | "outlined" | "link"
  title?: string
  fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: Props<T>) => {
  const {variant = "primary", fullWidth, title, className, asChild: Component = 'button'} = props

  return (
      <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className} ${s.button} `}>{title}</Component>
  )
}
