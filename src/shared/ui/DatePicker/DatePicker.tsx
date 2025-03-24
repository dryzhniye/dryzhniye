'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { DateRange, DayPicker } from 'react-day-picker'
import { enGB } from 'date-fns/locale'
import 'react-day-picker/style.css'
import './DatePicker.scss'
import './custom.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Render an input field bound to a DayPicker calendar with range selection. */
export function Inputt() {
  const inputId = useId()
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date())

  // Hold the selected date range in state
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)
  console.log(selectedRange)
  // Hold the input value in state
  const [inputValue, setInputValue] = useState('')
  console.log(inputValue)
  // State to control datepicker visibility
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Custom modifiers for styling specific days
  // const modifiers = {
  //   today: (date: Date) => isSameDay(date, new Date()),
  // };

  const modifiers = {
    weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Sunday (0) & Saturday (6)
  }

  // Add CSS to the component for the cell size
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      .rdp {
        --rdp-cell-size: auto;
      }
    `

    // Append to document head
    document.head.appendChild(styleElement)

    // Clean up
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

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

      // Removed the automatic calendar closing code that was here:
      // setIsCalendarOpen(false);
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

  return (
    <div style={{ position: 'relative' }}>

      <div className="rdp-wrapper">
        {/*<label htmlFor={inputId}>*/}
        {/*  <strong>Date Range:</strong>*/}
        {/*</label>*/}
        <input
          ref={inputRef}
          style={{
            fontSize: 'inherit',
            padding: '0.25em 0.5em',
            width: '240px',
          }}
          id={inputId}
          type="text"
          value={inputValue}
          placeholder="MM/dd/yyyy - MM/dd/yyyy"
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            style={{
              position: 'absolute',
              zIndex: 10,
            }}
            className={`datepicker-container ${isCalendarOpen ? 'open' : 'closed'} my-custom-datepicker`}
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
                range_start: selectedRange?.to ? 'range-start-corners' : 'range-start-full',
              }}
              // modifiersStyles={modifiersStyles}
              styles={{
                nav_button: { color: 'red', fontSize: '20px' }, // Style for both buttons
                nav_button_previous: { marginRight: '10px' }, // Space before next button
                nav_button_next: { marginLeft: '10px' },
              }}
              components={{
                Nav: CustomNav,
              }}
              classNames={{
                root: 'rdp',
                // day: "rdp-day",
                // day_today: "rdp-today",
                // day_range_start: "rdp-range-start",
                // day_range_middle: "rdp-day_range_middle",
                // day_range_end: "rdp-day_range_end",
                // day_selected: "rdp-day_selected",
              }}
            />

          </div>
        )}
      </div>
    </div>
  )
}


function CustomNav(props: {
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  previousMonth?: Date;
  nextMonth?: Date;
}) {
  return (
    <div className="custom-nav">
      <button
        type="button"
        onClick={props.onPreviousClick}
        disabled={!props.previousMonth}
        className="custom-nav-button"
        aria-label="Previous month"
      >
        <ChevronLeft style={{ width: '20px', height: '20px', color: 'white' }} />
      </button>
      <button
        type="button"
        onClick={props.onNextClick}
        disabled={!props.nextMonth}
        className="custom-nav-button"
        aria-label="Next month"
      >
        <ChevronRight style={{ width: '20px', height: '20px', color: 'white' }} />
      </button>
    </div>
  )
}