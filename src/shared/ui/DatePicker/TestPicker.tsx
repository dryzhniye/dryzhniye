'use client'

// import './DatePickerCustomNav.module.scss'
import { DayPicker } from 'react-day-picker'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Custom icon components without Tailwind
function LeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="custom-icon"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function RightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="custom-icon"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// Custom navigation button
function NavigationButton(props: {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      className={`custom-nav-button ${props.className ?? ""}`}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
    >
      {props["aria-label"]?.includes("previous") ? (
        <ChevronLeft style={{ width: "20px", height: "20px" }} />
      ) : (
        <ChevronRight style={{ width: "20px", height: "20px" }} />
      )}
    </button>
  );
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
        <ChevronLeft style={{ width: "20px", height: "20px" }} />
      </button>
      <button
        type="button"
        onClick={props.onNextClick}
        disabled={!props.nextMonth}
        className="custom-nav-button"
        aria-label="Next month"
      >
        <ChevronRight style={{ width: "20px", height: "20px" }} />
      </button>
    </div>
  );
}
export function TestPicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="my-custom-datepicker">
      <DayPicker
        animate
        showOutsideDays
        mode="single"
        selected={selected}
        onSelect={setSelected}
        components={{
          Nav: CustomNav
        }}
        footer={
          selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
        }
      />
    </div>
  );
}