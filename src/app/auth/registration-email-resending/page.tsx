'use client'
import s from '@/app/auth/registration-confirmation/registration-confirmation.module.scss'
import { Button } from '@/shared/ui/base/Button/Button'
import Image from 'next/image'
import Input from '@/shared/ui/base/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useState } from 'react'
import { useResetEmailForm } from '@/shared/lib/hooks/useResetEmailForm'


const ResetEmailPage = () => {
  const [modal, setModal] = useState<string | boolean>(false)

  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors, isValid },
  } = useResetEmailForm()

  return (
    <div>
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
            placeholder={'Epam@epam.com'}
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
      <Modal open={!!modal} modalTitle={'Email sent'} onClose={() => setModal(false)}>
        <p style={{ marginBottom: '24px' }}>Confirmation link sent to email {modal}</p>
        <Button title={'OK'} onClick={() => setModal(false)} />
      </Modal>
    </div>
  )
}

export default ResetEmailPage
