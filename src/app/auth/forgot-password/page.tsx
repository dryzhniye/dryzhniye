'use client'
import s from './forgot-password.module.scss'
import Input from '@/shared/ui/base/Input/Input'
import { Button } from '@/shared/ui/base/Button/Button'
import { Recaptcha } from '@/shared/ui/base/Recaptcha/Recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useResetPasswordMutation } from '@/shared/api/authApi'
import { Modal } from '@/shared/ui/Modal/Modal'
import { PATH } from '@/shared/lib/const/PATH'

type ResetPasswordArgs = {
  email: string
}

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<ResetPasswordArgs>({
    mode: 'onChange',
    defaultValues: { email: '' },
  })

  const [isMailSent, setIsMailSent] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [resetPassword] = useResetPasswordMutation()

  const onSubmit: SubmitHandler<ResetPasswordArgs> = async data => {
    if (!captchaToken) {
      return
    }

    try {
      await resetPassword({
        email: data.email,
        recaptcha: captchaToken,
      }).unwrap()

      reset()

      setIsMailSent(true)

      setShowModal(data.email)
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

      setError('email', {
        type: 'manual',
        message: apiError?.messages[0].message,
      })
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.block}>
        <h1 className={s.title}>Forgot Password</h1>
        <Input
          label={'Email'}
          placeholder={'Epam@epam.com'}
          width={'100%'}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Incorrect email address',
            },
          })}
        />
        <p className={s.label}>
          Enter your email address and we will send you further instructions
        </p>
        {isMailSent && (
          <p className={s.paragraph}>
            The link has been sent by email. If you don’t receive an email send link again
          </p>
        )}
        <Button
          title={'Send Link'}
          width={'100%'}
          disabled={!captchaToken || !isValid || !isDirty}
        />
        <Button
          title={'Back to Sign In'}
          variant={'link'}
          asChild={'a'}
          width={'100%'}
          className={s.button + ' ' + s.link}
          href={PATH.AUTH.LOGIN}
        />
        {!isMailSent && (
          <Recaptcha
            sitekey="6Lckav8qAAAAAIr3zUA1Z8DTqPe8ZQgbjU3khpAI"
            onChange={handleCaptchaChange}
            theme="dark"
          />
        )}
      </form>
      <Modal
        open={!!showModal}
        onClose={() => setShowModal(null)}
        modalTitle={'Email sent'}
        width={'378px'}
        height={'228px'}
      >
        <p>We have sent a link to confirm your email to {showModal}</p>
        <div className={s.Description}>
          <div className={s.buttonGroup + ' ' + s.buttonGroupEnd}>
            <Button
              variant={'primary'}
              title={'OK'}
              onClick={() => setShowModal(null)}
              width={'96px'}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default ForgotPassword
