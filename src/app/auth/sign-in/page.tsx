'use client'
import { Button } from '@/shared/ui/Button/Button'
import Cards from '@/shared/ui/Cards/Cards'
import { Header } from '@/shared/ui/Header/Header'
import Input from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'
import s from './sign-in.module.scss'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const { register } = useForm()

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
          width={'100%'}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Incorrect email address',
            },
          })}
        />
        <Input
          label="Password"
          placeholder="**********"
          type={'password'}
          width={'100%'}
          className={s.input}
        />

        <Typography className={s.forgot}>Forgot Password</Typography>
        <Button title="Sign In" width={'100%'} />
        <Typography className={s.account}>Don’t have an account?</Typography>
        <Button title={'Sign Up'} variant={'link'} asChild={'a'} width={'100%'} />
      </Cards>
    </>
  )
}
