import React, {ComponentPropsWithoutRef} from 'react'
import s from './Button.module.css'

export type Props = {
  variant?: "primary" | "secondary" | "outlined" | "ghost"
  asChild?: any
  title?: string
  fullWidth?: boolean
} & ComponentPropsWithoutRef<"button">

export const Button = ({variant = "primary", asChild, title, fullWidth, className, ...rest}: Props) => {
  const Component = asChild || 'button'

  return (
      <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className} `}>{title}</Component>
  )
}
