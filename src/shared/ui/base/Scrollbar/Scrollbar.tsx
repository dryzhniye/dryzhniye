import { ReactNode } from 'react';
import s from './Scrollbar.module.scss';

interface CustomScrollbarProps {
  children: ReactNode;
}

export const Scrollbar = ({ children}: CustomScrollbarProps) => {

  return (
    <div className={s['scrollable-container']}>
      {children}
    </div>
  );
};