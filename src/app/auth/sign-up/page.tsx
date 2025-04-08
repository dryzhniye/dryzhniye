'use client'
import s from './signUp.module.scss'
import Input from '@/shared/ui/Input/Input'
import { CheckBox } from '@/shared/ui/CheckBox/CheckBox'
import { Button } from '@/shared/ui/Button/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRegistrationMutation } from '@/lib/api/authApi'
import { useState } from 'react'
import { Modal } from '@/shared/ui/Modal/Modal'
import Image from 'next/image'
import Link from 'next/link'
import { useRedirectIfAuthorized } from '@/lib/hooks/useRedirectIfAuthorized'
import { PATH } from '@/shared/const/PATH'
import { handleGoogleAuth } from '@/shared/const/google-auth-handler'

type Input = {
  email: string
  password: string
  rememberMe: boolean
  firstName: string
  confirmPassword: string
}

export type ErrorType<T = [{ message: string }]> = {
  data: {
    error: string
    messages: T
    statusCode: number
  }
  status: number
}

function Page() {
  const [linkModal, setLinkModal] = useState<string | boolean>(false)

  useRedirectIfAuthorized()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<Input>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      firstName: '',
      confirmPassword: '',
    },
  })

  const [registration] = useRegistrationMutation()

  const onSubmit: SubmitHandler<Input> = async data => {

    try {
      await registration({
        email: data.email,
        password: data.password,
        userName: data.firstName,
      }).unwrap()

      reset({
        email: '',
        password: '',
        rememberMe: false,
        firstName: '',
        confirmPassword: '',
      })

      setLinkModal(false)
      setLinkModal(data.email)
    } catch (error) {
      const err = error as ErrorType
      if (err.data.statusCode === 400 && err.data.messages.length > 0) {
        const message = err.data.messages[0].message.toLowerCase()

        if (message.includes('username')) {
          setError('firstName', { type: 'manual', message: err.data.messages[0].message })
        } else if (message.includes('email')) {
          setError('email', { type: 'manual', message: err.data.messages[0].message })
        } else {
          console.log('Неизвестная ошибка:', err.data.messages[0].message)
        }
      } else {
        console.log('Ошибка сервера:', error)
      }
    }
  }
  console.log(process.env.GOOGLE_CLIENT_ID, `${process.env.GOOGLE_CLIENT_ID}`)

  return (
    <div>
      <form className={s.block} onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'var(--light-100)', fontSize: '20px' }}>Sign Up</h1>

        <div className={s.autorizationIcon}>
          <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} type="button" onClick={handleGoogleAuth}>
            <Image  src="/google.svg" alt="" width={34} height={34} />
          </button>
          <Link href={'/github'}>
            <Image src="/github.svg" alt="" width={34} height={34} />
          </Link>
        </div>

        <Input
          label={'Username'}
          placeholder={'Epam11'}
          width={'330px'}
          error={errors.firstName?.message}
          {...register('firstName', {
            required: 'FirstName is required',
            minLength: { value: 6, message: 'Min 6 characters ' },
            maxLength: { value: 20, message: 'Max 20 characters' },
            pattern: { value: /^[a-zA-Z0-9_-]+$/, message: 'only letters' },
          })}
        />
        <Input
          label={'Email'}
          placeholder={'Epam@epam.com'}
          width={'330px'}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'The email must match the format example@example.com',
            },
          })}
        />
        <Input
          label={'Password'}
          type={'password'}
          placeholder={'******************'}
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
                'Password must contain 0-9, a-z, A-Z, ! "\n' +
                "# $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^\n" +
                '_` { | } ~',
            },
          })}
        />

        <Input
          label={'Password confirmation'}
          type={'password'}
          placeholder={'******************'}
          error={errors.confirmPassword?.message}
          width={'330px'}
          {...register('confirmPassword', {
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
              message: 'Passwords do not match',
            },
            validate: value => value === watch('password') || 'Passwords do not match',
          })}
        />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Controller
            control={control}
            {...register('rememberMe', { required: true })}
            render={({ field }) => (
              <CheckBox checked={field.value} onChange={checked => field.onChange(checked)} />
            )}
          />
          <span style={{ color: 'var(--light-100)', fontSize: '12px' }}>
            I agree to the{' '}
            <Link href={PATH.AUTH.TERMS_OF_SERVICE} style={{ color: 'var(--accent-700)' }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={PATH.AUTH.PRIVACY_POLICY} style={{ color: 'var(--accent-700)' }}>
              Privacy Policy
            </Link>
          </span>
        </div>

        <Button title={'Sign Up'} fullWidth={true} type={'submit'} disabled={!isValid} />

        <p style={{ color: 'var(--light-100)', fontSize: '16px' }}>Do you have an account?</p>

        <Button title={'Sign In'} variant={'link'} asChild={'a'} className={s.button} href={PATH.AUTH.LOGIN}/>
      </form>
      <Modal open={!!linkModal} modalTitle={'Email sent'} onClose={() => setLinkModal(false)}>
        <p style={{ marginBottom: '20px' }}>
          We have sent a link to confirm your email to {linkModal}
        </p>
        <Button
          variant={'primary'}
          title={'OK'}
          onClick={() => setLinkModal(false)}
          width={'96px'}
        />
      </Modal>
    </div>
  )
}
export default Page
