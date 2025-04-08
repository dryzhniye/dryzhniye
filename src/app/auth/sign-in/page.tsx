'use client'
import { Button } from '@/shared/ui/Button/Button'
import Cards from '@/shared/ui/Cards/Cards'
import Input from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/lib/api/authApi'
import s from './sign-in.module.scss'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ErrorType } from '../sign-up/page'
import { useRedirectIfAuthorized } from '@/lib/hooks/useRedirectIfAuthorized'
import Link from 'next/link'
import { PATH } from '@/shared/const/PATH'
import { handleGoogleAuth } from '@/shared/const/google-auth-handler'

type LoginArgs = {
  email: string
  password: string
}

function Page() {
  const [login] = useLoginMutation()
  const router = useRouter()
  useRedirectIfAuthorized()

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

        router.push(PATH.USERS.PROFILE)

      } catch (error) {
        const err = error as ErrorType<string>

        if (err.data.statusCode === 400) {
          const errorMessage = err.data.messages
          if (errorMessage.includes('password or email')) {
            setError('email', { type: 'manual', message: errorMessage })
          }
        }

        if (err.data.statusCode === 401) {
          router.push(PATH.AUTH.SIGNUP)
          return
        }
      }
    }
  }

  return (
    <>
      <Cards className={s.card} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.sign} variant={'h1'}>
          Sign In
        </Typography>

        <div className={s.alternativeAuthorisations}>
          <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} type="button"
                  onClick={handleGoogleAuth}>
            <Image src="/google.svg" alt="" width={34} height={34} />
          </button>
          <Link href={'/github'}>
            <Image src="/github.svg" alt="" width={34} height={34} />
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
                '# $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^\n' +
                '_ { | } ~',
            },
          })}
        />

        <Button
          className={s.forgot}
          variant={'link'}
          asChild={'a'}
          title="Forgot Password"
          href={PATH.AUTH.FORGOT_PASSWORD}
        />

        <Button title="Sign In" width={'100%'} disabled={!isValid} type="submit" />

        <Typography className={s.account}>Don’t have an account?</Typography>
        <Button
          title={'Sign Up'}
          variant={'link'}
          asChild={'a'}
          width={'100%'}
          href={PATH.AUTH.SIGNUP}
        />
      </Cards>
    </>
  )
}

export default Page
