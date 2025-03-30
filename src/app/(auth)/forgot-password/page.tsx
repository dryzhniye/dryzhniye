'use client'
import { Header } from '@/shared/ui/Header/Header'
import s from './forgot-password.module.scss'
import Input from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { Recaptcha } from '@/shared/ui/Recaptcha/Recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useResetPasswordMutation } from '@/app/(auth)/api/authApi'

type ResetPasswordArgs = {
  email: string
}

export default function ForgotPassword() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ResetPasswordArgs>({
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [resetPassword] = useResetPasswordMutation()

  const onSubmit: SubmitHandler<ResetPasswordArgs> = async (data) => {
    // Проверка капчи
    if (!captchaToken) {
      console.log('captcha token') //todo add error handler
      return
    }

    try {
      // Отправка запроса и автоматическое "разворачивание" ответа
      await resetPassword({
        email: data.email,
        recaptcha: captchaToken,
      }).unwrap()

      // Если запрос успешен (status 204)
      reset()
      alert('Инструкции по сбросу пароля отправлены на ваш email!')

    } catch (error) {
      if ('data' in error) {
        const apiError = error.data as {
          statusCode: number;
          messages: Array<{ message: string; field: string }>;
          error: string;
        }

        if (apiError.messages?.length > 0) {
          console.log('API Error:', apiError.messages[0].message)
        }
      }
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  return (
    <div>
      <Header isLoggedIn={true} title="Inctagram" />
      <form onSubmit={handleSubmit(onSubmit)} className={s.block}>
        <h1 className={s.title}>Forgot Password</h1>
        <Input label={'Email'} placeholder={'Epam@epam.com'} width={'100%'}
               error={errors.email?.message} {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Incorrect email address',
          },
        })} />
        <p className={s.label}>Enter your email address and we will send you further instructions</p>
        <Button title={'Send Link'} width={'100%'} />
        <Button title={'Back to Sign In'} variant={'link'} asChild={'a'} width={'100%'}
                className={s.button + ' ' + s.link} href={'/sign-in'} />
        <Recaptcha
          sitekey="6Lckav8qAAAAAIr3zUA1Z8DTqPe8ZQgbjU3khpAI"
          onChange={handleCaptchaChange}
          theme="dark"
        />
      </form>
    </div>
  )
}