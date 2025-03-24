'use client'

import React, { useEffect, useRef, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { DateRange, DayPicker } from 'react-day-picker'
import { enGB } from 'date-fns/locale'
import { CalendarRange } from 'lucide-react'
import 'react-day-picker/style.css'
import './DatePicker.scss'
import s from './DatePickerCustomNav.module.scss'

import { DatePickerCustomNav } from '@/shared/ui/DatePicker/DatePickerCustomNav'

/** Render an input field bound to a DayPicker calendar with range selection. */
export function DatePickerInput() {
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date())

  // Hold the selected date range in state
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)

  // Hold the input value in state
  const [inputValue, setInputValue] = useState('')

  // State to control datepicker visibility
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  console.log(month)
  console.log(selectedRange)
//create right local weekdays order started from monday
  const modifiers = {
    weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Sunday (0) & Saturday (6)
  }

  /**
   * Function to handle the DayPicker select event: update the input value and
   * the selected date range, and set the month.
   */
  const handleDayPickerSelect = (range: DateRange | undefined) => {
    setSelectedRange(range)

    if (!range || (!range.from && !range.to)) {
      setInputValue('')
    } else if (range.from && !range.to) {
      // Only from date selected
      setMonth(range.from)
      setInputValue(format(range.from, 'MM/dd/yyyy'))
    } else if (range.from && range.to) {
      // Both from and to dates selected
      setMonth(range.from)
      setInputValue(`${format(range.from, 'MM/dd/yyyy')} - ${format(range.to, 'MM/dd/yyyy')}`)
    }
  }

  /**
   * Handle the input change event: parse the input value to a date range, update the
   * selected range and set the month.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // keep the input value in sync

    // Check if the input contains a date range (separated by "-")
    if (e.target.value.includes('-')) {
      const [fromStr, toStr] = e.target.value.split('-').map(d => d.trim())

      const fromDate = parse(fromStr, 'MM/dd/yyyy', new Date())
      const toDate = parse(toStr, 'MM/dd/yyyy', new Date())

      if (isValid(fromDate) && isValid(toDate)) {
        setSelectedRange({ from: fromDate, to: toDate })
        setMonth(fromDate)
      } else {
        setSelectedRange(undefined)
      }
    } else {
      // Single date input
      const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date())

      if (isValid(parsedDate)) {
        setSelectedRange({ from: parsedDate, to: undefined })
        setMonth(parsedDate)
      } else {
        setSelectedRange(undefined)
      }
    }
  }

  // Handle input focus/click to open the calendar
  const handleInputClick = () => {
    setIsCalendarOpen(true)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If calendar is open and the click is outside calendar and outside input
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

  return (
    <div style={{ position: 'relative' }}>

      <div className="rdp-wrapper">
        <div style={{
          position: 'relative',  width: 'fit-content', height: 'fit-content', }}>
        <input
          ref={inputRef}
          autoComplete={'off'}
          className={'datepicker-input'}
          style={{
            fontSize: 'inherit',
            padding: '6px 12px',
            width: '340px',
            height: '36px',
            color: '#fff',
          }}
          // id={inputId}
          type="text"
          value={inputValue}
          placeholder="MM/dd/yyyy - MM/dd/yyyy"
          onChange={handleInputChange}
          onClick={handleInputClick}
        />

          <CalendarRange
            style={{
              position: 'absolute',
              right: '12px',
              top: '8px',
              color: 'white',
              pointerEvents: 'none',
            }}
            size={20}
            onClick={() => setIsCalendarOpen(!isCalendarOpen)} // Toggle calendar on icon click
          />
        </div>
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
              locale={enGB}
              onMonthChange={setMonth}
              mode="range"
              fixedWeeks
              selected={selectedRange}
              onSelect={handleDayPickerSelect}
              modifiers={modifiers}
              showOutsideDays
              modifiersClassNames={{
                weekend: 'rdp-day_weekend', // Apply the class to weekends
                range_start: isSameDay ? 'same-range' : 'range-start-full',
                range_end: isSameDay ? 'same-range' : 'range-end-full',
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


