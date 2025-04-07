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
import { handleGithubAuth, handleGoogleAuth } from '@/lib/constants'
import { ErrorType } from '../sign-up/page'
import { selectAppEmail } from '@/app/redux/appSlice'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { useRedirectIfAuthorized } from '@/lib/hooks/useRedirectIfAuthorized'
import { formLoginSchema, type TFormLoginValues } from '@/lib/schemas/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

type LoginArgs = {
  email: string
  password: string
}

export default function Page() {
  const [login] = useLoginMutation()
  const router = useRouter()
  const email = useAppSelector(selectAppEmail)
  useRedirectIfAuthorized()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormLoginValues>({
    mode: 'onChange',
    resolver: zodResolver(formLoginSchema),
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

        router.push(`../users/profile/${email}`)

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
          <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} type="button"
                  onClick={handleGoogleAuth}>
            <Image src="/google.svg" alt="" width={34} height={34} />
          </button>
          <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} type="button"
                  onClick={handleGithubAuth}>
            <Image src="/github.svg" alt="" width={34} height={34} />
          </button>
        </div>

        <Input
          label={'Email'}
          placeholder={'Epam@epam.com'}
          width={'330px'}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label={'Password'}
          type={'password'}
          placeholder={'******************'}
          error={errors.password?.message}
          width={'330px'}
          {...register('password')}
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
        <Button
          title={'Sign Up'}
          variant={'link'}
          asChild={'a'}
          width={'100%'}
          href={'/auth/sign-up'}
        />
      </Cards>
    </>
  )
}
