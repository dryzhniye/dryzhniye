'use client'

import { Header } from '@/shared/ui/Header/Header'
import s from './signUp.module.scss'
import Input from '@/shared/ui/Input/Input'
import { CheckBox } from '@/shared/ui/CheckBox/CheckBox'
import { Button } from '@/shared/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'

type Input = {
  email: string
  password: string
  rememberMe: boolean
  firstName: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: { email: '', password: '', rememberMe: false, firstName: '' },
  })

  const onSubmit: SubmitHandler<Input> = data => {
    console.log(data)
  }

  console.log(errors.email)

  return (
    <div>
      <Header isLoggedIn={false} />
      <form className={s.block} onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'var(--light-100)', fontSize: '20px' }}>Sign Up</h1>

        <div className={s.autorizationIcon}>
          <a href="#">
            <img src="/google.svg" alt="" />
          </a>
          <a href="#">
            <img src="/github.svg" alt="" />
          </a>
        </div>

        <Input
          label={'Username'}
          placeholder={'Username'}
          width={'330px'}
          error={errors.firstName?.message}
          {...register('firstName', {
            required: 'Имя обязательно',
            minLength: { value: 2, message: 'Минимум 2 символа' },
            maxLength: { value: 20, message: 'Максимум 20 символов' },
            pattern: { value: /^[A-Za-zА-Яа-я]+$/, message: 'Только буквы' },
          })}
        />
        <Input
          label={'Email'}
          placeholder={'email'}
          width={'330px'}
          error={errors.firstName?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Incorrect email address',
            },
          })}
        />
        <Input
          label={'Password'}
          placeholder={'Password'}
          width={'330px'}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: { value: 8, message: 'Минимум 8 символов' },
            maxLength: { value: 32, message: 'Максимум 32 символа' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
              message: 'Должен содержать букву и цифру',
            },
          })}
        />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <CheckBox />
          <span style={{ color: 'var(--light-100)', fontSize: '12px' }}>
            I agree to the{' '}
            <a href={'#'} style={{ color: 'var(--accent-700)' }}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href={'#'} style={{ color: 'var(--accent-700)' }}>
              Privacy Policy
            </a>
          </span>
        </div>

        <Button title={'Sign Up'} fullWidth={true} type={'submit'} />

        <p style={{ color: 'var(--light-100)', fontSize: '16px' }}>Do you have an account?</p>

        <Button title={'Sign In'} variant={'link'} asChild={'a'} className={s.button} />
      </form>
    </div>
  )
}
