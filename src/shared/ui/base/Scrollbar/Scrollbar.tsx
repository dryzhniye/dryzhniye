import { type CSSProperties, ReactNode } from 'react'
import s from './Scrollbar.module.scss';

interface CustomScrollbarProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Scrollbar = ({ children, className, style}: CustomScrollbarProps) => {

  return (
    <div className={`${s['scrollable-container']} ${className}`} style={style}>
      {children}
    </div>
  );
};