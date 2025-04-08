'use client'
import React, { useEffect, useState } from 'react'
import s from '@/app/auth/forgot-password/forgot-password.module.scss'
import Input from '@/shared/ui/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/Button/Button'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useCheckRecoveryCodeMutation, useCreateNewPasswordMutation } from '@/lib/api/authApi'
import { RecoverySkeleton } from '@/app/auth/recovery/RecoverySkeleton'
import { PATH } from '@/shared/const/PATH'

type createPasswordArgs = {
  password1: string
  password2: string
}

function Recovery() {
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

  const [isInitialized, setIsInitialized] = useState(false)

  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()
  const [createNewPassword] = useCreateNewPasswordMutation()

  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    if (!code) {
      router.push(PATH.AUTH.LOGIN)
    } else {
      checkRecoveryCode(code)
        .unwrap()
        .then(() => {
          setIsInitialized(true)
        })
        .catch(() => {
          router.push(PATH.AUTH.RECOVERY_RESENDING + '?email=' + email)
        })
    }
  }, [code, checkRecoveryCode, router, email])

  if (!isInitialized) return <RecoverySkeleton />

  const onSubmit: SubmitHandler<createPasswordArgs> = async data => {
    if (code) {
      try {
        await createNewPassword({ newPassword: data.password1, recoveryCode: code }).unwrap()
        router.push(PATH.AUTH.LOGIN)
      } catch (error) {
        const apiError = (
          error as {
            data?: {
              statusCode: number
              messages: Array<{ message: string; field: string }>
              error: string
            }
          }
        ).data
        reset()
        setError('password1', {
          type: 'manual',
          message: apiError?.messages[0].message,
        })
      }
    } else {
      redirect(PATH.AUTH.LOGIN)
    }
  }

  return (
    <div>
      <form className={s.block} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s.title}>Create New Password</h1>
        <Input
          label={'New password'}
          type={'password'}
          iconPosition="end"
          placeholder={'Password'}
          width={'100%'}
          error={errors.password1?.message}
          {...register('password1', {
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
        <Input
          label={'Password confirmation'}
          type={'password'}
          className={s.input}
          iconPosition="end"
          placeholder={'Password'}
          width={'100%'}
          error={errors.password2?.message}
          {...register('password2', {
            required: 'Password is required',
            validate: value => value === watch('password1') || 'Passwords must match',
          })}
        />
        <p className={s.label + ' ' + s.password}>
          Your password must be between 6 and 20 characters
        </p>
        <Button
          title={'Create new password'}
          width={'100%'}
          className={s.button + ' ' + s.password}
          type={'submit'}
          disabled={!isValid || !isDirty}
        />
      </form>
    </div>
  )
}
export default Recovery
