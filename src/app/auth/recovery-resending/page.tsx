import { Header } from '@/shared/ui/Header/Header'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import s from './recovery-resending.module.scss'

export default function recoveryResending() {
  return (
    <div>
      <Header isLoggedIn={true} />
      <div className={s.mainBlock}>
        <h1 className={s.title}>Email verification link expired</h1>
        <p className={s.label}>Looks like the verification link has expired. Not to worry, we can send the link again</p>
        <Button className={s.button} title={'Resend link'} width={'100%'} />
        <Image src={'/rafiki.svg'} alt={'rafiki'} width="473" height="353"/>
      </div>
    </div>
  )
}