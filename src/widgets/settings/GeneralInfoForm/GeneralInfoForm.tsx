import React from 'react'
import Input from '@/shared/ui/Input/Input'
import { DatePicker } from '../../../shared/ui/base/DatePicker'
import { Select } from '@/shared/ui/Select/Select'
import TextArea from '@/shared/ui/TextArea/TextArea'
import s from './GeneralInfoForm.module.scss'

export const GeneralInfoForm = () => {


  return (

    <div className={s.profileForm}>
      <form className={s.block} onSubmit={() => {
      }}>
        <Input
          label={'Username'}
          placeholder={'Your nickname'}
          width={'100%'}
          required
        />
        <Input
          label={'First Name'}
          placeholder={'Your name'}
          width={'100%'}
          required
        />
        <Input
          label={'Last Name'}
          placeholder={'Your surname'}
          width={'100%'}
          required
        />

        <DatePicker mode={'single'} width={'100%'} label={'Date of birth'}/>
        <div className={s.formRow}>
          <Select placeholder={'Country'} label={'Select your country'} width={'25px'} options={['haahah', 'dddddd']} onChange={() => {
          }} />
          <Select placeholder={'City'} label={"Select your city"} width={'100%'} options={['haahah', 'dddddd']} onChange={() => {
          }} />
        </div>

        <TextArea placeholder={'Type something about you...'} label={'About me'} width={'100%'} height={'84px'} onChange={() => {
        }} />

      </form>

    </div>
  )
}