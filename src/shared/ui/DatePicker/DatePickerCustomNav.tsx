import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import s from './DatePickerCustomNav.module.scss'


export function DatePickerCustomNav(props: {
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  previousMonth?: Date;
  nextMonth?: Date;
}) {
  return (
    <div className={s['custom-nav']}>
      <button
        type="button"
        onClick={props.onPreviousClick}
        disabled={!props.previousMonth}
        className={s['custom-nav-button']}
        aria-label="Previous month"
      >
        <ChevronLeft style={{ width: '20px', height: '20px', color: 'white' }} />
      </button>
      <button
        type="button"
        onClick={props.onNextClick}
        disabled={!props.nextMonth}
        className={s['custom-nav-button']}
        aria-label="Next month"
      >
        <ChevronRight style={{ width: '20px', height: '20px', color: 'white' }} />
      </button>
    </div>
  )
}