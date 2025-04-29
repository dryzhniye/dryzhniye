'use client'
import React, { Suspense, useEffect, useState } from 'react'
import s from '@/app/auth/forgot-password/forgot-password.module.scss'
import Input from '@/shared/ui/base/Input/Input'
import { Button } from '@/shared/ui/base/Button/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCheckRecoveryCodeMutation } from '@/shared/api/authApi'
import { RecoverySkeleton } from '@/app/auth/recovery/RecoverySkeleton'
import { PATH } from '@/shared/lib/const/PATH'
import { usePasswordRecoveryForm } from '@/shared/lib/hooks/useRecoveryForm'

const RecoveryContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('code')
  const email = searchParams.get('email')
  const [isInitialized, setIsInitialized] = useState(false)
  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = usePasswordRecoveryForm(recoveryCode)

  useEffect(() => {
    const verifyRecoveryCode = async () => {
      if (!recoveryCode) {
        router.push(PATH.AUTH.LOGIN)
        return
      }

      try {
        await checkRecoveryCode(recoveryCode).unwrap()
        setIsInitialized(true)
      } catch {
        router.push(`${PATH.AUTH.RECOVERY_RESENDING}?email=${email}`)
      }
    }

    verifyRecoveryCode()
  }, [recoveryCode, email, router, checkRecoveryCode])

  if (!isInitialized) return <RecoverySkeleton />

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <h1 className={s.title}>Создание нового пароля</h1>

        <Input
          label="Новый пароль"
          type="password"
          placeholder="Введите новый пароль"
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <Input
          label="Подтверждение пароля"
          type="password"
          placeholder="Повторите пароль"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
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

function Recovery() {
  return (
    <Suspense fallback={<RecoverySkeleton />}>
      <RecoveryContent />
    </Suspense>
  )
}

export default Recovery