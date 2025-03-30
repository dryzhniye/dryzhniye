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
        <Input label={'Email'} placeholder={'Epam@epam.com'} width={'100%'}/>
        <p className={s.label}>Enter your email address and we will send you further instructions </p>
        <Button title={'Send Link'} width={'100%'}/>
        <Button title={'Back to Sign In'} variant={'link'} asChild={'a'} width={'100%'} className={s.button + ' ' + s.link}/>
        <Recaptcha />
      </div>
    </div>
  )
}