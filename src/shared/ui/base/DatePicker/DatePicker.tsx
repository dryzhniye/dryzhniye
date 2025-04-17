'use client'

import React, { useEffect, useRef, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { DateRange, DayPicker, type Mode } from 'react-day-picker'
import { enGB } from 'date-fns/locale'
import { DatePickerCustomNav } from '@/shared/ui/base/DatePicker/DatePickerCustomNav'
import Image from 'next/image'
import 'react-day-picker/style.css'
import './DatePicker.scss'
import s from './DatePickerCustomNav.module.scss'

type DatePickerMode = Exclude<Mode, 'multiple'>;

interface DatePickerInputProps {
  width?: string
  mode?: DatePickerMode;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | Date;
  onChange?: (value: string | Date) => void;
  onBlur?: () => void;
  name?: string;
  selectOnly?: boolean;
}

export const DatePicker = ({
                             mode = 'range',
                             width = '340px',
                             error,
                             label,
                             onBlur,
                             selectOnly = false,
                             onChange,
                             value,
                             required,
                             disabled = false,
                           }: DatePickerInputProps) => {
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [month, setMonth] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState<string | undefined>(error)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const isUserTypingRef = useRef(false)

  console.log(error === 'too_young')
//create right local weekdays order started from monday
  const modifiers = {
    weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Sunday (0) & Saturday (6)
  }

  useEffect(() => {

    if (isUserTypingRef.current) {
      isUserTypingRef.current = false // reset the flag after skipping
      return
    }

    if (!value) {
      setSelectedDate(undefined)
      setSelectedRange(undefined)
      setInputValue('')
      return
    }

    if (value) {
      if (mode === 'single') {
        let dateValue: Date

        if (typeof value === 'string') {

          if (value.includes('/')) {
            dateValue = parse(value, 'dd/MM/yyyy', new Date())
          } else {

            dateValue = new Date(value)
          }

          if (isValid(dateValue)) {
            setSelectedDate(dateValue)
            setInputValue(format(dateValue, 'dd/MM/yyyy'))
            setSelectedRange({ from: dateValue, to: undefined })
          }
        } else if (value instanceof Date && isValid(value)) {
          dateValue = value
          setSelectedDate(dateValue)
          setInputValue(format(dateValue, 'dd/MM/yyyy'))
          setSelectedRange({ from: dateValue, to: undefined })
        }
      } else if (mode === 'range' && typeof value === 'string' && value.includes('-')) {
        // Handle range value from form
        const [fromStr, toStr] = value.split('-').map(d => d.trim())
        const fromDate = parse(fromStr, 'dd/MM/yyyy', new Date())
        const toDate = parse(toStr, 'dd/MM/yyyy', new Date())

        if (isValid(fromDate) && isValid(toDate)) {
          setSelectedRange({ from: fromDate, to: toDate })
          setMonth(fromDate)
          setInputValue(`${format(fromDate, 'dd/MM/yyyy')} - ${format(toDate, 'dd/MM/yyyy')}`)
        }
      }
    }
  }, [value, mode])


  const handleDayPickerSelect = (range: DateRange | undefined) => {
    setInputError(undefined)

    if (mode === 'range') {
      const rangeValue = range as DateRange | undefined
      setSelectedRange(rangeValue)

      if (!rangeValue || (!rangeValue.from && !rangeValue.to)) {
        setInputValue('')
      } else if (rangeValue.from && rangeValue.to) {
        setMonth(rangeValue.from)
        setInputValue(`${format(rangeValue.from, 'dd/MM/yyyy')} - ${format(rangeValue.to, 'dd/MM/yyyy')}`)
      }
    }
    if (mode === 'single') {
      const dateValue = range as Date | undefined
// debugger
      if (dateValue) {
        setSelectedDate(dateValue)
        setInputValue(format(dateValue, 'dd/MM/yyyy'))
        setSelectedRange({ from: dateValue, to: undefined })
        setMonth(dateValue)

        if (onChange) {

          onChange(format(dateValue, 'dd/MM/yyyy'))

        }
      } else {
        setSelectedDate(undefined)
        setSelectedRange(undefined)
        setInputValue('')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[0-9/\- ]*$/
    if (!regex.test(value)) return

    isUserTypingRef.current = true

    setInputError(undefined)
    setInputValue(e.target.value) // keep the input value in sync

    if (onChange) {
      onChange(e.target.value)
    }

    if (e.target.value.includes('-')) {
      const [fromStr, toStr] = e.target.value.split('-').map(d => d.trim())

      const fromDate = parse(fromStr, 'dd/MM/yyyy', new Date())
      const toDate = parse(toStr, 'dd/MM/yyyy', new Date())

      if (isValid(fromDate) && isValid(toDate)) {
        if (toDate < fromDate) {
          setInputError('End date must be after start date')
          setSelectedRange(undefined)
        } else {
          setSelectedRange({ from: fromDate, to: toDate })
          setMonth(fromDate)
        }
      } else {
        setInputError('Invalid date format. Use dd/MM/yyyy')
        setSelectedRange(undefined)
      }
    } else {
      // Single date input
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date())

      if (isValid(parsedDate)) {
        setSelectedRange({ from: parsedDate, to: undefined })
        setMonth(parsedDate)
      } else {
        setInputError('Invalid date format. Use dd/MM/yyyy')
        setSelectedRange(undefined)
      }
    }
  }

  const handleInputClick = () => {
    setIsCalendarOpen(true)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isCalendarOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false)

        if (onBlur) {
          onBlur()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCalendarOpen])

  const fromDate = selectedRange?.from ? format(selectedRange.from, 'yyyy-MM-dd') : null
  const toDate = selectedRange?.to ? format(selectedRange.to, 'yyyy-MM-dd') : null
  const isSameDay = fromDate && toDate && fromDate === toDate
  const displayError = error || inputError

  return (
    <div style={{ position: 'relative' }}>

      <div className="rdp-wrapper">
        <div style={{
          position: 'relative', height: 'fit-content',
        }}>
          {label && <label style={{ color: 'var(--light-900)', fontSize: '14px', lineHeight: '171%' }}
                           className={s['label-text']}>{label}
            {required &&
              <span style={{ marginLeft: '4px', color: 'var(--danger-300)' }} className={s.required}>*</span>}</label>}
          <input
            ref={inputRef}
            autoComplete={'off'}
            className={`datepicker-input ${displayError ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
            type="text"
            width={'1000px'}
            style={{ width: width }}
            value={inputValue}
            placeholder={mode === 'range' ? 'dd/MM/yyyy - dd/MM/yyyy' : 'dd/MM/yyyy'}
            onChange={selectOnly ? () => {
            } : handleInputChange}
            onClick={handleInputClick}
            disabled={disabled}
          />
          <Image
            src={isCalendarOpen ? '/calendar.svg' : '/calendar-outline.svg'}
            alt="calendar"
            width={20}
            height={20}
            className={`custom-calendar-icon ${displayError ? 'calendar-error' : ''}`}
          />
        </div>
        {displayError && (
          <div className="input-error-message">
            {error?.includes('too_young') ? <p>
              A user under 13 cannot create a profile.{' '}
              <a href="/auth/privacy-policy" className={s.link} style={{ color: 'var(--danger-500)' }}>Privacy Policy</a>
            </p> : displayError}
          </div>
        )}
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            style={{
              position: 'absolute',
              zIndex: 10,
            }}
            className={`datepicker-container ${isCalendarOpen ? 'open' : 'closed'} ${s['my-custom-datepicker']}`}
          >
            <DayPicker
              month={month}
              // animate
              // required={undefined}
              locale={enGB}
              onMonthChange={setMonth}
              mode={mode as never}
              fixedWeeks
              selected={mode === 'single' ? selectedDate : selectedRange}
              onSelect={handleDayPickerSelect}
              modifiers={modifiers}
              showOutsideDays
              modifiersClassNames={{
                weekend: 'rdp-day_weekend', // Apply the class to weekends
                ...(mode === 'range' && {
                  range_start: isSameDay ? 'same-range' : 'range-start-full',
                  range_end: isSameDay ? 'same-range' : 'range-end-full',
                }),
              }}
              components={{
                Nav: DatePickerCustomNav,
              }}
              classNames={{
                root: 'rdp',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}


