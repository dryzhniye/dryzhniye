import React from 'react'
import s from '@/app/auth/forgot-password/forgot-password.module.scss'
import { Header } from '@/shared/ui/Header/Header'

export default function Page() {
  return (
    <div>
      <Header isLoggedIn={true} title="Inctagram" />
      <div className={s.block}>
        recovery
      </div>
    </div>
  )
}