'use client'

import './custom.css'
import { DayPicker, useDayPicker } from 'react-day-picker'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Custom navigation components
function CustomNavButton(props: { onClick?: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      className="custom-nav-button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

function NavigationPrevious(props: { onClick?: () => void; disabled?: boolean }) {
  return (
    <CustomNavButton onClick={props.onClick} disabled={props.disabled}>
      <ChevronLeft className="w-5 h-5" />
    </CustomNavButton>
  );
}

function NavigationNext(props: { onClick?: () => void; disabled?: boolean }) {
  return (
    <CustomNavButton onClick={props.onClick} disabled={props.disabled}>
      <ChevronRight className="w-5 h-5" />
    </CustomNavButton>
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
          // IconLeft: () => null, // Optional: Hide default icons
          // IconRight: () => null, // Optional: Hide default icons
          // NavButton: CustomNavButton,
          // PrevButton: NavigationPrevious,
          // NextButton: NavigationNext
        }}
        footer={
          selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
        }
      />
    </div>
  );
}