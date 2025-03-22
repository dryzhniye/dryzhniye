'use client'

import React, { useState } from 'react';
import { DayPicker, useNavigation } from 'react-day-picker';
import { format, addMonths, isWeekend, isSameDay } from 'date-fns';
import 'react-day-picker/dist/style.css';

// Custom navigation buttons
const CustomNavButton = ({ onClick, next = false }) => (
  <button
    onClick={onClick}
    className={`h-6 w-6 flex items-center justify-center rounded-full bg-gray-700 text-white focus:outline-none`}
  >
    {next ? '›' : '‹'}
  </button>
);

const DatePickerInput = ({
                           value,
                           onClick,
                           placeholder = "Select date",
                           isRange = false,
                           state = "default" // default, active, error, hover, focus, disabled
                         }) => {
  // Map states to appropriate styles
  const stateStyles = {
    default: "border-gray-600",
    active: "border-blue-500",
    error: "border-red-500",
    hover: "border-gray-400",
    focus: "border-blue-500",
    disabled: "border-gray-600 bg-gray-800 opacity-50"
  };

  const iconColor = state === "error" ? "text-red-500" : "text-white";

  return (
    <div className="mb-2">
      <div className="text-xs text-gray-300 mb-1">Date{isRange ? " range" : ""}</div>
      <div
        className={`px-3 py-2 flex justify-between items-center border rounded ${stateStyles[state]} bg-gray-800 text-white cursor-pointer`}
        onClick={state !== "disabled" ? onClick : undefined}
      >
        <span>{value || placeholder}</span>
        <span className={`${iconColor}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H5V9H4V7Z" fill="currentColor"/>
            <path d="M6 7H7V9H6V7Z" fill="currentColor"/>
            <path d="M9 7H10V9H9V7Z" fill="currentColor"/>
            <path d="M11 7H12V9H11V7Z" fill="currentColor"/>
            <path d="M4 10H5V12H4V10Z" fill="currentColor"/>
            <path d="M6 10H7V12H6V10Z" fill="currentColor"/>
            <path d="M9 10H10V12H9V10Z" fill="currentColor"/>
            <path d="M11 10H12V12H11V10Z" fill="currentColor"/>
            <path d="M13 3H12V1H10V3H6V1H4V3H3C1.89 3 1 3.9 1 5V13C1 14.1 1.89 15 3 15H13C14.1 15 15 14.1 15 13V5C15 3.9 14.1 3 13 3ZM13 13H3V6H13V13Z" fill="currentColor"/>
          </svg>
        </span>
      </div>
      {state === "error" && <div className="text-xs text-red-500 mt-1">Error: Invalid date</div>}
    </div>
  );
};

const CustomDayPicker = () => {
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const [isCalendarOpenSingle, setIsCalendarOpenSingle] = useState(false);
  const [isCalendarOpenRange, setIsCalendarOpenRange] = useState(false);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'dd/MM/yyyy');
  };

  // Format date range for display
  const formatDateRange = (range) => {
    if (!range.from) return '';
    if (!range.to) return formatDate(range.from);
    return `${formatDate(range.from)} - ${formatDate(range.to)}`;
  };

  // Custom modifiers for styling days
  const modifiers = {
    weekend: (date) => isWeekend(date),
    today: (date) => isSameDay(date, new Date()),
  };

  // Custom modifier styles
  const modifiersStyles = {
    weekend: { color: '#E53E3E' },  // Red color for weekend days
    selected: {
      backgroundColor: '#3B82F6',   // Blue background for selected day
      color: 'white',
      borderRadius: '50%'
    },
    today: {
      fontWeight: 'bold',
      border: '1px solid #3B82F6'   // Blue border for today
    },
    range_start: {
      backgroundColor: '#3B82F6',
      color: 'white',
      borderRadius: '50%'
    },
    range_middle: {
      backgroundColor: 'rgba(59, 130, 246, 0.2)'
    },
    range_end: {
      backgroundColor: '#3B82F6',
      color: 'white',
      borderRadius: '50%'
    }
  };

  // Styles for the calendar
  const styles = {
    root: { backgroundColor: '#1F2937' },
    caption: { color: 'white' },
    caption_label: { fontWeight: 'bold', fontSize: '1rem' },
    cell: { padding: '0.25rem' },
    day: {
      width: '2rem',
      height: '2rem',
      margin: '0 auto',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    day_today: modifiersStyles.today,
    day_selected: modifiersStyles.selected,
    day_outside: { color: '#6B7280' },  // Gray color for days outside month
    head_cell: {
      color: '#9CA3AF',
      fontSize: '0.75rem',
      padding: '0.5rem 0'
    },
    table: { width: '100%' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    nav_button: { color: 'white' }
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1 className="text-xl mb-4">Date Picker</h1>

      <div className="grid grid-cols-6 gap-4">
        {/* Single Date Picker - All States */}
        <div>
          <h2 className="mb-2">Default</h2>
          <DatePickerInput
            value={formatDate(selectedSingle)}
            onClick={() => setIsCalendarOpenSingle(!isCalendarOpenSingle)}
            state="default"
          />
        </div>

        <div>
          <h2 className="mb-2">Active</h2>
          <DatePickerInput
            value={formatDate(selectedSingle)}
            onClick={() => {}}
            state="active"
          />

          {/* Calendar for single date selection */}
          <div className="relative">
            <div className="absolute z-10 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg w-64">
              <DayPicker
                mode="single"
                selected={selectedSingle}
                onSelect={(date) => {
                  setSelectedSingle(date);
                  setIsCalendarOpenSingle(false);
                }}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                styles={styles}
                showOutsideDays
                components={{
                  IconLeft: ({ ...props }) => <CustomNavButton {...props} />,
                  IconRight: ({ ...props }) => <CustomNavButton {...props} next />
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2">Error</h2>
          <DatePickerInput
            value={formatDate(selectedSingle)}
            onClick={() => {}}
            state="error"
          />
        </div>

        <div>
          <h2 className="mb-2">Hover</h2>
          <DatePickerInput
            value={formatDate(selectedSingle)}
            onClick={() => {}}
            state="hover"
          />
        </div>

        <div>
          <h2 className="mb-2">Focus</h2>
          <DatePickerInput
            value={formatDate(selectedSingle)}
            onClick={() => {}}
            state="focus"
          />
        </div>

        <div>
          <h2 className="mb-2">Disabled</h2>
          <DatePickerInput
            value={formatDate(selectedSingle)}
            onClick={() => {}}
            state="disabled"
          />
        </div>

        {/* Range Date Picker - All States */}
        <div>
          <DatePickerInput
            value={formatDateRange(selectedRange)}
            onClick={() => setIsCalendarOpenRange(!isCalendarOpenRange)}
            isRange={true}
            state="default"
          />
        </div>

        <div>
          <DatePickerInput
            value={formatDateRange(selectedRange)}
            onClick={() => {}}
            isRange={true}
            state="active"
          />

          {/* Calendar for range selection */}
          <div className="relative">
            <div className="absolute z-10 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg w-64">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={(range) => {
                  setSelectedRange(range || { from: null, to: null });
                  if (range?.to) {
                    setIsCalendarOpenRange(false);
                  }
                }}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                styles={styles}
                showOutsideDays
                components={{
                  IconLeft: ({ ...props }) => <CustomNavButton {...props} />,
                  IconRight: ({ ...props }) => <CustomNavButton {...props} next />
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <DatePickerInput
            value={formatDateRange(selectedRange)}
            onClick={() => {}}
            isRange={true}
            state="error"
          />
        </div>

        <div>
          <DatePickerInput
            value={formatDateRange(selectedRange)}
            onClick={() => {}}
            isRange={true}
            state="hover"
          />
        </div>

        <div>
          <DatePickerInput
            value={formatDateRange(selectedRange)}
            onClick={() => {}}
            isRange={true}
            state="focus"
          />
        </div>

        <div>
          <DatePickerInput
            value={formatDateRange(selectedRange)}
            onClick={() => {}}
            isRange={true}
            state="disabled"
          />
        </div>
      </div>

      {/* Day Customization Display */}
      <div className="mt-8">
        <h2 className="text-lg mb-4">Day Styling</h2>
        <div className="grid grid-cols-7 gap-4 mb-4 text-center border border-gray-700 p-4 rounded">
          <div>State</div>
          <div>Default</div>
          <div>Selected</div>
          <div>Start</div>
          <div>End</div>
          <div>Middle</div>
          <div>Hover</div>

          <div className="text-left">Weekday</div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 bg-opacity-20 text-white">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 bg-opacity-10 text-white">5</div>
          </div>

          <div className="text-left">Weekend</div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full text-red-500">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 bg-opacity-20 text-red-500">5</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 bg-opacity-10 text-red-500">5</div>
          </div>
        </div>
      </div>

      {/* Range Examples */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div>
          <h3 className="mb-2">Range</h3>
          <DayPicker
            mode="range"
            defaultMonth={new Date(2023, 10)}
            selected={{
              from: new Date(2023, 10, 7),
              to: new Date(2023, 10, 14)
            }}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            styles={styles}
            showOutsideDays
            components={{
              IconLeft: ({ ...props }) => <CustomNavButton {...props} />,
              IconRight: ({ ...props }) => <CustomNavButton {...props} next />
            }}
          />
        </div>

        <div>
          <h3 className="mb-2">Selected Day</h3>
          <DayPicker
            mode="single"
            defaultMonth={new Date(2023, 10)}
            selected={new Date(2023, 10, 10)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            styles={styles}
            showOutsideDays
            components={{
              IconLeft: ({ ...props }) => <CustomNavButton {...props} />,
              IconRight: ({ ...props }) => <CustomNavButton {...props} next />
            }}
          />
        </div>

        <div>
          <h3 className="mb-2">Not Selected</h3>
          <DayPicker
            mode="single"
            defaultMonth={new Date(2023, 10)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            styles={styles}
            showOutsideDays
            components={{
              IconLeft: ({ ...props }) => <CustomNavButton {...props} />,
              IconRight: ({ ...props }) => <CustomNavButton {...props} next />
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomDayPicker;