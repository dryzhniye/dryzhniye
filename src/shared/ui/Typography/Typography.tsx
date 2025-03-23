import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import s from './Typography.module.scss';

export type TypographyVariant =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'regular-text-16'
  | 'bold-text-16'
  | 'regular-text-14'
  | 'medium-text-14'
  | 'bold-text-14'
  | 'small-text'
  | 'semi-bold-small-text'
  | 'regular-link'
  | 'small-link';

export type TypographyProps = {
  variant?: TypographyVariant;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  font?: 'roboto';
};

export const Typography = ({
                             variant = 'regular-text-16',
                             asChild,
                             className,
                             children,
                             as: Component = 'span',
                             font,
                             ...props
                           }: TypographyProps) => {

  const Comp = asChild ? Slot : Component;
  const variantClass = s[`typography--${variant}`] || '';
  const fontClass = font === 'roboto' ? s['typography--roboto'] : '';

  return (
    <Comp
      className={`${s.typography} ${variantClass} ${fontClass} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};