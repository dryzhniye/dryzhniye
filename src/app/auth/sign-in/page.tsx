'use client'
import { Button } from '@/shared/ui/base/Button/Button'
import Cards from '@/shared/ui/base/Cards/Cards'
import Input from '@/shared/ui/base/Input/Input'
import s from './sign-in.module.scss'
import { PATH } from '@/shared/lib/const/PATH'
import { Typography } from '@/shared/ui/base/Typography'
import { useLoginForm } from '@/shared/lib/hooks/useLoginForm'
import { SocialAuth } from '@/shared/ui/SocialAuth/SocialAuth'

export default function Page() {
  const {
    register,
    onSubmit,
    handleSubmit,
    formState: { errors, isValid },
  } = useLoginForm()

  return (
    <>
      <Cards className={s.card} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.sign} variant={'h1'}>
          Sign In
        </Typography>

        <SocialAuth/>

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
