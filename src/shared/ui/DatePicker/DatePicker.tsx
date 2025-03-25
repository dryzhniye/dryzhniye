'use client'

import React, { useEffect, useRef, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { DateRange, DayPicker, type Mode } from 'react-day-picker'
import { enGB } from 'date-fns/locale'
import { DatePickerCustomNav } from '@/shared/ui/DatePicker/DatePickerCustomNav'
import Image from 'next/image'
import 'react-day-picker/style.css'
import './DatePicker.scss'
import s from './DatePickerCustomNav.module.scss'

type DatePickerMode = Exclude<Mode, 'multiple'>;

interface DatePickerInputProps {
  mode?: DatePickerMode;
  error?: string;
  disabled?: boolean;
}

export const DatePicker = ({mode= 'range', error, disabled=false}: DatePickerInputProps) => {
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [month, setMonth] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState<string | undefined>(error)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  console.log(selectedDate)
  console.log(selectedRange)
//create right local weekdays order started from monday
  const modifiers = {
    weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Sunday (0) & Saturday (6)
  }

  const handleDayPickerSelect = (range: DateRange | undefined) => {
    setInputError(undefined)
    debugger
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

      if (dateValue) {
        setSelectedDate(dateValue);
        setInputValue(format(dateValue, 'dd/MM/yyyy'))
        setSelectedRange({ from: dateValue, to: undefined })
        setMonth(dateValue)
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

    setInputError(undefined)
    setInputValue(e.target.value) // keep the input value in sync

    if (e.target.value.includes('-')) {
      const [fromStr, toStr] = e.target.value.split('-').map(d => d.trim())

      const fromDate = parse(fromStr, 'dd/MM/yyyy', new Date());
      const toDate = parse(toStr, 'dd/MM/yyyy', new Date());

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
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());

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
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCalendarOpen])

  const fromDate = selectedRange?.from ? format(selectedRange.from, 'yyyy-MM-dd') : null;
  const toDate = selectedRange?.to ? format(selectedRange.to, 'yyyy-MM-dd') : null;
  const isSameDay = fromDate && toDate && fromDate === toDate;
  const displayError = error || inputError;

  return (
    <div style={{ position: 'relative' }}>

      <div className="rdp-wrapper">
        <div style={{
          position: 'relative',  width: 'fit-content', height: 'fit-content', }}>
        <input
          ref={inputRef}
          autoComplete={'off'}
          className={`datepicker-input ${displayError ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
          type="text"
          value={inputValue}
          placeholder={mode === 'range' ? "dd/MM/yyyy - dd/MM/yyyy" : "dd/MM/yyyy"}
          onChange={handleInputChange}
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
            {displayError}
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
              mode={mode as any}
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


