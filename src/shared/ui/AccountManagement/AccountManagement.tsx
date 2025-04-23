import React, { useState } from 'react'
import s from './AccountManagement.module.scss'
import { RadioGroupWind } from '@/shared/ui/RadioGroupWind/RadioGroupWind'
import Image from 'next/image'

export const AccountManagement = () => {
  const accountTypes = [{ value: '1', label: 'Personal' }, { value: '2', label: 'Business' }]
  const costs = [{ value: '1', label: '$10 per 1 Day' }, { value: '2', label: '$50 per 7 Day' }, {
    value: '3',
    label: '$100 per month',
  }]
  const [selectedType, setSelectedType] = useState('1')
  const [selectedCost, setSelectedCost] = useState('1')

  return (
    <>
      <RadioGroupWind title={'Account type:'} onChange={setSelectedType} options={accountTypes}
                      selectedValue={selectedType} />
      {selectedType === '2' &&
        <RadioGroupWind title={'Your subscription costs:'} onChange={setSelectedCost} options={costs}
                        selectedValue={selectedCost} />}
      <div className={s.buttonsContainer}>
        <button className={s.button}>
          <Image src={'/paypal.svg'} alt={'PayPal'} width="72" height="48" />
        </button>
        <p>Or</p>
        <button className={s.button}>
          <Image src={'/stripe.svg'} alt={'stripe'} width="70" height="30" />
        </button>
      </div>
    </>
  )
}