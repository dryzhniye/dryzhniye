'use client'

import s from './signUp.module.scss'
import Input from '@/shared/ui/Input/Input'
import { CheckBox } from '@/shared/ui/CheckBox/CheckBox'
import { Button } from '@/shared/ui/Button/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useGithubAuthQuery, useGoogleAuthMutation, useRegistrationMutation } from '@/app/auth/api/authApi'
import { useState } from 'react'
import { Modal } from '@/shared/ui/Modal/Modal'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setAppStatus } from '@/app/redux/appSlice'
import { initiateGithubAuth } from '@/constants/oauthHelpers'
import { signIn } from 'next-auth/react'
// import { useGoogleLogin } from '@react-oauth/google'


type Input = {
  email: string
  password: string
  rememberMe: boolean
  firstName: string
  confirmPassword: string
}

export type Error = {
  data: {
    error: string
    messages: [{ message: string }]
    statusCode: number
    status: number
  }
}

export default function Page() {
  const [linkModal, setLinkModal] = useState<string | boolean>(false)
  // const [googleAuth] = useGoogleAuthMutation()

  // const {data, isLoading} = useGithubAuthQuery('http://localhost:3000/auth/callback')
  // console.log(data)

  const handleGithubSignUp = () => {
    const redirectUrl = 'http://localhost:3000/auth/callback/github' // 👈 this is your frontend callback route
    const loginUrl = `https://dryzhniye.ru/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`
    // const loginUrl = `https://inctagram.work/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`
    // const loginUrl = `https://google.com`

    window.location.href = loginUrl
  }

  const handleGoogleLogin = () => {
    const clientId = '478190863440-sjqn3mq5hkaddloe1s98p4812f2rv8qv.apps.googleusercontent.com'
    const redirectUri = 'http://localhost:3000/auth/callback/google'
    const scope = 'email profile'
    const responseType = 'code'

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`

    window.location.href = googleAuthUrl
  }

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async tokenResponse => {
  //     try {
  //       dispatch(setAppStatus('loading'))
  //       const response = await googleAuth({ token: tokenResponse.access_token }).unwrap()
  //
  //       // Store token
  //       localStorage.setItem('token', response.accessToken)
  //
  //       // Navigate to dashboard or home page after successful login
  //       window.location.href = '/'
  //       dispatch(setAppStatus('succeeded'))
  //     } catch (error) {
  //       console.error('Google authentication error:', error)
  //       dispatch(setAppStatus('succeeded'))
  //       alert('Failed to login with Google')
  //     }
  //   },
  //   onError: errorResponse => {
  //     console.error('Google login error:', errorResponse)
  //     alert('Google login failed')
  //   },
  // })
  const handleGithubClick = () => {
    // The current URL will be our redirect URL
    const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/github-callback` : '';
   window.location.href = `https://dryzhniye.ru/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`;
    initiateGithubAuth(redirectUrl)
  }

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
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Input> = async data => {

    try {
      dispatch(setAppStatus('loading'))

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
      dispatch(setAppStatus('succeeded'))
      setLinkModal(data.email)
    } catch (error) {
      dispatch(setAppStatus('succeeded'))
      const err = error as Error
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

  return (
    <div>
      <form className={s.block} onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'var(--light-100)', fontSize: '20px' }}>Sign Up</h1>

        <div className={s.autorizationIcon}>
          <button type="button" onClick={handleGoogleLogin}>
            <Image src="/google.svg" alt="" width={34} height={34} />
          </button>
          <button type="button" onClick={handleGithubSignUp}>
            <Image src="/github.svg" alt="" width={34} height={34} />
          </button>
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
            <Link href={'/auth/terms-of-service'} style={{ color: 'var(--accent-700)' }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={'/auth/privacy-policy'} style={{ color: 'var(--accent-700)' }}>
              Privacy Policy
            </Link>
          </span>
        </div>

        <Button title={'Sign Up'} fullWidth={true} type={'submit'} disabled={!isValid} />

        <p style={{ color: 'var(--light-100)', fontSize: '16px' }}>Do you have an account?</p>

        <Button title={'Sign In'} variant={'link'} asChild={'a'} className={s.button} />
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
