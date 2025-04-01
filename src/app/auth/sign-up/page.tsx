'use client'

import { Header } from '@/shared/ui/Header/Header'
import s from './signUp.module.scss'
import Input from '@/shared/ui/Input/Input'
import { CheckBox } from '@/shared/ui/CheckBox/CheckBox'
import { Button } from '@/shared/ui/Button/Button'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useRegistrationMutation } from '@/app/auth/api/authApi'

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
    control,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: { email: '', password: '', rememberMe: false, firstName: '' },
  })

  const [registration] = useRegistrationMutation()

  const onSubmit: SubmitHandler<Input> = async data => {
    try {
      await registration({
        email: data.email,
        password: data.password,
        userName: data.firstName,
      }).unwrap()
      console.log('успешно')
    } catch (error) {
      console.log(error)
    }
  }

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
            required: 'FirstName is required',
            minLength: { value: 6, message: 'Минимум 6 символа' },
            maxLength: { value: 20, message: 'Максимум 20 символов' },
            pattern: { value: /^[A-Za-zА-Яа-я]+$/, message: 'Только буквы' },
          })}
        />
        <Input
          label={'Email'}
          placeholder={'email'}
          width={'330px'}
          error={errors.email?.message}
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
          type={'password'}
          placeholder={'Password'}
          error={errors.password?.message}
          width={'330px'}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Min 6 characters',
            },
            maxLength: {
              value: 20,
              message: 'Max 20 characters',
            },
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-.,])[A-Za-z\d!@#$%^&*()_+\-.,]{6,20}$/,
              message:
                'Must contain: 1 uppercase letter, Latin characters, numbers, or special symbols',
            },
          })}
        />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Controller
            name={'rememberMe'}
            control={control}
            render={({ field: { value, ...rest } }) => <CheckBox {...rest} checked={value} />}
          />
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
