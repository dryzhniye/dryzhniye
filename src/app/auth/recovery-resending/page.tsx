'use client'
import { Header } from '@/shared/ui/Header/Header'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import s from './recovery-resending.module.scss'
import { useSearchParams } from 'next/navigation'
import { useResendRecoveryCodeMutation } from '@/app/auth/api/authApi'

export default function RecoveryResending() {

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [resendRecoveryCode] = useResendRecoveryCodeMutation()

  const resendCodeHandler = () => {
    if (email) {
      resendRecoveryCode(email)
    }
  }

  return (
    <div>
      <Header isLoggedIn={true} />
      <div className={s.mainBlock}>
        <h1 className={s.title}>Email verification link expired</h1>
        <p className={s.label}>Looks like the verification link has expired. Not to worry, we can send the link
          again</p>
        <Button className={s.button} title={'Resend link'} width={'100%'} onClick={resendCodeHandler} />
        <Image src={'/rafiki.svg'} alt={'rafiki'} width="473" height="353" />
      </div>
    </div>
  )
}