'use client'
import React, { useEffect } from 'react'
import s from '@/app/auth/forgot-password/forgot-password.module.scss'
import { Header } from '@/shared/ui/Header/Header'
import Input from '@/shared/ui/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import { redirect, useSearchParams } from 'next/navigation'
import { useCheckRecoveryCodeMutation, useCreateNewPasswordMutation } from '@/app/auth/api/authApi'
import { useRouter } from 'next/navigation'

type createPasswordArgs = {
  password1: string
  password2: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<createPasswordArgs>({
    mode: 'onChange',
    defaultValues: { password1: '', password2: '' },
  })

  const router = useRouter()

  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()
  const [createNewPassword] = useCreateNewPasswordMutation()

  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    if (code) {
      checkRecoveryCode(code).unwrap().catch(() => {
        redirect('/auth/recovery-resending?email=' + email)
      })
    } else {
      redirect('/auth/sign-in')
    }
  }, [])

  const onSubmit: SubmitHandler<createPasswordArgs> = async (data) => {
    if (code) {
      try {
        await createNewPassword({ newPassword: data.password1, recoveryCode: code }).unwrap()
        router.push('/auth/sign-in')
      } catch (error) {
        const apiError = (error as {
          data?: {
            statusCode: number;
            messages: Array<{ message: string; field: string }>;
            error: string;
          }
        }).data
        reset()
        setError('password1', {
          type: 'manual',
          message: apiError?.messages[0].message,
        })
      }
    }
    else {
      redirect('/auth/sign-in')
    }
  }

  //todo fix images issues
  //todo fix load content before initialize
  //todo add ssr for 2 todo

  return (
    <div>
      <Header isLoggedIn={true} />
      <form className={s.block} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s.title}>Create New Password</h1>
        <Input label={'New password'} type={'password'}
               icon={<Image src="/eye-off-outline.svg" alt={'eye'} width={20} height={20} />}
               toggleIcon={<Image src="/eye-outline.svg" alt={'eye'} width={20} height={20} />}
               iconPosition="end" placeholder={'Password'} width={'100%'}
               error={errors.password1?.message} {...register('password1', {
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
            value: /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-.,])[A-Za-z\d!@#$%^&*()_+\-.,]{6,20}$/,
            message: 'Must contain: 1 uppercase letter, Latin characters, numbers, or special symbols',
          },
        })} />
        <Input label={'Password confirmation'} type={'password'} className={s.input}
               icon={<Image src="/eye-off-outline.svg" alt={'eye'} width={20} height={20} />}
               toggleIcon={<Image src="/eye-outline.svg" alt={'eye'} width={20} height={20} />}
               iconPosition="end" placeholder={'Password'} width={'100%'}
               error={errors.password2?.message} {...register('password2', {
          required: 'Password is required',
          validate: (value) =>
            value === watch('password1') || 'Passwords must match',
        })} />
        <p className={s.label + ' ' + s.password}>Your password must be between 6 and 20 characters</p>
        <Button title={'Create new password'} width={'100%'} className={s.button + ' ' + s.password} type={'submit'}
                disabled={!isValid || !isDirty} />
      </form>
    </div>
  )
}