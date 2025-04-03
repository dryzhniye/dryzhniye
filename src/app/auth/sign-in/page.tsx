'use client'
import { Button } from '@/shared/ui/Button/Button'
import Cards from '@/shared/ui/Cards/Cards'
import Input from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useLoginMutation, useMeQuery } from '../api/authApi'
import s from './sign-in.module.scss'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setAppStatus } from '@/app/redux/appSlice'
import { useEffect } from 'react'

type LoginArgs = {
  email: string
  password: string
}

export default function Page() {
  const [login] = useLoginMutation()
  const { data: userData, refetch } = useMeQuery() // todo не входит с непр паролем и logout not working
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginArgs>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    dispatch(setAppStatus('loading'))

    refetch().then(() => {
      dispatch(setAppStatus('succeeded'))//todo чо эта
    })
  }, [])

  const onSubmit = async (data: LoginArgs) => {
    dispatch(setAppStatus('loading'))

    if (!data.email || !data.password) {
      setError('password', {
        type: 'manual',
        message: 'The email or password are incorrect. Try again please',
      })
    } else {
      try {
        dispatch(setAppStatus('loading'))

        const response = await login({
          email: data.email,
          password: data.password,
        }).unwrap()

        localStorage.setItem('token', response.accessToken)

        const { data: freshUserData } = await refetch()

        if (freshUserData?.userId) {
          router.push(`users/profile/${freshUserData.userId}`)
          dispatch(setAppStatus('succeeded'))
        }
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

        if (apiError?.statusCode === 401) {
          router.push('/sign-up')
          return
        }

        setError('password', {
          type: 'manual',
          message: apiError?.messages[0].message,
        })
      }
    }
  }

  return (
    <>
      <Cards className={s.card} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.sign}>Sign In</Typography>

        <div className={s.alternativeAuthorisations}>
          <Link href="https://www.google.com" passHref>
            <img src="/google.svg" alt="Google" width={36} height={36} />
          </Link>
          <Link href="https://www.github.com" passHref>
            <img src="/gitHub.svg" alt="Git Hub" width={36} height={36} />
          </Link>
        </div>

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
                '_ { | } ~',
            },
          })}
        />

        <Button
          className={s.forgot}
          variant={'link'}
          asChild={'a'}
          title="Forgot Password"
          href={'/auth/forgot-password'}
        />

        <Button title="Sign In" width={'100%'} disabled={!isValid} type="submit" />

        <Typography className={s.account}>Don’t have an account?</Typography>
        <Button title={'Sign Up'} variant={'link'} asChild={'a'} width={'100%'} href={'/sign-up'} />
      </Cards>
    </>
  )
}
