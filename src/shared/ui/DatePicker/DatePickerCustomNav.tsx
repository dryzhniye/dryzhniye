import React from 'react'
import s from './DatePickerCustomNav.module.scss'
import Image from 'next/image'


export const DatePickerCustomNav = (props: {
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  previousMonth?: Date;
  nextMonth?: Date;
}) => {
  return (
    <div className={s['custom-nav']}>
      <button
        type="button"
        onClick={props.onPreviousClick}
        disabled={!props.previousMonth}
        className={s['custom-nav-button']}
        aria-label="Previous month"
      >
        <Image
          src="/arrow-ios-back.svg"
          alt="Previous month"
          width={20}
          height={20}
          className={s['custom-icon']}
        />
      </button>
      <button
        type="button"
        onClick={props.onNextClick}
        disabled={!props.nextMonth}
        className={s['custom-nav-button']}
        aria-label="Next month"
      >
        <Image
          src="/arrow-ios-forward.svg"
          alt="Next month"
          width={20}
          height={20}
          className={s['custom-icon']}
        />
      </button>
    </div>
  )
}