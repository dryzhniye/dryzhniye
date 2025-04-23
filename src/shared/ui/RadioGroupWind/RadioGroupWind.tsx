import React from 'react'
import s from './RadioGroupWind.module.scss'
import { RadioGroup } from '@/shared/ui/base/RadioGroup/RadioGroup'

type Option = {
  value: string
  label: string
}

type Props = {
  options: Option[]
  title: string
  selectedValue: string
  onChange: (value: string) => void
}

export const RadioGroupWind = ({options, title, selectedValue, onChange}: Props) => {
  return (
    <div className={s.RadioGroupWind}>
      <p className={s.title}>{title}</p>
      <div className={s.radioGroupBox}>
        <RadioGroup options={options} selectedValue={selectedValue} onChange={onChange} isDirectionColumn={true}/>
      </div>
    </div>
  )
}