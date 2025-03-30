'use client'
import { Header } from '@/shared/ui/Header/Header'
import s from './forgot-password.module.scss'
import Input from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import Recaptcha from '@/shared/ui/Recaptcha/Recaptcha'

export default function ForgotPassword() {
  return (
    <div>
      <Header isLoggedIn={true} title="Inctagram" />
      <div className={s.block}>
        <h1 className={s.title}>Forgot Password</h1>
        <Input label={'Email'} placeholder={'Epam@epam.com'} />
        <Button title={'Send Link'} />
        <Button title={'Back to Sign In'} />
        <Recaptcha />
      </div>
    </div>
  )
}