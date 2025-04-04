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
import Image from 'next/image'
import { ErrorType } from '../sign-up/page'
import { setAppEmail, setIsLoggedIn } from '@/app/redux/appSlice'
import { useAppDispatch } from '@/app/appHooks'
import { withAuthRedirect } from '@/lib/hooks/hoc/withAuthRedirect'

type LoginArgs = {
  email: string
  password: string
}

function Page() {
  const [login] = useLoginMutation()
  const { data: userData, refetch } = useMeQuery()
  const router = useRouter()
  const dispatch = useAppDispatch()

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
        const response = await login({
          email: data.email,
          password: data.password,
        }).unwrap()

        if (userData) {
          debugger
          dispatch(setIsLoggedIn(true))
          dispatch(setAppEmail(userData.email))
        }

        localStorage.setItem('token', response.accessToken)

        const { data: freshUserData } = await refetch()

        if (freshUserData?.userId) {
          router.push(`../users/profile/${freshUserData.userId}`)
        }
      } catch (error) {
        const err = error as ErrorType<string>

        if (err.data.statusCode === 400) {
          const errorMessage = err.data.messages
          if (errorMessage.includes('password or email')) {
            setError('email', { type: 'manual', message: errorMessage })
          }
        }

        if (err.data.statusCode === 401) {
          router.push('/sign-up')
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
          <Link href="https://www.google.com" passHref>
            <Image src="/google.svg" alt="Google" width={36} height={36} />
          </Link>
          <Link href="https://www.github.com" passHref>
            <Image src="/gitHub.svg" alt="Git Hub" width={36} height={36} />
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
        <Link href={'/auth/sign-up'}>
          <Button
            title={'Sign Up'}
            variant={'link'}
            asChild={'a'}
            width={'100%'}
            href={'/sign-up'}
          />
        </Link>
      </Cards>
    </>
  )
}
export default withAuthRedirect(Page)
