'use client'

import { Header } from '@/shared/ui/Header/Header'
import s from '@/app/auth/registration-confirmation/registration-confirmation.module.scss'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Input from '@/shared/ui/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useResetEmailMutation } from '@/app/auth/api/authApi'

type Input = {
  email: string
}

const ResetEmailPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Input>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const [resetEmail] = useResetEmailMutation()

  const onSubmit: SubmitHandler<Input> = async data => {
    console.log(data)
    try {
      await resetEmail({ email: data.email }).unwrap()

      reset()

      console.log('успешный рэзет')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <Header isLoggedIn={true} />
      <div className={s.container}>
        <h1>Email verification link expired</h1>
        <p className={s.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <Input
            label={'Email'}
            placeholder={'email'}
            width={'230px'}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Incorrect email address',
              },
            })}
          />
          <Button
            title={'Resend verification link'}
            width={'230px'}
            disabled={!isValid}
            type="submit"
          />
        </form>
        <Image
          src={'/congratulations.png'}
          alt={''}
          width={432}
          height={300}
          style={{ marginTop: '72px' }}
        />
      </div>
    </div>
  )
}

export default ResetEmailPage
