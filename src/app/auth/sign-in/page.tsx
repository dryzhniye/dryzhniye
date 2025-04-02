'use client'
import { Button } from '@/shared/ui/Button/Button'
import Cards from '@/shared/ui/Cards/Cards'
import { Header } from '@/shared/ui/Header/Header'
import Input from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../api/authApi'
import s from './sign-in.module.scss'

type LoginArgs = {
  email: string
  password: string
}

export default function LoginPage() {
  const [login] = useLoginMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginArgs>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginArgs) => {
    if (!data.email || !data.password) {
      setError('password', {
        type: 'manual',
        message: 'The email or password are incorrect. Try again please',
      })
    } else {
      try {
        await login({
          email: data.email,
          password: data.password,
        }).unwrap()

        console.log('login success')
      } catch (error) {
        debugger
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
      <Header isLoggedIn={true} />

      <Cards className={s.card}>
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
                '_` { | } ~',
            },
          })}
        />

        <Button
          className={s.forgot}
          variant={'link'}
          asChild={'a'}
          title="Forgot Password"
          href={'/forgot-password'}
        />
        <Button
          title="Sign In"
          width={'100%'}
          onClick={handleSubmit(onSubmit)}
          disabled={isValid}
        />
        <Typography className={s.account}>Don’t have an account?</Typography>
        <Button title={'Sign Up'} variant={'link'} asChild={'a'} width={'100%'} href={'/sign-up'} />
      </Cards>
    </>
  )
}
