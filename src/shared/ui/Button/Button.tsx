import React, { ComponentPropsWithoutRef, ElementType } from 'react'
import s from './Button.module.scss'

export type Props<T extends ElementType = 'button'> = {
  asChild?: T
  variant?: 'primary' | 'secondary' | 'outlined' | 'link' | 'disabled'
  title: string
  fullWidth?: boolean
  width?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: Props<T>) => {
  const {
    variant = 'primary',
    fullWidth,
    title,
    className,
    asChild: Component = 'button',
    width,
    ...rest
  } = props

  return (
    <Component
      {...rest}
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className} ${s.button} `}
      style={{ width: width }}
    >
      {title}
    </Component>

    // todo: ссылка должна быть на всю ширину
  )
}
